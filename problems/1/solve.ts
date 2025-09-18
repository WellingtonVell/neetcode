// npx tsx problems/1/solve.ts

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

// Runtime: 4ms, Memory: 57.64MB
function twoSum2(nums: number[], target: number): number[] {
  let map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    let current = nums[i];
    let x = target - current;

    if (map.has(x)) {
      console.log([map.get(x)!, i]);
      return [map.get(x)!, i];
    }

    map.set(current, i);
  }

  return [];
}

// Runtime: 0ms, Memory: 57.93MB
function twoSum3(nums: number[], target: number): number[] {
  let map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    let x = target - nums[i];

    if (map.has(x)) {
      return [map.get(x)!, i];
    }

    map.set(nums[i], i);
  }

  return [];
}

console.log("Test 1");
twoSum3([2, 7, 11, 15], 9);
console.log("Test 2");
twoSum3([3, 2, 4], 6);
console.log("Test 3");
twoSum3([3, 3], 6);
