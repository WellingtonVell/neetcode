---
tags: [pattern, heap, priority-queue, data-structure, algorithms, top-k]
aliases: [kth-largest, heap-sort, priority-queue-problems]
type: pattern-guide
difficulty: Intermediate
time_complexity: "O(n log k)"
space_complexity: "O(k)"
prerequisites: [heap, priority-queue, sorting]
related_patterns: [heap-sort, quickselect]
leetcode_problems: [215, 347, 692, 973, 703, 1464]
emoji: 🏆
title: Top K Elements
description: Use heaps and priority queues to efficiently find the K largest, smallest, or most frequent elements
---

[[README|🏠HOME]]

# 🏆 Top K Elements

## Overview

The Top K Elements pattern uses heaps (priority queues) to efficiently find the K largest, smallest, or most frequent elements:

- **K Largest/Smallest** - Find top K elements by value using min/max heaps
- **K Most Frequent** - Find top K elements by frequency using frequency maps and heaps
- **Streaming Data** - Maintain top K elements in real-time data streams
- **K Closest Points** - Find K nearest elements based on distance or custom criteria
- **Merge K Lists** - Combine K sorted structures using heap for efficient merging
- **Sliding Window Maximum** - Track maximum elements in sliding windows

This pattern is essential for ranking, recommendation systems, and real-time analytics where you need the "best" K items efficiently.

> _**Think of this pattern as maintaining a VIP list - you always know who the top performers are without having to sort everyone!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Finding K Largest/Smallest** - When you need top K elements by value
> - **Frequency-Based Ranking** - Finding most/least frequent elements
> - **Streaming Data Analysis** - Maintaining top K in real-time data streams
> - **Distance-Based Problems** - K closest points, nearest neighbors
> - **Merging Sorted Data** - Combining multiple sorted arrays/lists
> - **Sliding Window Extremes** - Maximum/minimum in sliding windows

> [!warning]- Avoid When
>
> - **K = N (All Elements)** - Use sorting instead of heap for complete ordering
> - **Single Element** - Use simple max/min for K=1 scenarios
> - **Small Fixed Arrays** - Linear search might be simpler for tiny datasets
> - **Memory Constraints** - When O(K) space is too expensive
> - **Exact Ordering Required** - When you need all elements sorted, not just top K

---

## 💻 Core Implementations

