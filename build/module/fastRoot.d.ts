/**
 * Constant-space merkle root calculation algorithm
 * @param values Array of Hashes
 * @param digestFn Function for merkle root calculation aglorithm
 */
/// <reference types="node" />
declare function fastRoot(values: Array<Uint8Array>, digestFn: (data: Buffer) => Uint8Array): Uint8Array;
export { fastRoot };
