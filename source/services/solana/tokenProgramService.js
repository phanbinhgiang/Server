import { PublicKey, Transaction, TransactionInstruction, sendAndConfirmTransaction, SYSVAR_RENT_PUBKEY, SystemProgram } from '@solana/web3.js'
import { BorshServices } from '../borshServices'
import * as borsh from '@project-serum/borsh'
import SolanaServices from '.'

export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
)

export const ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
)

const ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_LAYOUT = {
  CREATE_ACCOUNT: borsh.struct(
    []
  )
}

export class TokenProgramService {
  static async findAssociatedTokenAddress (walletAddress, tokenMintAddress) {
    const [address] = await PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer()
      ],
      ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
    return address
  }

  static async createAssociatedTokenAccountInstruction (
    payerAddress,
    ownerAddress,
    tokenMintAddress
  ) {
    const tokenAccountAddress =
      await TokenProgramService.findAssociatedTokenAddress(
        ownerAddress,
        tokenMintAddress
      )
    const keys = [
      { pubkey: payerAddress, isSigner: true, isWritable: true },
      { pubkey: tokenAccountAddress, isSigner: false, isWritable: true },
      { pubkey: ownerAddress, isSigner: false, isWritable: false },
      { pubkey: tokenMintAddress, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false }
    ]
    const data = BorshServices.serialize(
      ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_LAYOUT.CREATE_ACCOUNT,
      {},
      10
    )
    const insTxs = new TransactionInstruction({
      keys,
      data,
      programId: ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    })
    return insTxs
  }

  static async findOrCreateAssociatedTokenAccount ({
    connection,
    payerAddress,
    ownerAddress,
    tokenMintAddress,
    transactions
  }) {
    const ownerATATokenMint = await
    TokenProgramService.findAssociatedTokenAddress(
      ownerAddress,
      tokenMintAddress
    )
    const isInUse = await SolanaServices.isAddressInUse(
      connection,
      ownerATATokenMint
    )
    if (!isInUse) {
      const createATAInstruction =
        await TokenProgramService.createAssociatedTokenAccountInstruction(
          payerAddress,
          ownerAddress,
          tokenMintAddress
        )
      transactions && transactions.add(createATAInstruction)
      return [ownerATATokenMint, createATAInstruction]
    }

    return [ownerATATokenMint, null]
  }
}
