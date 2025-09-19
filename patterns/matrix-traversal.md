---
tags: [pattern, matrix-traversal, data-structure, algorithms, matrix]
aliases: [island-pattern, grid-traversal, dfs-matrix, bfs-matrix]
type: pattern-guide
difficulty: Intermediate
time_complexity: "O(m * n)"
space_complexity: "O(m * n)"
prerequisites: [dfs, bfs, recursion, matrices]
related_patterns: [backtracking, graph-traversal]
leetcode_problems: [200, 695, 733, 1020]
emoji: 🏝️
title: Matrix Traversal
description: Traverses 2D grids to find connected components like islands or regions using DFS/BFS
---

# 🏝️ Matrix Traversal

## Overview [[README|🏠]]

This pattern involves traversing a 2D matrix to find connected components, "islands," or contiguous groups of elements:

- **Grid exploration** - Systematically visit all cells in a matrix
- **Connected components** - Find groups of adjacent cells with same properties
- **Boundary detection** - Handle matrix edges and invalid positions
- **State tracking** - Mark visited cells to avoid revisiting
- **Direction vectors** - Use 4-directional or 8-directional movement
- **Multiple algorithms** - Supports both DFS and BFS approaches

This pattern is fundamental for grid-based problems that require grouping connected elements or exploring regions.

> _**Think of this pattern as exploring islands from a helicopter - you can see the whole grid and systematically explore each landmass by following connected paths!**_

---

## 🎯 When to Use [[README|🏠]]

> [!success]- Perfect For
>
> - **Island counting** - Finding separate connected regions
> - **Flood fill algorithms** - Filling connected areas with new values
> - **Region growing** - Expanding areas based on similarity criteria
> - **Boundary tracing** - Following the perimeter of connected areas
> - **Path finding in grids** - Finding routes through matrix obstacles
> - **Component analysis** - Analyzing size and properties of connected regions

> [!warning]- Avoid When
>
> - **Linear data structures** - Use simpler traversal for 1D arrays
> - **Dynamic programming** - When optimal substructure is needed
> - **Tree structures** - Use tree traversal algorithms instead
> - **Weighted connections** - When edge weights matter for pathfinding
> - **Real-time constraints** - Pattern can be memory intensive for large grids

---

## 💻 Core Implementations [[README|🏠]]

> [!info]- TypeScript
>
> ### 1. DFS Implementation
>
> ```typescript
> function dfsTraversal(
>   grid: number[][],
>   row: number,
>   col: number,
>   visited: boolean[][]
> ): void {
>   // Check boundaries and visited status
>   if (
>     row < 0 ||
>     row >= grid.length ||
>     col < 0 ||
>     col >= grid[0].length ||
>     visited[row][col] ||
>     grid[row][col] === 0
>   ) {
>     return;
>   }
>
>   // Mark as visited
>   visited[row][col] = true;
>
>   // Explore all 4 directions
>   const directions = [
>     [-1, 0],
>     [1, 0],
>     [0, -1],
>     [0, 1],
>   ];
>
>   for (const [dr, dc] of directions) {
>     dfsTraversal(grid, row + dr, col + dc, visited);
>   }
> }
> ```
>
> ### 2. BFS Implementation
>
> ```typescript
> function bfsTraversal(
>   grid: number[][],
>   startRow: number,
>   startCol: number,
>   visited: boolean[][]
> ): number {
>   const queue: [number, number][] = [[startRow, startCol]];
>   visited[startRow][startCol] = true;
>   let size = 0;
>
>   const directions = [
>     [-1, 0],
>     [1, 0],
>     [0, -1],
>     [0, 1],
>   ];
>
>   while (queue.length > 0) {
>     const [row, col] = queue.shift()!;
>     size++;
>
>     for (const [dr, dc] of directions) {
>       const newRow = row + dr;
>       const newCol = col + dc;
>
>       if (isValid(grid, newRow, newCol) && !visited[newRow][newCol]) {
>         visited[newRow][newCol] = true;
>         queue.push([newRow, newCol]);
>       }
>     }
>   }
>
>   return size;
> }
> ```
>
> ### 3. Helper Functions
>
> ```typescript
> function isValid(grid: number[][], row: number, col: number): boolean {
>   return (
>     row >= 0 &&
>     row < grid.length &&
>     col >= 0 &&
>     col < grid[0].length &&
>     grid[row][col] === 1
>   );
> }
> ```

