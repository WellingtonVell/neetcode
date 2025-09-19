---
tags: [pattern, binary-search, data-structure, algorithms, searching]
aliases: [binary-search-variations, advanced-binary-search, search-optimization]
type: pattern-guide
difficulty: Intermediate
time_complexity: "O(log n)"
space_complexity: "O(1)"
prerequisites: [binary-search, arrays]
related_patterns: [two-pointers, sliding-window]
leetcode_problems: [33, 81, 153, 162, 278, 35]
emoji: 🎯
title: Modified Binary Search
description: Adapt binary search for complex scenarios like rotated arrays, peak finding, and search space problems
---

[[README|🏠HOME]]

# 🎯 Modified Binary Search

## Overview [[README|🏠]]

The Modified Binary Search pattern adapts the classic binary search algorithm to handle complex search scenarios:

- **Rotated Array Search** - Find elements in rotated sorted arrays efficiently
- **Peak Finding** - Locate peaks and valleys in arrays using binary search logic
- **Search Space Problems** - Apply binary search to abstract search spaces
- **Condition-Based Search** - Find elements based on custom conditions rather than direct comparison
- **Boundary Detection** - Find first/last occurrence, ceiling/floor values
- **Bitonic Array Search** - Handle arrays that increase then decrease

This pattern is fundamental for optimization problems and complex search scenarios where standard binary search needs modification.

> _**Think of this pattern as using a smart compass - instead of just finding north, you can navigate complex terrains by adapting your search strategy based on the landscape!**_

---

## 🎯 When to Use [[README|🏠]]

> [!success]- Perfect For
>
> - **Rotated Sorted Arrays** - Searching in arrays rotated at unknown pivot points
> - **Peak Finding** - Finding local maxima/minima in arrays or matrices
> - **Search Space Optimization** - When answer lies in a range and can be validated
> - **Boundary Problems** - Finding first/last occurrence, ceiling/floor values
> - **Condition-Based Search** - When searching based on custom conditions
> - **Bitonic Arrays** - Arrays that first increase then decrease

> [!warning]- Avoid When
>
> - **Unsorted Data** - When data doesn't have any sorted property
> - **Random Access Impossible** - When you can't access elements by index
> - **Linear Search Sufficient** - When dataset is small and linear search is fine
> - **Complex State Dependencies** - When decision depends on multiple complex factors
> - **Frequent Updates** - When array changes frequently during search

---

## 💻 Core Implementations [[README|🏠]]

> [!info]- TypeScript
>
> ### 1. Search in Rotated Sorted Array
>
> ```typescript
> function search(nums: number[], target: number): number {
>   let left = 0;
>   let right = nums.length - 1;
>
>   while (left <= right) {
>     const mid = Math.floor((left + right) / 2);
>
>     if (nums[mid] === target) return mid;
>
>     // Check which half is sorted
>     if (nums[left] <= nums[mid]) {
>       // Left half is sorted
>       if (nums[left] <= target && target < nums[mid]) {
>         right = mid - 1;
>       } else {
>         left = mid + 1;
>       }
>     } else {
>       // Right half is sorted
>       if (nums[mid] < target && target <= nums[right]) {
>         left = mid + 1;
>       } else {
>         right = mid - 1;
>       }
>     }
>   }
>
>   return -1;
> }
> ```
>
> ### 2. Find Peak Element
>
> ```typescript
> function findPeakElement(nums: number[]): number {
>   let left = 0;
>   let right = nums.length - 1;
>
>   while (left < right) {
>     const mid = Math.floor((left + right) / 2);
>
>     if (nums[mid] > nums[mid + 1]) {
>       // Peak is in left half (including mid)
>       right = mid;
>     } else {
>       // Peak is in right half
>       left = mid + 1;
>     }
>   }
>
>   return left;
> }
> ```
>
> ### 3. First Bad Version (Search Space)
>
> ```typescript
> function firstBadVersion(n: number): number {
>   let left = 1;
>   let right = n;
>
>   while (left < right) {
>     const mid = Math.floor((left + right) / 2);
>
>     if (isBadVersion(mid)) {
>       // Bad version found, look for earlier bad version
>       right = mid;
>     } else {
>       // Good version, bad version is later
>       left = mid + 1;
>     }
>   }
>
>   return left;
> }
>
> // Placeholder function - would be provided by problem
> declare function isBadVersion(version: number): boolean;
> ```
>
> ### 4. Search Insert Position (Ceiling)
>
> ```typescript
> function searchInsert(nums: number[], target: number): number {
>   let left = 0;
>   let right = nums.length - 1;
>
>   while (left <= right) {
>     const mid = Math.floor((left + right) / 2);
>
>     if (nums[mid] === target) {
>       return mid;
>     } else if (nums[mid] < target) {
>       left = mid + 1;
>     } else {
>       right = mid - 1;
>     }
>   }
>
>   // left is the insertion point
>   return left;
> }
> ```

