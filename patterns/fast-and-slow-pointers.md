---
tags: [pattern, two-pointers, data-structure, algorithms, linked-list]
aliases: [tortoise-hare, floyd-cycle-detection, runner-technique]
type: pattern-guide
status: complete
difficulty: Intermediate
time_complexity: "O(n)"
space_complexity: "O(1)"
prerequisites: [linked-lists, pointers]
related_patterns: [two-pointers, sliding-window]
leetcode_problems: [141, 142, 876, 234, 143]
emoji: 🐢
title: Fast & Slow Pointers
description: Two pointers moving at different speeds to detect cycles, find middle elements, and solve linked list problems efficiently
---

[[README|🏠HOME]]

# 🐢 Fast & Slow Pointers

## Overview

The Fast & Slow Pointers pattern uses two pointers that traverse a data structure at different speeds to solve problems efficiently:

- **Cycle Detection** - Detect cycles in linked lists or arrays
- **Middle Element Finding** - Find the middle of a linked list in one pass
- **Memory Efficiency** - Solve problems with O(1) space complexity
- **Pattern Recognition** - Identify when distance relationships matter
- **Palindrome Checking** - Efficiently check for palindromic structures
- **Length Calculation** - Find lengths without explicit counting

This pattern is fundamental for linked list problems that require detecting patterns, finding specific positions, or identifying structural properties.

> _**Think of this pattern as a race between a tortoise and a hare - the hare moves twice as fast, and their relative positions reveal important information about the track!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Cycle Detection** - Finding if there's a cycle in linked lists or arrays
> - **Middle Element** - Finding the middle node of a linked list in one pass
> - **Palindrome Detection** - Checking if a linked list forms a palindrome
> - **Nth from End** - Finding the nth node from the end efficiently
> - **Loop Start Detection** - Finding where a cycle begins in a linked list
> - **Intersection Point** - Finding where two linked lists intersect

> [!warning]- Avoid When
>
> - **Random Access Needed** - When you need to jump to arbitrary positions
> - **Multiple Passes Acceptable** - When space is not a constraint and multiple passes are fine
> - **Complex State Tracking** - When you need to track complex state information
> - **Non-Linear Structures** - When dealing with trees or graphs (use different patterns)
> - **Exact Position Required** - When you need precise indexing from the beginning

---

## 💻 Core Implementations

