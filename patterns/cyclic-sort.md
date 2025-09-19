---
tags: [pattern, cyclic-sort, data-structure, algorithms, sorting]
aliases: [cyclic-sorting, in-place-sorting, number-range-sorting]
type: pattern-guide
difficulty: Intermediate
time_complexity: "O(n)"
space_complexity: "O(1)"
prerequisites: [arrays, indexing]
related_patterns: [binary-search, hash-table]
leetcode_problems: [268, 287, 442, 448, 645, 41]
emoji: 🔄
title: Cyclic Sort
description: Sort arrays containing numbers in a known range using their values as indices for O(n) time and O(1) space
---

[[README|🏠HOME]]

# 🔄 Cyclic Sort

## Overview [[README|🏠]]

The Cyclic Sort pattern efficiently sorts arrays containing numbers in a known range by placing each number at its correct index position:

- **O(n) Time Sorting** - Sort arrays in linear time when range is known
- **O(1) Space Complexity** - Sort arrays in-place without extra space
- **Missing Number Detection** - Find missing numbers in sequences efficiently
- **Duplicate Finding** - Identify duplicate numbers in linear time
- **Range-Based Problems** - Solve problems with numbers in [1, n] or [0, n-1] ranges
- **Index-Value Relationship** - Leverage the relationship between array indices and values

This pattern is fundamental for problems involving arrays with numbers in a specific range where the value can determine the correct position.

> _**Think of this pattern as organizing numbered parking spots - each car (number) knows exactly which spot (index) it belongs to, so you can efficiently arrange them all!**_

---

## 🎯 When to Use [[README|🏠]]

> [!success]- Perfect For
>
> - **Known Number Range** - Arrays with numbers in range [1, n] or [0, n-1]
> - **Missing Number Problems** - Finding missing elements in sequences
> - **Duplicate Detection** - Identifying duplicate numbers efficiently
> - **In-place Sorting** - When extra space is not allowed
> - **Linear Time Requirements** - When O(n log n) sorting is too slow
> - **Index-Value Correlation** - When array values can serve as indices

> [!warning]- Avoid When
>
> - **Unknown Range** - When number range is not predetermined
> - **Large Sparse Ranges** - When range is much larger than array size
> - **Non-Integer Data** - When dealing with non-integer or negative numbers
> - **Stable Sort Required** - When maintaining relative order of equal elements matters
> - **Complex Objects** - When sorting objects with multiple fields

---

## 💻 Core Implementations [[README|🏠]]

> [!info]- TypeScript
>
> ### 1. Basic Cyclic Sort
>
> ```typescript
> function cyclicSort(nums: number[]): number[] {
>   let i = 0;
>
>   while (i < nums.length) {
>     const correctIndex = nums[i] - 1; // For range [1, n]
>
>     // If number is not at its correct position
>     if (nums[i] !== nums[correctIndex]) {
>       // Swap to place number at correct position
>       [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
>     } else {
>       // Number is at correct position, move to next
>       i++;
>     }
>   }
>
>   return nums;
> }
> ```
>
> ### 2. Find Missing Number
>
> ```typescript
> function findMissingNumber(nums: number[]): number {
>   let i = 0;
>   const n = nums.length;
>
>   // Cyclic sort for range [0, n]
>   while (i < n) {
>     const correctIndex = nums[i];
>
>     if (nums[i] < n && nums[i] !== nums[correctIndex]) {
>       [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
>     } else {
>       i++;
>     }
>   }
>
>   // Find the missing number
>   for (let j = 0; j < n; j++) {
>     if (nums[j] !== j) {
>       return j;
>     }
>   }
>
>   return n; // Missing number is n
> }
> ```
>
> ### 3. Find All Duplicates
>
> ```typescript
> function findDuplicates(nums: number[]): number[] {
>   let i = 0;
>
>   // Cyclic sort
>   while (i < nums.length) {
>     const correctIndex = nums[i] - 1;
>
>     if (nums[i] !== nums[correctIndex]) {
>       [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
>     } else {
>       i++;
>     }
>   }
>
>   // Find duplicates
>   const duplicates: number[] = [];
>   for (let j = 0; j < nums.length; j++) {
>     if (nums[j] !== j + 1) {
>       duplicates.push(nums[j]);
>     }
>   }
>
>   return duplicates;
> }
> ```