> [!info]- Golang
>
> ### 1. Search in Rotated Array
>
> ```go
> func search(nums []int, target int) int {
>     left, right := 0, len(nums)-1
>
>     for left <= right {
>         mid := (left + right) / 2
>
>         if nums[mid] == target {
>             return mid
>         }
>
>         // Check which half is sorted
>         if nums[left] <= nums[mid] {
>             // Left half is sorted
>             if nums[left] <= target && target < nums[mid] {
>                 right = mid - 1
>             } else {
>                 left = mid + 1
>             }
>         } else {
>             // Right half is sorted
>             if nums[mid] < target && target <= nums[right] {
>                 left = mid + 1
>             } else {
>                 right = mid - 1
>             }
>         }
>     }
>
>     return -1
> }
> ```
>
> ### 2. Find Minimum in Rotated Array
>
> ```go
> func findMin(nums []int) int {
>     left, right := 0, len(nums)-1
>
>     for left < right {
>         mid := (left + right) / 2
>
>         if nums[mid] > nums[right] {
>             // Minimum is in right half
>             left = mid + 1
>         } else {
>             // Minimum is in left half (including mid)
>             right = mid
>         }
>     }
>
>     return nums[left]
> }
> ```
>
> ### 3. Square Root (Search Space)
>
> ```go
> func mySqrt(x int) int {
>     if x < 2 {
>         return x
>     }
>
>     left, right := 1, x/2
>
>     for left <= right {
>         mid := (left + right) / 2
>         square := mid * mid
>
>         if square == x {
>             return mid
>         } else if square < x {
>             left = mid + 1
>         } else {
>             right = mid - 1
>         }
>     }
>
>     return right
> }
> ```
>
> **Note:** Go's integer division simplifies mid calculation

---

## 🧩 Common Problem Patterns [[README|🏠]]

> [!example]- Pattern 1: Search in Rotated Sorted Array
>
> **Problem:** Find target in a rotated sorted array (no duplicates)
>
> ```typescript
> function search(nums: number[], target: number): number {
>   let left = 0;
>   let right = nums.length - 1;
>
>   while (left <= right) {
>     const mid = Math.floor((left + right) / 2);
>
>     if (nums[mid] === target) return mid;
>
>     // Determine which half is properly sorted
>     if (nums[left] <= nums[mid]) {
>       // Left half is sorted
>       if (nums[left] <= target && target < nums[mid]) {
>         right = mid - 1; // Target in left half
>       } else {
>         left = mid + 1; // Target in right half
>       }
>     } else {
>       // Right half is sorted
>       if (nums[mid] < target && target <= nums[right]) {
>         left = mid + 1; // Target in right half
>       } else {
>         right = mid - 1; // Target in left half
>       }
>     }
>   }
>
>   return -1;
> }
> ```
>
> **Key Insight:** Identify which half is sorted, then determine if target lies in that sorted range

