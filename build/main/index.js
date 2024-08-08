"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastRoot = exports.merkleTree = exports.verify = exports.merkleProof = void 0;
// returns an array of hashes of length: values.length / 2 + (values.length % 2)
const merkleProof_1 = require("./merkleProof");
Object.defineProperty(exports, "verify", { enumerable: true, get: function () { return merkleProof_1.verify; } });
Object.defineProperty(exports, "merkleProof", { enumerable: true, get: function () { return merkleProof_1.merkleProof; } });
const fastRoot_1 = require("./fastRoot");
Object.defineProperty(exports, "fastRoot", { enumerable: true, get: function () { return fastRoot_1.fastRoot; } });
function _derive(values, digestFn) {
    const length = values.length;
    const results = [];
    for (let i = 0; i < length; i += 2) {
        const left = values[i];
        const right = i + 1 === length ? left : values[i + 1];
        const data = Buffer.concat([left, right]);
        results.push(digestFn(data));
    }
    return results;
}
/**
 * Returns the merkle tree
 * @param values Array of hashes
 * @param digestFn digest function to hash tree leafs
 * @returns Merkle tree of hashes
 */
function merkleTree(values, digestFn) {
    if (!Array.isArray(values))
        throw TypeError('Expected values Array');
    if (typeof digestFn !== 'function')
        throw TypeError('Expected digest Function');
    if (values.length === 1)
        return values.concat();
    const levels = [values];
    let level = values;
    do {
        level = _derive(level, digestFn);
        levels.push(level);
    } while (level.length > 1);
    return [].concat.apply([], levels);
}
exports.merkleTree = merkleTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0ZBQWdGO0FBQ2hGLCtDQUdzQjtBQTZDcEIsdUZBL0NBLG9CQUFNLE9BK0NBO0FBRE4sNEZBN0NBLHlCQUFXLE9BNkNBO0FBMUNiLHlDQUVtQjtBQTJDakIseUZBNUNBLG1CQUFRLE9BNENBO0FBekNWLFNBQVMsT0FBTyxDQUFDLE1BQXlCLEVBQUUsUUFBa0M7SUFDNUUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTtJQUM1QixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFFbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0QixNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3JELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUV6QyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0tBQzdCO0lBRUQsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBUyxVQUFVLENBQUMsTUFBeUIsRUFBRSxRQUFrQztJQUMvRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFBRSxNQUFNLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0lBQ3BFLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVTtRQUFFLE1BQU0sU0FBUyxDQUFDLDBCQUEwQixDQUFDLENBQUE7SUFDL0UsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUM7UUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUUvQyxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQTtJQUVsQixHQUFHO1FBQ0QsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNuQixRQUFRLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO0lBRTFCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3BDLENBQUM7QUFLQyxnQ0FBVSJ9