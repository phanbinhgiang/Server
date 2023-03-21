import { PublicKey } from '@solana/web3.js'

const ANCHOR_PROGRAM_ERROR = 'Program log: AnchorError '
const PROGRAM_DATA = 'Program data: '
const PROGRAM_ERROR = 'Program log: Error: '
const PROGRAM_LOG = 'Program log: '
const PROGRAM_PANIC = 'Program log: panicked at'

const ProgramLogCategory = {
  ProgramStart: 1,
  ProgramSuccess: 2,
  ProgramFailed: 3,
  CpiCall: 4,
  ProgramMessage: 5,
  ProgramData: 6,
  ProgramReturn: 7,
  ProgramError: 8,
  Others: 0
}

export class LogMessageProcessor {
  static processLogs (
    messages
  ) {
    const results = []
    let currentResult
    let processingLevel = -1
    const processingResults = []
    for (const message of messages) {
      const [category, content] = categorizeLog(message)
      if (category === ProgramLogCategory.ProgramStart || category === ProgramLogCategory.CpiCall) {
        processingLevel++
        currentResult = {
          publicKey: new PublicKey(content),
          messages: [],
          datas: [],
          isSuccess: true,
          return: null,
          errorCode: null,
          errorMessage: null,
          children: []
        }
        processingResults.push(currentResult)
      }
      currentResult.messages.push([category, content])
      if (category === ProgramLogCategory.ProgramData) {
        currentResult.datas.push(content)
      }
      if (category === ProgramLogCategory.ProgramReturn) {
        currentResult.return = content
      }
      if (category === ProgramLogCategory.ProgramError) {
        currentResult.errorMessage = content
      }
      if (category === ProgramLogCategory.ProgramSuccess || category === ProgramLogCategory.ProgramFailed) {
        if (currentResult.children.length === 0) {
          currentResult.isSuccess = category === ProgramLogCategory.ProgramSuccess
        } else {
          currentResult.isSuccess = currentResult.children.every(child => child.isSuccess)
        }
        if (category === ProgramLogCategory.ProgramFailed) {
          const errorCodeHex = content.split('|')[1]
          const errorCodeDec = parseInt(errorCodeHex, 16)
          currentResult.errorCode = `${errorCodeHex}|${errorCodeDec}`
        }
        processingLevel--
        if (processingLevel === -1) {
          results.push(currentResult)
          currentResult = null
        } else {
          const parentResult = processingResults[processingLevel]
          parentResult.children.push(currentResult)
          currentResult = parentResult
        }
        processingResults.pop()
      }
    }
    return results
  }
}

function categorizeLog (
  message
) {
  const match1 = message.match(/^Program (.*) invoke \[(\d+)\]/)
  if (match1 !== null && match1[2].toString() === '1') {
    return [ProgramLogCategory.ProgramStart, match1[1]]
  }
  if (match1 !== null && match1[2] !== '1') {
    return [ProgramLogCategory.CpiCall, match1[1]]
  }
  // This is a `msg!` log
  if (message.startsWith(PROGRAM_LOG)) {
    if (message.startsWith(PROGRAM_ERROR)) {
      return [ProgramLogCategory.ProgramError, `Reason: ${message.slice(PROGRAM_ERROR.length)}`]
    } else if (message.startsWith(ANCHOR_PROGRAM_ERROR)) {
      return [ProgramLogCategory.ProgramError, `Reason: ${message.slice(PROGRAM_LOG.length)}`]
    } else if (message.startsWith(PROGRAM_PANIC)) {
      return [ProgramLogCategory.ProgramError, `Reason: ${message.slice(PROGRAM_LOG.length)}`]
    } else {
      return [ProgramLogCategory.ProgramMessage, message.slice(PROGRAM_LOG.length)]
    }
  }
  // This is a `sol_log_data` log
  if (message.startsWith(PROGRAM_DATA)) {
    return [ProgramLogCategory.ProgramData, message.slice(PROGRAM_DATA.length)]
  }
  const match2 = message.match(/^Program return: (.*) (.*)/)
  if (match2 !== null) {
    return [ProgramLogCategory.ProgramReturn, match2[2]]
  }
  const match3 = message.match(/^Program (.*) success/)
  if (match3 !== null) {
    return [ProgramLogCategory.ProgramSuccess, match3[1]]
  }
  const match4 = message.match(/Program (.*) failed: custom program error: (.*)/)
  if (match4 !== null) {
    return [ProgramLogCategory.ProgramFailed, `${match4[1]}|${match4[2]}`]
  }
  const match5 = message.match(/Program (.*) failed: Program failed to complete/)
  if (match5 !== null) {
    return [ProgramLogCategory.ProgramFailed, `${match5[1]}|0x0`]
  }
  return [ProgramLogCategory.Others, message]
}
