import { PublicKey, SystemProgram, SYSVAR_INSTRUCTIONS_PUBKEY, Transaction, TransactionInstruction } from '@solana/web3.js'
import SolanaServices, { TOKEN_PROGRAM_ID } from '.'
import SpacegateIdl from './IDL/coin98_spacegate.json'
import { HashServices } from '../hashServices'
import { IdlParserService } from './idlParse'
import BN from 'bn.js'
import { BorshCoder } from '@project-serum/anchor'
import { TokenProgramService } from '../../../blockchain/vault/tokenProgramService'
import { LogMessageProcessor } from './LogMessage'
import BorshServices from './borsh'
import * as borsh from '@project-serum/borsh'

export const CHECKER_CAPACITY = 128 * 80
const coder = new BorshCoder(SpacegateIdl)
const parser = new IdlParserService(SpacegateIdl)
const PROGRAM_ID = new PublicKey('GateFzR5Q7nepBDKDnpJppdT1eenLBfXWcUNfMZAExcc')

const PAYGATE_CHECKER_LAYOUT = borsh.struct([
  borsh.u128('index')
])

export default class SpacegateServices {
  static bufferToGateAddress (gateCode) {
    const gateCodeBuffer = SolanaServices.findGateDerivationPath(gateCode)

    const [gateAddress] = SpacegateServices.findGateAddress(
      gateCodeBuffer,
      PROGRAM_ID
    )
    return gateAddress
  }

  static async createGate (
    connection,
    payerAccount,
    gateCode,
    isNative,
    tokenAddress
  ) {
    const transaction = new Transaction()

    const gateCodeBuffer = SolanaServices.findGateDerivationPath(gateCode)

    const [gateAddress] = SpacegateServices.findGateAddress(
      gateCodeBuffer,
      PROGRAM_ID
    )

    clog('gateAddress', gateAddress)

    const createGateInstruction = SpacegateServices.createGateIns(
      payerAccount.publicKey,
      gateCodeBuffer,
      isNative,
      tokenAddress,
      PROGRAM_ID
    )
    transaction.add(createGateInstruction)

    const hash = await connection.sendTransaction(transaction, [payerAccount], {
      skipPreflight: false
    })

    return hash
  }

  static async setGateLimit (
    connection,
    payerAccount,
    gateAddress,
    minAmount,
    maxAmount
  ) {
    const transaction = new Transaction()

    const setGateInstruction = SpacegateServices.setGateLimitIns(
      payerAccount.publicKey,
      gateAddress,
      new BN(minAmount),
      new BN(maxAmount),
      PROGRAM_ID
    )

    transaction.add(setGateInstruction)

    const hash = await connection.sendTransaction(transaction, [payerAccount], {
      skipPreflight: false
    })

    console.info(`Updated gate ${gateAddress.toBase58()}`, '---', hash, '\n')

    return hash
  }

  static async setGateStatus (
    connection,
    payerAccount,
    gateAddress,
    isActive
  ) {
    const transaction = new Transaction()

    const setGateInstruction = SpacegateServices.setGateStatusIns(
      payerAccount.publicKey,
      gateAddress,
      isActive,
      PROGRAM_ID
    )
    transaction.add(setGateInstruction)

    const hash = await connection.sendTransaction(transaction, [payerAccount], {
      skipPreflight: false
    })

    console.info(`Updated gate ${gateAddress.toBase58()}`, '---', hash, '\n')

    return hash
  }

  static async setGateFee (
    connection,
    payerAccount,
    gateAddress,
    claimFeeAmount,
    systemFeePercent
  ) {
    const transaction = new Transaction()

    const setGateInstruction = SpacegateServices.setGateFeeIns(
      payerAccount.publicKey,
      gateAddress,
      new BN(claimFeeAmount),
      new BN(systemFeePercent),
      PROGRAM_ID
    )
    transaction.add(setGateInstruction)

    const hash = await connection.sendTransaction(transaction, [payerAccount], {
      skipPreflight: false
    })

    console.info(`Updated gate ${gateAddress.toBase58()}`, '---', hash, '\n')

    return hash
  }

