// npx tsx arrays-and-hashing/217/solve.ts

// Runtime: 20ms, Memory: 75.4MB
function containsDuplicate(nums: number[]): boolean {
  let values = new Set();

  for (const value of nums) {
    if (values.has(value)) {
      console.log(true);
      return true;
    }
    values.add(value);
  }

  console.log(false);
  return false;
}

// Runtime: 17ms, Memory: 74.4MB
function containsDuplicate2(nums: number[]): boolean {
  const values = new Set();

  for (let value of nums) {
    if (values.has(value)) {
      console.log(true);
      return true;
    }
    values.add(value);
  }
  console.log(false);
  return false;
}

// Runtime: 9ms, Memory: 75MB
function containsDuplicate3(nums: number[]): boolean {
  const values = new Set<number>();

  for (let value of nums) {
    if (values.has(value)) {
      console.log(true);
      return true;
    }
    values.add(value);
  }
  console.log(false);
  return false;
}

// Runtime: 18ms, Memory: 74.6MB
function containsDuplicate4(nums: number[]): boolean {
  console.log(new Set(nums).size !== nums.length);
  return new Set(nums).size !== nums.length;
}

console.log("Test 1");
containsDuplicate4([1, 2, 3, 1]);

console.log("Test 2");
containsDuplicate4([1, 2, 3, 4]);

console.log("Test 3");
containsDuplicate4([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]);

type ContainsDuplicate<T extends readonly unknown[]> = T extends readonly [
  infer First,
  ...infer Rest
]
  ? First extends Rest[number]
    ? true
    : ContainsDuplicate<Rest>
  : false;

type Test1 = ContainsDuplicate<[1, 2, 3, 1]>; // true
type Test2 = ContainsDuplicate<[1, 2, 3, 4]>; // false
type Test3 = ContainsDuplicate<[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]>; // true
