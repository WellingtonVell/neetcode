---
tags: [pattern, graphs, topological-sort, dfs, bfs, algorithms, data-structure]
aliases: [graph-algorithms, topological-ordering, dependency-resolution]
type: pattern-guide
difficulty: Advanced
time_complexity: "O(V + E)"
space_complexity: "O(V)"
prerequisites: [graphs, dfs, bfs, adjacency-list]
related_patterns: [breadth-first-search, depth-first-search]
leetcode_problems: [207, 210, 269, 802, 1136, 310]
emoji: 🕸️
title: Graph Algorithms
description: Master graph traversal, topological sorting, cycle detection, and dependency resolution in directed and undirected graphs
---

[[README|🏠HOME]]

# 🕸️ Graph Algorithms

## Overview

The Graph Algorithms pattern encompasses fundamental techniques for working with graph data structures:

- **Topological Sorting** - Order nodes in directed acyclic graphs (DAGs) respecting dependencies
- **Cycle Detection** - Identify cycles in directed and undirected graphs
- **Graph Traversal** - Systematically visit all nodes using DFS and BFS variations
- **Dependency Resolution** - Solve scheduling and prerequisite problems
- **Connected Components** - Find strongly/weakly connected components
- **Shortest Path** - Find optimal paths between nodes (when combined with other patterns)

This pattern is essential for modeling relationships, dependencies, and hierarchical structures in complex systems.

> _**Think of graphs as a map of relationships - topological sort is like finding the perfect order to visit places without violating any one-way street rules!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Dependency Resolution** - When tasks have prerequisites or dependencies
> - **Scheduling Problems** - Ordering tasks while respecting constraints
> - **Cycle Detection** - Detecting deadlocks or circular dependencies
> - **Course Prerequisites** - Academic scheduling with prerequisite courses
> - **Build Systems** - Determining compilation order for modules
> - **Workflow Management** - Ordering steps in complex processes

> [!warning]- Avoid When
>
> - **Cyclic Dependencies** - Topological sort only works on DAGs (Directed Acyclic Graphs)
> - **Undirected Graphs** - Topological ordering requires directed edges
> - **Simple Linear Order** - When simple sorting suffices without dependencies
> - **Dynamic Graphs** - When graph structure changes frequently during processing
> - **Weighted Optimization** - When edge weights matter for optimal solutions

---

## 💻 Core Implementations

> [!info]- TypeScript

