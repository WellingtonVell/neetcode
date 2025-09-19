---
tags: [pattern, breadth-first-search, data-structure, algorithms, trees]
aliases: [bfs, level-order-traversal, queue-based-traversal]
type: pattern-guide
difficulty: Beginner
time_complexity: "O(n)"
space_complexity: "O(w)"
prerequisites: [trees, queues]
related_patterns: [depth-first-search, binary-tree-traversal]
leetcode_problems: [102, 103, 107, 111, 116, 117]
emoji: 🌳
title: Tree Breadth First Search
description: Traverse trees and graphs level by level using queues for systematic exploration
---

[[README|🏠HOME]]

# 🌳 Tree Breadth First Search

## Overview [[README|🏠]]

The Tree Breadth First Search (BFS) pattern systematically explores trees and graphs level by level using a queue:

- **Level-by-Level Traversal** - Visit all nodes at depth d before visiting nodes at depth d+1
- **Queue-Based Implementation** - Use FIFO data structure for systematic exploration
- **Complete Level Processing** - Process entire levels before moving to next level
- **Shortest Path Finding** - Find shortest paths in unweighted graphs
- **Tree Structure Analysis** - Analyze tree properties like width, depth, and level characteristics
- **Memory Efficient** - Space complexity depends on tree width, not height

This pattern is fundamental for tree and graph problems requiring level-wise processing or shortest path solutions.

> _**Think of this pattern as exploring a building floor by floor - you visit every room on the current floor before taking the elevator to the next floor!**_

---

## 🎯 When to Use [[README|🏠]]

> [!success]- Perfect For
>
> - **Level Order Traversal** - Processing tree nodes level by level
> - **Shortest Path Problems** - Finding shortest paths in unweighted graphs
> - **Tree Width Analysis** - Finding maximum width or analyzing level properties
> - **Minimum Depth/Distance** - Finding shortest distance or minimum depth
> - **Connected Components** - Exploring all connected nodes systematically
> - **Tree Serialization** - Converting trees to level-order representations

> [!warning]- Avoid When
>
> - **Deep Trees** - When tree height is much greater than width (DFS more efficient)
> - **Memory Constraints** - When tree width is very large (high space usage)
> - **Path Finding with Weights** - Use Dijkstra's algorithm instead
> - **Tree Modification** - When you need to modify tree structure during traversal
> - **Specific Path Requirements** - When you need all paths or specific path properties

---

## 💻 Core Implementations [[README|🏠]]

