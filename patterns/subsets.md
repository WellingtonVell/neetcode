---
tags: [pattern, subsets, data-structure, algorithms, backtracking]
aliases: [subset-generation, powerset, combinatorics]
type: pattern-guide
difficulty: Intermediate
time_complexity: "O(2^n)"
space_complexity: "O(2^n)"
prerequisites: [recursion, backtracking]
related_patterns: [backtracking, depth-first-search]
leetcode_problems: [78, 90, 46, 47, 77, 39]
emoji: 🌀
title: Subsets
description: Generate all possible subsets, permutations, and combinations using recursive backtracking
---

[[README|🏠HOME]]

# 🌀 Subsets

## Overview

The Subsets pattern systematically generates all possible combinations of elements using recursive backtracking:

- **Powerset Generation** - Generate all possible subsets of a given set
- **Permutation Enumeration** - Create all possible arrangements of elements
- **Combination Generation** - Find all ways to choose k elements from n elements
- **Backtracking Framework** - Use recursive exploration with choice/unchoice paradigm
- **Exponential Solutions** - Handle problems where solution space grows exponentially
- **Constraint Handling** - Manage duplicates, ordering, and selection constraints

This pattern is fundamental for combinatorial problems requiring exhaustive enumeration of possibilities.

> _**Think of this pattern as exploring all possible ways to pack a backpack - you try including each item, explore all possibilities, then backtrack and try not including it!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **All Subsets Problems** - When you need to generate all possible subsets
> - **Permutation Generation** - Creating all arrangements of elements
> - **Combination Problems** - Finding all ways to select k elements from n
> - **Constraint Satisfaction** - Problems with multiple valid solutions
> - **Decision Tree Exploration** - When each element has include/exclude choices
> - **Exponential Search Spaces** - When brute force enumeration is required

> [!warning]- Avoid When
>
> - **Large Input Sizes** - Exponential time makes large inputs impractical
> - **Single Solution Needed** - When you only need one valid solution
> - **Optimization Problems** - When you need the best solution, not all solutions
> - **Linear Time Requirements** - When exponential time is unacceptable
> - **Memory Constraints** - When storing all solutions exceeds memory limits

---

## 💻 Core Implementations

> [!info]- TypeScript
>
> ### 1. Generate All Subsets
>
> ```typescript
> function subsets(nums: number[]): number[][] {
>   const result: number[][] = [];
>
>   function backtrack(start: number, path: number[]): void {
>     // Add current subset to result
>     result.push([...path]);
>
>     // Try adding each remaining element
>     for (let i = start; i < nums.length; i++) {
>       path.push(nums[i]); // Choose
>       backtrack(i + 1, path); // Explore
>       path.pop(); // Unchoose (backtrack)
>     }
>   }
>
>   backtrack(0, []);
>   return result;
> }
> ```
>
> ### 2. Generate All Permutations
>
> ```typescript
> function permute(nums: number[]): number[][] {
>   const result: number[][] = [];
>
>   function backtrack(path: number[]): void {
>     // Base case: complete permutation
>     if (path.length === nums.length) {
>       result.push([...path]);
>       return;
>     }
>
>     // Try each unused number
>     for (const num of nums) {
>       if (path.includes(num)) continue; // Skip if already used
>
>       path.push(num); // Choose
>       backtrack(path); // Explore
>       path.pop(); // Unchoose
>     }
>   }
>
>   backtrack([]);
>   return result;
> }
> ```
>
> ### 3. Subsets with Duplicates
>
> ```typescript
> function subsetsWithDup(nums: number[]): number[][] {
>   const result: number[][] = [];
>   nums.sort((a, b) => a - b); // Sort to handle duplicates
>
>   function backtrack(start: number, path: number[]): void {
>     result.push([...path]);
>
>     for (let i = start; i < nums.length; i++) {
>       // Skip duplicates: only use first occurrence at each level
>       if (i > start && nums[i] === nums[i - 1]) continue;
>
>       path.push(nums[i]);
>       backtrack(i + 1, path);
>       path.pop();
>     }
>   }
>
>   backtrack(0, []);
>   return result;
> }
> ```
>
> ### 4. Combinations (Choose K)
>
> ```typescript
> function combine(n: number, k: number): number[][] {
>   const result: number[][] = [];
>
>   function backtrack(start: number, path: number[]): void {
>     // Base case: found k elements
>     if (path.length === k) {
>       result.push([...path]);
>       return;
>     }
>
>     // Try each number from start to n
>     for (let i = start; i <= n; i++) {
>       path.push(i);
>       backtrack(i + 1, path);
>       path.pop();
>     }
>   }
>
>   backtrack(1, []);
>   return result;
> }
> ```

