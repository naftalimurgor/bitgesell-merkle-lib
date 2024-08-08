/// <reference types="node" />
import { verify, merkleProof } from './merkleProof';
import { fastRoot } from './fastRoot';
/**
 * Returns the merkle tree
 * @param values Array of hashes
 * @param digestFn digest function to hash tree leafs
 * @returns Merkle tree of hashes
 */
declare function merkleTree(values: Array<Uint8Array>, digestFn: (data: Buffer) => Buffer): any;
export { merkleProof, verify, merkleTree, fastRoot };