  static formatLogMessages (
    messages
  ) {
    const instructionLogs = LogMessageProcessor.processLogs(messages)
    const transactionLog = {
      txSignature: null,
      instructionLogs,
      rawLogMessages: messages,
      isSuccess: true,
      errorCode: null,
      errorMessage: null
    }
    let traversingInstructions = instructionLogs
    let currentInstructionIndex = 0
    let currentInstruction = instructionLogs[0]
    while (currentInstruction != null) {
      if (currentInstruction.isSuccess) {
        currentInstructionIndex++
      } else {
        transactionLog.isSuccess = false
        transactionLog.errorCode = currentInstruction.errorCode
        transactionLog.errorMessage = currentInstruction.errorMessage
        traversingInstructions = currentInstruction.children
        currentInstructionIndex = 0
      }
      if (currentInstructionIndex < traversingInstructions.length) {
        currentInstruction = traversingInstructions[currentInstructionIndex]
      } else {
        currentInstruction = null
      }
    }

    return transactionLog
  }

  static findGateAddress (
    params
  ) {
    const derivationPath = (typeof (params) === 'string')
      ? SolanaServices.findGateDerivationPath(params)
      : params
    return SpacegateServices.findGateAddressIns(
      derivationPath
    )
  }

  static async getSpacegateEvents (
    connection, until
  ) {
    const sTxSigns = await connection.getConfirmedSignaturesForAddress2(
      PROGRAM_ID, { until, limit: 100 }
    )

    const txSigns = sTxSigns.filter(it => it.err === null)
    if (getLength(txSigns) === 0) {
      return []
    }

    const transactions = await connection.getTransactions(
      txSigns.map(x => x.signature)
    )
    let events = []
    const eventSignature = 'At0BgiPvBtE'
    for (const transactionResponse of transactions) {
      const transactionLog = this.formatLogMessages(transactionResponse.meta.logMessages)
      const spacegateInstructionLogs = transactionLog.instructionLogs
        .filter(instructionLog => {
          if (instructionLog.publicKey.toBase58() !== PROGRAM_ID.toBase58()) {
            return false
          }
          if (instructionLog.datas.length === 0) {
            return false
          }
          return instructionLog.datas[0].startsWith(eventSignature)
        })

      const newEvents = spacegateInstructionLogs.map(instructionLog => {
        const event = this.decodeSpacegateEventData(instructionLog.datas[0])
        return {
          txSignature: transactionResponse.transaction.signatures[0],
          userAddress: event.sender,
          gateCode: event.gateCode.toString('utf8'),
          destination: event.recipient.toString('hex'),
          amount: event.amount
        }
      })
      events = events.concat(newEvents)
    }
    return events
  }

  static decodeSpacegateEventData (
    logMessage
  ) {
    const event = coder.events.decode(logMessage)
    return {
      gateCode: event.data.gateCode,
      sender: event.data.sender,
      recipient: event.data.recipient,
      amount: event.data.amount
    }
  }