> ### 1. Kahn's Algorithm (BFS-based Topological Sort)
>
> ```typescript
> function topologicalSort(
>   numCourses: number,
>   prerequisites: number[][]
> ): number[] {
>   // Build adjacency list and in-degree array
>   const graph: number[][] = Array(numCourses)
>     .fill(null)
>     .map(() => []);
>   const inDegree: number[] = new Array(numCourses).fill(0);
>
>   // Build graph
>   for (const [course, prereq] of prerequisites) {
>     graph[prereq].push(course);
>     inDegree[course]++;
>   }
>
>   // Initialize queue with nodes having no dependencies
>   const queue: number[] = [];
>   for (let i = 0; i < numCourses; i++) {
>     if (inDegree[i] === 0) {
>       queue.push(i);
>     }
>   }
>
>   const result: number[] = [];
>
>   while (queue.length > 0) {
>     const course = queue.shift()!;
>     result.push(course);
>
>     // Process neighbors
>     for (const neighbor of graph[course]) {
>       inDegree[neighbor]--;
>       if (inDegree[neighbor] === 0) {
>         queue.push(neighbor);
>       }
>     }
>   }
>
>   // Check for cycles
>   return result.length === numCourses ? result : [];
> }
> ```
>
> ### 2. DFS-based Topological Sort with Cycle Detection
>
> ```typescript
> function topologicalSortDFS(
>   numCourses: number,
>   prerequisites: number[][]
> ): number[] {
>   const graph: number[][] = Array(numCourses)
>     .fill(null)
>     .map(() => []);
>   const visited: boolean[] = new Array(numCourses).fill(false);
>   const visiting: boolean[] = new Array(numCourses).fill(false);
>   const result: number[] = [];
>
>   // Build adjacency list
>   for (const [course, prereq] of prerequisites) {
>     graph[prereq].push(course);
>   }
>
>   function dfs(course: number): boolean {
>     if (visiting[course]) return false; // Cycle detected
>     if (visited[course]) return true; // Already processed
>
>     visiting[course] = true; // Mark as currently visiting
>
>     // Visit all neighbors
>     for (const neighbor of graph[course]) {
>       if (!dfs(neighbor)) return false;
>     }
>
>     visiting[course] = false; // Done visiting
>     visited[course] = true; // Mark as completely processed
>     result.push(course); // Add to result (reverse postorder)
>
>     return true;
>   }
>
>   // Try DFS from each unvisited node
>   for (let i = 0; i < numCourses; i++) {
>     if (!visited[i] && !dfs(i)) {
>       return []; // Cycle detected
>     }
>   }
>
>   return result.reverse(); // Reverse to get correct topological order
> }
> ```
>
> ### 3. Course Schedule with Prerequisites
>
> ```typescript
> function canFinish(numCourses: number, prerequisites: number[][]): boolean {
>   const graph: number[][] = Array(numCourses)
>     .fill(null)
>     .map(() => []);
>   const inDegree: number[] = new Array(numCourses).fill(0);
>
>   // Build graph and calculate in-degrees
>   for (const [course, prereq] of prerequisites) {
>     graph[prereq].push(course);
>     inDegree[course]++;
>   }
>
>   // Start with courses having no prerequisites
>   const queue: number[] = [];
>   for (let i = 0; i < numCourses; i++) {
>     if (inDegree[i] === 0) {
>       queue.push(i);
>     }
>   }
>
>   let completed = 0;
>
>   while (queue.length > 0) {
>     const course = queue.shift()!;
>     completed++;
>
>     // Process courses that depend on this one
>     for (const dependent of graph[course]) {
>       inDegree[dependent]--;
>       if (inDegree[dependent] === 0) {
>         queue.push(dependent);
>       }
>     }
>   }
>
>   return completed === numCourses; // True if no cycles
> }
> ```
>
> ### 4. Alien Dictionary (Custom Topological Sort)
>
> ```typescript
> function alienOrder(words: string[]): string {
>   const graph = new Map<string, Set<string>>();
>   const inDegree = new Map<string, number>();
>
>   // Initialize all characters
>   for (const word of words) {
>     for (const char of word) {
>       if (!graph.has(char)) {
>         graph.set(char, new Set());
>         inDegree.set(char, 0);
>       }
>     }
>   }
>
>   // Build graph by comparing adjacent words
>   for (let i = 0; i < words.length - 1; i++) {
>     const word1 = words[i];
>     const word2 = words[i + 1];
>     const minLen = Math.min(word1.length, word2.length);
>
>     // Invalid case: longer word is prefix of shorter word
>     if (word1.length > word2.length && word1.startsWith(word2)) {
>       return "";
>     }
>
>     // Find first differing character
>     for (let j = 0; j < minLen; j++) {
>       if (word1[j] !== word2[j]) {
>         const from = word1[j];
>         const to = word2[j];
>
>         if (!graph.get(from)!.has(to)) {
>           graph.get(from)!.add(to);
>           inDegree.set(to, inDegree.get(to)! + 1);
>         }
>         break; // Only first difference matters
>       }
>     }
>   }
>
>   // Topological sort using Kahn's algorithm
>   const queue: string[] = [];
>   for (const [char, degree] of inDegree) {
>     if (degree === 0) {
>       queue.push(char);
>     }
>   }
>
>   let result = "";
>
>   while (queue.length > 0) {
>     const char = queue.shift()!;
>     result += char;
>
>     for (const neighbor of graph.get(char)!) {
>       inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
>       if (inDegree.get(neighbor) === 0) {
>         queue.push(neighbor);
>       }
>     }
>   }
>
>   return result.length === inDegree.size ? result : "";
> }
> ```