> [!info]- Golang
>
> ### 1. Generate All Subsets
>
> ```go
> func subsets(nums []int) [][]int {
>     var result [][]int
>
>     var backtrack func(start int, path []int)
>     backtrack = func(start int, path []int) {
>         // Add current subset to result
>         subset := make([]int, len(path))
>         copy(subset, path)
>         result = append(result, subset)
>
>         // Try adding each remaining element
>         for i := start; i < len(nums); i++ {
>             path = append(path, nums[i])    // Choose
>             backtrack(i+1, path)            // Explore
>             path = path[:len(path)-1]       // Unchoose
>         }
>     }
>
>     backtrack(0, []int{})
>     return result
> }
> ```
>
> ### 2. Generate All Permutations
>
> ```go
> func permute(nums []int) [][]int {
>     var result [][]int
>
>     var backtrack func(path []int)
>     backtrack = func(path []int) {
>         // Base case: complete permutation
>         if len(path) == len(nums) {
>             perm := make([]int, len(path))
>             copy(perm, path)
>             result = append(result, perm)
>             return
>         }
>
>         // Try each unused number
>         for _, num := range nums {
>             if contains(path, num) {
>                 continue // Skip if already used
>             }
>
>             path = append(path, num)        // Choose
>             backtrack(path)                 // Explore
>             path = path[:len(path)-1]       // Unchoose
>         }
>     }
>
>     backtrack([]int{})
>     return result
> }
>
> func contains(slice []int, item int) bool {
>     for _, v := range slice {
>         if v == item {
>             return true
>         }
>     }
>     return false
> }
> ```
>
> **Note:** Go's slice operations make backtracking implementation clean

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Generate All Subsets (Powerset)
>
> **Problem:** Generate all possible subsets of a given set
>
> ```typescript
> function subsets(nums: number[]): number[][] {
>   const result: number[][] = [];
>
>   function backtrack(start: number, currentSubset: number[]): void {
>     // Add current subset to result (base case for recursion)
>     result.push([...currentSubset]);
>
>     // Try including each remaining element
>     for (let i = start; i < nums.length; i++) {
>       currentSubset.push(nums[i]); // Include element
>       backtrack(i + 1, currentSubset); // Recurse with next position
>       currentSubset.pop(); // Backtrack - exclude element
>     }
>   }
>
>   backtrack(0, []);
>   return result;
> }
> ```
>
> **Key Insight:** Use start index to avoid duplicates and ensure subsets are generated in order

> [!example]- Pattern 2: Generate All Permutations
>
> **Problem:** Generate all possible arrangements of elements in an array
>
> ```typescript
> function permute(nums: number[]): number[][] {
>   const result: number[][] = [];
>   const used: boolean[] = new Array(nums.length).fill(false);
>
>   function backtrack(currentPerm: number[]): void {
>     // Base case: complete permutation
>     if (currentPerm.length === nums.length) {
>       result.push([...currentPerm]);
>       return;
>     }
>
>     // Try each unused element
>     for (let i = 0; i < nums.length; i++) {
>       if (used[i]) continue; // Skip if already used
>
>       // Choose
>       currentPerm.push(nums[i]);
>       used[i] = true;
>
>       // Explore
>       backtrack(currentPerm);
>
>       // Unchoose (backtrack)
>       currentPerm.pop();
>       used[i] = false;
>     }
>   }
>
>   backtrack([]);
>   return result;
> }
> ```
>
> **Key Insight:** Use a used array to track which elements are already in current permutation

> [!example]- Pattern 3: Combination Sum
>
> **Problem:** Find all unique combinations that sum to a target
>
> ```typescript
> function combinationSum(candidates: number[], target: number): number[][] {
>   const result: number[][] = [];
>
>   function backtrack(
>     start: number,
>     currentComb: number[],
>     remainingSum: number
>   ): void {
>     // Base case: found valid combination
>     if (remainingSum === 0) {
>       result.push([...currentComb]);
>       return;
>     }
>
>     // Base case: exceeded target
>     if (remainingSum < 0) return;
>
>     // Try each candidate starting from start index
>     for (let i = start; i < candidates.length; i++) {
>       currentComb.push(candidates[i]);
>       // Allow reusing same element (i, not i+1)
>       backtrack(i, currentComb, remainingSum - candidates[i]);
>       currentComb.pop();
>     }
>   }
>
>   backtrack(0, [], target);
>   return result;
> }
> ```
>
> **Key Insight:** Allow element reuse by passing same index; prevent duplicates with start index

> [!example]- Pattern 4: Generate Parentheses
>
> **Problem:** Generate all valid combinations of n pairs of parentheses
>
> ```typescript
> function generateParenthesis(n: number): string[] {
>   const result: string[] = [];
>
>   function backtrack(current: string, open: number, close: number): void {
>     // Base case: used all n pairs
>     if (current.length === n * 2) {
>       result.push(current);
>       return;
>     }
>
>     // Add opening parenthesis if we haven't used all n
>     if (open < n) {
>       backtrack(current + "(", open + 1, close);
>     }
>
>     // Add closing parenthesis if it wouldn't make string invalid
>     if (close < open) {
>       backtrack(current + ")", open, close + 1);
>     }
>   }
>
>   backtrack("", 0, 0);
>   return result;
> }
> ```
>
> **Key Insight:** Use constraints (open count, close count) to guide valid choices

