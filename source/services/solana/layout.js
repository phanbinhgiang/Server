import * as borsh from '@project-serum/borsh'

export const TOKEN_PROGRAM_LAYOUT = {
  APPROVE: borsh.struct([borsh.u8('instruction'), borsh.u64('amount')]),
  BURN: borsh.struct([borsh.u8('instruction'), borsh.u64('amount')]),
  CHANGE_AUTHORITY: borsh.struct([
    borsh.u8('instruction'),
    borsh.u8('type'),
    borsh.option(borsh.publicKey(), 'authority')
  ]),
  CLOSE_ACCOUNT: borsh.struct([borsh.u8('instruction')]),
  INITIALIZE_ACCOUNT: borsh.struct([borsh.u8('instruction')]),
  INITIALIZE_MINT: borsh.struct([
    borsh.u8('instruction'),
    borsh.u8('decimals'),
    borsh.publicKey('mintAuthority'),
    borsh.option(borsh.publicKey(), 'freezeAuthority')
  ]),
  MINT: borsh.struct([borsh.u8('instruction'), borsh.u64('amount')]),
  TOKEN_ACCOUNT: borsh.struct([
    borsh.publicKey('mint'),
    borsh.publicKey('owner'),
    borsh.u64('amount'),
    borsh.u32('delegateOption'),
    borsh.publicKey('delegate'),
    borsh.u8('state'),
    borsh.u32('isNativeOption'),
    borsh.u64('isNative'),
    borsh.u64('delegatedAmount'),
    borsh.u32('closeAuthorityOption'),
    borsh.publicKey('closeAuthority')
  ]),
  TOKEN_MINT: borsh.struct([
    borsh.u32('mintAuthorityOption'),
    borsh.publicKey('mintAuthority'),
    borsh.u64('supply'),
    borsh.u8('decimals'),
    borsh.u8('isInitialized'),
    borsh.u32('freezeAuthorityOption'),
    borsh.publicKey('freezeAuthority')
  ]),
  TRANSFER: borsh.struct([borsh.u8('instruction'), borsh.u64('amount')])
}

export const TokenSwapLayout = borsh.struct([
  borsh.u8('version'),
  borsh.u8('isInitialized'),
  borsh.u8('bumpSeed'),
  borsh.publicKey('tokenProgramId'),
  borsh.publicKey('tokenAccountA'),
  borsh.publicKey('tokenAccountB'),
  borsh.publicKey('tokenPool'),
  borsh.publicKey('mintA'),
  borsh.publicKey('mintB'),
  borsh.publicKey('feeAccount'),
  borsh.u64('tradeFeeNumerator'),
  borsh.u64('tradeFeeDenominator'),
  borsh.u64('ownerTradeFeeNumerator'),
  borsh.u64('ownerTradeFeeDenominator'),
  borsh.u64('ownerWithdrawFeeNumerator'),
  borsh.u64('ownerWithdrawFeeDenominator'),
  borsh.u64('hostFeeNumerator'),
  borsh.u64('hostFeeDenominator'),
  borsh.u8('curveType'),
  borsh.array(borsh.u8(), 32, 'curveParameters')

])
