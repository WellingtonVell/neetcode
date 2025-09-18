---
tags:
  [
    pattern,
    dynamic-programming,
    memoization,
    optimization,
    algorithms,
    recursion,
  ]
aliases: [dp, memoization, tabulation, optimization]
type: pattern-guide
status: complete
difficulty: Advanced
time_complexity: "O(n^2)"
space_complexity: "O(n)"
prerequisites: [recursion, arrays, optimization]
related_patterns: [backtracking, divide-and-conquer, greedy]
leetcode_problems: [70, 322, 300, 416, 1143, 72]
emoji: 🧠
title: Dynamic Programming
description: Break down complex problems into simpler subproblems, storing solutions to avoid redundant calculations
---

[[README|🏠HOME]]

# 🧠 Dynamic Programming

## Overview

Dynamic Programming systematically breaks down complex problems into simpler overlapping subproblems and stores their solutions:

- **Optimal Substructure** - Solutions to subproblems contribute to the solution of the larger problem
- **Overlapping Subproblems** - Same subproblems are solved multiple times in naive recursion
- **Memoization (Top-Down)** - Store results of expensive function calls and reuse when same inputs occur
- **Tabulation (Bottom-Up)** - Build solutions iteratively from smallest subproblems to target
- **State Space Optimization** - Reduce space complexity by only keeping necessary previous states
- **Problem Transformation** - Convert optimization problems into DP formulations

This pattern transforms exponential recursive solutions into polynomial time algorithms through intelligent caching and iteration.

> _**Think of DP as having a perfect memory - once you solve a subproblem, you remember the answer forever, so you never solve the same thing twice!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Optimization Problems** - Finding minimum/maximum values with constraints
> - **Counting Problems** - How many ways to achieve something
> - **Decision Problems** - Can we achieve a target with given constraints
> - **Sequence Problems** - Longest/shortest subsequences, substring problems
> - **Grid/Path Problems** - Unique paths, minimum path sum in matrices
> - **Knapsack Variants** - Resource allocation with capacity constraints

> [!warning]- Avoid When
>
> - **No Overlapping Subproblems** - When subproblems don't repeat (use divide & conquer)
> - **No Optimal Substructure** - When local optimal choices don't lead to global optimum
> - **Greedy Works** - When greedy algorithms provide optimal solutions
> - **Simple Recursion Suffices** - When recursion depth is manageable without memoization
> - **Memory Constraints** - When space requirements exceed available memory

---

## 💻 Core Implementations

> [!info]- TypeScript