> [!info]- Golang
>
> ### 1. Basic Cyclic Sort
>
> ```go
> func cyclicSort(nums []int) []int {
>     i := 0
>
>     for i < len(nums) {
>         correctIndex := nums[i] - 1 // For range [1, n]
>
>         // If number is not at its correct position
>         if nums[i] != nums[correctIndex] {
>             // Swap to place number at correct position
>             nums[i], nums[correctIndex] = nums[correctIndex], nums[i]
>         } else {
>             // Number is at correct position, move to next
>             i++
>         }
>     }
>
>     return nums
> }
> ```
>
> ### 2. Find Missing Number
>
> ```go
> func missingNumber(nums []int) int {
>     i := 0
>     n := len(nums)
>
>     // Cyclic sort for range [0, n]
>     for i < n {
>         correctIndex := nums[i]
>
>         if nums[i] < n && nums[i] != nums[correctIndex] {
>             nums[i], nums[correctIndex] = nums[correctIndex], nums[i]
>         } else {
>             i++
>         }
>     }
>
>     // Find the missing number
>     for j := 0; j < n; j++ {
>         if nums[j] != j {
>             return j
>         }
>     }
>
>     return n // Missing number is n
> }
> ```
>
> **Note:** Go's multiple assignment makes swapping clean and efficient

---

## 🧩 Common Problem Patterns [[README|🏠]]

> [!example]- Pattern 1: Missing Number in Sequence
>
> **Problem:** Find the missing number in an array containing n distinct numbers in range [0, n]
>
> ```typescript
> function missingNumber(nums: number[]): number {
>   let i = 0;
>   const n = nums.length;
>
>   // Cyclic sort
>   while (i < n) {
>     if (nums[i] < n && nums[i] !== nums[nums[i]]) {
>       [nums[i], nums[nums[i]]] = [nums[nums[i]], nums[i]];
>     } else {
>       i++;
>     }
>   }
>
>   // Find missing number
>   for (let j = 0; j < n; j++) {
>     if (nums[j] !== j) {
>       return j;
>     }
>   }
>
>   return n;
> }
> ```
>
> **Key Insight:** Use cyclic sort to place each number at its correct index, then scan for the gap

> [!example]- Pattern 2: Find All Missing Numbers
>
> **Problem:** Find all numbers that are missing from an array of size n with numbers in range [1, n]
>
> ```typescript
> function findDisappearedNumbers(nums: number[]): number[] {
>   let i = 0;
>
>   // Cyclic sort for range [1, n]
>   while (i < nums.length) {
>     const correctIndex = nums[i] - 1;
>
>     if (nums[i] !== nums[correctIndex]) {
>       [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
>     } else {
>       i++;
>     }
>   }
>
>   // Find all missing numbers
>   const missing: number[] = [];
>   for (let j = 0; j < nums.length; j++) {
>     if (nums[j] !== j + 1) {
>       missing.push(j + 1);
>     }
>   }
>
>   return missing;
> }
> ```
>
> **Key Insight:** After sorting, any index where nums[i] !== i + 1 indicates a missing number

> [!example]- Pattern 3: Find the Duplicate Number
>
> **Problem:** Find the duplicate number in an array with n+1 integers in range [1, n]
>
> ```typescript
> function findDuplicate(nums: number[]): number {
>   let i = 0;
>
>   while (i < nums.length) {
>     const correctIndex = nums[i] - 1;
>
>     if (nums[i] !== nums[correctIndex]) {
>       [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
>     } else {
>       // Found duplicate - number is already at correct position
>       if (correctIndex !== i) {
>         return nums[i];
>       }
>       i++;
>     }
>   }
>
>   return -1; // Should not reach here given problem constraints
> }
> ```
>
> **Key Insight:** When a number is already at its correct position but we're not at that index, we found a duplicate

> [!example]- Pattern 4: First Missing Positive
>
> **Problem:** Find the smallest missing positive integer in an unsorted array
>
> ```typescript
> function firstMissingPositive(nums: number[]): number {
>   let i = 0;
>   const n = nums.length;
>
>   // Cyclic sort for positive numbers in range [1, n]
>   while (i < n) {
>     const correctIndex = nums[i] - 1;
>
>     // Only sort if number is in valid range and not already placed
>     if (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[correctIndex]) {
>       [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
>     } else {
>       i++;
>     }
>   }
>
>   // Find first missing positive
>   for (let j = 0; j < n; j++) {
>     if (nums[j] !== j + 1) {
>       return j + 1;
>     }
>   }
>
>   return n + 1; // All numbers [1, n] are present
> }
> ```
>
> **Key Insight:** Ignore numbers outside [1, n] range and find the first gap in the sequence

---

## ⚡ Performance Analysis [[README|🏠]]

| Operation              | Average | Worst Case | Space | Notes                             |
| ---------------------- | ------- | ---------- | ----- | --------------------------------- |
| Cyclic Sort            | O(n)    | O(n)       | O(1)  | Each element swapped at most once |
| Missing Number         | O(n)    | O(n)       | O(1)  | Sort + linear scan                |
| Find Duplicates        | O(n)    | O(n)       | O(1)  | In-place detection                |
| First Missing Positive | O(n)    | O(n)       | O(1)  | Handles invalid range efficiently |
| All Missing Numbers    | O(n)    | O(n)       | O(k)  | k is number of missing elements   |