> [!info]- Golang

> ### 1. Course Schedule (Kahn's Algorithm)
>
> ```go
> func canFinish(numCourses int, prerequisites [][]int) bool {
>     // Build adjacency list and in-degree array
>     graph := make([][]int, numCourses)
>     inDegree := make([]int, numCourses)
>
>     for _, prereq := range prerequisites {
>         course, pre := prereq[0], prereq[1]
>         graph[pre] = append(graph[pre], course)
>         inDegree[course]++
>     }
>
>     // Initialize queue with courses having no prerequisites
>     queue := []int{}
>     for i := 0; i < numCourses; i++ {
>         if inDegree[i] == 0 {
>             queue = append(queue, i)
>         }
>     }
>
>     completed := 0
>
>     for len(queue) > 0 {
>         course := queue[0]
>         queue = queue[1:]
>         completed++
>
>         // Process dependent courses
>         for _, dependent := range graph[course] {
>             inDegree[dependent]--
>             if inDegree[dependent] == 0 {
>                 queue = append(queue, dependent)
>             }
>         }
>     }
>
>     return completed == numCourses
> }
> ```
>
> ### 2. Find Order (Topological Sort)
>
> ```go
> func findOrder(numCourses int, prerequisites [][]int) []int {
>     graph := make([][]int, numCourses)
>     inDegree := make([]int, numCourses)
>
>     // Build graph
>     for _, prereq := range prerequisites {
>         course, pre := prereq[0], prereq[1]
>         graph[pre] = append(graph[pre], course)
>         inDegree[course]++
>     }
>
>     // Initialize queue
>     queue := []int{}
>     for i := 0; i < numCourses; i++ {
>         if inDegree[i] == 0 {
>             queue = append(queue, i)
>         }
>     }
>
>     result := []int{}
>
>     for len(queue) > 0 {
>         course := queue[0]
>         queue = queue[1:]
>         result = append(result, course)
>
>         for _, dependent := range graph[course] {
>             inDegree[dependent]--
>             if inDegree[dependent] == 0 {
>                 queue = append(queue, dependent)
>             }
>         }
>     }
>
>     if len(result) == numCourses {
>         return result
>     }
>     return []int{} // Cycle detected
> }
> ```
>
> ### 3. Cycle Detection using DFS
>
> ```go
> func hasCycle(graph [][]int) bool {
>     n := len(graph)
>     white := make([]bool, n) // Unvisited
>     gray := make([]bool, n)  // Visiting
>     black := make([]bool, n) // Visited
>
>     // Initialize all nodes as white (unvisited)
>     for i := 0; i < n; i++ {
>         white[i] = true
>     }
>
>     var dfs func(node int) bool
>     dfs = func(node int) bool {
>         if gray[node] {
>             return true // Back edge found - cycle detected
>         }
>         if black[node] {
>             return false // Already processed
>         }
>
>         // Mark as visiting (gray)
>         white[node] = false
>         gray[node] = true
>
>         // Visit neighbors
>         for _, neighbor := range graph[node] {
>             if dfs(neighbor) {
>                 return true
>             }
>         }
>
>         // Mark as visited (black)
>         gray[node] = false
>         black[node] = true
>
>         return false
>     }
>
>     // Check each unvisited node
>     for i := 0; i < n; i++ {
>         if white[i] && dfs(i) {
>             return true
>         }
>     }
>
>     return false
> }
> ```
>
> ### 4. Minimum Height Trees
>
> ```go
> func findMinHeightTrees(n int, edges [][]int) []int {
>     if n == 1 {
>         return []int{0}
>     }
>
>     // Build adjacency list
>     graph := make([][]int, n)
>     degree := make([]int, n)
>
>     for _, edge := range edges {
>         u, v := edge[0], edge[1]
>         graph[u] = append(graph[u], v)
>         graph[v] = append(graph[v], u)
>         degree[u]++
>         degree[v]++
>     }
>
>     // Start with leaf nodes (degree 1)
>     queue := []int{}
>     for i := 0; i < n; i++ {
>         if degree[i] == 1 {
>             queue = append(queue, i)
>         }
>     }
>
>     remaining := n
>
>     // Remove leaves layer by layer
>     for remaining > 2 {
>         size := len(queue)
>         remaining -= size
>
>         for i := 0; i < size; i++ {
>             leaf := queue[0]
>             queue = queue[1:]
>
>             // Remove leaf and update neighbors
>             for _, neighbor := range graph[leaf] {
>                 degree[neighbor]--
>                 if degree[neighbor] == 1 {
>                     queue = append(queue, neighbor)
>                 }
>             }
>         }
>     }
>
>     // Remaining nodes are the MHT roots
>     result := []int{}
>     for i := 0; i < n; i++ {
>         if degree[i] >= 1 {
>             result = append(result, i)
>         }
>     }
>
>     return result
> }
> ```

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Course Scheduling (Cycle Detection)
>
> **Problem:** Determine if all courses can be finished given prerequisites
>
> ```typescript
> function canFinish(numCourses: number, prerequisites: number[][]): boolean {
>   const graph: number[][] = Array(numCourses)
>     .fill(null)
>     .map(() => []);
>   const inDegree: number[] = new Array(numCourses).fill(0);
>
>   // Build graph and calculate in-degrees
>   for (const [course, prereq] of prerequisites) {
>     graph[prereq].push(course);
>     inDegree[course]++;
>   }
>
>   // Start with courses having no prerequisites
>   const queue: number[] = [];
>   for (let i = 0; i < numCourses; i++) {
>     if (inDegree[i] === 0) {
>       queue.push(i);
>     }
>   }
>
>   let completed = 0;
>
>   while (queue.length > 0) {
>     const course = queue.shift()!;
>     completed++;
>
>     // Process dependent courses
>     for (const dependent of graph[course]) {
>       inDegree[dependent]--;
>       if (inDegree[dependent] === 0) {
>         queue.push(dependent);
>       }
>     }
>   }
>
>   return completed === numCourses; // No cycles if all courses completed
> }
> ```
>
> **Key Insight:** Use Kahn's algorithm; if we can't process all nodes, there's a cycle

