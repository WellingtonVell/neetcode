---
tags: [pattern, union-find, disjoint-set, graph, connectivity, data-structure]
aliases: [disjoint-set-union, dsu, find-union, merge-find]
type: pattern-guide
difficulty: Intermediate
time_complexity: "O(α(n))"
space_complexity: "O(n)"
prerequisites: [arrays, trees, graph-theory]
related_patterns: [graphs, depth-first-search]
leetcode_problems: [200, 547, 684, 721, 737, 990]
emoji: 🔗
title: Union Find
description: Efficiently track connectivity and grouping using disjoint sets with path compression and union by rank optimizations
---

[[README|🏠HOME]]

# 🔗 Union Find

## Overview

The Union Find (Disjoint Set Union) pattern maintains a collection of disjoint sets and supports two primary operations efficiently:

- **Find Operations** - Determine which set an element belongs to (with path compression)
- **Union Operations** - Merge two sets into one (with union by rank)
- **Connectivity Queries** - Check if two elements are in the same connected component
- **Dynamic Connectivity** - Handle connections that change over time
- **Graph Component Analysis** - Find connected components in graphs
- **Equivalence Relations** - Track equivalence classes and partitions

With path compression and union by rank optimizations, operations run in nearly constant amortized time O(α(n)).

> _**Think of Union Find as a forest of family trees - you can quickly find someone's family root and merge families through marriage, with smart shortcuts to avoid long family chains!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Connectivity Problems** - Checking if two elements are connected
> - **Graph Components** - Finding connected components in undirected graphs
> - **Dynamic Connectivity** - Handling connections that change over time
> - **Equivalence Relations** - Tracking groups of equivalent elements
> - **Cycle Detection** - Detecting cycles in graph construction
> - **Percolation Problems** - Modeling connectivity in grids and networks

> [!warning]- Avoid When
>
> - **Directed Graphs** - Union Find works only with undirected relationships
> - **Path Information** - When you need actual paths between nodes, not just connectivity
> - **Deletion Required** - Standard Union Find doesn't support efficient disconnection
> - **Small Fixed Groups** - When simple arrays or sets would be more straightforward
> - **Complex Queries** - When you need more than connectivity (like shortest paths)

---

## 💻 Core Implementations

> [!info]- TypeScript

> ### 1. Basic Union Find with Path Compression
>
> ```typescript
> class UnionFind {
>   private parent: number[];
>   private rank: number[];
>   public components: number;
>
>   constructor(n: number) {
>     this.parent = Array.from({ length: n }, (_, i) => i);
>     this.rank = new Array(n).fill(0);
>     this.components = n;
>   }
>
>   // Find with path compression
>   find(x: number): number {
>     if (this.parent[x] !== x) {
>       this.parent[x] = this.find(this.parent[x]); // Path compression
>     }
>     return this.parent[x];
>   }
>
>   // Union by rank
>   union(x: number, y: number): boolean {
>     const rootX = this.find(x);
>     const rootY = this.find(y);
>
>     if (rootX === rootY) {
>       return false; // Already connected
>     }
>
>     // Union by rank - attach smaller tree under root of larger tree
>     if (this.rank[rootX] < this.rank[rootY]) {
>       this.parent[rootX] = rootY;
>     } else if (this.rank[rootX] > this.rank[rootY]) {
>       this.parent[rootY] = rootX;
>     } else {
>       this.parent[rootY] = rootX;
>       this.rank[rootX]++;
>     }
>
>     this.components--;
>     return true;
>   }
>
>   // Check if two elements are connected
>   connected(x: number, y: number): boolean {
>     return this.find(x) === this.find(y);
>   }
>
>   // Get size of component containing x
>   getComponentSize(x: number): number {
>     const root = this.find(x);
>     let size = 0;
>     for (let i = 0; i < this.parent.length; i++) {
>       if (this.find(i) === root) {
>         size++;
>       }
>     }
>     return size;
>   }
> }
> ```
>
> ### 2. Union Find with Size Tracking
>
> ```typescript
> class WeightedUnionFind {
>   private parent: number[];
>   private size: number[];
>   public components: number;
>
>   constructor(n: number) {
>     this.parent = Array.from({ length: n }, (_, i) => i);
>     this.size = new Array(n).fill(1);
>     this.components = n;
>   }
>
>   find(x: number): number {
>     if (this.parent[x] !== x) {
>       this.parent[x] = this.find(this.parent[x]);
>     }
>     return this.parent[x];
>   }
>
>   union(x: number, y: number): boolean {
>     const rootX = this.find(x);
>     const rootY = this.find(y);
>
>     if (rootX === rootY) return false;
>
>     // Union by size - attach smaller tree under larger tree
>     if (this.size[rootX] < this.size[rootY]) {
>       this.parent[rootX] = rootY;
>       this.size[rootY] += this.size[rootX];
>     } else {
>       this.parent[rootY] = rootX;
>       this.size[rootX] += this.size[rootY];
>     }
>
>     this.components--;
>     return true;
>   }
>
>   getSize(x: number): number {
>     return this.size[this.find(x)];
>   }
>
>   getLargestComponent(): number {
>     return Math.max(...this.size);
>   }
> }
> ```
>
> ### 3. Number of Islands using Union Find
>
> ```typescript
> function numIslands(grid: string[][]): number {
>   if (!grid || grid.length === 0) return 0;
>
>   const rows = grid.length;
>   const cols = grid[0].length;
>   const uf = new UnionFind(rows * cols);
>   let waterCells = 0;
>
>   // Convert 2D coordinates to 1D index
>   const getIndex = (r: number, c: number) => r * cols + c;
>
>   const directions = [
>     [-1, 0],
>     [1, 0],
>     [0, -1],
>     [0, 1],
>   ];
>
>   for (let i = 0; i < rows; i++) {
>     for (let j = 0; j < cols; j++) {
>       if (grid[i][j] === "0") {
>         waterCells++;
>         continue;
>       }
>
>       // Connect to adjacent land cells
>       for (const [di, dj] of directions) {
>         const ni = i + di;
>         const nj = j + dj;
>
>         if (
>           ni >= 0 &&
>           ni < rows &&
>           nj >= 0 &&
>           nj < cols &&
>           grid[ni][nj] === "1"
>         ) {
>           uf.union(getIndex(i, j), getIndex(ni, nj));
>         }
>       }
>     }
>   }
>
>   return uf.components - waterCells;
> }
> ```

