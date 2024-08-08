// https://bitcointalk.org/index.php?topic=403231.msg9054025#msg9054025
function treeNodeCount(leafCount: number) {
  let count = 1
  for (let i = leafCount; i > 1; i = (i + 1) >> 1) count += i
  return count
}

function treeWidth(n: number, h: number) {
  return (n + (1 << h) - 1) >> h
}

/**
 * @link https://github.com/naftalimurgor/bitgesell-merkle-lib/src/indext.ts
 * @param tree The merkle tree data structure
 * @param leaf 
 * @returns the nodes in the tree leaf
 */
function merkleProof(tree: Array<Uint8Array>, leaf: Uint8Array) {
  let index = tree.indexOf(leaf)

  // does the leaf node even exist [in the tree]?
  if (index === -1) return null

  let n = tree.length
  let nodes = []

  // does the far right leaf bypass a layer?
  // determine hashable node count...
  let z = treeWidth(n, 1)
  while (z > 0) {
    if (treeNodeCount(z) === n) break
    --z
  }

  // XXX: not reach-able (AFAIK) but handled anyway
  if (z === 0) throw new Error('Unknown solution')

  let height = 0
  let i = 0
  while (i < n - 1) {
    let layerWidth = treeWidth(z, height)
    ++height

    let odd = index % 2
    if (odd) --index

    let offset = i + index
    let left = tree[offset]
    let right = index === (layerWidth - 1) ? left : tree[offset + 1]

    if (i > 0) {
      nodes.push(odd ? left : null)
      nodes.push(odd ? null : right)
    } else {
      nodes.push(left)
      nodes.push(right)
    }

    index = (index / 2) | 0
    i += layerWidth
  }

  nodes.push(tree[n - 1])
  return nodes
}

function verify(proof: Array<Buffer>, digestFn: (data: Buffer) => Buffer) {
  let root = proof[proof.length - 1]
  let hash = root

  for (var i = 0; i < proof.length - 1; i += 2) {
    let left = proof[i] || hash
    let right = proof[i + 1] || hash
    let data = Buffer.concat([left, right])
    hash = digestFn(data)
  }

  return hash.equals(root)
}

export { merkleProof, verify }