> [!info]- TypeScript
>
> ### 1. K Largest Elements (Min Heap)
>
> ```typescript
> class MinHeap<T> {
>   private heap: T[] = [];
>
>   constructor(private compare: (a: T, b: T) => number) {}
>
>   push(val: T): void {
>     this.heap.push(val);
>     this.heapifyUp(this.heap.length - 1);
>   }
>
>   pop(): T | undefined {
>     if (this.heap.length === 0) return undefined;
>     if (this.heap.length === 1) return this.heap.pop();
>
>     const root = this.heap[0];
>     this.heap[0] = this.heap.pop()!;
>     this.heapifyDown(0);
>     return root;
>   }
>
>   peek(): T | undefined {
>     return this.heap[0];
>   }
>
>   size(): number {
>     return this.heap.length;
>   }
>
>   private heapifyUp(index: number): void {
>     while (index > 0) {
>       const parentIndex = Math.floor((index - 1) / 2);
>       if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;
>
>       [this.heap[index], this.heap[parentIndex]] = [
>         this.heap[parentIndex],
>         this.heap[index],
>       ];
>       index = parentIndex;
>     }
>   }
>
>   private heapifyDown(index: number): void {
>     while (true) {
>       let minIndex = index;
>       const leftChild = 2 * index + 1;
>       const rightChild = 2 * index + 2;
>
>       if (
>         leftChild < this.heap.length &&
>         this.compare(this.heap[leftChild], this.heap[minIndex]) < 0
>       ) {
>         minIndex = leftChild;
>       }
>
>       if (
>         rightChild < this.heap.length &&
>         this.compare(this.heap[rightChild], this.heap[minIndex]) < 0
>       ) {
>         minIndex = rightChild;
>       }
>
>       if (minIndex === index) break;
>
>       [this.heap[index], this.heap[minIndex]] = [
>         this.heap[minIndex],
>         this.heap[index],
>       ];
>       index = minIndex;
>     }
>   }
> }
>
> function findKLargest(nums: number[], k: number): number[] {
>   const minHeap = new MinHeap<number>((a, b) => a - b);
>
>   // Build heap of size k
>   for (const num of nums) {
>     if (minHeap.size() < k) {
>       minHeap.push(num);
>     } else if (num > minHeap.peek()!) {
>       minHeap.pop();
>       minHeap.push(num);
>     }
>   }
>
>   // Extract all elements
>   const result: number[] = [];
>   while (minHeap.size() > 0) {
>     result.unshift(minHeap.pop()!);
>   }
>
>   return result;
> }
> ```
>
> ### 2. Top K Frequent Elements
>
> ```typescript
> function topKFrequent(nums: number[], k: number): number[] {
>   // Count frequencies
>   const freqMap = new Map<number, number>();
>   for (const num of nums) {
>     freqMap.set(num, (freqMap.get(num) || 0) + 1);
>   }
>
>   // Use min heap to keep top k frequent
>   const minHeap = new MinHeap<[number, number]>((a, b) => a[1] - b[1]);
>
>   for (const [num, freq] of freqMap) {
>     if (minHeap.size() < k) {
>       minHeap.push([num, freq]);
>     } else if (freq > minHeap.peek()![1]) {
>       minHeap.pop();
>       minHeap.push([num, freq]);
>     }
>   }
>
>   // Extract numbers
>   const result: number[] = [];
>   while (minHeap.size() > 0) {
>     result.push(minHeap.pop()![0]);
>   }
>
>   return result;
> }
> ```
>
> ### 3. Kth Largest in Stream
>
> ```typescript
> class KthLargest {
>   private minHeap: MinHeap<number>;
>   private k: number;
>
>   constructor(k: number, nums: number[]) {
>     this.k = k;
>     this.minHeap = new MinHeap<number>((a, b) => a - b);
>
>     // Add all numbers to heap
>     for (const num of nums) {
>       this.add(num);
>     }
>   }
>
>   add(val: number): number {
>     if (this.minHeap.size() < this.k) {
>       this.minHeap.push(val);
>     } else if (val > this.minHeap.peek()!) {
>       this.minHeap.pop();
>       this.minHeap.push(val);
>     }
>
>     return this.minHeap.peek()!;
>   }
> }
> ```

> [!info]- Golang
>
> ### 1. K Largest Using Container/Heap
>
> ```go
> import (
>     "container/heap"
> )
>
> type IntHeap []int
>
> func (h IntHeap) Len() int           { return len(h) }
> func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] } // Min heap
> func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
>
> func (h *IntHeap) Push(x interface{}) {
>     *h = append(*h, x.(int))
> }
>
> func (h *IntHeap) Pop() interface{} {
>     old := *h
>     n := len(old)
>     x := old[n-1]
>     *h = old[0 : n-1]
>     return x
> }
>
> func findKLargest(nums []int, k int) []int {
>     h := &IntHeap{}
>     heap.Init(h)
>
>     for _, num := range nums {
>         if h.Len() < k {
>             heap.Push(h, num)
>         } else if num > (*h)[0] {
>             heap.Pop(h)
>             heap.Push(h, num)
>         }
>     }
>
>     result := make([]int, k)
>     for i := k - 1; i >= 0; i-- {
>         result[i] = heap.Pop(h).(int)
>     }
>
>     return result
> }
> ```
>
> ### 2. Top K Frequent with Custom Struct
>
> ```go
> type FreqPair struct {
>     num  int
>     freq int
> }
>
> type FreqHeap []FreqPair
>
> func (h FreqHeap) Len() int           { return len(h) }
> func (h FreqHeap) Less(i, j int) bool { return h[i].freq < h[j].freq }
> func (h FreqHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
>
> func (h *FreqHeap) Push(x interface{}) {
>     *h = append(*h, x.(FreqPair))
> }
>
> func (h *FreqHeap) Pop() interface{} {
>     old := *h
>     n := len(old)
>     x := old[n-1]
>     *h = old[0 : n-1]
>     return x
> }
>
> func topKFrequent(nums []int, k int) []int {
>     // Count frequencies
>     freqMap := make(map[int]int)
>     for _, num := range nums {
>         freqMap[num]++
>     }
>
>     // Use min heap
>     h := &FreqHeap{}
>     heap.Init(h)
>
>     for num, freq := range freqMap {
>         if h.Len() < k {
>             heap.Push(h, FreqPair{num, freq})
>         } else if freq > (*h)[0].freq {
>             heap.Pop(h)
>             heap.Push(h, FreqPair{num, freq})
>         }
>     }
>
>     result := make([]int, k)
>     for i := 0; i < k; i++ {
>         result[i] = heap.Pop(h).(FreqPair).num
>     }
>
>     return result
> }
> ```

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Kth Largest Element in Array
>
> **Problem:** Find the kth largest element in an unsorted array
>
> ```typescript
> function findKthLargest(nums: number[], k: number): number {
>   const minHeap = new MinHeap<number>((a, b) => a - b);
>
>   // Maintain heap of size k with k largest elements
>   for (const num of nums) {
>     if (minHeap.size() < k) {
>       minHeap.push(num);
>     } else if (num > minHeap.peek()!) {
>       minHeap.pop(); // Remove smallest of k largest
>       minHeap.push(num); // Add new larger element
>     }
>   }
>
>   return minHeap.peek()!; // Root is kth largest
> }
> ```
>
> **Key Insight:** Use min heap of size K - root is always the Kth largest element