> [!info]- Golang

> ### 1. Basic Union Find Implementation
>
> ```go
> type UnionFind struct {
>     parent     []int
>     rank       []int
>     components int
> }
>
> func NewUnionFind(n int) *UnionFind {
>     parent := make([]int, n)
>     rank := make([]int, n)
>
>     for i := 0; i < n; i++ {
>         parent[i] = i
>     }
>
>     return &UnionFind{
>         parent:     parent,
>         rank:       rank,
>         components: n,
>     }
> }
>
> func (uf *UnionFind) Find(x int) int {
>     if uf.parent[x] != x {
>         uf.parent[x] = uf.Find(uf.parent[x]) // Path compression
>     }
>     return uf.parent[x]
> }
>
> func (uf *UnionFind) Union(x, y int) bool {
>     rootX := uf.Find(x)
>     rootY := uf.Find(y)
>
>     if rootX == rootY {
>         return false
>     }
>
>     // Union by rank
>     if uf.rank[rootX] < uf.rank[rootY] {
>         uf.parent[rootX] = rootY
>     } else if uf.rank[rootX] > uf.rank[rootY] {
>         uf.parent[rootY] = rootX
>     } else {
>         uf.parent[rootY] = rootX
>         uf.rank[rootX]++
>     }
>
>     uf.components--
>     return true
> }
>
> func (uf *UnionFind) Connected(x, y int) bool {
>     return uf.Find(x) == uf.Find(y)
> }
> ```
>
> ### 2. Account Merge Problem
>
> ```go
> func accountsMerge(accounts [][]string) [][]string {
>     emailToIndex := make(map[string]int)
>     emailToName := make(map[string]string)
>     index := 0
>
>     // Assign index to each unique email
>     for _, account := range accounts {
>         name := account[0]
>         for i := 1; i < len(account); i++ {
>             email := account[i]
>             if _, exists := emailToIndex[email]; !exists {
>                 emailToIndex[email] = index
>                 emailToName[email] = name
>                 index++
>             }
>         }
>     }
>
>     uf := NewUnionFind(index)
>
>     // Union emails within same account
>     for _, account := range accounts {
>         firstEmailIndex := emailToIndex[account[1]]
>         for i := 2; i < len(account); i++ {
>             uf.Union(firstEmailIndex, emailToIndex[account[i]])
>         }
>     }
>
>     // Group emails by root
>     rootToEmails := make(map[int][]string)
>     for email, idx := range emailToIndex {
>         root := uf.Find(idx)
>         rootToEmails[root] = append(rootToEmails[root], email)
>     }
>
>     // Build result
>     var result [][]string
>     for _, emails := range rootToEmails {
>         sort.Strings(emails)
>         name := emailToName[emails[0]]
>         account := append([]string{name}, emails...)
>         result = append(result, account)
>     }
>
>     return result
> }
> ```
>
> ### 3. Redundant Connection Detection
>
> ```go
> func findRedundantConnection(edges [][]int) []int {
>     n := len(edges)
>     uf := NewUnionFind(n + 1) // 1-indexed
>
>     for _, edge := range edges {
>         u, v := edge[0], edge[1]
>         if uf.Connected(u, v) {
>             return edge // This edge creates a cycle
>         }
>         uf.Union(u, v)
>     }
>
>     return nil
> }
> ```
>
> ### 4. Number of Provinces
>
> ```go
> func findCircleNum(isConnected [][]int) int {
>     n := len(isConnected)
>     uf := NewUnionFind(n)
>
>     for i := 0; i < n; i++ {
>         for j := i + 1; j < n; j++ {
>             if isConnected[i][j] == 1 {
>                 uf.Union(i, j)
>             }
>         }
>     }
>
>     return uf.components
> }
> ```

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Connected Components
>
> **Problem:** Find the number of connected components in an undirected graph
>
> ```typescript
> function countComponents(n: number, edges: number[][]): number {
>   const uf = new UnionFind(n);
>
>   // Union all connected nodes
>   for (const [u, v] of edges) {
>     uf.union(u, v);
>   }
>
>   return uf.components;
> }
> ```
>
> **Key Insight:** Each union operation reduces component count by 1; final count gives connected components

