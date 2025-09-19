---
tags: [pattern, two-pointers, data-structure, algorithms, array]
aliases: [two-pointer, dual-pointer, opposite-ends]
type: pattern-guide
difficulty: Beginner
time_complexity: "O(n)"
space_complexity: "O(1)"
prerequisites: [arrays, basic-loops]
related_patterns: [sliding-window, binary-search]
leetcode_problems: [1, 167, 15, 11]
emoji: 👆
title: Two Pointers
description: Uses two pointers to traverse data structures from different positions or directions
---

[[README|🏠HOME]]

# 👆 Two Pointers

## Overview [[README|🏠]]

This pattern uses two pointers to traverse an array or list from different ends or directions, making intelligent decisions based on pointer positions:

- **Linear traversal** - Process elements from both ends simultaneously
- **Opposite direction movement** - Pointers move toward each other
- **Constant space usage** - No additional data structures needed
- **Optimal for sorted arrays** - Leverages ordering for efficient decisions
- **Target sum problems** - Perfect for finding pairs or triplets
- **Duplicate removal** - Efficient in-place array modifications

This pattern is fundamental for ordered data structures that require efficient two-element or range-based operations.

> _**Think of this pattern as having two people walking toward each other from opposite ends of a hallway - they can make decisions based on what they see and adjust their paths accordingly!**_

---

## 🎯 When to Use [[README|🏠]]

> [!success]- Perfect For
>
> - **Sorted arrays** - When data is already ordered
> - **Target sum problems** - Finding pairs that sum to a target
> - **Remove duplicates** - In-place array modifications
> - **Palindrome checking** - Comparing characters from both ends
> - **Container problems** - Maximum area, water trapping
> - **Squaring sorted arrays** - Merging from optimal positions

> [!warning]- Avoid When
>
> - **Unsorted data** - Pattern relies on ordering properties
> - **Single pointer suffices** - Simple linear traversal is enough
> - **Complex state tracking** - Need to remember multiple positions
> - **Random access patterns** - Pointers don't move predictably
> - **Recursive solutions** - Tree or graph traversal problems

---

## 💻 Core Implementations [[README|🏠]]

> [!info]- TypeScript
>
> ### 1. Basic Two Pointers
>
> ```typescript
> function twoSum(nums: number[], target: number): number[] {
>   let left = 0;
>   let right = nums.length - 1;
>
>   while (left < right) {
>     const sum = nums[left] + nums[right];
>
>     if (sum === target) {
>       return [left, right];
>     } else if (sum < target) {
>       left++; // Need larger sum
>     } else {
>       right--; // Need smaller sum
>     }
>   }
>
>   return [-1, -1]; // Not found
> }
> ```
>
> ### 2. Same Direction Pointers
>
> ```typescript
> function removeDuplicates(nums: number[]): number {
>   if (nums.length <= 1) return nums.length;
>
>   let writeIndex = 1; // Slow pointer
>
>   for (let readIndex = 1; readIndex < nums.length; readIndex++) {
>     if (nums[readIndex] !== nums[readIndex - 1]) {
>       nums[writeIndex] = nums[readIndex];
>       writeIndex++;
>     }
>   }
>
>   return writeIndex;
> }
> ```
>
> ### 3. Helper Functions
>
> ```typescript
> function isPalindrome(s: string): boolean {
>   let left = 0;
>   let right = s.length - 1;
>
>   while (left < right) {
>     if (s[left] !== s[right]) {
>       return false;
>     }
>     left++;
>     right--;
>   }
>
>   return true;
> }
> ```

> [!info]- Golang
>
> ### 1. Basic Implementation
>
> ```go
> func twoSum(nums []int, target int) []int {
>   left, right := 0, len(nums)-1
>
>   for left < right {
>     sum := nums[left] + nums[right]
>
>     if sum == target {
>       return []int{left, right}
>     } else if sum < target {
>       left++ // Need larger sum
>     } else {
>       right-- // Need smaller sum
>     }
>   }
>
>   return []int{-1, -1} // Not found
> }
> ```
>
> ### 2. Advanced Implementation
>
> ```go
> func removeDuplicates(nums []int) int {
>   if len(nums) <= 1 {
>     return len(nums)
>   }
>
>   writeIndex := 1 // Slow pointer
>
>   for readIndex := 1; readIndex < len(nums); readIndex++ {
>     if nums[readIndex] != nums[readIndex-1] {
>       nums[writeIndex] = nums[readIndex]
>       writeIndex++
>     }
>   }
>
>   return writeIndex
> }
> ```
>
> **Note:** Go's slice operations make in-place modifications very efficient

