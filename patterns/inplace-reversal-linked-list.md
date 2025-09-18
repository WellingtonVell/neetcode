---
tags: [pattern, linked-list, data-structure, algorithms, reversal]
aliases: [linked-list-reversal, in-place-reversal, pointer-reversal]
type: pattern-guide
difficulty: Intermediate
time_complexity: "O(n)"
space_complexity: "O(1)"
prerequisites: [linked-lists, pointers]
related_patterns: [fast-and-slow-pointers, two-pointers]
leetcode_problems: [206, 92, 25, 61, 143, 234]
emoji: 🔄
title: In-place Reversal of Linked List
description: Reverse linked lists or portions of linked lists efficiently using iterative pointer manipulation
---

[[README|🏠HOME]]

# 🔄 In-place Reversal of Linked List

## Overview

The In-place Reversal pattern efficiently reverses linked lists or portions of linked lists using pointer manipulation:

- **Complete List Reversal** - Reverse entire linked lists in O(n) time with O(1) space
- **Partial Reversal** - Reverse specific portions or sub-lists efficiently
- **K-Group Reversal** - Reverse linked lists in groups of k nodes
- **Memory Efficiency** - Perform reversals without additional data structures
- **Pointer Manipulation** - Master three-pointer technique for clean reversals
- **Complex Transformations** - Handle advanced linked list rearrangements

This pattern is fundamental for linked list problems requiring structural modifications while maintaining O(1) space complexity.

> _**Think of this pattern as reversing a train - you need to carefully redirect each car's connection to point to the previous car instead of the next one, without losing track of where you're going!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Full List Reversal** - Reversing entire linked lists efficiently
> - **Partial Reversal** - Reversing specific portions or ranges of nodes
> - **K-Group Operations** - Reversing nodes in groups of k elements
> - **Space-Constrained Problems** - When O(1) space complexity is required
> - **Structural Modifications** - Rearranging linked list connections
> - **Palindrome Checking** - Reversing half of list for comparison

> [!warning]- Avoid When
>
> - **Doubly Linked Lists** - When backward pointers already exist
> - **Immutable Lists** - When original structure must be preserved
> - **Complex Dependencies** - When nodes have complex interdependencies
> - **Recursive Solutions Preferred** - When stack space is acceptable
> - **Single Operation** - When reversal is not the main operation

---

## 💻 Core Implementations

> [!info]- TypeScript
>
> ### 1. Basic Linked List Reversal
>
> ```typescript
> class ListNode {
>   val: number;
>   next: ListNode | null;
>   constructor(val?: number, next?: ListNode | null) {
>     this.val = val === undefined ? 0 : val;
>     this.next = next === undefined ? null : next;
>   }
> }
>
> function reverseList(head: ListNode | null): ListNode | null {
>   let prev: ListNode | null = null;
>   let current = head;
>
>   while (current !== null) {
>     const nextNode = current.next; // Store next node
>     current.next = prev; // Reverse the link
>     prev = current; // Move prev forward
>     current = nextNode; // Move current forward
>   }
>
>   return prev; // prev is the new head
> }
> ```
>
> ### 2. Reverse Sub-list (Between Positions)
>
> ```typescript
> function reverseBetween(
>   head: ListNode | null,
>   left: number,
>   right: number
> ): ListNode | null {
>   if (!head || left === right) return head;
>
>   // Create dummy node for easier edge case handling
>   const dummy = new ListNode(0);
>   dummy.next = head;
>
>   // Find the node before the reversal start
>   let prevStart = dummy;
>   for (let i = 1; i < left; i++) {
>     prevStart = prevStart.next!;
>   }
>
>   // Start reversing from left to right
>   let prev = prevStart.next;
>   let current = prev!.next;
>
>   for (let i = left; i < right; i++) {
>     const nextNode = current!.next;
>     current!.next = prev;
>     prev = current;
>     current = nextNode;
>   }
>
>   // Connect the reversed portion back to the list
>   prevStart.next!.next = current;
>   prevStart.next = prev;
>
>   return dummy.next;
> }
> ```
>
> ### 3. Reverse in K-Groups
>
> ```typescript
> function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
>   if (!head || k === 1) return head;
>
>   // Check if we have at least k nodes
>   let count = 0;
>   let current = head;
>   while (current && count < k) {
>     current = current.next;
>     count++;
>   }
>
>   if (count === k) {
>     // Reverse first k nodes
>     current = reverseKGroup(current, k); // Recursively reverse rest
>
>     // Reverse current k-group
>     let prev = current;
>     let curr = head;
>     for (let i = 0; i < k; i++) {
>       const nextNode = curr!.next;
>       curr!.next = prev;
>       prev = curr;
>       curr = nextNode;
>     }
>     head = prev;
>   }
>
>   return head;
> }
> ```

