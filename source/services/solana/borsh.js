import { HashServices } from './hashServices'

export default class BorshServices {
  static anchorSerialize (
    method,
    layout,
    data,
    maxSpan
  ) {
    const prefix = HashServices.sha256(`global:${method}`)
    const truncatedPrefix = prefix.slice(0, 8)
    const buffer = Buffer.alloc(maxSpan)
    const span = layout.encode(data, buffer)
    return Buffer.from([...truncatedPrefix, ...buffer.slice(0, span)])
  }

  static anchorDeserialize (
    layout,
    data
  ) {
    return layout.decode(data.slice(8))
  }

  static deserialize (
    layout,
    data
  ) {
    return layout.decode(data)
  }

  static serialize (
    layout,
    data,
    maxSpan
  ) {
    const buffer = Buffer.alloc(maxSpan)
    const span = layout.encode(data, buffer)
    return buffer.slice(0, span)
  }
}