  static async spacegateToken (
    connection,
    payerAccount,
    gateCode,
    recipientAddress,
    amount
  ) {
    const transaction = new Transaction()

    const [userProfileAddress] = this.findUserProfileAddress(
      payerAccount.publicKey
    )

    const userProgram = await connection.getAccountInfo(userProfileAddress)

    // Create user profile for spacegate
    if (!userProgram) {
      const createUserProfileInstruction = this.createUserProfile(
        payerAccount.publicKey
      )
      transaction.add(createUserProfileInstruction)
    }

    const gateCodeBuffer = SolanaServices.findGateDerivationPath(gateCode)
    const [gateAddress] = this.findGateAddress(
      gateCodeBuffer
    )
    const gateAccountInfo = await this.getGateAccountInfo(
      connection,
      gateAddress
    )

    const [rootSignerAddress] = this.findRootSignerAddress(PROGRAM_ID)
    const rootSignerTokenAddress = await TokenProgramService.findAssociatedTokenAddress(
      rootSignerAddress,
      gateAccountInfo.token
    )

    clog(gateAccountInfo.token.toString())

    const rootSignerProgram = await connection.getAccountInfo(rootSignerTokenAddress)

    if (!rootSignerProgram) {
      const createATAInstruction = await TokenProgramService.createAssociatedTokenAccountTransaction(
        payerAccount.publicKey,
        rootSignerAddress,
        gateAccountInfo.token, true
      )
      transaction.add(createATAInstruction)
    }

    const userTokenAddress = await TokenProgramService.findAssociatedTokenAddress(
      payerAccount.publicKey,
      gateAccountInfo.token
    )

    // Spacegate Ins final txs
    const spacegateInstruction = this.spacegate2(
      payerAccount.publicKey,
      userTokenAddress,
      gateCodeBuffer,
      Buffer.from(recipientAddress, 'hex'),
      new BN(amount),
      rootSignerTokenAddress
    )
    clog(spacegateInstruction)
    transaction.add(spacegateInstruction)

    const hash = await connection.sendTransaction(transaction, [payerAccount], {
      skipPreflight: true
    })

    console.info(`Deposited token to gate ${gateCode} to ${recipientAddress}`, '---', hash, '\n')

    return hash
  }

  static async initialize (
    connection,
    payerAccount
  ) {
    const transaction = new Transaction()

    const createAppDataInstruction = this.createAppData(
      payerAccount.publicKey
    )
    transaction.add(createAppDataInstruction)

    const setAppDataInstruction = this.setAppData(payerAccount.publicKey)
    transaction.add(setAppDataInstruction)

    const hash = await connection.sendTransaction(transaction, [payerAccount], {
      skipPreflight: false
    })
    console.info('Initialized AppData', '---', hash, '\n')

    return hash
  }

  static setAppData (
    rootAddress
  ) {
    const request = {
      isActive: true,
      threshold: 0
    }

    const [appDataAddress] = this.findAppDataAddress()
    const accounts = {
      root: rootAddress,
      appData: appDataAddress
    }

    return parser.setAppData(request, accounts, PROGRAM_ID)
  }

  static createAppData (
    rootAddress
  ) {
    const request = {}

    const [appDataAddress] = this.findAppDataAddress()
    const accounts = {
      root: rootAddress,
      appData: appDataAddress,
      systemProgram: SystemProgram.programId
    }

    return parser.createAppData(request, accounts, PROGRAM_ID)
  }

  static async paygateToken (
    connection,
    payerAccount,
    nonce,
    gateCode,
    recipientAddresses,
    amounts
  ) {
    const preTransaction = new Transaction()
    const transaction = new Transaction()

    const [checkerAddress] = this.findCheckerAddressByNonce(
      nonce
    )

    const checkerInfo = await connection.getAccountInfo(checkerAddress)

    if (!checkerInfo) {
      const createCheckerInstruction = this.createCheckerByNonce(
        payerAccount.publicKey,
        nonce
      )
      transaction.add(createCheckerInstruction)
    }

    const gateCodeBuffer = SolanaServices.findGateDerivationPath(gateCode)
    const [gateAddress] = this.findGateAddress(
      gateCodeBuffer
    )
    const gateAccountInfo = await this.getGateAccountInfo(
      connection,
      gateAddress
    )

    const recipientTokenAddresses = []

    for (const recipientAddress of recipientAddresses) {
      const [recipientTokenAddress, createATAInstruction] = await this.findRecipientTokenAddress(
        connection,
        payerAccount.publicKey,
        recipientAddress,
        gateAccountInfo.token
      )
      if (createATAInstruction) {
        preTransaction.add(createATAInstruction)
      }
      recipientTokenAddresses.push(recipientTokenAddress)
    }

    const [rootSignerAddress] = this.findRootSignerAddress(PROGRAM_ID)
    const rootSignerTokenAddress = await TokenProgramService.findAssociatedTokenAddress(
      rootSignerAddress,
      gateAccountInfo.token
    )

    const paygateInstruction = this.paygate2(
      payerAccount.publicKey,
      nonce,
      gateCodeBuffer,
      recipientAddresses,
      recipientTokenAddresses,
      amounts.map(am => new BN(am)),
      rootSignerTokenAddress,
      []
    )

    clog('paygateInstruction', paygateInstruction)
    transaction.add(paygateInstruction)

    if (preTransaction.instructions.length > 0) {
      const hash = await connection.sendTransaction(preTransaction, [payerAccount], {
        skipPreflight: false
      })

      console.info('Prepared ATA for transactions', '---', hash, '\n')
    }

    const hash = await connection.sendTransaction(transaction, [payerAccount], {
      skipPreflight: false
    })

    console.info(`Distributed token using gate ${gateCode} with nonce ${nonce}`, '---', hash, '\n')

    return hash
  }

