// returns an array of hashes of length: values.length / 2 + (values.length % 2)
import { verify, merkleProof } from './merkleProof';
import { fastRoot } from './fastRoot';
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
export { merkleProof, verify, merkleTree, fastRoot };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0ZBQWdGO0FBQ2hGLE9BQU8sRUFDTCxNQUFNLEVBQ04sV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFBO0FBRXRCLE9BQU8sRUFDTCxRQUFRLEVBQ1QsTUFBTSxZQUFZLENBQUE7QUFFbkIsU0FBUyxPQUFPLENBQUMsTUFBeUIsRUFBRSxRQUFrQztJQUM1RSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO0lBQzVCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDckQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBRXpDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7S0FDN0I7SUFFRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFTLFVBQVUsQ0FBQyxNQUF5QixFQUFFLFFBQWtDO0lBQy9FLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUFFLE1BQU0sU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUE7SUFDcEUsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVO1FBQUUsTUFBTSxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtJQUMvRSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUFFLE9BQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBRS9DLE1BQU0sTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFBO0lBRWxCLEdBQUc7UUFDRCxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ25CLFFBQVEsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7SUFFMUIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDcEMsQ0FBQztBQUVELE9BQU8sRUFDTCxXQUFXLEVBQ1gsTUFBTSxFQUNOLFVBQVUsRUFDVixRQUFRLEVBQ1QsQ0FBQSJ9