> [!info]- Golang
>
> ### 1. Basic Linked List Reversal
>
> ```go
> type ListNode struct {
>     Val  int
>     Next *ListNode
> }
>
> func reverseList(head *ListNode) *ListNode {
>     var prev *ListNode
>     current := head
>
>     for current != nil {
>         nextNode := current.Next // Store next node
>         current.Next = prev       // Reverse the link
>         prev = current            // Move prev forward
>         current = nextNode        // Move current forward
>     }
>
>     return prev // prev is the new head
> }
> ```
>
> ### 2. Reverse Sub-list (Iterative)
>
> ```go
> func reverseBetween(head *ListNode, left int, right int) *ListNode {
>     if head == nil || left == right {
>         return head
>     }
>
>     // Create dummy node
>     dummy := &ListNode{Val: 0, Next: head}
>
>     // Find node before reversal start
>     prevStart := dummy
>     for i := 1; i < left; i++ {
>         prevStart = prevStart.Next
>     }
>
>     // Reverse nodes from left to right
>     prev := prevStart.Next
>     current := prev.Next
>
>     for i := left; i < right; i++ {
>         nextNode := current.Next
>         current.Next = prev
>         prev = current
>         current = nextNode
>     }
>
>     // Reconnect
>     prevStart.Next.Next = current
>     prevStart.Next = prev
>
>     return dummy.Next
> }
> ```
>
> **Note:** Go's explicit pointer handling makes the reversal logic very clear

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Complete List Reversal
>
> **Problem:** Reverse a singly linked list iteratively
>
> ```typescript
> function reverseList(head: ListNode | null): ListNode | null {
>   let prev: ListNode | null = null;
>   let current = head;
>
>   while (current) {
>     const nextTemp = current.next;
>     current.next = prev;
>     prev = current;
>     current = nextTemp;
>   }
>
>   return prev; // New head
> }
> ```
>
> **Key Insight:** Use three pointers (prev, current, next) to safely reverse links without losing nodes

> [!example]- Pattern 2: Reverse Nodes in k-Group
>
> **Problem:** Reverse every k consecutive nodes in a linked list
>
> ```typescript
> function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
>   // Helper function to reverse k nodes starting from head
>   function reverseKNodes(head: ListNode, k: number): ListNode {
>     let prev: ListNode | null = null;
>     let current: ListNode | null = head;
>
>     for (let i = 0; i < k; i++) {
>       const nextTemp = current!.next;
>       current!.next = prev;
>       prev = current;
>       current = nextTemp;
>     }
>
>     return prev!; // New head of reversed segment
>   }
>
>   // Check if we have at least k nodes
>   let count = 0;
>   let current = head;
>   while (current && count < k) {
>     current = current.next;
>     count++;
>   }
>
>   if (count === k) {
>     current = reverseKGroup(current, k); // Reverse rest first
>     head = reverseKNodes(head!, k); // Then reverse current k
>   }
>
>   return head;
> }
> ```
>
> **Key Insight:** Recursively handle remaining nodes first, then reverse current k-group

> [!example]- Pattern 3: Rotate List
>
> **Problem:** Rotate a linked list to the right by k positions
>
> ```typescript
> function rotateRight(head: ListNode | null, k: number): ListNode | null {
>   if (!head || !head.next || k === 0) return head;
>
>   // Find length and make it circular
>   let length = 1;
>   let tail = head;
>   while (tail.next) {
>     tail = tail.next;
>     length++;
>   }
>   tail.next = head; // Make circular
>
>   // Find the new tail (length - k % length - 1 steps from head)
>   k = k % length;
>   let stepsToNewTail = length - k;
>   let newTail = head;
>   for (let i = 1; i < stepsToNewTail; i++) {
>     newTail = newTail.next!;
>   }
>
>   const newHead = newTail.next!;
>   newTail.next = null; // Break the circle
>
>   return newHead;
> }
> ```
>
> **Key Insight:** Convert to circular list temporarily, then find new head/tail positions

> [!example]- Pattern 4: Palindrome Linked List
>
> **Problem:** Check if a linked list is a palindrome using O(1) space
>
> ```typescript
> function isPalindrome(head: ListNode | null): boolean {
>   if (!head || !head.next) return true;
>
>   // Find middle using fast/slow pointers
>   let slow = head;
>   let fast = head;
>   while (fast.next && fast.next.next) {
>     slow = slow.next!;
>     fast = fast.next.next;
>   }
>
>   // Reverse second half
>   function reverseList(node: ListNode | null): ListNode | null {
>     let prev: ListNode | null = null;
>     let current = node;
>     while (current) {
>       const nextTemp = current.next;
>       current.next = prev;
>       prev = current;
>       current = nextTemp;
>     }
>     return prev;
>   }
>
>   const secondHalf = reverseList(slow.next);
>
>   // Compare both halves
>   let firstHalf = head;
>   let secondHalfCopy = secondHalf;
>   let isPalin = true;
>
>   while (secondHalfCopy && isPalin) {
>     if (firstHalf.val !== secondHalfCopy.val) {
>       isPalin = false;
>     }
>     firstHalf = firstHalf.next!;
>     secondHalfCopy = secondHalfCopy.next;
>   }
>
>   // Restore original list (optional)
>   slow.next = reverseList(secondHalf);
>
>   return isPalin;
> }
> ```
>
> **Key Insight:** Combine fast/slow pointers with reversal to check palindrome in O(1) space