> [!example]- Pattern 2: Task Scheduling Order (Topological Sort)
>
> **Problem:** Return a valid order to complete all tasks with dependencies
>
> ```typescript
> function findOrder(numTasks: number, dependencies: number[][]): number[] {
>   const graph: number[][] = Array(numTasks)
>     .fill(null)
>     .map(() => []);
>   const inDegree: number[] = new Array(numTasks).fill(0);
>
>   // Build dependency graph
>   for (const [task, dependency] of dependencies) {
>     graph[dependency].push(task);
>     inDegree[task]++;
>   }
>
>   // Find tasks with no dependencies
>   const queue: number[] = [];
>   for (let i = 0; i < numTasks; i++) {
>     if (inDegree[i] === 0) {
>       queue.push(i);
>     }
>   }
>
>   const result: number[] = [];
>
>   while (queue.length > 0) {
>     const task = queue.shift()!;
>     result.push(task);
>
>     // Remove this task and update dependents
>     for (const dependent of graph[task]) {
>       inDegree[dependent]--;
>       if (inDegree[dependent] === 0) {
>         queue.push(dependent);
>       }
>     }
>   }
>
>   return result.length === numTasks ? result : []; // Return empty if cycle
> }
> ```
>
> **Key Insight:** Build result by processing nodes with zero in-degree first