---

## 🧩 Common Problem Patterns [[README|🏠]]

> [!example]- Pattern 1: Target Sum
>
> **Problem:** Find two numbers in a sorted array that sum to a target value
>
> ```typescript
> function findTargetSum(
>   nums: number[],
>   target: number
> ): [number, number] | null {
>   let left = 0,
>     right = nums.length - 1;
>
>   while (left < right) {
>     const sum = nums[left] + nums[right];
>     if (sum === target) return [nums[left], nums[right]];
>     sum < target ? left++ : right--;
>   }
>   return null;
> }
> ```
>
> **Key Insight:** Sorted array allows us to make directional decisions based on sum comparison

> [!example]- Pattern 2: Container With Most Water
>
> **Problem:** Find two lines that form a container holding the most water
>
> ```typescript
> function maxArea(height: number[]): number {
>   let left = 0,
>     right = height.length - 1;
>   let maxWater = 0;
>
>   while (left < right) {
>     const width = right - left;
>     const currentArea = Math.min(height[left], height[right]) * width;
>     maxWater = Math.max(maxWater, currentArea);
>
>     // Move pointer with smaller height
>     height[left] < height[right] ? left++ : right--;
>   }
>
>   return maxWater;
> }
> ```
>
> **Key Insight:** Always move the pointer with the smaller height to potentially find a larger area

