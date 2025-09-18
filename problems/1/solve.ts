// npx tsx problems/arrays-and-hashing/1/solve.ts

// Runtime: 36ms, Memory: 54.46MB
function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        console.log([i, j]);
        return [i, j];
      }
    }
  }
  return [];
}

function twoSum2(nums: number[], target: number): number[] {
  return [];
}

console.log("Test 1");
twoSum([2, 7, 11, 15], 9);
console.log("Test 2");
twoSum([3, 2, 4], 6);
console.log("Test 3");
twoSum([3, 3], 6);