> [!note]- Performance Considerations
>
> - **Linear Time:** Each element is moved to its correct position at most once
> - **Constant Space:** All operations are performed in-place
> - **Amortized Analysis:** While inner loops exist, total swaps are bounded by n
> - **Range Dependency:** Algorithm efficiency depends on numbers being in a known range

---

## 🔄 Advanced Variations [[README|🏠]]

> [!info]- Variation 1: Modified Ranges
>
> Adapt cyclic sort for different number ranges like [0, n], [1, n+1], or negative numbers
>
> - **Use case:** Problems with different starting indices or ranges
> - **Example:** Arrays starting from 0 vs 1, handling negative numbers

> [!info]- Variation 2: Multiple Duplicates
>
> Handle arrays where multiple duplicates of the same number can exist
>
> - **Use case:** Finding all duplicate numbers when multiple copies exist
> - **Example:** Array with numbers [1,n] but some appear multiple times

> [!info]- Variation 3: Cyclic Sort with Constraints
>
> Apply cyclic sort with additional constraints or modifications
>
> - **Use case:** When not all positions can be filled or have special rules
> - **Example:** Skip certain indices or handle special values

> [!info]- Variation 4: Two-Pass Algorithms
>
> Combine cyclic sort with additional passes for complex requirements
>
> - **Use case:** When post-processing is needed after initial sorting
> - **Example:** Finding patterns or relationships after positioning

---

## ⚠️ Edge Cases & Gotchas [[README|🏠]]

> [!warning]- Critical Edge Cases
>
> - **Empty Arrays** - Handle zero-length input gracefully
> - **Single Element** - Ensure algorithms work with size 1 arrays
> - **Out of Range Numbers** - Handle numbers outside expected range
> - **All Same Numbers** - Deal with arrays containing identical elements
> - **Maximum Range Values** - Handle edge cases at range boundaries
> - **Infinite Loops** - Prevent infinite swapping with duplicate detection
> - **Index Bounds** - Ensure calculated indices are within array bounds

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty array `[]`
> - Single element `[1]` or `[0]`
> - Already sorted `[1,2,3,4]`
> - Reverse sorted `[4,3,2,1]`
> - Out of range `[1,2,5,4]` (when range is [1,4])
> - All duplicates `[2,2,2,2]`

---

## 🎯 Practice Exercises [[README|🏠]]

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/268/problem|268. Missing Number]]** - Learn basic cyclic sort concept
> 2. **Practice:** Implement `cyclicSort()` for range [1, n]
> 3. **Practice:** Create `findAllMissing()` for multiple missing numbers
> 4. **Challenge:** Solve first missing positive with O(1) space
>
> **Key Learning Points:**
>
> - Understand the index-value relationship for different ranges
> - Master the swap-until-correct-position technique
> - Practice handling edge cases and out-of-range values
> - Learn to adapt the pattern for different problem variations

> [!note]- Pro Tips
>
> 1. **Range Mapping:** Always identify the correct index formula for your range
> 2. **Bounds Checking:** Validate that calculated indices are within bounds
> 3. **Duplicate Handling:** Be careful about infinite loops when duplicates exist
> 4. **Two-Phase Approach:** Separate sorting phase from finding phase for clarity
> 5. **Index Formula:** For range [a, b], use `correctIndex = nums[i] - a`

---

## 🔗 Related LeetCode Problems [[README|🏠]]

- [[problems/268/problem|268. Missing Number]] - Basic missing number in range [0, n]
- **287. Find the Duplicate Number** - Single duplicate in range [1, n]
- **442. Find All Duplicates in an Array** - Multiple duplicates in range [1, n]
- **448. Find All Numbers Disappeared** - Multiple missing numbers
- **645. Set Mismatch** - Find wrong number and missing number
- **41. First Missing Positive** - Smallest missing positive integer

---

## 🧠 Brain Connections [[README|🏠]]

- **Hash Tables** → Alternative approach for duplicate/missing problems with O(n) space
- **Binary Search** → Can solve some variants with O(log n) space but O(n log n) time
- **Bitwise XOR** → [[patterns/bitwise-xor|Bitwise XOR Pattern]] - XOR tricks for single missing/duplicate
- **Mathematical Formulas** → Sum formulas for simple missing number problems
- **Fast & Slow Pointers** → [[patterns/fast-and-slow-pointers|Fast & Slow Pointers Pattern]] - Alternative for cycle detection in linked lists

---

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** Use when array contains numbers in a known range and you need O(n) time with O(1) space
- 🔧 **Implementation Choice:** Map values to indices using the relationship `index = value - range_start`
- ⚡ **Performance:** Achieves linear time by ensuring each element is swapped to its final position at most once
- 🎯 **Edge Cases:** Always validate range bounds and handle duplicate values to prevent infinite loops

---