> [!info]- Golang
>
> ### 1. DFS Implementation
>
> ```go
> func dfsTraversal(grid [][]int, row, col int, visited [][]bool) {
>   // Check boundaries and visited status
>   if row < 0 || row >= len(grid) || col < 0 || col >= len(grid[0]) ||
>      visited[row][col] || grid[row][col] == 0 {
>     return
>   }
>
>   // Mark as visited
>   visited[row][col] = true
>
>   // Explore all 4 directions
>   directions := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
>
>   for _, dir := range directions {
>     dfsTraversal(grid, row+dir[0], col+dir[1], visited)
>   }
> }
> ```
>
> ### 2. BFS Implementation
>
> ```go
> func bfsTraversal(grid [][]int, startRow, startCol int, visited [][]bool) int {
>   queue := [][]int{{startRow, startCol}}
>   visited[startRow][startCol] = true
>   size := 0
>
>   directions := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
>
>   for len(queue) > 0 {
>     current := queue[0]
>     queue = queue[1:]
>     row, col := current[0], current[1]
>     size++
>
>     for _, dir := range directions {
>       newRow, newCol := row+dir[0], col+dir[1]
>       if isValid(grid, newRow, newCol) && !visited[newRow][newCol] {
>         visited[newRow][newCol] = true
>         queue = append(queue, []int{newRow, newCol})
>       }
>     }
>   }
>
>   return size
> }
> ```
>
> **Note:** Go's slice operations make queue management efficient for BFS

---

## 🧩 Common Problem Patterns [[README|🏠]]

> [!example]- Pattern 1: Number of Islands
>
> **Problem:** Count the number of separate islands (connected 1s) in a binary matrix
>
> ```typescript
> function numIslands(grid: string[][]): number {
>   if (!grid || grid.length === 0) return 0;
>
>   const rows = grid.length;
>   const cols = grid[0].length;
>   let islandCount = 0;
>
>   for (let i = 0; i < rows; i++) {
>     for (let j = 0; j < cols; j++) {
>       if (grid[i][j] === "1") {
>         islandCount++;
>         dfsMarkIsland(grid, i, j);
>       }
>     }
>   }
>
>   return islandCount;
> }
>
> function dfsMarkIsland(grid: string[][], row: number, col: number): void {
>   if (
>     row < 0 ||
>     row >= grid.length ||
>     col < 0 ||
>     col >= grid[0].length ||
>     grid[row][col] === "0"
>   ) {
>     return;
>   }
>
>   grid[row][col] = "0"; // Mark as visited
>
>   // Explore 4 directions
>   dfsMarkIsland(grid, row - 1, col);
>   dfsMarkIsland(grid, row + 1, col);
>   dfsMarkIsland(grid, row, col - 1);
>   dfsMarkIsland(grid, row, col + 1);
> }
> ```
>
> **Key Insight:** Modify the original grid to mark visited cells, eliminating need for separate visited array

> [!example]- Pattern 2: Max Area of Island
>
> **Problem:** Find the area of the largest island in a binary matrix
>
> ```typescript
> function maxAreaOfIsland(grid: number[][]): number {
>   let maxArea = 0;
>
>   for (let i = 0; i < grid.length; i++) {
>     for (let j = 0; j < grid[0].length; j++) {
>       if (grid[i][j] === 1) {
>         const area = calculateIslandArea(grid, i, j);
>         maxArea = Math.max(maxArea, area);
>       }
>     }
>   }
>
>   return maxArea;
> }
>
> function calculateIslandArea(
>   grid: number[][],
>   row: number,
>   col: number
> ): number {
>   if (
>     row < 0 ||
>     row >= grid.length ||
>     col < 0 ||
>     col >= grid[0].length ||
>     grid[row][col] === 0
>   ) {
>     return 0;
>   }
>
>   grid[row][col] = 0; // Mark as visited
>
>   return (
>     1 +
>     calculateIslandArea(grid, row - 1, col) +
>     calculateIslandArea(grid, row + 1, col) +
>     calculateIslandArea(grid, row, col - 1) +
>     calculateIslandArea(grid, row, col + 1)
>   );
> }
> ```
>
> **Key Insight:** Return the sum of recursive calls to count connected cells

