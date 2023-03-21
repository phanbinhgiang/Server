import { SHA256 } from 'crypto-js'
import create from 'keccak'

export class HashServices {
  static keckka256 (input) {
    return create('keccak256').update(input).digest()
  }

  static sha256 (message) {
    return Buffer.from(SHA256(message).toString(), 'hex')
  }
}
