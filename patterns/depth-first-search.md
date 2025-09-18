---
tags: [pattern, depth-first-search, data-structure, algorithms, trees]
aliases: [dfs, tree-traversal, recursive-traversal]
type: pattern-guide
status: complete
difficulty: Intermediate
time_complexity: "O(n)"
space_complexity: "O(h)"
prerequisites: [trees, recursion]
related_patterns: [breadth-first-search, backtracking]
leetcode_problems: [112, 113, 437, 104, 124, 236]
emoji: 🌲
title: Tree Depth First Search
description: Traverse trees and graphs depth-wise using recursion or stack for systematic exploration
---

[[README|🏠HOME]]

# 🌲 Tree Depth First Search

## Overview

The Tree Depth First Search (DFS) pattern explores trees and graphs by going as deep as possible before backtracking:

- **Recursive Traversal** - Use recursion to explore deeper nodes before siblings
- **Path-Based Problems** - Find paths, sums, and relationships along root-to-leaf paths
- **Tree Structure Analysis** - Analyze tree properties like height, diameter, and subtree characteristics
- **Backtracking Integration** - Naturally supports backtracking for path exploration
- **Memory Efficient** - Space complexity depends on tree height, not width
- **Multiple Traversal Orders** - Support preorder, inorder, and postorder traversals

This pattern is fundamental for tree and graph problems requiring path analysis, subtree processing, or depth-based exploration.

> _**Think of this pattern as exploring a cave system - you follow each tunnel to its deepest point before returning to explore other branches!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Path-Based Problems** - Finding paths from root to leaves with specific properties
> - **Tree Height/Depth** - Calculating maximum or minimum depth of trees
> - **Subtree Analysis** - Problems requiring analysis of subtrees independently
> - **Binary Tree Properties** - Checking tree validity, symmetry, or structural properties
> - **Path Sum Problems** - Finding paths with target sums or counting valid paths
> - **Tree Modification** - Building or transforming trees recursively

> [!warning]- Avoid When
>
> - **Level-wise Processing** - When you need to process nodes level by level (use BFS)
> - **Shortest Path** - For unweighted shortest paths (BFS is better)
> - **Very Deep Trees** - Risk of stack overflow with extremely deep recursion
> - **Memory Constraints** - When call stack depth is limited
> - **Iterative Preference** - When iterative solutions are strongly preferred

---

## 💻 Core Implementations

> [!info]- TypeScript
>
> ### 1. Basic DFS Traversal (Preorder)
>
> ```typescript
> class TreeNode {
>   val: number;
>   left: TreeNode | null;
>   right: TreeNode | null;
>   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
>     this.val = val === undefined ? 0 : val;
>     this.left = left === undefined ? null : left;
>     this.right = right === undefined ? null : right;
>   }
> }
>
> function dfsPreorder(root: TreeNode | null): number[] {
>   const result: number[] = [];
>
>   function dfs(node: TreeNode | null): void {
>     if (!node) return;
>
>     result.push(node.val); // Process current node
>     dfs(node.left); // Recurse left
>     dfs(node.right); // Recurse right
>   }
>
>   dfs(root);
>   return result;
> }
> ```
>
> ### 2. Path Sum (Root to Leaf)
>
> ```typescript
> function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
>   if (!root) return false;
>
>   // If leaf node, check if remaining sum equals node value
>   if (!root.left && !root.right) {
>     return targetSum === root.val;
>   }
>
>   // Recurse with updated target sum
>   const remainingSum = targetSum - root.val;
>   return (
>     hasPathSum(root.left, remainingSum) ||
>     hasPathSum(root.right, remainingSum)
>   );
> }
> ```
>
> ### 3. Maximum Depth of Binary Tree
>
> ```typescript
> function maxDepth(root: TreeNode | null): number {
>   if (!root) return 0;
>
>   const leftDepth = maxDepth(root.left);
>   const rightDepth = maxDepth(root.right);
>
>   return Math.max(leftDepth, rightDepth) + 1;
> }
> ```
>
> ### 4. All Root-to-Leaf Paths
>
> ```typescript
> function binaryTreePaths(root: TreeNode | null): string[] {
>   const result: string[] = [];
>
>   function dfs(node: TreeNode | null, path: number[]): void {
>     if (!node) return;
>
>     path.push(node.val);
>
>     // If leaf node, add path to result
>     if (!node.left && !node.right) {
>       result.push(path.join("->"));
>     } else {
>       // Continue exploring paths
>       dfs(node.left, path);
>       dfs(node.right, path);
>     }
>
>     // Backtrack
>     path.pop();
>   }
>
>   dfs(root, []);
>   return result;
> }
> ```