> [!example]- Pattern 3: Alien Dictionary (Custom Ordering)
>
> **Problem:** Derive character ordering from sorted alien dictionary words
>
> ```typescript
> function alienOrder(words: string[]): string {
>   const graph = new Map<string, Set<string>>();
>   const inDegree = new Map<string, number>();
>
>   // Initialize all characters
>   for (const word of words) {
>     for (const char of word) {
>       if (!graph.has(char)) {
>         graph.set(char, new Set());
>         inDegree.set(char, 0);
>       }
>     }
>   }
>
>   // Extract ordering constraints from adjacent words
>   for (let i = 0; i < words.length - 1; i++) {
>     const word1 = words[i];
>     const word2 = words[i + 1];
>
>     // Invalid: longer word prefixes shorter word
>     if (word1.length > word2.length && word1.startsWith(word2)) {
>       return "";
>     }
>
>     // Find first difference
>     for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
>       if (word1[j] !== word2[j]) {
>         if (!graph.get(word1[j])!.has(word2[j])) {
>           graph.get(word1[j])!.add(word2[j]);
>           inDegree.set(word2[j], inDegree.get(word2[j])! + 1);
>         }
>         break; // Only first difference matters
>       }
>     }
>   }
>
>   // Topological sort
>   const queue: string[] = [];
>   for (const [char, degree] of inDegree) {
>     if (degree === 0) queue.push(char);
>   }
>
>   let result = "";
>   while (queue.length > 0) {
>     const char = queue.shift()!;
>     result += char;
>
>     for (const neighbor of graph.get(char)!) {
>       inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
>       if (inDegree.get(neighbor) === 0) {
>         queue.push(neighbor);
>       }
>     }
>   }
>
>   return result.length === inDegree.size ? result : "";
> }
> ```
>
> **Key Insight:** Extract ordering constraints from word comparisons, apply topological sort

> [!example]- Pattern 4: Parallel Course Execution (Level-wise Processing)
>
> **Problem:** Find minimum semesters needed to complete all courses
>
> ```typescript
> function minimumSemesters(n: number, relations: number[][]): number {
>   const graph: number[][] = Array(n + 1)
>     .fill(null)
>     .map(() => []);
>   const inDegree: number[] = new Array(n + 1).fill(0);
>
>   // Build prerequisite graph
>   for (const [prev, next] of relations) {
>     graph[prev].push(next);
>     inDegree[next]++;
>   }
>
>   // Start with courses having no prerequisites
>   const queue: number[] = [];
>   for (let i = 1; i <= n; i++) {
>     if (inDegree[i] === 0) {
>       queue.push(i);
>     }
>   }
>
>   let semesters = 0;
>   let studied = 0;
>
>   while (queue.length > 0) {
>     const size = queue.length;
>     semesters++;
>
>     // Process all courses available this semester
>     for (let i = 0; i < size; i++) {
>       const course = queue.shift()!;
>       studied++;
>
>       // Enable dependent courses
>       for (const dependent of graph[course]) {
>         inDegree[dependent]--;
>         if (inDegree[dependent] === 0) {
>           queue.push(dependent);
>         }
>       }
>     }
>   }
>
>   return studied === n ? semesters : -1; // -1 if impossible due to cycles
> }
> ```
>
> **Key Insight:** Process nodes level by level; each level represents one time unit

---

## ⚡ Performance Analysis

| Algorithm                     | Time Complexity | Space Complexity | Notes                            |
| ----------------------------- | --------------- | ---------------- | -------------------------------- |
| Kahn's Algorithm              | O(V + E)        | O(V + E)         | BFS-based topological sort       |
| DFS Topological Sort          | O(V + E)        | O(V + E)         | Recursion stack + adjacency list |
| Cycle Detection (DFS)         | O(V + E)        | O(V)             | Three-color DFS approach         |
| Strongly Connected Components | O(V + E)        | O(V + E)         | Tarjan's or Kosaraju's algorithm |
| Minimum Height Trees          | O(V + E)        | O(V + E)         | Layer-by-layer leaf removal      |

> [!note]- Performance Considerations
>
> - **Graph Representation:** Adjacency list is most efficient for sparse graphs
> - **Space vs Time:** DFS uses less space but may hit recursion limits
> - **Cycle Detection:** Essential for validating DAG requirement
> - **Multiple Solutions:** Some problems may have multiple valid topological orders

---

## 🔄 Advanced Variations