---

## ⚡ Performance Analysis

| Operation         | Average | Worst Case | Space | Notes                            |
| ----------------- | ------- | ---------- | ----- | -------------------------------- |
| Full Reversal     | O(n)    | O(n)       | O(1)  | Single pass through list         |
| Sub-list Reversal | O(n)    | O(n)       | O(1)  | May need to traverse to position |
| K-Group Reversal  | O(n)    | O(n)       | O(1)  | Each node processed once         |
| Rotate List       | O(n)    | O(n)       | O(1)  | Single pass to find length       |
| Palindrome Check  | O(n)    | O(n)       | O(1)  | Uses reversal + comparison       |

> [!note]- Performance Considerations
>
> - **Linear Time:** All operations require single or double pass through the list
> - **Constant Space:** No additional data structures needed beyond pointers
> - **In-place Modification:** Original list structure is modified
> - **Pointer Efficiency:** Minimal pointer operations per node

---

## 🔄 Advanced Variations

> [!info]- Variation 1: Recursive Reversal
>
> Use recursion instead of iteration for cleaner code at cost of O(n) stack space
>
> - **Use case:** When recursive solutions are preferred for readability
> - **Example:** Elegant recursive implementation for educational purposes

> [!info]- Variation 2: Conditional Reversal
>
> Reverse portions of list based on node values or positions
>
> - **Use case:** Complex reversal logic with conditions
> - **Example:** Reverse only nodes with even values

> [!info]- Variation 3: Multi-level Reversal
>
> Handle lists with multiple levels or complex structures
>
> - **Use case:** Lists with child pointers or complex interconnections
> - **Example:** Flatten and reverse multi-level doubly linked list

> [!info]- Variation 4: Parallel Processing
>
> Reverse multiple segments simultaneously or in parallel
>
> - **Use case:** When multiple independent reversals can be done concurrently
> - **Example:** Reverse alternate segments in parallel

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Null/Empty List** - Handle null head gracefully
> - **Single Node** - Ensure single-node lists work correctly
> - **Two Nodes** - Test minimal non-trivial case
> - **Exact K Groups** - Handle when list length is exact multiple of k
> - **Partial Last Group** - Decide whether to reverse incomplete groups
> - **Circular Lists** - Detect and handle circular references
> - **Memory Leaks** - Ensure all nodes remain reachable after reversal

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Null list `null`
> - Single node `[1]`
> - Two nodes `[1,2]`
> - Exact k groups `[1,2,3,4,5,6]` with k=3
> - Incomplete last group `[1,2,3,4,5]` with k=3
> - Large list for performance

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/206/problem|206. Reverse Linked List]]** - Master basic three-pointer technique
> 2. **Practice:** Implement `reverseBetween()` for partial reversal
> 3. **Practice:** Create `reverseKGroup()` with iterative approach
> 4. **Challenge:** Solve palindrome check combining multiple patterns
>
> **Key Learning Points:**
>
> - Master the three-pointer reversal technique
> - Understand dummy node usage for edge cases
> - Practice combining reversal with other patterns
> - Learn to handle complex reconnection logic

> [!note]- Pro Tips
>
> 1. **Dummy Nodes:** Use dummy nodes to simplify edge case handling
> 2. **Three Pointers:** Always maintain prev, current, and next pointers
> 3. **Dry Run:** Trace through algorithm with small examples
> 4. **Reconnection:** Carefully handle connecting reversed segments back
> 5. **State Restoration:** Consider whether to restore original state

---

## 🔗 Related LeetCode Problems

- [[problems/206/problem|206. Reverse Linked List]] - Basic linked list reversal
- **92. Reverse Linked List II** - Reverse sub-list between positions
- **25. Reverse Nodes in k-Group** - Advanced k-group reversal
- **61. Rotate List** - List rotation using reversal concepts
- **143. Reorder List** - Complex rearrangement with reversal
- **234. Palindrome Linked List** - Palindrome check with O(1) space

---

## 🧠 Brain Connections

- **Fast & Slow Pointers** → [[patterns/fast-and-slow-pointers|Fast & Slow Pointers]] - Finding middle for palindrome check
- **Two Pointers** → [[patterns/two-pointers|Two Pointers]] - General pointer manipulation techniques
- **Recursion** → Alternative approach for reversal with different space complexity
- **Stack Data Structure** → Alternative for reversal but with O(n) space

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when you need to reverse linked lists or portions while maintaining O(1) space
- 🔧 **Implementation Choice:** Master three-pointer technique and use dummy nodes for complex scenarios
- ⚡ **Performance:** Achieves O(n) time with O(1) space through careful pointer manipulation
- 🎯 **Edge Cases:** Always handle null lists, single nodes, and ensure proper reconnection of segments

---