> [!example]- Pattern 2: Top K Frequent Elements
>
> **Problem:** Find the k most frequent elements in an array
>
> ```typescript
> function topKFrequent(nums: number[], k: number): number[] {
>   // Step 1: Count frequencies
>   const freqMap = new Map<number, number>();
>   for (const num of nums) {
>     freqMap.set(num, (freqMap.get(num) || 0) + 1);
>   }
>
>   // Step 2: Use min heap to find top k frequent
>   const minHeap = new MinHeap<[number, number]>((a, b) => a[1] - b[1]);
>
>   for (const [num, freq] of freqMap) {
>     if (minHeap.size() < k) {
>       minHeap.push([num, freq]);
>     } else if (freq > minHeap.peek()![1]) {
>       minHeap.pop();
>       minHeap.push([num, freq]);
>     }
>   }
>
>   // Step 3: Extract elements
>   return Array.from(minHeap.heap).map(([num]) => num);
> }
> ```
>
> **Key Insight:** Combine frequency counting with heap-based top K selection

> [!example]- Pattern 3: K Closest Points to Origin
>
> **Problem:** Find K points closest to origin (0,0)
>
> ```typescript
> function kClosest(points: number[][], k: number): number[][] {
>   // Use max heap to keep k closest points
>   const maxHeap = new MinHeap<[number[], number]>((a, b) => b[1] - a[1]);
>
>   for (const point of points) {
>     const distance = point[0] * point[0] + point[1] * point[1]; // No sqrt needed
>
>     if (maxHeap.size() < k) {
>       maxHeap.push([point, distance]);
>     } else if (distance < maxHeap.peek()![1]) {
>       maxHeap.pop();
>       maxHeap.push([point, distance]);
>     }
>   }
>
>   return Array.from(maxHeap.heap).map(([point]) => point);
> }
> ```
>
> **Key Insight:** Use distance calculation without sqrt for efficiency; max heap for closest points

