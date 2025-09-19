---
tags: [pattern, backtracking, recursion, algorithms, combinatorial, search]
aliases:
  [
    recursive-backtracking,
    depth-first-search-with-backtracking,
    constraint-satisfaction,
  ]
type: pattern-guide
difficulty: Advanced
time_complexity: "O(b^d)"
space_complexity: "O(d)"
prerequisites: [recursion, depth-first-search, tree-traversal]
related_patterns: [depth-first-search, subsets, tree-traversal]
leetcode_problems: [46, 47, 39, 40, 51, 37, 22]
emoji: 🎯
title: Backtracking
description: Systematically explore all possible solutions by making choices, exploring consequences, and undoing choices when needed
---

# 🎯 Backtracking

## Overview [[README|🏠]]

The Backtracking pattern systematically explores all possible solutions by making incremental choices and undoing them when they lead to invalid states:

- **Choose-Explore-Unchoose** - The fundamental backtracking paradigm
- **Constraint Satisfaction** - Find solutions that satisfy all given constraints
- **Combinatorial Generation** - Generate all permutations, combinations, or arrangements
- **Puzzle Solving** - Solve complex puzzles like Sudoku, N-Queens, and word games
- **Path Finding** - Find all valid paths through mazes or graphs
- **Game Solving** - Solve strategic games and decision problems

This pattern is essential when you need to explore a solution space exhaustively but can prune invalid branches early.

> _**Think of backtracking as exploring a maze with breadcrumbs - you try every path, but when you hit a dead end, you follow your breadcrumbs back to try a different route!**_

---

## 🎯 When to Use [[README|🏠]]

> [!success]- Perfect For
>
> - **Constraint Satisfaction** - Problems with specific rules and constraints to satisfy
> - **Combinatorial Problems** - Generating all permutations, combinations, or arrangements
> - **Puzzle Solving** - Sudoku, N-Queens, crossword puzzles, word search
> - **Path Finding** - Finding all valid paths through graphs or mazes
> - **Decision Problems** - Problems requiring exploration of all possible decisions
> - **Game Solving** - Chess moves, tic-tac-toe, strategic game analysis

> [!warning]- Avoid When
>
> - **Large Solution Spaces** - When the search space is exponentially large without pruning
> - **Optimization Only** - When you only need the best solution, not all solutions
> - **Simple Iteration** - When a simple loop or greedy approach suffices
> - **Time Constraints** - When you have strict time limits and can't afford exhaustive search
> - **Memory Limitations** - When recursion depth might cause stack overflow

---

## 💻 Core Implementations [[README|🏠]]

