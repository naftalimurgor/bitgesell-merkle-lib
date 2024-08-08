/// <reference types="node" />
/**
 * @link https://github.com/naftalimurgor/bitgesell-merkle-lib/src/indext.ts
 * @param tree The merkle tree data structure
 * @param leaf
 * @returns the nodes in the tree leaf
 */
declare function merkleProof(tree: Array<Uint8Array>, leaf: Uint8Array): any[];
declare function verify(proof: Array<Buffer>, digestFn: (data: Buffer) => Buffer): boolean;
export { merkleProof, verify };