> [!example]- Pattern 2: Cycle Detection in Graph Construction
>
> **Problem:** Detect when adding an edge creates a cycle (redundant connection)
>
> ```typescript
> function findRedundantConnection(edges: number[][]): number[] {
>   const uf = new UnionFind(edges.length + 1); // 1-indexed
>
>   for (const [u, v] of edges) {
>     if (uf.connected(u, v)) {
>       return [u, v]; // Adding this edge creates a cycle
>     }
>     uf.union(u, v);
>   }
>
>   return [];
> }
> ```
>
> **Key Insight:** If two nodes are already connected before adding an edge, that edge creates a cycle

> [!example]- Pattern 3: Equivalence Relations and Grouping
>
> **Problem:** Group similar sentences together (similar strings problem)
>
> ```typescript
> function areSentencesSimilarTwo(
>   sentence1: string[],
>   sentence2: string[],
>   similarPairs: string[][]
> ): boolean {
>   if (sentence1.length !== sentence2.length) return false;
>
>   // Map words to indices
>   const wordToIndex = new Map<string, number>();
>   let index = 0;
>
>   const getIndex = (word: string): number => {
>     if (!wordToIndex.has(word)) {
>       wordToIndex.set(word, index++);
>     }
>     return wordToIndex.get(word)!;
>   };
>
>   const uf = new UnionFind(index + similarPairs.length * 2);
>
>   // Union similar word pairs
>   for (const [word1, word2] of similarPairs) {
>     uf.union(getIndex(word1), getIndex(word2));
>   }
>
>   // Check if corresponding words are in same equivalence class
>   for (let i = 0; i < sentence1.length; i++) {
>     const idx1 = getIndex(sentence1[i]);
>     const idx2 = getIndex(sentence2[i]);
>
>     if (!uf.connected(idx1, idx2)) {
>       return false;
>     }
>   }
>
>   return true;
> }
> ```
>
> **Key Insight:** Build equivalence classes using transitivity; check if elements belong to same class

> [!example]- Pattern 4: Grid Connectivity (Percolation)
>
> **Problem:** Check if there's a path from top to bottom in a grid
>
> ```typescript
> function percolates(grid: number[][]): boolean {
>   const rows = grid.length;
>   const cols = grid[0].length;
>
>   // Create virtual top and bottom nodes
>   const uf = new UnionFind(rows * cols + 2);
>   const virtualTop = rows * cols;
>   const virtualBottom = rows * cols + 1;
>
>   const getIndex = (r: number, c: number) => r * cols + c;
>   const directions = [
>     [-1, 0],
>     [1, 0],
>     [0, -1],
>     [0, 1],
>   ];
>
>   for (let i = 0; i < rows; i++) {
>     for (let j = 0; j < cols; j++) {
>       if (grid[i][j] === 1) {
>         // Open cell
>         const current = getIndex(i, j);
>
>         // Connect to virtual top if in first row
>         if (i === 0) {
>           uf.union(current, virtualTop);
>         }
>
>         // Connect to virtual bottom if in last row
>         if (i === rows - 1) {
>           uf.union(current, virtualBottom);
>         }
>
>         // Connect to adjacent open cells
>         for (const [di, dj] of directions) {
>           const ni = i + di;
>           const nj = j + dj;
>
>           if (
>             ni >= 0 &&
>             ni < rows &&
>             nj >= 0 &&
>             nj < cols &&
>             grid[ni][nj] === 1
>           ) {
>             uf.union(current, getIndex(ni, nj));
>           }
>         }
>       }
>     }
>   }
>
>   return uf.connected(virtualTop, virtualBottom);
> }
> ```
>
> **Key Insight:** Use virtual nodes to simplify connectivity queries; connect boundaries to virtual nodes

