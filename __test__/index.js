const crypto = require('crypto')
const {
  merkleTree,
  fastRoot
} = require('../build/main')

const tape = require('tape')
const fixtures = require('./fixtures')

tape('throws on bad types', function (t) {
  t.throws(function () { merkleTree('not an array') })
  t.throws(function () { merkleTree([], 'not a function') })
  t.throws(function () { fastRoot('not an array') })
  t.throws(function () { fastRoot([], 'not a function') })
  t.end()
})

tape('generation, for each fixture', function (t) {
  t.plan(fixtures.length * 2)

  fixtures.forEach(function (f) {
    var froot = f.tree[f.tree.length - 1]
    function digest(x) {
      return crypto.createHash(f.hash).update(x).digest()
    }

    var values = f.values.map(function (x) { return Buffer.from(x, 'hex') })
    var tree = merkleTree(values, digest).map(function (x) { return x.toString('hex') })
    var root = fastRoot(values, digest).toString('hex')

    t.same(tree, f.tree, 'matches the tree')
    t.equal(root, froot, 'fastRoot returns the tree root' + froot)
  })

  t.end()
})
