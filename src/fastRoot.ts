/**
 * Constant-space merkle root calculation algorithm
 * @param values Array of Hashes
 * @param digestFn Function for merkle root calculation aglorithm
 */

function fastRoot(values: Array<Uint8Array>, digestFn: (data: Buffer) => Uint8Array) {
  if (!Array.isArray(values)) throw TypeError('Expected values Array')
  if (typeof digestFn !== 'function') throw TypeError('Expected digest Function')

  let length = values.length
  let results = values.concat()

  while (length > 1) {
    let j = 0

    for (let i = 0; i < length; i += 2, ++j) {
      let left = results[i]
      let right = i + 1 === length ? left : results[i + 1]
      let data = Buffer.concat([left, right])

      results[j] = digestFn(data)
    }

    length = j
  }

  return results[0]
}

export { fastRoot }