---

## ⚡ Performance Analysis

| Operation                    | Time Complexity | Space Complexity | Notes                           |
| ---------------------------- | --------------- | ---------------- | ------------------------------- |
| Find (with path compression) | O(α(n))         | O(1)             | α is inverse Ackermann function |
| Union (by rank/size)         | O(α(n))         | O(1)             | Amortized nearly constant       |
| Connected                    | O(α(n))         | O(1)             | Two find operations             |
| Initialization               | O(n)            | O(n)             | Create parent and rank arrays   |
| Overall (m operations)       | O(m α(n))       | O(n)             | α(n) ≤ 4 for practical values   |

> [!note]- Performance Considerations
>
> - **Path Compression:** Makes trees almost flat, dramatically improving performance
> - **Union by Rank/Size:** Keeps trees balanced, preventing degenerate linear chains
> - **Inverse Ackermann:** α(n) grows extremely slowly, effectively constant for practical inputs
> - **Space Optimization:** Only need parent array; rank/size arrays are optimizations

---

## 🔄 Advanced Variations

> [!info]- Variation 1: Weighted Union Find
>
> Track additional information like path weights or distances
>
> - **Use case:** Shortest path problems, network flow
> - **Example:** Evaluate Division, Satisfiability of Equality Equations

> [!info]- Variation 2: Persistent Union Find
>
> Support querying historical states of the data structure
>
> - **Use case:** Time-travel queries, versioned data
> - **Example:** Dynamic connectivity with rollback

> [!info]- Variation 3: Union Find with Deletions
>
> Support removing connections (much more complex)
>
> - **Use case:** Dynamic graphs with edge removals
> - **Example:** Link-cut trees, top trees

> [!info]- Variation 4: Range Union Find
>
> Union and query ranges instead of individual elements
>
> - **Use case:** Interval merging, range connectivity
> - **Example:** Merge intervals, calendar scheduling

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Self Loops** - Handle union(x, x) gracefully (should return false)
> - **Invalid Indices** - Ensure indices are within valid range [0, n)
> - **Empty Input** - Handle graphs with no edges or single nodes
> - **Disconnected Components** - Some nodes may never be unioned
> - **1-indexed vs 0-indexed** - Be consistent with problem's indexing
> - **Multiple Queries** - Reuse Union Find instance when possible
> - **Component Counting** - Track component count correctly during unions

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Single node graph `n=1, edges=[]`
> - Complete graph (all nodes connected)
> - Linear chain `1-2-3-4-5`
> - Multiple disconnected components
> - Graph with cycles
> - Self-loops and duplicate edges
> - Maximum size graphs for performance

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/547/problem|547. Number of Provinces]]** - Basic connected components
> 2. **Practice:** Implement `numIslands()` using Union Find approach
> 3. **Practice:** Solve `findRedundantConnection()` for cycle detection
> 4. **Challenge:** Tackle `accountsMerge()` for complex grouping
>
> **Key Learning Points:**
>
> - Master path compression and union by rank optimizations
> - Understand when Union Find is preferred over DFS/BFS
> - Practice mapping 2D coordinates to 1D indices
> - Learn to handle equivalence relations and transitive properties

> [!note]- Pro Tips
>
> 1. **Always implement path compression** - Essential for good performance
> 2. **Choose union by rank or size** - Both prevent degenerate trees
> 3. **Track component count** - Useful for many problems
> 4. **Use virtual nodes** - Simplify boundary conditions in grids
> 5. **Index mapping** - Convert strings/objects to integers for efficiency

---

## 🔗 Related LeetCode Problems

- [[problems/200/problem|200. Number of Islands]] - Grid connectivity with Union Find
- **547. Number of Provinces** - Basic connected components
- **684. Redundant Connection** - Cycle detection in undirected graph
- **721. Accounts Merge** - Grouping with equivalence relations
- **737. Sentence Similarity II** - Transitive relationships
- **990. Satisfiability of Equality Equations** - Constraint satisfaction

---

## 🧠 Brain Connections

- **Graph Theory** → [[patterns/graphs|Graph Algorithms Pattern]] - Connected components and cycle detection
- **Disjoint Sets** → Mathematical foundation for equivalence relations
- **Trees** → Union Find maintains forest of trees with optimizations
- **Dynamic Programming** → Some Union Find problems have DP alternatives but less efficient

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when you need to track connectivity, grouping, or equivalence relations dynamically
- 🔧 **Implementation Choice:** Always use path compression and union by rank/size for optimal performance
- ⚡ **Performance:** Nearly constant time operations make it ideal for dynamic connectivity problems
- 🎯 **Edge Cases:** Handle self-loops, invalid indices, and maintain component counts correctly during operations

---