> ### 1. Fibonacci (Basic Memoization)
>
> ```typescript
> // Naive recursion: O(2^n)
> function fibNaive(n: number): number {
>   if (n <= 1) return n;
>   return fibNaive(n - 1) + fibNaive(n - 2);
> }
>
> // Memoized version: O(n)
> function fibMemo(n: number, memo: Map<number, number> = new Map()): number {
>   if (n <= 1) return n;
>
>   if (memo.has(n)) {
>     return memo.get(n)!;
>   }
>
>   const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
>   memo.set(n, result);
>   return result;
> }
>
> // Tabulation version: O(n) time, O(1) space
> function fibTab(n: number): number {
>   if (n <= 1) return n;
>
>   let prev2 = 0,
>     prev1 = 1;
>   for (let i = 2; i <= n; i++) {
>     const current = prev1 + prev2;
>     prev2 = prev1;
>     prev1 = current;
>   }
>
>   return prev1;
> }
> ```
>
> ### 2. Coin Change (Classic DP)
>
> ```typescript
> function coinChange(coins: number[], amount: number): number {
>   // dp[i] = minimum coins needed to make amount i
>   const dp: number[] = new Array(amount + 1).fill(Infinity);
>   dp[0] = 0; // Base case: 0 coins needed for amount 0
>
>   for (let i = 1; i <= amount; i++) {
>     for (const coin of coins) {
>       if (coin <= i) {
>         dp[i] = Math.min(dp[i], dp[i - coin] + 1);
>       }
>     }
>   }
>
>   return dp[amount] === Infinity ? -1 : dp[amount];
> }
>
> // Space optimized version (if only previous row needed)
> function coinChangeOptimized(coins: number[], amount: number): number {
>   let dp: number[] = new Array(amount + 1).fill(Infinity);
>   dp[0] = 0;
>
>   for (const coin of coins) {
>     const newDp: number[] = [...dp];
>     for (let i = coin; i <= amount; i++) {
>       newDp[i] = Math.min(newDp[i], dp[i - coin] + 1);
>     }
>     dp = newDp;
>   }
>
>   return dp[amount] === Infinity ? -1 : dp[amount];
> }
> ```
>
> ### 3. Longest Increasing Subsequence
>
> ```typescript
> function lengthOfLIS(nums: number[]): number {
>   if (nums.length === 0) return 0;
>
>   // dp[i] = length of LIS ending at index i
>   const dp: number[] = new Array(nums.length).fill(1);
>   let maxLength = 1;
>
>   for (let i = 1; i < nums.length; i++) {
>     for (let j = 0; j < i; j++) {
>       if (nums[j] < nums[i]) {
>         dp[i] = Math.max(dp[i], dp[j] + 1);
>       }
>     }
>     maxLength = Math.max(maxLength, dp[i]);
>   }
>
>   return maxLength;
> }
>
> // Optimized O(n log n) solution using binary search
> function lengthOfLISOptimal(nums: number[]): number {
>   const tails: number[] = [];
>
>   for (const num of nums) {
>     let left = 0,
>       right = tails.length;
>
>     // Binary search for insertion point
>     while (left < right) {
>       const mid = Math.floor((left + right) / 2);
>       if (tails[mid] < num) {
>         left = mid + 1;
>       } else {
>         right = mid;
>       }
>     }
>
>     // Extend or replace
>     if (left === tails.length) {
>       tails.push(num);
>     } else {
>       tails[left] = num;
>     }
>   }
>
>   return tails.length;
> }
> ```
>
> ### 4. 0/1 Knapsack Problem
>
> ```typescript
> function knapsack(
>   weights: number[],
>   values: number[],
>   capacity: number
> ): number {
>   const n = weights.length;
>   // dp[i][w] = maximum value using first i items with weight limit w
>   const dp: number[][] = Array(n + 1)
>     .fill(null)
>     .map(() => Array(capacity + 1).fill(0));
>
>   for (let i = 1; i <= n; i++) {
>     for (let w = 0; w <= capacity; w++) {
>       // Don't take item i-1
>       dp[i][w] = dp[i - 1][w];
>
>       // Take item i-1 if possible
>       if (weights[i - 1] <= w) {
>         dp[i][w] = Math.max(
>           dp[i][w],
>           dp[i - 1][w - weights[i - 1]] + values[i - 1]
>         );
>       }
>     }
>   }
>
>   return dp[n][capacity];
> }
>
> // Space optimized version
> function knapsackOptimized(
>   weights: number[],
>   values: number[],
>   capacity: number
> ): number {
>   let dp: number[] = new Array(capacity + 1).fill(0);
>
>   for (let i = 0; i < weights.length; i++) {
>     const newDp: number[] = [...dp];
>     for (let w = weights[i]; w <= capacity; w++) {
>       newDp[w] = Math.max(newDp[w], dp[w - weights[i]] + values[i]);
>     }
>     dp = newDp;
>   }
>
>   return dp[capacity];
> }
> ```

> [!info]- Golang

> ### 1. Edit Distance (Levenshtein)
>
> ```go
> func minDistance(word1 string, word2 string) int {
>     m, n := len(word1), len(word2)
>
>     // dp[i][j] = edit distance between word1[0:i] and word2[0:j]
>     dp := make([][]int, m+1)
>     for i := range dp {
>         dp[i] = make([]int, n+1)
>     }
>
>     // Base cases
>     for i := 0; i <= m; i++ {
>         dp[i][0] = i // Delete all characters from word1
>     }
>     for j := 0; j <= n; j++ {
>         dp[0][j] = j // Insert all characters from word2
>     }
>
>     // Fill the DP table
>     for i := 1; i <= m; i++ {
>         for j := 1; j <= n; j++ {
>             if word1[i-1] == word2[j-1] {
>                 dp[i][j] = dp[i-1][j-1] // No operation needed
>             } else {
>                 dp[i][j] = 1 + min(
>                     dp[i-1][j],   // Delete
>                     dp[i][j-1],   // Insert
>                     dp[i-1][j-1], // Replace
>                 )
>             }
>         }
>     }
>
>     return dp[m][n]
> }
>
> func min(a, b, c int) int {
>     if a < b && a < c {
>         return a
>     }
>     if b < c {
>         return b
>     }
>     return c
> }
> ```
>
> ### 2. House Robber with DP States
>
> ```go
> func rob(nums []int) int {
>     if len(nums) == 0 {
>         return 0
>     }
>     if len(nums) == 1 {
>         return nums[0]
>     }
>
>     // dp[i] = maximum money robbed up to house i
>     prev2, prev1 := 0, nums[0]
>
>     for i := 1; i < len(nums); i++ {
>         current := max(prev1, prev2+nums[i])
>         prev2 = prev1
>         prev1 = current
>     }
>
>     return prev1
> }
>
> func max(a, b int) int {
>     if a > b {
>         return a
>     }
>     return b
> }
> ```
>
> ### 3. Unique Paths in Grid
>
> ```go
> func uniquePaths(m int, n int) int {
>     // dp[i][j] = number of unique paths to reach cell (i,j)
>     dp := make([][]int, m)
>     for i := range dp {
>         dp[i] = make([]int, n)
>     }
>
>     // Base cases: first row and first column
>     for i := 0; i < m; i++ {
>         dp[i][0] = 1
>     }
>     for j := 0; j < n; j++ {
>         dp[0][j] = 1
>     }
>
>     // Fill the DP table
>     for i := 1; i < m; i++ {
>         for j := 1; j < n; j++ {
>             dp[i][j] = dp[i-1][j] + dp[i][j-1]
>         }
>     }
>
>     return dp[m-1][n-1]
> }
>
> // Space optimized version
> func uniquePathsOptimized(m int, n int) int {
>     dp := make([]int, n)
>     for j := 0; j < n; j++ {
>         dp[j] = 1
>     }
>
>     for i := 1; i < m; i++ {
>         for j := 1; j < n; j++ {
>             dp[j] += dp[j-1]
>         }
>     }
>
>     return dp[n-1]
> }
> ```

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Linear DP (1D State)
>
> **Problem:** Climbing stairs - how many ways to reach step n
>
> ```typescript
> function climbStairs(n: number): number {
>   if (n <= 2) return n;
>
>   // dp[i] = number of ways to reach step i
>   let prev2 = 1,
>     prev1 = 2;
>
>   for (let i = 3; i <= n; i++) {
>     const current = prev1 + prev2;
>     prev2 = prev1;
>     prev1 = current;
>   }
>
>   return prev1;
> }
> ```
>
> **Key Insight:** Each step depends only on previous 1-2 steps; use rolling variables for O(1) space