> [!example]- Pattern 4: Merge K Sorted Lists
>
> **Problem:** Merge k sorted linked lists into one sorted list
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
> function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
>   const minHeap = new MinHeap<ListNode>((a, b) => a.val - b.val);
>
>   // Add head of each non-empty list to heap
>   for (const head of lists) {
>     if (head) minHeap.push(head);
>   }
>
>   const dummy = new ListNode(0);
>   let current = dummy;
>
>   while (minHeap.size() > 0) {
>     const node = minHeap.pop()!;
>     current.next = node;
>     current = current.next;
>
>     // Add next node from same list if exists
>     if (node.next) {
>       minHeap.push(node.next);
>     }
>   }
>
>   return dummy.next;
> }
> ```
>
> **Key Insight:** Always process the smallest available element; add next element from same list

---

## ⚡ Performance Analysis

| Operation             | Average    | Worst Case | Space    | Notes                       |
| --------------------- | ---------- | ---------- | -------- | --------------------------- |
| K Largest/Smallest    | O(n log k) | O(n log k) | O(k)     | Maintain heap of size k     |
| Top K Frequent        | O(n log k) | O(n log k) | O(n + k) | Frequency map + heap        |
| K Closest Points      | O(n log k) | O(n log k) | O(k)     | Distance calculation + heap |
| Merge K Lists         | O(n log k) | O(n log k) | O(k)     | n = total nodes, k = lists  |
| Kth Largest in Stream | O(log k)   | O(log k)   | O(k)     | Per add operation           |

> [!note]- Performance Considerations
>
> - **Heap Size:** Keep heap size at K for optimal space and time complexity
> - **Comparison Function:** Ensure O(1) comparison for custom objects
> - **Memory Efficiency:** Min heap for largest, max heap for smallest problems
> - **Alternative Approaches:** QuickSelect O(n) average for single queries, but heap better for multiple queries

---

## 🔄 Advanced Variations

> [!info]- Variation 1: Sliding Window Maximum
>
> Use deque or heap to maintain maximum in sliding window
>
> - **Use case:** Real-time analytics, monitoring systems
> - **Example:** Sliding Window Maximum, Maximum of all subarrays of size k

> [!info]- Variation 2: K Pairs with Smallest Sums
>
> Use heap to merge and find optimal pairs from multiple arrays
>
> - **Use case:** Recommendation systems, cross-product optimization
> - **Example:** Find K Pairs with Smallest Sums, Smallest Range Covering Elements

> [!info]- Variation 3: Top K in Matrix
>
> Apply heap techniques to 2D matrices for finding extremes
>
> - **Use case:** Image processing, matrix analytics
> - **Example:** Kth Smallest Element in Sorted Matrix, Find K Closest Elements

> [!info]- Variation 4: Multi-way Merge
>
> Extend merge k lists concept to various data structures
>
> - **Use case:** Database joins, distributed systems
> - **Example:** Merge k sorted arrays, merge intervals from k sources

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **K = 0 or K > N** - Handle invalid K values appropriately
> - **Empty Input** - Check for empty arrays/lists before processing
> - **All Equal Elements** - Ensure stable sorting when elements are identical
> - **Memory Limits** - Monitor heap size in streaming scenarios
> - **Integer Overflow** - Be careful with distance calculations and large numbers
> - **Null/Undefined** - Handle null nodes in linked list scenarios
> - **Frequency Ties** - Define behavior when multiple elements have same frequency

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty arrays `[]`
> - K = 1 (single element)
> - K = array length (all elements)
> - Duplicate elements
> - Already sorted vs random order
> - Large datasets for performance
> - Edge values (min/max integers)

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/215/problem|215. Kth Largest Element in an Array]]** - Master basic heap operations
> 2. **Practice:** Implement `topKFrequent()` with frequency counting
> 3. **Practice:** Solve `kClosest()` with distance calculations
> 4. **Challenge:** Build `KthLargest` class for streaming data
>
> **Key Learning Points:**
>
> - Master min heap vs max heap selection for different problems
> - Understand heap size management (maintaining size K)
> - Practice combining data structures (maps + heaps)
> - Learn to optimize comparison functions for custom objects

> [!note]- Pro Tips
>
> 1. **Heap Choice:** Use min heap for "largest" problems, max heap for "smallest"
> 2. **Size Management:** Keep heap at size K, not larger
> 3. **Custom Comparators:** Design efficient comparison functions
> 4. **Memory Optimization:** Consider space complexity for streaming problems
> 5. **Alternative Approaches:** Know when QuickSelect might be better

---

## 🔗 Related LeetCode Problems

- [[problems/215/problem|215. Kth Largest Element in an Array]] - Classic heap-based selection
- **347. Top K Frequent Elements** - Frequency counting with heaps
- **692. Top K Frequent Words** - String frequency with custom comparison
- **973. K Closest Points to Origin** - Distance-based heap problems
- **703. Kth Largest Element in a Stream** - Real-time heap maintenance
- **1464. Maximum Product of Two Elements** - Simple heap application

---

## 🧠 Brain Connections

- **Heap/Priority Queue** → Foundation data structure for efficient extremes
- **K-way Merge** → [[patterns/k-way-merge|K-way Merge Pattern]] - Related heap coordination for multiple sources
- **QuickSelect** → O(n) average alternative for single K queries
- **Two Heaps** → [[patterns/two-heaps|Two Heaps Pattern]] - Related heap-based pattern for medians

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when you need top/bottom K elements without full sorting
- 🔧 **Implementation Choice:** Min heap for K largest, max heap for K smallest; maintain heap size K
- ⚡ **Performance:** O(n log k) is better than O(n log n) sorting when k << n
- 🎯 **Edge Cases:** Handle invalid K values, empty inputs, and memory constraints in streaming scenarios

---