> [!example]- Pattern 2: Find Peak Element
>
> **Problem:** Find any peak element where nums[i] > nums[i-1] and nums[i] > nums[i+1]
>
> ```typescript
> function findPeakElement(nums: number[]): number {
>   let left = 0;
>   let right = nums.length - 1;
>
>   while (left < right) {
>     const mid = Math.floor((left + right) / 2);
>
>     if (nums[mid] > nums[mid + 1]) {
>       // Descending slope, peak is to the left (including mid)
>       right = mid;
>     } else {
>       // Ascending slope, peak is to the right
>       left = mid + 1;
>     }
>   }
>
>   return left;
> }
> ```
>
> **Key Insight:** Follow the ascending slope - if mid is ascending, peak is to the right

> [!example]- Pattern 3: Search for Range (First/Last Occurrence)
>
> **Problem:** Find the first and last position of target in sorted array
>
> ```typescript
> function searchRange(nums: number[], target: number): number[] {
>   function findFirst(nums: number[], target: number): number {
>     let left = 0;
>     let right = nums.length - 1;
>     let result = -1;
>
>     while (left <= right) {
>       const mid = Math.floor((left + right) / 2);
>
>       if (nums[mid] === target) {
>         result = mid;
>         right = mid - 1; // Continue searching left for first occurrence
>       } else if (nums[mid] < target) {
>         left = mid + 1;
>       } else {
>         right = mid - 1;
>       }
>     }
>
>     return result;
>   }
>
>   function findLast(nums: number[], target: number): number {
>     let left = 0;
>     let right = nums.length - 1;
>     let result = -1;
>
>     while (left <= right) {
>       const mid = Math.floor((left + right) / 2);
>
>       if (nums[mid] === target) {
>         result = mid;
>         left = mid + 1; // Continue searching right for last occurrence
>       } else if (nums[mid] < target) {
>         left = mid + 1;
>       } else {
>         right = mid - 1;
>       }
>     }
>
>     return result;
>   }
>
>   const first = findFirst(nums, target);
>   if (first === -1) return [-1, -1];
>
>   const last = findLast(nums, target);
>   return [first, last];
> }
> ```
>
> **Key Insight:** Modify standard binary search to continue searching after finding target

> [!example]- Pattern 4: Koko Eating Bananas (Search Space Optimization)
>
> **Problem:** Find minimum eating speed to finish all bananas within h hours
>
> ```typescript
> function minEatingSpeed(piles: number[], h: number): number {
>   let left = 1;
>   let right = Math.max(...piles);
>
>   function canFinish(speed: number): boolean {
>     let hours = 0;
>     for (const pile of piles) {
>       hours += Math.ceil(pile / speed);
>     }
>     return hours <= h;
>   }
>
>   while (left < right) {
>     const mid = Math.floor((left + right) / 2);
>
>     if (canFinish(mid)) {
>       right = mid; // Try slower speed
>     } else {
>       left = mid + 1; // Need faster speed
>     }
>   }
>
>   return left;
> }
> ```
>
> **Key Insight:** Binary search on answer space rather than array indices

---

## ⚡ Performance Analysis [[README|🏠]]

| Operation             | Average     | Worst Case  | Space | Notes                                      |
| --------------------- | ----------- | ----------- | ----- | ------------------------------------------ |
| Rotated Array Search  | O(log n)    | O(log n)    | O(1)  | Maintains logarithmic complexity           |
| Peak Finding          | O(log n)    | O(log n)    | O(1)  | Eliminates half the search space each time |
| Range Search          | O(log n)    | O(log n)    | O(1)  | Two binary searches                        |
| Search Space Problems | O(log n)    | O(log n)    | O(1)  | n is the size of search space              |
| Matrix Search         | O(log(m×n)) | O(log(m×n)) | O(1)  | Treat 2D matrix as 1D array                |

> [!note]- Performance Considerations
>
> - **Logarithmic Guarantee:** All variations maintain O(log n) time complexity
> - **Constant Space:** No additional space needed beyond pointers
> - **Search Space Size:** For optimization problems, complexity depends on answer range
> - **Condition Evaluation:** Custom conditions should be O(1) when possible

---

## 🔄 Advanced Variations [[README|🏠]]