> [!example]- Pattern 3: Flood Fill
>
> **Problem:** Fill connected region with a new color starting from a given pixel
>
> ```typescript
> function floodFill(
>   image: number[][],
>   sr: number,
>   sc: number,
>   newColor: number
> ): number[][] {
>   const originalColor = image[sr][sc];
>
>   if (originalColor === newColor) return image;
>
>   fillColor(image, sr, sc, originalColor, newColor);
>   return image;
> }
>
> function fillColor(
>   image: number[][],
>   row: number,
>   col: number,
>   originalColor: number,
>   newColor: number
> ): void {
>   if (
>     row < 0 ||
>     row >= image.length ||
>     col < 0 ||
>     col >= image[0].length ||
>     image[row][col] !== originalColor
>   ) {
>     return;
>   }
>
>   image[row][col] = newColor;
>
>   // Fill all 4 directions
>   fillColor(image, row - 1, col, originalColor, newColor);
>   fillColor(image, row + 1, col, originalColor, newColor);
>   fillColor(image, row, col - 1, originalColor, newColor);
>   fillColor(image, row, col + 1, originalColor, newColor);
> }
> ```
>
> **Key Insight:** Check for original color instead of visited array to avoid infinite loops

> [!example]- Pattern 4: Surrounded Regions
>
> **Problem:** Capture all 'O's that are completely surrounded by 'X's
>
> ```typescript
> function solve(board: string[][]): void {
>   if (!board || board.length === 0) return;
>
>   const rows = board.length;
>   const cols = board[0].length;
>
>   // Mark border-connected 'O's as safe
>   for (let i = 0; i < rows; i++) {
>     for (let j = 0; j < cols; j++) {
>       if (
>         (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) &&
>         board[i][j] === "O"
>       ) {
>         markSafe(board, i, j);
>       }
>     }
>   }
>
>   // Capture remaining 'O's and restore safe ones
>   for (let i = 0; i < rows; i++) {
>     for (let j = 0; j < cols; j++) {
>       if (board[i][j] === "O") board[i][j] = "X";
>       else if (board[i][j] === "S") board[i][j] = "O";
>     }
>   }
> }
>
> function markSafe(board: string[][], row: number, col: number): void {
>   if (
>     row < 0 ||
>     row >= board.length ||
>     col < 0 ||
>     col >= board[0].length ||
>     board[row][col] !== "O"
>   ) {
>     return;
>   }
>
>   board[row][col] = "S"; // Mark as safe
>
>   markSafe(board, row - 1, col);
>   markSafe(board, row + 1, col);
>   markSafe(board, row, col - 1);
>   markSafe(board, row, col + 1);
> }
> ```
>
> **Key Insight:** Start from borders and mark connected regions as "safe" before capturing

---

## ⚡ Performance Analysis [[README|🏠]]

| Operation     | Average | Worst Case | Space  | Notes                                |
| ------------- | ------- | ---------- | ------ | ------------------------------------ |
| DFS Traversal | O(m×n)  | O(m×n)     | O(m×n) | Recursive call stack in worst case   |
| BFS Traversal | O(m×n)  | O(m×n)     | O(m×n) | Queue can hold all cells             |
| Island Count  | O(m×n)  | O(m×n)     | O(1)   | In-place modification possible       |
| Flood Fill    | O(m×n)  | O(m×n)     | O(m×n) | Recursive depth proportional to area |
| Area Calc     | O(m×n)  | O(m×n)     | O(m×n) | Each cell visited once               |

> [!note]- Performance Considerations
>
> - **Stack overflow risk** - DFS can cause stack overflow on large connected components
> - **Memory usage** - BFS queue can consume significant memory for large regions
> - **In-place optimization** - Modifying original grid saves space but destroys input
> - **Early termination** - Some problems allow stopping early when target found