  static async setAdmin (
    connection,
    payerAccount,
    adminAddress,
    isActive = true
  ) {
    const transaction = new Transaction()

    const [adminProfileAddress] = this.findAdminProfileAddress(
      adminAddress
    )
    const adminAccount = await connection.getAccountInfo(adminProfileAddress)

    if (!adminAccount) {
      const createAdminProfileInstruction = this.createAdminProfile(
        payerAccount.publicKey,
        adminAddress
      )
      transaction.add(createAdminProfileInstruction)
    }

    const setAdminInstruction = this.setAdminProfile(
      payerAccount.publicKey,
      adminProfileAddress,
      isActive
    )
    transaction.add(setAdminInstruction)

    const hash = await connection.sendTransaction(transaction, [payerAccount], {
      skipPreflight: false
    })

    console.info(`Set admin previledge for ${adminAddress.toBase58()}`, '---', hash, '\n')

    return hash
  }

  static setAdminProfile (
    rootAddress,
    adminProfileAddress,
    isActive
  ) {
    const request = {
      isActive
    }

    const accounts = {
      root: rootAddress,
      adminProfile: adminProfileAddress
    }

    return parser.setAdminProfile(request, accounts, PROGRAM_ID)
  }

  static createAdminProfile (
    rootAddress,
    adminAddress
  ) {
    const request = {
      address: adminAddress
    }

    const [adminProfileAddress] = this.findAdminProfileAddress(
      adminAddress
    )
    const accounts = {
      root: rootAddress,
      adminProfile: adminProfileAddress,
      systemProgram: SystemProgram.programId
    }

    return parser.createAdminProfile(request, accounts, PROGRAM_ID)
  }