> [!info]- Variation 1: 2D Matrix Search
>
> Apply binary search to 2D matrices with sorted properties
>
> - **Use case:** Searching in row-wise and column-wise sorted matrices
> - **Example:** Search a 2D Matrix, Search a 2D Matrix II

> [!info]- Variation 2: Ternary Search
>
> Use ternary search for unimodal functions (single peak/valley)
>
> - **Use case:** Finding maximum/minimum in unimodal functions
> - **Example:** Finding peak in bitonic arrays, optimization problems

> [!info]- Variation 3: Fractional Binary Search
>
> Apply binary search to continuous search spaces
>
> - **Use case:** Finding roots, optimization with real numbers
> - **Example:** Square root with precision, minimizing maximum distance

> [!info]- Variation 4: Binary Search on Graphs
>
> Use binary search with graph algorithms for optimization
>
> - **Use case:** Shortest path with capacity constraints
> - **Example:** Path with minimum effort, network flow problems

---

## ⚠️ Edge Cases & Gotchas [[README|🏠]]

> [!warning]- Critical Edge Cases
>
> - **Empty Arrays** - Handle zero-length input appropriately
> - **Single Elements** - Ensure algorithms work with one element
> - **Duplicate Elements** - Handle duplicates in rotated arrays carefully
> - **Boundary Conditions** - Check left/right boundary access carefully
> - **Integer Overflow** - Be careful with mid calculation in large ranges
> - **Search Space Bounds** - Ensure search space bounds are correct
> - **Condition Functions** - Validate that conditions are monotonic

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty array `[]`
> - Single element `[5]`
> - No rotation `[1,2,3,4,5]`
> - Full rotation `[1,2,3,4,5]` (same as no rotation)
> - Partial rotation `[3,4,5,1,2]`
> - Target not found scenarios
> - Boundary values (min/max in search space)

---

## 🎯 Practice Exercises [[README|🏠]]

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/33/problem|33. Search in Rotated Sorted Array]]** - Master rotated array search
> 2. **Practice:** Implement `findPeakElement()` with slope following
> 3. **Practice:** Create `searchRange()` for first/last occurrence
> 4. **Challenge:** Solve optimization problems with answer space binary search
>
> **Key Learning Points:**
>
> - Master identifying which portion maintains sorted property
> - Understand the difference between searching arrays vs answer spaces
> - Practice handling edge cases and boundary conditions
> - Learn to design monotonic condition functions

> [!note]- Pro Tips
>
> 1. **Sorted Property:** Always identify what maintains the sorted property
> 2. **Boundary Handling:** Use `left < right` vs `left <= right` appropriately
> 3. **Condition Design:** Ensure conditions are monotonic for answer space searches
> 4. **Mid Calculation:** Use `(left + right) / 2` or `left + (right - left) / 2`
> 5. **Edge Cases:** Always test with empty arrays and single elements

---

## 🔗 Related LeetCode Problems [[README|🏠]]

- [[problems/33/problem|33. Search in Rotated Sorted Array]] - Classic rotated array search
- **81. Search in Rotated Sorted Array II** - With duplicates
- **153. Find Minimum in Rotated Sorted Array** - Find pivot point
- **162. Find Peak Element** - Peak finding with binary search
- **278. First Bad Version** - Search space optimization
- **35. Search Insert Position** - Finding insertion point

---

## 🧠 Brain Connections [[README|🏠]]

- **Binary Search** → Foundation algorithm for all variations
- **Two Pointers** → [[patterns/two-pointers|Two Pointers Pattern]] - Similar boundary management
- **Divide and Conquer** → Core algorithmic paradigm for problem decomposition
- **Optimization** → Many optimization problems use binary search on answer space

---

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** Use when data has some sorted property or when answer space can be binary searched
- 🔧 **Implementation Choice:** Identify the invariant that maintains search direction (sorted half, slope direction, condition)
- ⚡ **Performance:** Maintains O(log n) complexity through careful condition design and search space reduction
- 🎯 **Edge Cases:** Handle rotations, duplicates, and boundary conditions; ensure condition functions are monotonic

---