---

## 🔄 Advanced Variations [[README|🏠]]

> [!info]- Variation 1: 8-Directional Traversal
>
> Include diagonal connections for more comprehensive region detection
>
> - **Use case:** Chess piece movement, comprehensive region analysis
> - **Example:** Connected components with diagonal adjacency

> [!info]- Variation 2: Multi-Value Grids
>
> Handle grids with multiple values and complex connection rules
>
> - **Use case:** Color-based grouping, terrain type analysis
> - **Example:** Group cells by color or property similarity

> [!info]- Variation 3: Weighted Distance Traversal
>
> Incorporate distance or cost calculations during traversal
>
> - **Use case:** Shortest path in grid, distance-based grouping
> - **Example:** Find shortest path through obstacles

> [!info]- Variation 4: Boundary Tracking
>
> Track and return the perimeter or boundary of discovered regions
>
> - **Use case:** Calculating perimeter, extracting region boundaries
> - **Example:** Island perimeter calculation

---

## ⚠️ Edge Cases & Gotchas [[README|🏠]]

> [!warning]- Critical Edge Cases
>
> - **Empty grid** - Handle null or empty matrix inputs
> - **Single cell** - Ensure algorithms work for 1×1 grids
> - **All same values** - Handle grids where all cells are identical
> - **Stack overflow** - Large connected regions can cause recursion limits
> - **Boundary conditions** - Careful index checking at grid edges
> - **Memory limits** - Large grids can exceed available memory
> - **Input modification** - Decide whether to preserve original grid

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty grid `[]`
> - Single cell `[[1]]`
> - All zeros `[[0,0],[0,0]]`
> - All ones `[[1,1],[1,1]]`
> - No connections `[[1,0],[0,1]]`
> - Large connected component `[[1,1,1],[1,1,1]]`

---

## 🎯 Practice Exercises [[README|🏠]]

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/200/problem|200. Number of Islands]]** - Learn basic DFS island counting
> 2. **Practice:** Implement `floodFill()` function with color replacement
> 3. **Practice:** Create `maxAreaOfIsland()` with area calculation
> 4. **Challenge:** Solve surrounded regions without extra space
>
> **Key Learning Points:**
>
> - Understanding when to use DFS vs BFS for traversal
> - Managing recursive call stack depth
> - Choosing between in-place modification and visited arrays
> - Handling boundary conditions and edge cases

> [!note]- Pro Tips
>
> 1. **Choose Traversal Type:** Use DFS for simplicity, BFS for shortest paths
> 2. **Manage Stack Depth:** Consider iterative solutions for large grids
> 3. **Optimize Space:** Use in-place marking when input modification is allowed
> 4. **Direction Vectors:** Create reusable direction arrays for cleaner code
> 5. **Boundary Checks:** Always validate coordinates before array access

---

## 🔗 Related LeetCode Problems [[README|🏠]]

- [[problems/200/problem|200. Number of Islands]] - Classic island counting problem
- **695. Max Area of Island** - Find largest connected component
- **733. Flood Fill** - Basic region filling algorithm
- **130. Surrounded Regions** - Border-connected region analysis
- **1020. Number of Enclaves** - Count isolated land cells
- **463. Island Perimeter** - Calculate boundary of connected regions
- **79. Word Search** - Backtracking with matrix traversal

---

## 🧠 Brain Connections [[README|🏠]]

- **Graph Traversal** → [[patterns/graph-traversal|Graph Traversal Pattern]] - Matrix is a special case of graph
- **Backtracking** → [[patterns/backtracking|Backtracking Pattern]] - Used in word search problems
- **Dynamic Programming** → Grid-based DP problems use similar traversal
- **Flood Fill Algorithms** → [[README|Matrix Problems]] - Core computer graphics technique

---

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** Look for connected components or region-based operations in 2D grids
- 🔧 **Implementation Choice:** Choose DFS for simplicity, BFS for level-by-level processing or shortest paths
- ⚡ **Performance:** Consider iterative solutions to avoid stack overflow on large connected regions
- 🎯 **Edge Cases:** Always validate grid boundaries and handle empty grids gracefully