> [!example]- Pattern 2: Grid DP (2D State)
>
> **Problem:** Minimum path sum from top-left to bottom-right in grid
>
> ```typescript
> function minPathSum(grid: number[][]): number {
>   const m = grid.length,
>     n = grid[0].length;
>
>   // Modify grid in-place or use separate DP table
>   for (let i = 0; i < m; i++) {
>     for (let j = 0; j < n; j++) {
>       if (i === 0 && j === 0) continue;
>
>       let fromTop = i > 0 ? grid[i - 1][j] : Infinity;
>       let fromLeft = j > 0 ? grid[i][j - 1] : Infinity;
>
>       grid[i][j] += Math.min(fromTop, fromLeft);
>     }
>   }
>
>   return grid[m - 1][n - 1];
> }
> ```
>
> **Key Insight:** Fill grid row by row, each cell depends on top and left neighbors

> [!example]- Pattern 3: Subsequence DP
>
> **Problem:** Longest Common Subsequence between two strings
>
> ```typescript
> function longestCommonSubsequence(text1: string, text2: string): number {
>   const m = text1.length,
>     n = text2.length;
>   // dp[i][j] = LCS length of text1[0:i] and text2[0:j]
>   const dp: number[][] = Array(m + 1)
>     .fill(null)
>     .map(() => Array(n + 1).fill(0));
>
>   for (let i = 1; i <= m; i++) {
>     for (let j = 1; j <= n; j++) {
>       if (text1[i - 1] === text2[j - 1]) {
>         dp[i][j] = dp[i - 1][j - 1] + 1;
>       } else {
>         dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
>       }
>     }
>   }
>
>   return dp[m][n];
> }
> ```
>
> **Key Insight:** Compare characters; if match, extend diagonal; if not, take max from top/left

> [!example]- Pattern 4: Knapsack DP
>
> **Problem:** Partition Equal Subset Sum (0/1 Knapsack variant)
>
> ```typescript
> function canPartition(nums: number[]): boolean {
>   const total = nums.reduce((sum, num) => sum + num, 0);
>   if (total % 2 !== 0) return false;
>
>   const target = total / 2;
>   // dp[i] = can we achieve sum i using available numbers
>   const dp: boolean[] = new Array(target + 1).fill(false);
>   dp[0] = true; // Base case: sum 0 is always achievable
>
>   for (const num of nums) {
>     // Traverse backwards to avoid using same number twice
>     for (let i = target; i >= num; i--) {
>       dp[i] = dp[i] || dp[i - num];
>     }
>   }
>
>   return dp[target];
> }
> ```
>
> **Key Insight:** Traverse backwards when updating to avoid using items multiple times

---

## ⚡ Performance Analysis