> [!info]- Golang
>
> ### 1. Basic DFS Traversal (Inorder)
>
> ```go
> type TreeNode struct {
>     Val   int
>     Left  *TreeNode
>     Right *TreeNode
> }
>
> func inorderTraversal(root *TreeNode) []int {
>     var result []int
>
>     var dfs func(*TreeNode)
>     dfs = func(node *TreeNode) {
>         if node == nil {
>             return
>         }
>
>         dfs(node.Left)                    // Recurse left
>         result = append(result, node.Val) // Process current
>         dfs(node.Right)                   // Recurse right
>     }
>
>     dfs(root)
>     return result
> }
> ```
>
> ### 2. Tree Height with DFS
>
> ```go
> func maxDepth(root *TreeNode) int {
>     if root == nil {
>         return 0
>     }
>
>     leftDepth := maxDepth(root.Left)
>     rightDepth := maxDepth(root.Right)
>
>     if leftDepth > rightDepth {
>         return leftDepth + 1
>     }
>     return rightDepth + 1
> }
> ```
>
> ### 3. Path Sum with DFS
>
> ```go
> func hasPathSum(root *TreeNode, targetSum int) bool {
>     if root == nil {
>         return false
>     }
>
>     // If leaf node, check if sum matches
>     if root.Left == nil && root.Right == nil {
>         return targetSum == root.Val
>     }
>
>     // Recurse with updated sum
>     remainingSum := targetSum - root.Val
>     return hasPathSum(root.Left, remainingSum) ||
>            hasPathSum(root.Right, remainingSum)
> }
> ```
>
> **Note:** Go's function variables enable clean recursive implementations

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Binary Tree Path Sum
>
> **Problem:** Check if there exists a root-to-leaf path with a given target sum
>
> ```typescript
> function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
>   if (!root) return false;
>
>   // Base case: leaf node
>   if (!root.left && !root.right) {
>     return targetSum === root.val;
>   }
>
>   // Recursive case: subtract current value and check children
>   const remainingSum = targetSum - root.val;
>   return (
>     hasPathSum(root.left, remainingSum) ||
>     hasPathSum(root.right, remainingSum)
>   );
> }
> ```
>
> **Key Insight:** Use recursion to pass down the remaining target sum, check at leaf nodes

> [!example]- Pattern 2: Maximum Path Sum
>
> **Problem:** Find the maximum sum of any path in a binary tree (path can start and end anywhere)
>
> ```typescript
> function maxPathSum(root: TreeNode | null): number {
>   let maxSum = Number.MIN_SAFE_INTEGER;
>
>   function maxPathDown(node: TreeNode | null): number {
>     if (!node) return 0;
>
>     // Get max path sum going down from left and right children
>     const leftMax = Math.max(0, maxPathDown(node.left));
>     const rightMax = Math.max(0, maxPathDown(node.right));
>
>     // Current max path through this node
>     const currentMax = node.val + leftMax + rightMax;
>     maxSum = Math.max(maxSum, currentMax);
>
>     // Return max path going down from this node
>     return node.val + Math.max(leftMax, rightMax);
>   }
>
>   maxPathDown(root);
>   return maxSum;
> }
> ```
>
> **Key Insight:** For each node, consider path through node vs. path continuing down from node