> [!example]- Pattern 3: Squaring Sorted Array
>
> **Problem:** Square elements of a sorted array and return in sorted order
>
> ```typescript
> function sortedSquares(nums: number[]): number[] {
>   const result: number[] = new Array(nums.length);
>   let left = 0,
>     right = nums.length - 1;
>   let index = nums.length - 1;
>
>   while (left <= right) {
>     const leftSquare = nums[left] * nums[left];
>     const rightSquare = nums[right] * nums[right];
>
>     if (leftSquare > rightSquare) {
>       result[index] = leftSquare;
>       left++;
>     } else {
>       result[index] = rightSquare;
>       right--;
>     }
>     index--;
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Fill result array from the end since largest squares come from the extremes

> [!example]- Pattern 4: Three Sum
>
> **Problem:** Find all unique triplets that sum to zero
>
> ```typescript
> function threeSum(nums: number[]): number[][] {
>   nums.sort((a, b) => a - b);
>   const result: number[][] = [];
>
>   for (let i = 0; i < nums.length - 2; i++) {
>     if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates
>
>     let left = i + 1,
>       right = nums.length - 1;
>     while (left < right) {
>       const sum = nums[i] + nums[left] + nums[right];
>       if (sum === 0) {
>         result.push([nums[i], nums[left], nums[right]]);
>         while (left < right && nums[left] === nums[left + 1]) left++;
>         while (left < right && nums[right] === nums[right - 1]) right--;
>         left++;
>         right--;
>       } else if (sum < 0) {
>         left++;
>       } else {
>         right--;
>       }
>     }
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Combine fixed pointer with two-pointer technique for triplet problems

---

## ⚡ Performance Analysis [[README|🏠]]

| Operation         | Average | Worst Case | Space | Notes                              |
| ----------------- | ------- | ---------- | ----- | ---------------------------------- |
| Two Sum           | O(n)    | O(n)       | O(1)  | Linear scan with constant space    |
| Remove Duplicates | O(n)    | O(n)       | O(1)  | In-place modification              |
| Palindrome Check  | O(n)    | O(n)       | O(1)  | Compare from both ends             |
| Container Area    | O(n)    | O(n)       | O(1)  | Single pass with optimal decisions |
| Three Sum         | O(n²)   | O(n²)      | O(1)  | Fixed pointer + two-pointer        |

> [!note]- Performance Considerations
>
> - **Linear time complexity** - Most problems solve in O(n) with single pass
> - **Constant space usage** - No additional data structures needed
> - **Cache efficiency** - Sequential access patterns are cache-friendly
> - **Early termination** - Can often stop early when target is found

---

## 🔄 Advanced Variations [[README|🏠]]

> [!info]- Variation 1: Fast and Slow Pointers
>
> Used for cycle detection and finding middle elements
>
> - **Use case:** Detecting cycles in linked lists
> - **Example:** Floyd's cycle detection algorithm

> [!info]- Variation 2: Sliding Window with Two Pointers
>
> Combine with sliding window for substring problems
>
> - **Use case:** Longest substring without repeating characters
> - **Example:** Variable-size sliding window problems

> [!info]- Variation 3: Multi-Pointer Techniques
>
> Extend to three or more pointers for complex problems
>
> - **Use case:** Four sum problems, multiple array merging
> - **Example:** Finding quadruplets with target sum

> [!info]- Variation 4: Opposite Direction in Different Arrays
>
> Use pointers in separate arrays moving in opposite directions
>
> - **Use case:** Merging sorted arrays, intersection problems
> - **Example:** Merge two sorted arrays in-place

---

## ⚠️ Edge Cases & Gotchas [[README|🏠]]

> [!warning]- Critical Edge Cases
>
> - **Empty arrays** - Check array length before setting pointers
> - **Single element** - Handle when left and right pointers start equal
> - **All duplicates** - Ensure duplicate handling doesn't infinite loop
> - **Target not found** - Have proper return values for unsuccessful searches
> - **Integer overflow** - Be careful with sum calculations in large arrays
> - **Pointer bounds** - Ensure pointers don't go out of array bounds
> - **Sorted assumption** - Verify data is sorted when pattern requires it

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty array `[]`
> - Single element `[5]`
> - Two elements `[1, 2]`
> - All same elements `[3, 3, 3]`
> - Target at boundaries `[1, 2, 3]` target sum = 4
> - No solution exists `[1, 2, 3]` target sum = 10

---

## 🎯 Practice Exercises [[README|🏠]]

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/167/problem|167. Two Sum II]]** - Learn basic opposite-direction pattern
> 2. **Practice:** Implement `isPalindrome()` function for strings
> 3. **Practice:** Create `removeDuplicates()` with same-direction pointers
> 4. **Challenge:** Solve container with most water without nested loops
>
> **Key Learning Points:**
>
> - Understanding when pointers should move toward or away from each other
> - Recognizing sorted vs unsorted array requirements
> - Managing pointer boundaries and termination conditions
> - Optimizing for constant space complexity

> [!note]- Pro Tips
>
> 1. **Start Simple:** Master basic two-pointer before attempting variations
> 2. **Draw It Out:** Visualize pointer movement on paper first
> 3. **Check Boundaries:** Always validate pointer positions before accessing
> 4. **Consider Duplicates:** Plan for duplicate handling in advance
> 5. **Test Edge Cases:** Empty, single, and two-element arrays are crucial

---

## 🔗 Related LeetCode Problems [[README|🏠]]

- [[problems/1/problem|1. Two Sum]] - Hash table approach comparison
- **167. Two Sum II** - Classic two-pointer sorted array problem
- **15. 3Sum** - Extension to triplet finding
- **11. Container With Most Water** - Geometric two-pointer application
- **26. Remove Duplicates** - Same-direction pointer technique
- **125. Valid Palindrome** - String two-pointer verification
- **977. Squares of Sorted Array** - Optimal positioning strategy

---

## 🧠 Brain Connections [[README|🏠]]

- **Sliding Window** → [[patterns/sliding-window|Sliding Window Pattern]] - Both use multiple pointers for range processing
- **Binary Search** → Similar decision-making based on comparisons
- **Array Manipulation** → [[README|Arrays and Hashing]] - Core array processing category
- **Greedy Algorithms** → Making optimal local decisions at each step

---

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** Look for sorted data and pair/range-based requirements
- 🔧 **Implementation Choice:** Decide between opposite-direction vs same-direction movement
- ⚡ **Performance:** Achieves linear time with constant space for most problems
- 🎯 **Edge Cases:** Always handle empty arrays, single elements, and boundary conditions

---