> [!info]- TypeScript
>
> ### 1. Basic Level Order Traversal
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
> function levelOrder(root: TreeNode | null): number[][] {
>   if (!root) return [];
>
>   const result: number[][] = [];
>   const queue: TreeNode[] = [root];
>
>   while (queue.length > 0) {
>     const levelSize = queue.length;
>     const currentLevel: number[] = [];
>
>     // Process all nodes at current level
>     for (let i = 0; i < levelSize; i++) {
>       const node = queue.shift()!;
>       currentLevel.push(node.val);
>
>       // Add children for next level
>       if (node.left) queue.push(node.left);
>       if (node.right) queue.push(node.right);
>     }
>
>     result.push(currentLevel);
>   }
>
>   return result;
> }
> ```
>
> ### 2. Zigzag Level Order Traversal
>
> ```typescript
> function zigzagLevelOrder(root: TreeNode | null): number[][] {
>   if (!root) return [];
>
>   const result: number[][] = [];
>   const queue: TreeNode[] = [root];
>   let leftToRight = true;
>
>   while (queue.length > 0) {
>     const levelSize = queue.length;
>     const currentLevel: number[] = [];
>
>     for (let i = 0; i < levelSize; i++) {
>       const node = queue.shift()!;
>
>       // Add to current level based on direction
>       if (leftToRight) {
>         currentLevel.push(node.val);
>       } else {
>         currentLevel.unshift(node.val);
>       }
>
>       if (node.left) queue.push(node.left);
>       if (node.right) queue.push(node.right);
>     }
>
>     result.push(currentLevel);
>     leftToRight = !leftToRight; // Toggle direction
>   }
>
>   return result;
> }
> ```
>
> ### 3. Minimum Depth of Binary Tree
>
> ```typescript
> function minDepth(root: TreeNode | null): number {
>   if (!root) return 0;
>
>   const queue: [TreeNode, number][] = [[root, 1]];
>
>   while (queue.length > 0) {
>     const [node, depth] = queue.shift()!;
>
>     // Found first leaf node - minimum depth
>     if (!node.left && !node.right) {
>       return depth;
>     }
>
>     if (node.left) queue.push([node.left, depth + 1]);
>     if (node.right) queue.push([node.right, depth + 1]);
>   }
>
>   return 0;
> }
> ```

> [!info]- Golang
>
> ### 1. Basic Level Order Traversal
>
> ```go
> type TreeNode struct {
>     Val   int
>     Left  *TreeNode
>     Right *TreeNode
> }
>
> func levelOrder(root *TreeNode) [][]int {
>     if root == nil {
>         return [][]int{}
>     }
>
>     var result [][]int
>     queue := []*TreeNode{root}
>
>     for len(queue) > 0 {
>         levelSize := len(queue)
>         var currentLevel []int
>
>         // Process all nodes at current level
>         for i := 0; i < levelSize; i++ {
>             node := queue[0]
>             queue = queue[1:] // Dequeue
>
>             currentLevel = append(currentLevel, node.Val)
>
>             // Add children for next level
>             if node.Left != nil {
>                 queue = append(queue, node.Left)
>             }
>             if node.Right != nil {
>                 queue = append(queue, node.Right)
>             }
>         }
>
>         result = append(result, currentLevel)
>     }
>
>     return result
> }
> ```
>
> ### 2. Connect Level Order Siblings
>
> ```go
> type NodeWithNext struct {
>     Val   int
>     Left  *NodeWithNext
>     Right *NodeWithNext
>     Next  *NodeWithNext
> }
>
> func connect(root *NodeWithNext) *NodeWithNext {
>     if root == nil {
>         return nil
>     }
>
>     queue := []*NodeWithNext{root}
>
>     for len(queue) > 0 {
>         levelSize := len(queue)
>
>         for i := 0; i < levelSize; i++ {
>             node := queue[0]
>             queue = queue[1:]
>
>             // Connect to next node in same level
>             if i < levelSize-1 {
>                 node.Next = queue[0]
>             }
>
>             if node.Left != nil {
>                 queue = append(queue, node.Left)
>             }
>             if node.Right != nil {
>                 queue = append(queue, node.Right)
>             }
>         }
>     }
>
>     return root
> }
> ```
>
> **Note:** Go's slice operations make queue implementation straightforward

---

## 🧩 Common Problem Patterns [[README|🏠]]

> [!example]- Pattern 1: Level Order Traversal
>
> **Problem:** Return level order traversal of a binary tree as a list of lists
>
> ```typescript
> function levelOrder(root: TreeNode | null): number[][] {
>   if (!root) return [];
>
>   const result: number[][] = [];
>   const queue: TreeNode[] = [root];
>
>   while (queue.length > 0) {
>     const levelSize = queue.length;
>     const currentLevel: number[] = [];
>
>     // Process entire current level
>     for (let i = 0; i < levelSize; i++) {
>       const node = queue.shift()!;
>       currentLevel.push(node.val);
>
>       // Add children for next level
>       if (node.left) queue.push(node.left);
>       if (node.right) queue.push(node.right);
>     }
>
>     result.push(currentLevel);
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Process all nodes at current level before moving to next level by capturing queue size

> [!example]- Pattern 2: Binary Tree Right Side View
>
> **Problem:** Return values of nodes you can see when looking from the right side
>
> ```typescript
> function rightSideView(root: TreeNode | null): number[] {
>   if (!root) return [];
>
>   const result: number[] = [];
>   const queue: TreeNode[] = [root];
>
>   while (queue.length > 0) {
>     const levelSize = queue.length;
>
>     for (let i = 0; i < levelSize; i++) {
>       const node = queue.shift()!;
>
>       // Last node in level is rightmost
>       if (i === levelSize - 1) {
>         result.push(node.val);
>       }
>
>       if (node.left) queue.push(node.left);
>       if (node.right) queue.push(node.right);
>     }
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** The last node processed in each level is the rightmost visible node

> [!example]- Pattern 3: Binary Tree Level Order Bottom-Up
>
> **Problem:** Return level order traversal from bottom to top (leaf to root levels)
>
> ```typescript
> function levelOrderBottom(root: TreeNode | null): number[][] {
>   if (!root) return [];
>
>   const result: number[][] = [];
>   const queue: TreeNode[] = [root];
>
>   while (queue.length > 0) {
>     const levelSize = queue.length;
>     const currentLevel: number[] = [];
>
>     for (let i = 0; i < levelSize; i++) {
>       const node = queue.shift()!;
>       currentLevel.push(node.val);
>
>       if (node.left) queue.push(node.left);
>       if (node.right) queue.push(node.right);
>     }
>
>     // Insert at beginning to reverse order
>     result.unshift(currentLevel);
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Use unshift() to add levels at the beginning, creating bottom-up order

> [!example]- Pattern 4: Populating Next Right Pointers
>
> **Problem:** Connect each node to its next right node in the same level
>
> ```typescript
> class NodeWithNext {
>   val: number;
>   left: NodeWithNext | null;
>   right: NodeWithNext | null;
>   next: NodeWithNext | null;
>
>   constructor(val?: number) {
>     this.val = val === undefined ? 0 : val;
>     this.left = null;
>     this.right = null;
>     this.next = null;
>   }
> }
>
> function connect(root: NodeWithNext | null): NodeWithNext | null {
>   if (!root) return null;
>
>   const queue: NodeWithNext[] = [root];
>
>   while (queue.length > 0) {
>     const levelSize = queue.length;
>
>     for (let i = 0; i < levelSize; i++) {
>       const node = queue.shift()!;
>
>       // Connect to next node in same level
>       if (i < levelSize - 1) {
>         node.next = queue[0]; // Next node in queue is next in level
>       }
>
>       if (node.left) queue.push(node.left);
>       if (node.right) queue.push(node.right);
>     }
>   }
>
>   return root;
> }
> ```
>
> **Key Insight:** The next node in the queue is the next node in the same level (except for last node)

---

## ⚡ Performance Analysis [[README|🏠]]

| Operation             | Average | Worst Case | Space | Notes                                     |
| --------------------- | ------- | ---------- | ----- | ----------------------------------------- |
| Level Order Traversal | O(n)    | O(n)       | O(w)  | w is maximum width of tree                |
| Zigzag Traversal      | O(n)    | O(n)       | O(w)  | Same as level order with direction toggle |
| Minimum Depth         | O(n)    | O(n)       | O(w)  | Early termination at first leaf           |
| Right Side View       | O(n)    | O(n)       | O(w)  | Process all nodes, return last per level  |
| Connect Siblings      | O(n)    | O(n)       | O(w)  | Standard BFS with pointer connections     |

> [!note]- Performance Considerations
>
> - **Linear Time:** All nodes visited exactly once
> - **Width-Dependent Space:** Queue size depends on tree width, not height
> - **Early Termination:** Some problems can exit early (minimum depth)
> - **Memory Pattern:** Queue grows and shrinks level by level

---

## 🔄 Advanced Variations [[README|🏠]]

> [!info]- Variation 1: Multi-source BFS
>
> Start BFS from multiple source nodes simultaneously
>
> - **Use case:** Finding shortest distance from any of multiple starting points
> - **Example:** Rotten oranges problem, multiple infection sources

> [!info]- Variation 2: Bidirectional BFS
>
> Run BFS from both start and end nodes until they meet
>
> - **Use case:** Finding shortest path when start and end are known
> - **Example:** Word ladder, shortest transformation sequence

> [!info]- Variation 3: BFS with State Tracking
>
> Include additional state information with each node
>
> - **Use case:** Problems requiring path information or constraints
> - **Example:** Knight's shortest path with move counting

> [!info]- Variation 4: Level-wise Processing with Callbacks
>
> Apply different processing logic for different levels
>
> - **Use case:** Tree analysis requiring level-specific operations
> - **Example:** Computing level averages, level sums, or level statistics

---

## ⚠️ Edge Cases & Gotchas [[README|🏠]]

> [!warning]- Critical Edge Cases
>
> - **Empty Tree** - Handle null root gracefully
> - **Single Node** - Ensure single-node trees work correctly
> - **Unbalanced Trees** - Handle extremely unbalanced trees efficiently
> - **Large Width** - Be aware of memory usage with very wide trees
> - **Queue Implementation** - Choose efficient queue operations
> - **Level Boundary** - Correctly identify when level ends
> - **Direction Tracking** - Maintain proper direction in zigzag traversals

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty tree `null`
> - Single node `[1]`
> - Perfect binary tree `[1,2,3,4,5,6,7]`
> - Left skewed tree `[1,2,null,3,null,4]`
> - Right skewed tree `[1,null,2,null,3,null,4]`
> - Wide tree with many children

---

## 🎯 Practice Exercises [[README|🏠]]

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/102/problem|102. Binary Tree Level Order Traversal]]** - Master basic BFS template
> 2. **Practice:** Implement `rightSideView()` to understand level processing
> 3. **Practice:** Create `zigzagLevelOrder()` with direction handling
> 4. **Challenge:** Solve connecting siblings with O(1) space optimization
>
> **Key Learning Points:**
>
> - Master the queue-based level processing pattern
> - Understand how to capture level boundaries with queue size
> - Practice different result formatting (lists, single values, connections)
> - Learn to optimize space usage when possible

> [!note]- Pro Tips
>
> 1. **Level Size Capture:** Always capture queue size before processing level
> 2. **Queue Operations:** Use efficient queue operations for your language
> 3. **Early Termination:** Look for opportunities to exit early
> 4. **Memory Management:** Be aware of space complexity with wide trees
> 5. **Result Formatting:** Adapt the basic pattern for different output requirements

---

## 🔗 Related LeetCode Problems [[README|🏠]]

- [[problems/102/problem|102. Binary Tree Level Order Traversal]] - Basic BFS traversal
- **103. Binary Tree Zigzag Level Order Traversal** - Direction-alternating traversal
- **107. Binary Tree Level Order Traversal II** - Bottom-up level order
- **111. Minimum Depth of Binary Tree** - Early termination BFS
- **116. Populating Next Right Pointers** - Level connection problems
- **117. Populating Next Right Pointers II** - Non-perfect tree connections

---

## 🧠 Brain Connections [[README|🏠]]

- **Depth First Search** → [[patterns/depth-first-search|DFS Pattern]] - Alternative tree traversal approach
- **Queue Data Structure** → Foundation for BFS implementation
- **Graph Algorithms** → [[patterns/graphs|Graph Algorithms Pattern]] - BFS extends to general graph traversal
- **Shortest Path** → Dijkstra's algorithm for weighted graphs

---

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** Use when you need level-wise processing, shortest paths, or minimum depth/distance
- 🔧 **Implementation Choice:** Always capture queue size before processing each level to maintain level boundaries
- ⚡ **Performance:** O(n) time with O(w) space where w is maximum tree width, not height
- 🎯 **Edge Cases:** Handle empty trees, maintain proper level boundaries, and be aware of memory usage with wide trees

---