> [!info]- TypeScript
>
> ### 1. Basic Cycle Detection
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
> function hasCycle(head: ListNode | null): boolean {
>   if (!head || !head.next) return false;
>
>   let slow = head;
>   let fast = head;
>
>   // Move pointers at different speeds
>   while (fast && fast.next) {
>     slow = slow.next!;
>     fast = fast.next.next;
>
>     // If they meet, there's a cycle
>     if (slow === fast) return true;
>   }
>
>   return false;
> }
> ```
>
> ### 2. Find Middle Element
>
> ```typescript
> function findMiddle(head: ListNode | null): ListNode | null {
>   if (!head) return null;
>
>   let slow = head;
>   let fast = head;
>
>   // When fast reaches end, slow is at middle
>   while (fast.next && fast.next.next) {
>     slow = slow.next!;
>     fast = fast.next.next;
>   }
>
>   return slow;
> }
> ```
>
> ### 3. Find Cycle Start
>
> ```typescript
> function detectCycleStart(head: ListNode | null): ListNode | null {
>   if (!head || !head.next) return null;
>
>   let slow = head;
>   let fast = head;
>
>   // Phase 1: Detect if cycle exists
>   while (fast && fast.next) {
>     slow = slow.next!;
>     fast = fast.next.next;
>     if (slow === fast) break;
>   }
>
>   // No cycle found
>   if (!fast || !fast.next) return null;
>
>   // Phase 2: Find cycle start
>   slow = head;
>   while (slow !== fast) {
>     slow = slow.next!;
>     fast = fast.next!;
>   }
>
>   return slow;
> }
> ```

> [!info]- Golang
>
> ### 1. Basic Cycle Detection
>
> ```go
> type ListNode struct {
>     Val  int
>     Next *ListNode
> }
>
> func hasCycle(head *ListNode) bool {
>     if head == nil || head.Next == nil {
>         return false
>     }
>
>     slow, fast := head, head
>
>     for fast != nil && fast.Next != nil {
>         slow = slow.Next
>         fast = fast.Next.Next
>
>         if slow == fast {
>             return true
>         }
>     }
>
>     return false
> }
> ```
>
> ### 2. Find Middle Element
>
> ```go
> func findMiddle(head *ListNode) *ListNode {
>     if head == nil {
>         return nil
>     }
>
>     slow, fast := head, head
>
>     for fast.Next != nil && fast.Next.Next != nil {
>         slow = slow.Next
>         fast = fast.Next.Next
>     }
>
>     return slow
> }
> ```
>
> **Note:** Go's pointer semantics make nil checks crucial for avoiding runtime panics

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Cycle Detection (Floyd's Algorithm)
>
> **Problem:** Determine if a linked list has a cycle and return true/false
>
> ```typescript
> function hasCycle(head: ListNode | null): boolean {
>   if (!head) return false;
>
>   let slow = head;
>   let fast = head;
>
>   while (fast && fast.next) {
>     slow = slow.next!;
>     fast = fast.next.next;
>
>     if (slow === fast) return true;
>   }
>
>   return false;
> }
> ```
>
> **Key Insight:** If there's a cycle, the fast pointer will eventually catch up to the slow pointer

> [!example]- Pattern 2: Middle Element Discovery
>
> **Problem:** Find the middle node of a linked list in a single pass
>
> ```typescript
> function findMiddle(head: ListNode | null): ListNode | null {
>   let slow = head;
>   let fast = head;
>
>   while (fast?.next?.next) {
>     slow = slow!.next;
>     fast = fast.next.next;
>   }
>
>   return slow;
> }
> ```
>
> **Key Insight:** When fast pointer reaches the end, slow pointer is exactly at the middle

> [!example]- Pattern 3: Palindrome Linked List
>
> **Problem:** Check if a linked list reads the same forwards and backwards
>
> ```typescript
> function isPalindrome(head: ListNode | null): boolean {
>   if (!head || !head.next) return true;
>
>   // Find middle using fast/slow pointers
>   let slow = head;
>   let fast = head;
>
>   while (fast.next && fast.next.next) {
>     slow = slow.next!;
>     fast = fast.next.next;
>   }
>
>   // Reverse second half
>   let secondHalf = reverseList(slow.next);
>
>   // Compare first and second half
>   let firstHalf = head;
>   while (secondHalf) {
>     if (firstHalf.val !== secondHalf.val) return false;
>     firstHalf = firstHalf.next!;
>     secondHalf = secondHalf.next;
>   }
>
>   return true;
> }
> ```
>
> **Key Insight:** Find middle with fast/slow, reverse second half, then compare both halves

> [!example]- Pattern 4: Remove Nth Node from End
>
> **Problem:** Remove the nth node from the end of a linked list in one pass
>
> ```typescript
> function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
>   let dummy = new ListNode(0);
>   dummy.next = head;
>
>   let slow = dummy;
>   let fast = dummy;
>
>   // Move fast pointer n+1 steps ahead
>   for (let i = 0; i <= n; i++) {
>     fast = fast.next!;
>   }
>
>   // Move both pointers until fast reaches end
>   while (fast) {
>     slow = slow.next!;
>     fast = fast.next;
>   }
>
>   // Remove the nth node
>   slow.next = slow.next!.next;
>
>   return dummy.next;
> }
> ```
>
> **Key Insight:** Maintain a gap of n nodes between fast and slow pointers

---

## ⚡ Performance Analysis

| Operation           | Average | Worst Case | Space | Notes                          |
| ------------------- | ------- | ---------- | ----- | ------------------------------ |
| Cycle Detection     | O(n)    | O(n)       | O(1)  | Visits each node at most twice |
| Find Middle         | O(n)    | O(n)       | O(1)  | Single pass, no extra space    |
| Palindrome Check    | O(n)    | O(n)       | O(1)  | Includes list reversal         |
| Remove Nth from End | O(n)    | O(n)       | O(1)  | One pass with proper gap       |
| Find Cycle Start    | O(n)    | O(n)       | O(1)  | Two phases, still linear       |

> [!note]- Performance Considerations
>
> - **Space Efficiency:** Always O(1) space complexity - no additional data structures needed
> - **Time Optimization:** Single pass solutions prevent multiple traversals
> - **Cache Locality:** Sequential access pattern is cache-friendly
> - **Early Termination:** Can often exit early when condition is met

---

## 🔄 Advanced Variations

> [!info]- Variation 1: Happy Number Detection
>
> Apply fast/slow pointer concept to number sequences to detect cycles in digit manipulation
>
> - **Use case:** Detecting infinite loops in mathematical sequences
> - **Example:** Happy Number problem - detect if digit square sum cycles

> [!info]- Variation 2: Intersection of Two Linked Lists
>
> Use two pointers starting from different heads to find intersection point
>
> - **Use case:** Finding where two linked lists merge
> - **Example:** Switch pointers between lists when reaching end

> [!info]- Variation 3: Rearrange Linked List
>
> Find middle, split list, reverse second half, then merge alternately
>
> - **Use case:** Reordering linked list in specific patterns
> - **Example:** L0→L1→L2→...→Ln-1→Ln becomes L0→Ln→L1→Ln-1→L2→Ln-2→...

> [!info]- Variation 4: Circular Array Cycle Detection
>
> Apply fast/slow pointer logic to arrays with circular jumping rules
>
> - **Use case:** Detecting cycles in array traversal with custom rules
> - **Example:** Arrays where each element defines the next jump distance

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Null/Empty Lists** - Always check for null head before starting
> - **Single Node** - Handle lists with only one element specially
> - **Two Nodes** - Ensure fast.next exists before accessing fast.next.next
> - **Even vs Odd Length** - Middle element definition varies with list length
> - **Self-Pointing Node** - Node pointing to itself creates immediate cycle
> - **Fast Pointer Null** - Check both fast and fast.next in loop conditions
> - **Memory Cleanup** - Be careful when modifying list structure

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty list `null`
> - Single node `[1]`
> - Two nodes `[1,2]`
> - No cycle `[1,2,3,4]`
> - Cycle at end `[1,2,3,4] -> 2`
> - Self-cycle `[1] -> 1`

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/linked-list/141/problem|141. Linked List Cycle]]** - Learn basic cycle detection
> 2. **Practice:** Implement `findMiddle()` function for odd/even length lists
> 3. **Practice:** Create `removeNthFromEnd()` with edge case handling
> 4. **Challenge:** Solve palindrome detection without extra space
>
> **Key Learning Points:**
>
> - Master the two-speed pointer movement pattern
> - Understand when and why pointers meet in cycles
> - Practice null checking and edge case handling
> - Learn to combine fast/slow with other techniques (reversal, etc.)

> [!note]- Pro Tips
>
> 1. **Always check fast.next** before accessing fast.next.next
> 2. **Use dummy nodes** for problems involving head manipulation
> 3. **Draw diagrams** to visualize pointer movements
> 4. **Consider list length parity** when finding middle elements
> 5. **Combine with reversal** for advanced linked list manipulations

---

## 🔗 Related LeetCode Problems

- [[problems/linked-list/141/problem|141. Linked List Cycle]] - Basic cycle detection
- **142. Linked List Cycle II** - Find where cycle begins
- **876. Middle of the Linked List** - Find middle element
- **234. Palindrome Linked List** - Check palindrome with O(1) space
- **143. Reorder List** - Complex rearrangement using multiple techniques
- **19. Remove Nth Node From End** - Remove node in single pass
- **202. Happy Number** - Cycle detection in number sequences

---

## 🧠 Brain Connections

- **Two Pointers** → [[patterns/two-pointers|Two Pointers Pattern]] - Related pointer manipulation technique
- **Linked Lists** → Core data structure for this pattern
- **Floyd's Algorithm** → Mathematical foundation for cycle detection
- **Cyclic Sort** → [[patterns/cyclic-sort|Cyclic Sort Pattern]] - Alternative approach for cycle detection in arrays

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when you need to detect cycles, find middle elements, or solve linked list problems with O(1) space
- 🔧 **Implementation Choice:** Always maintain proper null checking and consider using dummy nodes for edge cases
- ⚡ **Performance:** Achieves O(n) time with O(1) space by clever pointer speed manipulation
- 🎯 **Edge Cases:** Empty lists, single nodes, and proper fast pointer advancement are critical for correct implementation

---