> [!info]- Variation 1: Strongly Connected Components
>
> Find maximal sets of nodes where every node can reach every other node
>
> - **Use case:** Analyzing directed graph connectivity, dependency cycles
> - **Example:** Tarjan's algorithm, Kosaraju's algorithm

> [!info]- Variation 2: Critical Path Method (CPM)
>
> Find longest path in DAG for project scheduling
>
> - **Use case:** Project management, PERT charts
> - **Example:** Task scheduling with durations, critical path analysis

> [!info]- Variation 3: Hierarchical Topological Sort
>
> Group nodes into levels where each level can be processed in parallel
>
> - **Use case:** Parallel processing, pipeline optimization
> - **Example:** Compiler optimization, parallel task execution

> [!info]- Variation 4: Incremental Topological Sort
>
> Maintain topological order as edges are added/removed dynamically
>
> - **Use case:** Dynamic dependency systems, real-time scheduling
> - **Example:** Dynamic task scheduling, incremental compilation

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Cyclic Dependencies** - Topological sort impossible; detect and handle cycles
> - **Self-loops** - Node depending on itself creates trivial cycle
> - **Disconnected Components** - Multiple valid orderings may exist
> - **Empty Graph** - Handle graphs with no edges appropriately
> - **Single Node** - Trivial case but must be handled correctly
> - **Invalid Prerequisites** - Non-existent course references
> - **Duplicate Dependencies** - Same dependency listed multiple times

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty graph (no edges)
> - Single node with self-loop
> - Linear chain of dependencies
> - Diamond dependency pattern
> - Multiple disconnected components
> - Cyclic dependencies
> - Large graphs with deep dependency chains

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/207/problem|207. Course Schedule]]** - Master basic cycle detection
> 2. **Practice:** Implement `findOrder()` for topological ordering
> 3. **Practice:** Solve `alienOrder()` for custom ordering constraints
> 4. **Challenge:** Tackle minimum height trees with level-wise processing
>
> **Key Learning Points:**
>
> - Master both Kahn's algorithm and DFS-based approaches
> - Understand cycle detection using in-degree or three-color DFS
> - Practice building graphs from various input formats
> - Learn to handle edge cases and invalid inputs

> [!note]- Pro Tips
>
> 1. **Graph Building:** Always validate input and handle duplicates
> 2. **Cycle Detection:** Use Kahn's algorithm or DFS with visiting states
> 3. **Multiple Solutions:** Some problems have multiple valid topological orders
> 4. **Space Optimization:** Use adjacency list for sparse graphs
> 5. **Error Handling:** Detect cycles early and return appropriate error indicators

---

## 🔗 Related LeetCode Problems

- [[problems/207/problem|207. Course Schedule]] - Basic cycle detection with Kahn's algorithm
- **210. Course Schedule II** - Topological ordering with dependency resolution
- **269. Alien Dictionary** - Custom ordering from constraints
- **802. Find Eventual Safe States** - Safe node detection in directed graphs
- **1136. Parallel Courses** - Minimum time with parallel processing
- **310. Minimum Height Trees** - Finding optimal tree centers

---

## 🧠 Brain Connections

- **Breadth-First Search** → [[patterns/breadth-first-search|BFS Pattern]] - Kahn's algorithm uses BFS traversal
- **Depth-First Search** → [[patterns/depth-first-search|DFS Pattern]] - DFS-based topological sort and cycle detection
- **Dynamic Programming** → Some graph problems can be optimized with DP on DAGs
- **Union-Find** → [[patterns/union-find|Union Find Pattern]] - Alternative approach for connectivity problems in undirected graphs

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when dealing with dependencies, prerequisites, or ordering constraints
- 🔧 **Implementation Choice:** Kahn's algorithm for BFS approach, DFS for recursion-based solutions with cycle detection
- ⚡ **Performance:** O(V + E) complexity for both time and space is optimal for most graph algorithms
- 🎯 **Edge Cases:** Always check for cycles in directed graphs; handle disconnected components and invalid inputs

---
