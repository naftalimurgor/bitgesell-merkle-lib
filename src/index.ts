import {
  verify,
  merkleProof
} from './merkleProof'

import {
  fastRoot
} from './fastRoot'

// returns an array of hashes of length: values.length / 2 + (values.length % 2)
function _derive(values: Array<Uint8Array>, digestFn: (data: Buffer) => Buffer) {
  const length = values.length
  const results = []

  for (let i = 0; i < length; i += 2) {
    const left = values[i]
    const right = i + 1 === length ? left : values[i + 1]
    const data = Buffer.concat([left, right])

    results.push(digestFn(data))
  }

  return results
}

/**
 * Returns the merkle tree
 * @param values Array of hashes
 * @param digestFn digest function to hash tree leafs
 * @returns Merkle tree of hashes
 */
function merkleTree(values: Array<Uint8Array>, digestFn: (data: Buffer) => Buffer) {
  if (!Array.isArray(values)) throw TypeError('Expected values Array')
  if (typeof digestFn !== 'function') throw TypeError('Expected digest Function')
  if (values.length === 1) return values.concat()

  const levels = [values]
  let level = values

  do {
    level = _derive(level, digestFn)
    levels.push(level)
  } while (level.length > 1)

  return [].concat.apply([], levels)
}

export {
  merkleProof,
  verify,
  merkleTree,
  fastRoot
}