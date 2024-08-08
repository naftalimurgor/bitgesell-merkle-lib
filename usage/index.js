const {
  fastRoot,
  verify,
  merkleTree,
  merkleProof
} = require('bitgesell-merkle-lib')

const crypto = require('crypto')

const main = async () => {

  function sha256(data) {
    return crypto.createHash('sha256').update(data).digest()
  }

  const data = [
    'cafebeef',
    'ffffffff',
    'aaaaaaaa',
    'bbbbbbbb',
    'cccccccc'
  ].map(x => new Buffer.from(x, 'hex'))



  // construct a tree from the data:
  const tree = merkleTree(data, sha256)
  console.log(tree.map(x => x.toString('hex')))

  // calculate the root: 
  const root = fastRoot(data, sha256)

  console.log(root.toString('hex'))

  // Proof the existence of  a leaf using verify

  const proof = merkleProof(tree, data[0])

  if (proof === null) {
    console.error('No proof exists!')
  }

  console.log(proof.map(x => x && x.toString('hex')))
  // => [
  //   'cafebeef',
  //   'ffffffff',
  //   null,
  //   '8b722baf6775a313f1032ba9984c0dce32ff3c40d7a67b5df8de4dbaa43a3db0',
  //   null,
  //   '2256e70bea2c591190a0d4d6c1415acd7458fae84d8d85cdc68b851da27777d4',
  //   'c2692b0e127b3b774a92f6e1d8ff8c3a5ea9eef9a1d389fe294f0a7a2fec9be1'
  // ]

  console.log(verify(proof, sha256))
  // => true

}

main().catch(err => {
  console.log(err)
})