"use strict";
/**
 * Constant-space merkle root calculation algorithm
 * @param values Array of Hashes
 * @param digestFn Function for merkle root calculation aglorithm
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastRoot = void 0;
function fastRoot(values, digestFn) {
    if (!Array.isArray(values))
        throw TypeError('Expected values Array');
    if (typeof digestFn !== 'function')
        throw TypeError('Expected digest Function');
    let length = values.length;
    let results = values.concat();
    while (length > 1) {
        let j = 0;
        for (let i = 0; i < length; i += 2, ++j) {
            let left = results[i];
            let right = i + 1 === length ? left : results[i + 1];
            let data = Buffer.concat([left, right]);
            results[j] = digestFn(data);
        }
        length = j;
    }
    return results[0];
}
exports.fastRoot = fastRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFzdFJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmFzdFJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7OztBQUVILFNBQVMsUUFBUSxDQUFDLE1BQXlCLEVBQUUsUUFBc0M7SUFDakYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQUUsTUFBTSxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtJQUNwRSxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVU7UUFBRSxNQUFNLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0lBRS9FLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFDMUIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBRTdCLE9BQU8sTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFVCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3JCLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDcEQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBRXZDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDNUI7UUFFRCxNQUFNLEdBQUcsQ0FBQyxDQUFBO0tBQ1g7SUFFRCxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNuQixDQUFDO0FBRVEsNEJBQVEifQ==