---

## ⚡ Performance Analysis

| Operation             | Average     | Worst Case  | Space     | Notes                                      |
| --------------------- | ----------- | ----------- | --------- | ------------------------------------------ |
| Generate Subsets      | O(2^n)      | O(2^n)      | O(2^n)    | 2^n subsets, each of length n/2 on average |
| Generate Permutations | O(n!)       | O(n!)       | O(n!)     | n! permutations, each of length n          |
| Combinations (C(n,k)) | O(C(n,k))   | O(C(n,k))   | O(C(n,k)) | Binomial coefficient combinations          |
| Combination Sum       | O(2^target) | O(2^target) | O(target) | Depends on target value and candidates     |
| Generate Parentheses  | O(4^n/√n)   | O(4^n/√n)   | O(4^n/√n) | Catalan number of valid combinations       |

> [!note]- Performance Considerations
>
> - **Exponential Growth:** Solution space grows exponentially with input size
> - **Memory Usage:** Must store all solutions, leading to high space complexity
> - **Early Termination:** Use pruning to avoid exploring invalid branches
> - **Input Size Limits:** Practical only for small to medium input sizes

---

## 🔄 Advanced Variations

> [!info]- Variation 1: Iterative Generation
>
> Use iterative approaches instead of recursion for subset generation
>
> - **Use case:** When recursion depth is a concern or stack space is limited
> - **Example:** Bit manipulation to generate all subsets iteratively

> [!info]- Variation 2: Lexicographic Ordering
>
> Generate combinations/permutations in specific lexicographic order
>
> - **Use case:** When order of generation matters for the problem
> - **Example:** Next permutation algorithm, combinatorial number system

> [!info]- Variation 3: Constraint-based Pruning
>
> Add early termination conditions to reduce search space
>
> - **Use case:** When many branches can be pruned based on constraints
> - **Example:** Sudoku solving, N-Queens with constraint propagation

> [!info]- Variation 4: Memoization for Optimization
>
> Cache results of subproblems to avoid recomputation
>
> - **Use case:** When there are overlapping subproblems
> - **Example:** Dynamic programming variations of combinatorial problems

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Empty Input** - Handle empty arrays or zero elements correctly
> - **Single Element** - Ensure algorithms work with one element
> - **Duplicate Elements** - Handle duplicates properly to avoid duplicate results
> - **Large Input Size** - Be aware of exponential time/space complexity
> - **Integer Overflow** - Consider overflow in counting problems
> - **Memory Limits** - Exponential space can quickly exceed memory
> - **Stack Overflow** - Deep recursion can cause stack overflow

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty input `[]`
> - Single element `[1]`
> - Two elements `[1,2]`
> - Duplicates `[1,2,2]`
> - Larger input `[1,2,3,4]` (manageable size)
> - Edge constraints (k=0, k=n for combinations)

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/78/problem|78. Subsets]]** - Master basic subset generation
> 2. **Practice:** Implement `permute()` with used array tracking
> 3. **Practice:** Create `subsetsWithDup()` handling duplicate elements
> 4. **Challenge:** Solve combination sum with target constraints
>
> **Key Learning Points:**
>
> - Master the choose-explore-unchoose paradigm
> - Understand when to use start index vs used array
> - Practice handling duplicates with sorting and skipping
> - Learn to add constraints for valid solution generation

> [!note]- Pro Tips
>
> 1. **Choose-Explore-Unchoose:** Always follow this pattern for clean backtracking
> 2. **Start Index:** Use start index for subsets/combinations to avoid duplicates
> 3. **Used Array:** Use boolean array for permutations to track used elements
> 4. **Early Termination:** Add pruning conditions to improve performance
> 5. **Copy Results:** Always copy arrays when adding to result to avoid reference issues

---

## 🔗 Related LeetCode Problems

- [[problems/78/problem|78. Subsets]] - Basic subset generation
- **90. Subsets II** - Subsets with duplicate elements
- **46. Permutations** - Basic permutation generation
- **47. Permutations II** - Permutations with duplicates
- **77. Combinations** - Choose k elements from n
- **39. Combination Sum** - Find combinations that sum to target

---

## 🧠 Brain Connections

- **Backtracking** → [[patterns/backtracking|Backtracking Pattern]] - Core algorithmic approach
- **Depth First Search** → [[patterns/depth-first-search|DFS Pattern]] - Tree traversal foundation
- **Dynamic Programming** → [[patterns/dynamic-programming|Dynamic Programming Pattern]] - Optimization of combinatorial problems
- **Recursion** → Fundamental technique for subset enumeration

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when you need to generate all possible combinations, subsets, or permutations
- 🔧 **Implementation Choice:** Choose start index for subsets/combinations, used array for permutations
- ⚡ **Performance:** Exponential time/space complexity limits practical input sizes to small/medium ranges
- 🎯 **Edge Cases:** Handle empty inputs, duplicates, and memory constraints; use pruning for optimization

---