> [!info]- TypeScript
>
> ### 1. Basic Backtracking Template
>
> ```typescript
> function backtrack<T>(
>   result: T[],
>   currentSolution: T,
>   remainingChoices: any[],
>   isValid: (solution: T) => boolean,
>   isComplete: (solution: T) => boolean
> ): void {
>   // Base case: solution is complete
>   if (isComplete(currentSolution)) {
>     result.push(/* copy of currentSolution */);
>     return;
>   }
>
>   // Try each remaining choice
>   for (const choice of remainingChoices) {
>     // Choose: make the choice
>     // modify currentSolution with choice
>
>     // Validate: check if choice leads to valid state
>     if (isValid(currentSolution)) {
>       // Explore: recurse with updated state
>       backtrack(result, currentSolution, /* updated choices */, isValid, isComplete);
>     }
>
>     // Unchoose: undo the choice (backtrack)
>     // restore currentSolution to previous state
>   }
> }
> ```
>
> ### 2. Generate All Permutations
>
> ```typescript
> function permute(nums: number[]): number[][] {
>   const result: number[][] = [];
>
>   function backtrack(currentPerm: number[], used: boolean[]): void {
>     // Base case: permutation is complete
>     if (currentPerm.length === nums.length) {
>       result.push([...currentPerm]);
>       return;
>     }
>
>     // Try each unused number
>     for (let i = 0; i < nums.length; i++) {
>       if (used[i]) continue; // Skip if already used
>
>       // Choose
>       currentPerm.push(nums[i]);
>       used[i] = true;
>
>       // Explore
>       backtrack(currentPerm, used);
>
>       // Unchoose (backtrack)
>       currentPerm.pop();
>       used[i] = false;
>     }
>   }
>
>   backtrack([], new Array(nums.length).fill(false));
>   return result;
> }
> ```
>
> ### 3. N-Queens Problem
>
> ```typescript
> function solveNQueens(n: number): string[][] {
>   const result: string[][] = [];
>   const board: string[][] = Array(n)
>     .fill(null)
>     .map(() => Array(n).fill("."));
>
>   function isValid(board: string[][], row: number, col: number): boolean {
>     // Check column
>     for (let i = 0; i < row; i++) {
>       if (board[i][col] === "Q") return false;
>     }
>
>     // Check diagonal (top-left to bottom-right)
>     for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
>       if (board[i][j] === "Q") return false;
>     }
>
>     // Check anti-diagonal (top-right to bottom-left)
>     for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
>       if (board[i][j] === "Q") return false;
>     }
>
>     return true;
>   }
>
>   function backtrack(row: number): void {
>     // Base case: all queens placed
>     if (row === n) {
>       result.push(board.map((row) => row.join("")));
>       return;
>     }
>
>     // Try placing queen in each column of current row
>     for (let col = 0; col < n; col++) {
>       if (isValid(board, row, col)) {
>         // Choose
>         board[row][col] = "Q";
>
>         // Explore
>         backtrack(row + 1);
>
>         // Unchoose
>         board[row][col] = ".";
>       }
>     }
>   }
>
>   backtrack(0);
>   return result;
> }
> ```
>
> ### 4. Generate Parentheses
>
> ```typescript
> function generateParenthesis(n: number): string[] {
>   const result: string[] = [];
>
>   function backtrack(current: string, open: number, close: number): void {
>     // Base case: used all n pairs
>     if (current.length === 2 * n) {
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

> [!info]- Golang
>
> ### 1. Combination Sum
>
> ```go
> func combinationSum(candidates []int, target int) [][]int {
>     var result [][]int
>     var current []int
>
>     var backtrack func(start int, remaining int)
>     backtrack = func(start int, remaining int) {
>         // Base case: found valid combination
>         if remaining == 0 {
>             combination := make([]int, len(current))
>             copy(combination, current)
>             result = append(result, combination)
>             return
>         }
>
>         // Base case: exceeded target
>         if remaining < 0 {
>             return
>         }
>
>         // Try each candidate starting from start index
>         for i := start; i < len(candidates); i++ {
>             // Choose
>             current = append(current, candidates[i])
>
>             // Explore (can reuse same number, so pass i not i+1)
>             backtrack(i, remaining-candidates[i])
>
>             // Unchoose
>             current = current[:len(current)-1]
>         }
>     }
>
>     backtrack(0, target)
>     return result
> }
> ```
>
> ### 2. Word Search
>
> ```go
> func exist(board [][]byte, word string) bool {
>     rows, cols := len(board), len(board[0])
>
>     var backtrack func(row, col, index int) bool
>     backtrack = func(row, col, index int) bool {
>         // Base case: found complete word
>         if index == len(word) {
>             return true
>         }
>
>         // Boundary checks and character match
>         if row < 0 || row >= rows || col < 0 || col >= cols ||
>            board[row][col] != word[index] {
>             return false
>         }
>
>         // Choose: mark cell as visited
>         temp := board[row][col]
>         board[row][col] = '#'
>
>         // Explore: try all 4 directions
>         found := backtrack(row+1, col, index+1) ||
>                 backtrack(row-1, col, index+1) ||
>                 backtrack(row, col+1, index+1) ||
>                 backtrack(row, col-1, index+1)
>
>         // Unchoose: restore cell
>         board[row][col] = temp
>
>         return found
>     }
>
>     // Try starting from each cell
>     for i := 0; i < rows; i++ {
>         for j := 0; j < cols; j++ {
>             if backtrack(i, j, 0) {
>                 return true
>             }
>         }
>     }
>
>     return false
> }
> ```
>
> ### 3. Sudoku Solver
>
> ```go
> func solveSudoku(board [][]byte) {
>     var backtrack func() bool
>
>     isValid := func(board [][]byte, row, col int, num byte) bool {
>         // Check row
>         for j := 0; j < 9; j++ {
>             if board[row][j] == num {
>                 return false
>             }
>         }
>
>         // Check column
>         for i := 0; i < 9; i++ {
>             if board[i][col] == num {
>                 return false
>             }
>         }
>
>         // Check 3x3 box
>         startRow, startCol := 3*(row/3), 3*(col/3)
>         for i := startRow; i < startRow+3; i++ {
>             for j := startCol; j < startCol+3; j++ {
>                 if board[i][j] == num {
>                     return false
>                 }
>             }
>         }
>
>         return true
>     }
>
>     backtrack = func() bool {
>         for i := 0; i < 9; i++ {
>             for j := 0; j < 9; j++ {
>                 if board[i][j] == '.' {
>                     // Try each number 1-9
>                     for num := byte('1'); num <= byte('9'); num++ {
>                         if isValid(board, i, j, num) {
>                             // Choose
>                             board[i][j] = num
>
>                             // Explore
>                             if backtrack() {
>                                 return true
>                             }
>
>                             // Unchoose
>                             board[i][j] = '.'
>                         }
>                     }
>                     return false // No valid number found
>                 }
>             }
>         }
>         return true // All cells filled
>     }
>
>     backtrack()
> }
> ```

---

## 🧩 Common Problem Patterns [[README|🏠]]

> [!example]- Pattern 1: Generate All Permutations
>
> **Problem:** Generate all possible arrangements of a given array
>
> ```typescript
> function permute(nums: number[]): number[][] {
>   const result: number[][] = [];
>   const used: boolean[] = new Array(nums.length).fill(false);
>
>   function backtrack(currentPerm: number[]): void {
>     // Base case: permutation complete
>     if (currentPerm.length === nums.length) {
>       result.push([...currentPerm]);
>       return;
>     }
>
>     // Try each unused element
>     for (let i = 0; i < nums.length; i++) {
>       if (used[i]) continue;
>
>       // Choose
>       currentPerm.push(nums[i]);
>       used[i] = true;
>
>       // Explore
>       backtrack(currentPerm);
>
>       // Unchoose
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
> **Key Insight:** Use visited/used tracking to ensure each element appears exactly once

> [!example]- Pattern 2: Combination Sum with Repetition
>
> **Problem:** Find all unique combinations that sum to target, numbers can be reused
>
> ```typescript
> function combinationSum(candidates: number[], target: number): number[][] {
>   const result: number[][] = [];
>
>   function backtrack(
>     start: number,
>     currentComb: number[],
>     remaining: number
>   ): void {
>     // Base case: found valid combination
>     if (remaining === 0) {
>       result.push([...currentComb]);
>       return;
>     }
>
>     // Base case: exceeded target
>     if (remaining < 0) return;
>
>     // Try each candidate from start index
>     for (let i = start; i < candidates.length; i++) {
>       // Choose
>       currentComb.push(candidates[i]);
>
>       // Explore (can reuse same element, so pass i not i+1)
>       backtrack(i, currentComb, remaining - candidates[i]);
>
>       // Unchoose
>       currentComb.pop();
>     }
>   }
>
>   backtrack(0, [], target);
>   return result;
> }
> ```
>
> **Key Insight:** Start index prevents duplicate combinations; allow reuse by not incrementing start

> [!example]- Pattern 3: N-Queens Constraint Satisfaction
>
> **Problem:** Place N queens on N×N chessboard so none attack each other
>
> ```typescript
> function solveNQueens(n: number): string[][] {
>   const result: string[][] = [];
>   const board: number[] = new Array(n); // board[row] = col of queen
>
>   function isValid(row: number, col: number): boolean {
>     for (let prevRow = 0; prevRow < row; prevRow++) {
>       const prevCol = board[prevRow];
>
>       // Check same column
>       if (prevCol === col) return false;
>
>       // Check diagonals
>       if (Math.abs(prevRow - row) === Math.abs(prevCol - col)) return false;
>     }
>     return true;
>   }
>
>   function backtrack(row: number): void {
>     // Base case: all queens placed
>     if (row === n) {
>       const solution = board.map(
>         (col) => ".".repeat(col) + "Q" + ".".repeat(n - col - 1)
>       );
>       result.push(solution);
>       return;
>     }
>
>     // Try each column in current row
>     for (let col = 0; col < n; col++) {
>       if (isValid(row, col)) {
>         // Choose
>         board[row] = col;
>
>         // Explore
>         backtrack(row + 1);
>
>         // Unchoose (implicit - will be overwritten)
>       }
>     }
>   }
>
>   backtrack(0);
>   return result;
> }
> ```
>
> **Key Insight:** Use efficient conflict detection; place one queen per row to reduce search space

> [!example]- Pattern 4: Palindrome Partitioning
>
> **Problem:** Partition string into substrings where each substring is a palindrome
>
> ```typescript
> function partition(s: string): string[][] {
>   const result: string[][] = [];
>
>   function isPalindrome(start: number, end: number): boolean {
>     while (start < end) {
>       if (s[start] !== s[end]) return false;
>       start++;
>       end--;
>     }
>     return true;
>   }
>
>   function backtrack(start: number, currentPartition: string[]): void {
>     // Base case: processed entire string
>     if (start === s.length) {
>       result.push([...currentPartition]);
>       return;
>     }
>
>     // Try each possible ending position
>     for (let end = start; end < s.length; end++) {
>       if (isPalindrome(start, end)) {
>         // Choose
>         currentPartition.push(s.substring(start, end + 1));
>
>         // Explore
>         backtrack(end + 1, currentPartition);
>
>         // Unchoose
>         currentPartition.pop();
>       }
>     }
>   }
>
>   backtrack(0, []);
>   return result;
> }
> ```
>
> **Key Insight:** Use helper function for constraint checking; explore all valid substring endings

---

## ⚡ Performance Analysis [[README|🏠]]

| Operation    | Average | Worst Case | Space | Notes                             |
| ------------ | ------- | ---------- | ----- | --------------------------------- |
| Permutations | O(n!)   | O(n!)      | O(n)  | n! possible permutations          |
| Combinations | O(2^n)  | O(2^n)     | O(n)  | 2^n possible subsets              |
| N-Queens     | O(n!)   | O(n!)      | O(n)  | Pruning reduces actual complexity |
| Sudoku       | O(9^k)  | O(9^k)     | O(k)  | k = empty cells, heavy pruning    |
| Word Search  | O(4^k)  | O(4^k)     | O(k)  | k = word length, 4 directions     |

> [!note]- Performance Considerations
>
> - **Exponential Complexity:** Most backtracking problems have exponential time complexity
> - **Pruning Effectiveness:** Good constraint checking can drastically reduce actual runtime
> - **Space Efficiency:** Stack space is proportional to recursion depth, not solution count
> - **Early Termination:** Stop as soon as one solution is found if that's all you need

---

## 🔄 Advanced Variations [[README|🏠]]

> [!info]- Variation 1: Iterative Backtracking
>
> Use explicit stack instead of recursion for very deep searches
>
> - **Use case:** Avoiding stack overflow in deep recursion scenarios
> - **Example:** Iterative sudoku solver, maze solving

> [!info]- Variation 2: Constraint Propagation
>
> Combine backtracking with forward checking and constraint propagation
>
> - **Use case:** CSP problems, advanced puzzle solving
> - **Example:** Enhanced sudoku solver, SAT solving

> [!info]- Variation 3: Parallel Backtracking
>
> Distribute search space across multiple threads or processes
>
> - **Use case:** Large search spaces, distributed computing
> - **Example:** Parallel N-Queens, distributed puzzle solving

> [!info]- Variation 4: Heuristic-Guided Backtracking
>
> Use heuristics to choose promising branches first
>
> - **Use case:** Game AI, optimization problems
> - **Example:** Alpha-beta pruning, most constrained variable heuristic

---

## ⚠️ Edge Cases & Gotchas [[README|🏠]]

> [!warning]- Critical Edge Cases
>
> - **Empty Input** - Handle empty arrays, strings, or grids appropriately
> - **Single Element** - Ensure base cases work with minimal input
> - **No Valid Solutions** - Handle cases where no solution exists
> - **Stack Overflow** - Monitor recursion depth for large inputs
> - **Duplicate Solutions** - Ensure solution uniqueness when required
> - **State Corruption** - Verify proper state restoration in unchoose step
> - **Infinite Recursion** - Ensure proper termination conditions

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty input `[]` or `""`
> - Single element scenarios
> - Cases with no valid solutions
> - Cases with exactly one solution
> - Cases with many solutions
> - Maximum constraint scenarios (N=8 for N-Queens)
> - Invalid input validation

---

## 🎯 Practice Exercises [[README|🏠]]

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/46/problem|46. Permutations]]** - Master basic choose-explore-unchoose
> 2. **Practice:** Implement `combinationSum()` with start index technique
> 3. **Practice:** Solve `generateParenthesis()` with constraint tracking
> 4. **Challenge:** Tackle N-Queens with efficient conflict detection
>
> **Key Learning Points:**
>
> - Master the choose-explore-unchoose paradigm
> - Learn effective constraint checking and pruning
> - Practice state management and restoration
> - Understand when to use different backtracking variations

> [!note]- Pro Tips
>
> 1. **State Management:** Always ensure proper state restoration in unchoose step
> 2. **Pruning:** Add constraint checks early to avoid unnecessary recursion
> 3. **Base Cases:** Handle both success and failure termination conditions
> 4. **Optimization:** Use efficient data structures for constraint checking
> 5. **Debugging:** Add logging to trace the choose-explore-unchoose cycle

---

## 🔗 Related LeetCode Problems [[README|🏠]]

- [[problems/46/problem|46. Permutations]] - Classic backtracking introduction
- **47. Permutations II** - Handle duplicates in permutations
- **39. Combination Sum** - Target sum with repetition allowed
- **40. Combination Sum II** - Target sum without repetition
- **51. N-Queens** - Classic constraint satisfaction problem
- **37. Sudoku Solver** - Complex constraint satisfaction with multiple rules

---

## 🧠 Brain Connections [[README|🏠]]

- **Depth-First Search** → [[patterns/depth-first-search|DFS Pattern]] - Backtracking is DFS with state restoration
- **Recursion** → Foundation for understanding recursive problem decomposition
- **Subsets** → [[patterns/subsets|Subsets Pattern]] - Many subset problems use backtracking
- **Dynamic Programming** → Some backtracking problems can be optimized with memoization

---

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** Use when you need to explore all possibilities with constraints or generate all valid solutions
- 🔧 **Implementation Choice:** Master choose-explore-unchoose; invest in efficient constraint checking for pruning
- ⚡ **Performance:** Exponential complexity is unavoidable, but good pruning can make problems tractable
- 🎯 **Edge Cases:** Ensure proper state restoration and handle empty inputs, no solutions, and constraint violations

---