  static paygate2 (
    adminAddress,
    nonce,
    gateCode,
    recipients,
    recipientAddresses,
    amounts,
    rootSignerTokenAddress,
    signatures
  ) {
    const recipientAccountOffset = signatures.length
    const request = {
      nonce,
      gateCode,
      recipients,
      amounts,
      recipientAccountOffset,
      signatures
    }

    const data = coder.instruction.encode('paygate2', request)
    const [adminProfileAddress] = this.findAdminProfileAddress(
      adminAddress
    )

    const [appDataAddress] = this.findAppDataAddress()
    const [gateAddress] = this.findGateAddress(gateCode)
    const [checkerAddress] = this.findCheckerAddressByNonce(nonce)
    const [rootSignerAddress] = this.findRootSignerAddress(PROGRAM_ID)

    const keys = [
      { pubkey: adminAddress, isSigner: true, isWritable: false },
      { pubkey: adminProfileAddress, isSigner: false, isWritable: false },
      { pubkey: appDataAddress, isSigner: false, isWritable: false },
      { pubkey: gateAddress, isSigner: false, isWritable: false },
      { pubkey: checkerAddress, isSigner: false, isWritable: true },
      { pubkey: rootSignerAddress, isSigner: false, isWritable: false },
      { pubkey: rootSignerTokenAddress, isSigner: false, isWritable: true },
      { pubkey: SYSVAR_INSTRUCTIONS_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
    ]

    for (const signature of signatures) {
      const [adminProfileAddress] = this.findAdminProfileAddress(
        signature.publicKey
      )
      keys.push(
        { pubkey: adminProfileAddress, isSigner: false, isWritable: false }
      )
    }
    for (const recipientAddress of recipientAddresses) {
      keys.push(
        { pubkey: recipientAddress, isSigner: false, isWritable: true }
      )
    }

    return new TransactionInstruction({
      data,
      keys,
      programId: PROGRAM_ID
    })
  }

  static findAdminProfileAddress (
    adminAddress
  ) {
    return PublicKey.findProgramAddressSync(
      [
        HashServices.sha256('AdminProfile').slice(0, 8),
        adminAddress.toBuffer()
      ],
      PROGRAM_ID
    )
  }

  static async findRecipientTokenAddress (
    connection,
    payerAddress,
    recipientAddress,
    tokenMintAddress
  ) {
    let recipientTokenAddress = recipientAddress
    let createATAInstruction = null
    const recepientType = await this.checkAddressType(connection, recipientAddress)
    if (recepientType === 0 || recepientType === 1) {
      const associatedTokenAccountAddress = await TokenProgramService.findAssociatedTokenAddress(
        recipientAddress,
        tokenMintAddress
      )

      const ataAccount = await connection.getAccountInfo(associatedTokenAccountAddress)

      if (!ataAccount) {
        createATAInstruction = await TokenProgramService.createAssociatedTokenAccountTransaction(
          payerAddress,
          recipientAddress,
          tokenMintAddress
        )
      }
      recipientTokenAddress = associatedTokenAccountAddress
    }
    return [recipientTokenAddress, createATAInstruction]
  }

  static async checkAddressType (
    connection,
    address
  ) {
    const accountInfo = await connection.getAccountInfo(address)
    if (!accountInfo) {
      return 0
    }
    if (accountInfo.owner.toBase58() === SystemProgram.programId.toBase58()) {
      return 1
    }
    if (accountInfo.owner.toBase58() === TOKEN_PROGRAM_ID.toBase58()) {
      return 2
    }
    return 255
  }

  static createCheckerByNonce (
    payerAddress,
    nonce
  ) {
    const index = nonce.div(new BN(CHECKER_CAPACITY))
    return this.createChecker(
      payerAddress,
      index,
      PROGRAM_ID
    )
  }

  static createChecker (
    payerAddress,
    index
  ) {
    const request = {
      index
    }

    const [checkerAddress] = this.findCheckerAddress(
      index
    )
    const accounts = {
      payer: payerAddress,
      checker: checkerAddress,
      systemProgram: SystemProgram.programId
    }

    return parser.createChecker(request, accounts, PROGRAM_ID)
  }

  static findCheckerAddressByNonce (
    nonce
  ) {
    const index = nonce.div(new BN(CHECKER_CAPACITY))
    return this.findCheckerAddress(
      index,
      PROGRAM_ID
    )
  }

  static findCheckerAddress (
    index
  ) {
    const derivationPath = BorshServices.serialize(PAYGATE_CHECKER_LAYOUT, { index }, 16)
    return PublicKey.findProgramAddressSync(
      [
        HashServices.sha256('PaygateChecker').slice(0, 8),
        derivationPath
      ],
      PROGRAM_ID
    )
  }

  static createGateIns (
    rootAddress,
    derivationPath,
    isNative,
    tokenAddress,
    spacegateProgramId
  ) {
    const request = {
      derivationPath: derivationPath,
      isNative: isNative,
      token: tokenAddress
    }

    const [gateAddress] = SpacegateServices.findGateAddressIns(
      derivationPath,
      spacegateProgramId
    )
    clog('gateAddress', gateAddress)

    const accounts = {
      root: rootAddress,
      gate: gateAddress,
      systemProgram: SystemProgram.programId
    }

    clog(accounts)

    return parser.createGate(request, accounts, spacegateProgramId)
  }

  static setGateFeeIns (
    rootAddress,
    gateAddress,
    claimFeeAmount,
    systemFeePercent
  ) {
    const request = {
      claimFeeAmount,
      systemFeePercent
    }

    const accounts = {
      root: rootAddress,
      gate: gateAddress
    }

    return parser.setGateFee(request, accounts, PROGRAM_ID)
  }

  static setGateStatusIns (
    rootAddress,
    gateAddress,
    isActive
  ) {
    const request = {
      isActive
    }

    const accounts = {
      root: rootAddress,
      gate: gateAddress
    }

    return parser.setGateStatus(request, accounts, PROGRAM_ID)
  }

  static setGateLimitIns (
    rootAddress,
    gateAddress,
    minAmount,
    maxAmount
  ) {
    const request = {
      minAmount,
      maxAmount
    }

    const accounts = {
      root: rootAddress,
      gate: gateAddress
    }

    return parser.setGateLimit(request, accounts, PROGRAM_ID)
  }

  static findGateAddressIns (
    derivationPath
  ) {
    return PublicKey.findProgramAddressSync(
      [
        HashServices.sha256('Gate').slice(0, 8),
        derivationPath
      ],
      PROGRAM_ID
    )
  }

  static findAppDataAddress (
  ) {
    return PublicKey.findProgramAddressSync(
      [
        HashServices.sha256('Program').slice(0, 8),
        HashServices.sha256('AppData').slice(0, 8)
      ],
      PROGRAM_ID
    )
  }

  static spacegate2 (
    senderAddress,
    userTokenAddress,
    gateCode,
    recipient,
    amount,
    rootSignerTokenAddress
  ) {
    const request = {
      amount,
      recipient,
      gateCode
    }
    const data = coder.instruction.encode('spacegate2', request)

    const [appDataAddress] = this.findAppDataAddress()
    const [gateAddress] = this.findGateAddress(gateCode)
    const [rootSignerAddress] = this.findRootSignerAddress(PROGRAM_ID)
    const [senderProfileAddress] = this.findUserProfileAddress(
      senderAddress
    )

    clog(appDataAddress, gateAddress.toString(), rootSignerAddress, senderProfileAddress)

    const keys = [
      { pubkey: appDataAddress, isSigner: false, isWritable: false },
      { pubkey: gateAddress, isSigner: false, isWritable: true },
      { pubkey: rootSignerAddress, isSigner: false, isWritable: false },
      { pubkey: rootSignerTokenAddress, isSigner: false, isWritable: true },
      { pubkey: senderAddress, isSigner: true, isWritable: false },
      { pubkey: userTokenAddress, isSigner: false, isWritable: true },
      { pubkey: senderProfileAddress, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
    ]

    return new TransactionInstruction({
      data,
      keys,
      programId: PROGRAM_ID
    })
  }

  static async getGateAccountInfo (
    connection,
    gateAddress
  ) {
    const accountInfo = await connection.getAccountInfo(gateAddress)
    if (accountInfo) {
      const data = SpacegateServices.decodeGateData(accountInfo.data)
      return data
    }
    return null
  }

  static decodeGateData (
    data
  ) {
    return coder.accounts.decode('Gate', data)
  }

  static decodeAppData (
    data
  ) {
    return coder.accounts.decode('AppData', data)
  }

  static createUserProfile (
    userAddress
  ) {
    const request = {
      address: userAddress
    }

    const [userProfileAddress] = this.findUserProfileAddress(
      userAddress
    )
    const accounts = {
      user: userAddress,
      userProfile: userProfileAddress,
      systemProgram: SystemProgram.programId
    }

    return parser.createUserProfile(request, accounts, PROGRAM_ID)
  }

  static findRootSignerAddress (programId) {
    return PublicKey.findProgramAddressSync(
      [
        HashServices.sha256('Signer').slice(0, 8),
        HashServices.sha256('Root').slice(0, 8)
      ],
      programId
    )
  }

  static findUserProfileAddress (
    userAddress
  ) {
    return PublicKey.findProgramAddressSync(
      [
        HashServices.sha256('UserProfile').slice(0, 8),
        userAddress.toBuffer()
      ],
      PROGRAM_ID
    )
  }
}