> [!example]- Pattern 3: Count Paths with Sum
>
> **Problem:** Count the number of paths that sum to a target value (paths don't need to start from root)
>
> ```typescript
> function pathSum(root: TreeNode | null, targetSum: number): number {
>   if (!root) return 0;
>
>   // Count paths starting from current node
>   function countPathsFrom(node: TreeNode | null, sum: number): number {
>     if (!node) return 0;
>
>     let count = 0;
>     if (node.val === sum) count = 1;
>
>     count += countPathsFrom(node.left, sum - node.val);
>     count += countPathsFrom(node.right, sum - node.val);
>
>     return count;
>   }
>
>   // Total paths = paths from root + paths from left subtree + paths from right subtree
>   return (
>     countPathsFrom(root, targetSum) +
>     pathSum(root.left, targetSum) +
>     pathSum(root.right, targetSum)
>   );
> }
> ```
>
> **Key Insight:** Combine DFS to explore all starting points with DFS to count paths from each point

> [!example]- Pattern 4: Tree Diameter
>
> **Problem:** Find the length of the longest path between any two nodes in a tree
>
> ```typescript
> function diameterOfBinaryTree(root: TreeNode | null): number {
>   let maxDiameter = 0;
>
>   function maxDepth(node: TreeNode | null): number {
>     if (!node) return 0;
>
>     const leftDepth = maxDepth(node.left);
>     const rightDepth = maxDepth(node.right);
>
>     // Update diameter: path through current node
>     maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
>
>     // Return height of subtree rooted at current node
>     return Math.max(leftDepth, rightDepth) + 1;
>   }
>
>   maxDepth(root);
>   return maxDiameter;
> }
> ```
>
> **Key Insight:** Diameter through a node equals sum of left and right subtree heights

---

## ⚡ Performance Analysis

| Operation      | Average | Worst Case | Space | Notes                          |
| -------------- | ------- | ---------- | ----- | ------------------------------ |
| Tree Traversal | O(n)    | O(n)       | O(h)  | h is height of tree            |
| Path Sum       | O(n)    | O(n)       | O(h)  | Recursive call stack           |
| Max Path Sum   | O(n)    | O(n)       | O(h)  | Single pass with recursion     |
| Count Paths    | O(n²)   | O(n²)      | O(h)  | Check all starting points      |
| Tree Diameter  | O(n)    | O(n)       | O(h)  | Calculate height for each node |

> [!note]- Performance Considerations
>
> - **Height-Dependent Space:** Call stack depth equals tree height
> - **Linear Time:** Most operations visit each node once
> - **Balanced vs Skewed:** Performance varies significantly with tree shape
> - **Stack Overflow Risk:** Deep trees can cause stack overflow

---

## 🔄 Advanced Variations

> [!info]- Variation 1: Iterative DFS with Stack
>
> Use explicit stack instead of recursion to avoid stack overflow
>
> - **Use case:** Very deep trees or when recursion is not preferred
> - **Example:** Iterative preorder/inorder/postorder traversal

> [!info]- Variation 2: DFS with Memoization
>
> Cache results of subproblems to avoid recomputation
>
> - **Use case:** Problems with overlapping subproblems
> - **Example:** Tree DP problems, path counting with optimization

> [!info]- Variation 3: Multi-branch DFS
>
> Extend DFS to handle trees with more than two children
>
> - **Use case:** N-ary trees, trie traversal, file system problems
> - **Example:** N-ary tree traversal, directory structure analysis

> [!info]- Variation 4: DFS with State Passing
>
> Pass additional state information during traversal
>
> - **Use case:** Path tracking, ancestor information, level tracking
> - **Example:** Lowest common ancestor, path reconstruction

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Empty Tree** - Handle null root gracefully
> - **Single Node** - Ensure single-node trees work correctly
> - **Negative Values** - Handle negative node values in sum problems
> - **Very Deep Trees** - Risk of stack overflow with deep recursion
> - **Leaf Node Detection** - Correctly identify leaf nodes (no children)
> - **Path Definition** - Clarify whether paths must be root-to-leaf or any-to-any
> - **Base Case Handling** - Ensure proper base cases in recursive functions

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty tree `null`
> - Single node `[1]`
> - Path exists `[5,4,8,11,null,13,4,7,2,null,null,null,1]`
> - Path doesn't exist
> - All negative values `[-3,-2,-1]`
> - Mixed positive/negative `[1,-2,3]`

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/trees/104/problem|104. Maximum Depth of Binary Tree]]** - Learn basic recursive DFS
> 2. **Practice:** Implement `hasPathSum()` for root-to-leaf path checking
> 3. **Practice:** Create `binaryTreePaths()` with backtracking
> 4. **Challenge:** Solve maximum path sum with global variable tracking
>
> **Key Learning Points:**
>
> - Master recursive function design with proper base cases
> - Understand the difference between returning values vs. using global variables
> - Practice backtracking for path-based problems
> - Learn to handle both simple and complex tree analysis

> [!note]- Pro Tips
>
> 1. **Base Cases First:** Always handle null nodes and leaf nodes explicitly
> 2. **Global vs Local:** Decide whether to use global variables or return values
> 3. **Backtracking:** Remember to clean up state when backtracking
> 4. **Stack Depth:** Consider iterative solutions for very deep trees
> 5. **State Management:** Pass necessary state through function parameters

---

## 🔗 Related LeetCode Problems

- [[problems/trees/112/problem|112. Path Sum]] - Basic root-to-leaf path sum
- **113. Path Sum II** - Find all root-to-leaf paths with target sum
- **437. Path Sum III** - Count paths with sum (any start/end points)
- **104. Maximum Depth of Binary Tree** - Basic tree height calculation
- **124. Binary Tree Maximum Path Sum** - Advanced path sum problem
- **236. Lowest Common Ancestor** - Tree navigation with DFS

---

## 🧠 Brain Connections

- **Breadth First Search** → [[patterns/breadth-first-search|BFS Pattern]] - Alternative tree traversal approach
- **Backtracking** → [[patterns/backtracking|Backtracking Pattern]] - DFS naturally supports backtracking
- **Dynamic Programming** → [[patterns/dynamic-programming|Dynamic Programming Pattern]] - Tree DP problems use DFS traversal
- **Recursion** → Foundation technique for DFS implementation

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when you need to explore paths, analyze subtrees, or calculate tree properties recursively
- 🔧 **Implementation Choice:** Choose recursion for simplicity, iteration for deep trees or stack constraints
- ⚡ **Performance:** O(n) time with O(h) space where h is tree height, varying significantly with tree balance
- 🎯 **Edge Cases:** Handle null trees, single nodes, negative values, and ensure proper base cases in recursion

---