| Problem Type      | Time Complexity | Space Complexity | Space Optimized | Notes                   |
| ----------------- | --------------- | ---------------- | --------------- | ----------------------- |
| Linear DP         | O(n)            | O(n)             | O(1)            | Use rolling variables   |
| Grid DP           | O(m×n)          | O(m×n)           | O(min(m,n))     | Process row by row      |
| LCS/Edit Distance | O(m×n)          | O(m×n)           | O(min(m,n))     | Only need previous row  |
| 0/1 Knapsack      | O(n×W)          | O(n×W)           | O(W)            | Traverse backwards      |
| Coin Change       | O(n×amount)     | O(amount)        | O(amount)       | Already space efficient |

> [!note]- Performance Considerations
>
> - **Memoization Overhead:** Top-down has function call overhead and may hit recursion limits
> - **Space Optimization:** Often can reduce space from 2D to 1D by processing in correct order
> - **Cache Locality:** Bottom-up tabulation usually has better cache performance
> - **State Compression:** Some problems allow storing only essential state information

---

## 🔄 Advanced Variations

> [!info]- Variation 1: State Machine DP
>
> Model problems with multiple states (buy/sell stocks, house robber with restrictions)
>
> - **Use case:** Problems with state transitions and constraints
> - **Example:** Best Time to Buy/Sell Stock with Cooldown, House Robber in Circle

> [!info]- Variation 2: Bitmask DP
>
> Use bitmasks to represent subsets in DP states
>
> - **Use case:** Subset enumeration, traveling salesman problem
> - **Example:** Shortest Superstring, Traveling Salesman Problem

> [!info]- Variation 3: Tree DP
>
> Apply DP on tree structures, considering subtree solutions
>
> - **Use case:** Tree problems requiring optimal subtree solutions
> - **Example:** House Robber III, Binary Tree Maximum Path Sum

> [!info]- Variation 4: Digit DP
>
> Count numbers with specific properties using digit-by-digit construction
>
> - **Use case:** Counting numbers with constraints on digits
> - **Example:** Count numbers with non-decreasing digits, Sum of digits constraints

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Empty Input** - Handle empty arrays, strings appropriately
> - **Single Element** - Ensure base cases work with minimal input
> - **Integer Overflow** - Watch for large numbers in counting problems
> - **Negative Numbers** - Some DP formulations break with negative values
> - **State Initialization** - Incorrect base cases lead to wrong answers
> - **State Transitions** - Ensure all valid transitions are considered
> - **Space Optimization Errors** - Incorrect order when optimizing space

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty input `[]` or `""`
> - Single element scenarios
> - Small inputs where you can verify manually
> - Edge values (0, 1, maximum constraints)
> - Cases where no solution exists
> - Maximum constraint scenarios for performance

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/dp/70/problem|70. Climbing Stairs]]** - Master basic 1D DP
> 2. **Practice:** Implement `coinChange()` understanding bottom-up approach
> 3. **Practice:** Solve `uniquePaths()` for 2D grid DP
> 4. **Challenge:** Tackle `longestCommonSubsequence()` for string DP
>
> **Key Learning Points:**
>
> - Identify overlapping subproblems and optimal substructure
> - Master both top-down (memoization) and bottom-up (tabulation) approaches
> - Practice space optimization techniques
> - Learn to recognize common DP patterns

> [!note]- Pro Tips
>
> 1. **Problem Analysis:** Look for "optimal" keywords and recursive structure
> 2. **State Definition:** Clearly define what dp[i] or dp[i][j] represents
> 3. **Base Cases:** Handle boundary conditions carefully
> 4. **Transition Formula:** Derive recurrence relation from problem constraints
> 5. **Space Optimization:** Consider if you only need previous states

---

## 🔗 Related LeetCode Problems

- [[problems/dp/70/problem|70. Climbing Stairs]] - Basic 1D DP introduction
- **322. Coin Change** - Classic unbounded knapsack DP
- **300. Longest Increasing Subsequence** - Sequence DP with optimization
- **416. Partition Equal Subset Sum** - 0/1 Knapsack variant
- **1143. Longest Common Subsequence** - String DP foundation
- **72. Edit Distance** - Advanced string DP with multiple operations

---

## 🧠 Brain Connections

- **Recursion** → Foundation for understanding problem decomposition and memoization
- **Backtracking** → [[patterns/backtracking|Backtracking Pattern]] - DP optimizes certain backtracking problems
- **Greedy Algorithms** → Alternative approach when optimal substructure has greedy choice property
- **Divide and Conquer** → Related paradigm but DP handles overlapping subproblems

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Look for optimal/count problems with overlapping subproblems and optimal substructure
- 🔧 **Implementation Choice:** Start with memoization for clarity, optimize to tabulation for performance
- ⚡ **Performance:** Transform exponential recursive solutions to polynomial time through intelligent state storage
- 🎯 **Edge Cases:** Master state definition, base cases, and transition formulas; consider space optimization opportunities

---
