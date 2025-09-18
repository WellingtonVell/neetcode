---
tags: [pattern, k-way-merge, heap, priority-queue, sorting, algorithms]
aliases: [merge-k-lists, k-sorted-merge, multi-way-merge]
type: pattern-guide
difficulty: Intermediate
time_complexity: "O(n log k)"
space_complexity: "O(k)"
prerequisites: [heap, priority-queue, merge-sort]
related_patterns: [top-k-element, two-heaps]
leetcode_problems: [23, 373, 378, 632, 295, 264]
emoji: 🌊
title: K-way Merge
description: Efficiently merge K sorted data structures using heaps to maintain order and find optimal solutions
---

[[README|🏠HOME]]

# 🌊 K-way Merge

## Overview

The K-way Merge pattern efficiently combines multiple sorted data structures using priority queues (heaps):

- **Merge K Sorted Lists** - Combine multiple sorted linked lists or arrays into one
- **K Smallest/Largest Elements** - Find top K elements across multiple sorted sources
- **Range Problems** - Find smallest ranges covering elements from all K lists
- **Stream Merging** - Merge multiple sorted data streams in real-time
- **Matrix Problems** - Handle problems involving sorted matrices or 2D arrays
- **Sliding Window on Multiple Sources** - Process multiple sorted inputs simultaneously

This pattern excels at maintaining order while processing multiple sorted inputs efficiently using heap-based coordination.

> _**Think of K-way merge as conducting an orchestra - you coordinate multiple musicians (sorted lists) to create a harmonious performance (merged result)!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Merging Sorted Data** - When you have multiple sorted arrays, lists, or streams
> - **Finding K Elements** - Finding smallest/largest K elements across multiple sources
> - **Range Optimization** - Finding optimal ranges that cover elements from all sources
> - **External Sorting** - Merging large datasets that don't fit in memory
> - **Real-time Processing** - Merging multiple sorted data streams
> - **Matrix Problems** - When dealing with sorted rows/columns in matrices

> [!warning]- Avoid When
>
> - **Unsorted Data** - Input lists/arrays are not sorted
> - **Single Source** - When dealing with only one data structure
> - **Memory Constraints** - When heap overhead is too expensive for small K
> - **Simple Concatenation** - When order doesn't matter and simple concatenation works
> - **Small K** - When K is very small and simple iteration is sufficient

---

## 💻 Core Implementations

> [!info]- TypeScript

> ### 1. Merge K Sorted Lists (Heap-based)
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
> ### 2. Kth Smallest Element in Sorted Matrix
>
> ```typescript
> function kthSmallest(matrix: number[][], k: number): number {
>   const n = matrix.length;
>   const minHeap = new MinHeap<[number, number, number]>(
>     (a, b) => a[0] - b[0]
>   );
>
>   // Add first element of each row
>   for (let i = 0; i < Math.min(n, k); i++) {
>     minHeap.push([matrix[i][0], i, 0]);
>   }
>
>   let result = 0;
>
>   for (let i = 0; i < k; i++) {
>     const [val, row, col] = minHeap.pop()!;
>     result = val;
>
>     // Add next element from same row if exists
>     if (col + 1 < n) {
>       minHeap.push([matrix[row][col + 1], row, col + 1]);
>     }
>   }
>
>   return result;
> }
> ```
>
> ### 3. Smallest Range Covering Elements from K Lists
>
> ```typescript
> function smallestRange(nums: number[][]): number[] {
>   const minHeap = new MinHeap<[number, number, number]>(
>     (a, b) => a[0] - b[0]
>   );
>   let maxVal = -Infinity;
>
>   // Initialize heap with first element from each list
>   for (let i = 0; i < nums.length; i++) {
>     minHeap.push([nums[i][0], i, 0]);
>     maxVal = Math.max(maxVal, nums[i][0]);
>   }
>
>   let minRange = Infinity;
>   let result = [0, 0];
>
>   while (minHeap.size() === nums.length) {
>     const [minVal, listIdx, elementIdx] = minHeap.pop()!;
>
>     // Update range if current is smaller
>     if (maxVal - minVal < minRange) {
>       minRange = maxVal - minVal;
>       result = [minVal, maxVal];
>     }
>
>     // Add next element from same list if exists
>     if (elementIdx + 1 < nums[listIdx].length) {
>       const nextVal = nums[listIdx][elementIdx + 1];
>       minHeap.push([nextVal, listIdx, elementIdx + 1]);
>       maxVal = Math.max(maxVal, nextVal);
>     }
>   }
>
>   return result;
> }
> ```
>
> ### 4. Merge K Sorted Arrays
>
> ```typescript
> function mergeKSortedArrays(arrays: number[][]): number[] {
>   const minHeap = new MinHeap<[number, number, number]>(
>     (a, b) => a[0] - b[0]
>   );
>
>   // Add first element from each array
>   for (let i = 0; i < arrays.length; i++) {
>     if (arrays[i].length > 0) {
>       minHeap.push([arrays[i][0], i, 0]);
>     }
>   }
>
>   const result: number[] = [];
>
>   while (minHeap.size() > 0) {
>     const [val, arrayIdx, elementIdx] = minHeap.pop()!;
>     result.push(val);
>
>     // Add next element from same array if exists
>     if (elementIdx + 1 < arrays[arrayIdx].length) {
>       minHeap.push([
>         arrays[arrayIdx][elementIdx + 1],
>         arrayIdx,
>         elementIdx + 1,
>       ]);
>     }
>   }
>
>   return result;
> }
> ```

> [!info]- Golang

> ### 1. Merge K Sorted Lists
>
> ```go
> import (
>     "container/heap"
> )
>
> type ListNode struct {
>     Val  int
>     Next *ListNode
> }
>
> type ListNodeHeap []*ListNode
>
> func (h ListNodeHeap) Len() int           { return len(h) }
> func (h ListNodeHeap) Less(i, j int) bool { return h[i].Val < h[j].Val }
> func (h ListNodeHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
>
> func (h *ListNodeHeap) Push(x interface{}) {
>     *h = append(*h, x.(*ListNode))
> }
>
> func (h *ListNodeHeap) Pop() interface{} {
>     old := *h
>     n := len(old)
>     x := old[n-1]
>     *h = old[0 : n-1]
>     return x
> }
>
> func mergeKLists(lists []*ListNode) *ListNode {
>     h := &ListNodeHeap{}
>     heap.Init(h)
>
>     // Add head of each non-empty list
>     for _, head := range lists {
>         if head != nil {
>             heap.Push(h, head)
>         }
>     }
>
>     dummy := &ListNode{}
>     current := dummy
>
>     for h.Len() > 0 {
>         node := heap.Pop(h).(*ListNode)
>         current.Next = node
>         current = current.Next
>
>         // Add next node from same list
>         if node.Next != nil {
>             heap.Push(h, node.Next)
>         }
>     }
>
>     return dummy.Next
> }
> ```
>
> ### 2. Find K Pairs with Smallest Sums
>
> ```go
> type Pair struct {
>     sum   int
>     i, j  int
> }
>
> type PairHeap []Pair
>
> func (h PairHeap) Len() int           { return len(h) }
> func (h PairHeap) Less(i, j int) bool { return h[i].sum < h[j].sum }
> func (h PairHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
>
> func (h *PairHeap) Push(x interface{}) {
>     *h = append(*h, x.(Pair))
> }
>
> func (h *PairHeap) Pop() interface{} {
>     old := *h
>     n := len(old)
>     x := old[n-1]
>     *h = old[0 : n-1]
>     return x
> }
>
> func kSmallestPairs(nums1 []int, nums2 []int, k int) [][]int {
>     if len(nums1) == 0 || len(nums2) == 0 || k == 0 {
>         return [][]int{}
>     }
>
>     h := &PairHeap{}
>     heap.Init(h)
>
>     // Add pairs with first element of nums2
>     for i := 0; i < len(nums1) && i < k; i++ {
>         heap.Push(h, Pair{nums1[i] + nums2[0], i, 0})
>     }
>
>     result := [][]int{}
>
>     for k > 0 && h.Len() > 0 {
>         pair := heap.Pop(h).(Pair)
>         result = append(result, []int{nums1[pair.i], nums2[pair.j]})
>         k--
>
>         // Add next pair from same nums1 element
>         if pair.j+1 < len(nums2) {
>             heap.Push(h, Pair{
>                 nums1[pair.i] + nums2[pair.j+1],
>                 pair.i,
>                 pair.j + 1,
>             })
>         }
>     }
>
>     return result
> }
> ```
>
> ### 3. Ugly Number II (K-way merge variant)
>
> ```go
> func nthUglyNumber(n int) int {
>     ugly := make([]int, n)
>     ugly[0] = 1
>
>     i2, i3, i5 := 0, 0, 0
>
>     for i := 1; i < n; i++ {
>         next2 := ugly[i2] * 2
>         next3 := ugly[i3] * 3
>         next5 := ugly[i5] * 5
>
>         nextUgly := min(next2, min(next3, next5))
>         ugly[i] = nextUgly
>
>         if nextUgly == next2 {
>             i2++
>         }
>         if nextUgly == next3 {
>             i3++
>         }
>         if nextUgly == next5 {
>             i5++
>         }
>     }
>
>     return ugly[n-1]
> }
>
> func min(a, b int) int {
>     if a < b {
>         return a
>     }
>     return b
> }
> ```

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Merge K Sorted Lists
>
> **Problem:** Merge K sorted linked lists into one sorted list
>
> ```typescript
> function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
>   const minHeap = new MinHeap<ListNode>((a, b) => a.val - b.val);
>
>   // Initialize heap with heads of all non-empty lists
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
> **Key Insight:** Always process the globally smallest available element using heap coordination

> [!example]- Pattern 2: Kth Smallest in Sorted Matrix
>
> **Problem:** Find the kth smallest element in a row and column sorted matrix
>
> ```typescript
> function kthSmallest(matrix: number[][], k: number): number {
>   const n = matrix.length;
>   const minHeap = new MinHeap<[number, number, number]>(
>     (a, b) => a[0] - b[0]
>   );
>
>   // Start with first element of each row
>   for (let i = 0; i < Math.min(n, k); i++) {
>     minHeap.push([matrix[i][0], i, 0]);
>   }
>
>   let result = 0;
>
>   // Extract k elements
>   for (let i = 0; i < k; i++) {
>     const [val, row, col] = minHeap.pop()!;
>     result = val;
>
>     // Add next element from same row if exists
>     if (col + 1 < n) {
>       minHeap.push([matrix[row][col + 1], row, col + 1]);
>     }
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Use heap to maintain candidate elements from each row; expand rightward

> [!example]- Pattern 3: Smallest Range Covering Elements
>
> **Problem:** Find smallest range that includes at least one element from each of K lists
>
> ```typescript
> function smallestRange(nums: number[][]): number[] {
>   const minHeap = new MinHeap<[number, number, number]>(
>     (a, b) => a[0] - b[0]
>   );
>   let maxVal = -Infinity;
>
>   // Initialize with first element from each list
>   for (let i = 0; i < nums.length; i++) {
>     minHeap.push([nums[i][0], i, 0]);
>     maxVal = Math.max(maxVal, nums[i][0]);
>   }
>
>   let minRange = Infinity;
>   let result = [0, 0];
>
>   // Continue until we can't maintain elements from all lists
>   while (minHeap.size() === nums.length) {
>     const [minVal, listIdx, elementIdx] = minHeap.pop()!;
>
>     // Update range if current is smaller
>     if (maxVal - minVal < minRange) {
>       minRange = maxVal - minVal;
>       result = [minVal, maxVal];
>     }
>
>     // Add next element from same list if exists
>     if (elementIdx + 1 < nums[listIdx].length) {
>       const nextVal = nums[listIdx][elementIdx + 1];
>       minHeap.push([nextVal, listIdx, elementIdx + 1]);
>       maxVal = Math.max(maxVal, nextVal);
>     }
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Track both min (heap) and max values; advance minimum to shrink range

> [!example]- Pattern 4: Find K Pairs with Smallest Sums
>
> **Problem:** Find K pairs with smallest sums from two sorted arrays
>
> ```typescript
> function kSmallestPairs(
>   nums1: number[],
>   nums2: number[],
>   k: number
> ): number[][] {
>   const minHeap = new MinHeap<[number, number, number]>(
>     (a, b) => a[0] - b[0]
>   );
>
>   // Initialize with pairs using first element of nums2
>   for (let i = 0; i < Math.min(nums1.length, k); i++) {
>     minHeap.push([nums1[i] + nums2[0], i, 0]);
>   }
>
>   const result: number[][] = [];
>
>   while (result.length < k && minHeap.size() > 0) {
>     const [sum, i, j] = minHeap.pop()!;
>     result.push([nums1[i], nums2[j]]);
>
>     // Add next pair from same nums1 element if possible
>     if (j + 1 < nums2.length) {
>       minHeap.push([nums1[i] + nums2[j + 1], i, j + 1]);
>     }
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Start with promising candidates; expand systematically to avoid duplicates

---

## ⚡ Performance Analysis

| Problem Type           | Time Complexity   | Space Complexity | Notes                                |
| ---------------------- | ----------------- | ---------------- | ------------------------------------ |
| Merge K Lists          | O(n log k)        | O(k)             | n = total nodes, k = number of lists |
| Kth Smallest in Matrix | O(k log min(k,n)) | O(min(k,n))      | n = matrix dimension                 |
| Smallest Range         | O(n log k)        | O(k)             | n = total elements across all lists  |
| K Smallest Pairs       | O(k log k)        | O(k)             | Generate only k pairs                |
| External Sort          | O(n log k)        | O(k)             | k = number of chunks/files           |

> [!note]- Performance Considerations
>
> - **Heap Size:** Keep heap size at O(k) for optimal space usage
> - **Early Termination:** Stop when result is found (don't process all elements)
> - **Memory Efficiency:** Only store active candidates, not entire datasets
> - **Cache Locality:** Sequential access patterns in sorted data improve performance

---

## 🔄 Advanced Variations

> [!info]- Variation 1: External Merge Sort
>
> Handle datasets larger than memory by merging sorted chunks from disk
>
> - **Use case:** Big data processing, database sorting
> - **Example:** Sorting multi-gigabyte files, distributed sorting

> [!info]- Variation 2: Online K-way Merge
>
> Merge data streams in real-time as they arrive
>
> - **Use case:** Real-time analytics, log aggregation
> - **Example:** Merging timestamped events from multiple sources

> [!info]- Variation 3: Weighted K-way Merge
>
> Give different priorities or weights to different sources
>
> - **Use case:** Load balancing, priority scheduling
> - **Example:** Merging queues with different priorities

> [!info]- Variation 4: Parallel K-way Merge
>
> Distribute merge operations across multiple processors
>
> - **Use case:** High-performance computing, parallel algorithms
> - **Example:** MapReduce merge phase, parallel sorting

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Empty Lists** - Handle lists with no elements gracefully
> - **Single List** - Optimize for trivial case with only one input
> - **Duplicate Values** - Ensure stable sorting when values are equal
> - **Memory Limits** - Monitor heap size for large K values
> - **Integer Overflow** - Be careful with sum calculations in pair problems
> - **List Exhaustion** - Handle when some lists are shorter than others
> - **K Greater Than Total** - Handle when K exceeds available elements

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty input arrays `[]`
> - Single list `[[1,2,3]]`
> - Lists of different lengths
> - All same values `[[1,1], [1,1]]`
> - K = 1 (minimum case)
> - K > total elements
> - Large K values for performance testing

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/23/problem|23. Merge k Sorted Lists]]** - Master basic heap coordination
> 2. **Practice:** Implement `kthSmallest()` for matrix problems
> 3. **Practice:** Solve `smallestRange()` for range optimization
> 4. **Challenge:** Tackle `kSmallestPairs()` with systematic expansion
>
> **Key Learning Points:**
>
> - Master heap-based coordination of multiple sorted sources
> - Understand how to maintain global ordering across K inputs
> - Practice systematic expansion to avoid duplicate work
> - Learn to optimize space by maintaining only active candidates

> [!note]- Pro Tips
>
> 1. **Heap Management:** Keep heap size at O(k), not O(n)
> 2. **Initialization:** Start with one element from each source
> 3. **Expansion Strategy:** Add next candidate only when current is processed
> 4. **Termination:** Stop early when result is found or sources exhausted
> 5. **Memory Optimization:** Use indices instead of copying data when possible

---

## 🔗 Related LeetCode Problems

- [[problems/23/problem|23. Merge k Sorted Lists]] - Classic K-way merge with linked lists
- **373. Find K Pairs with Smallest Sums** - Systematic pair generation
- **378. Kth Smallest Element in a Sorted Matrix** - Matrix traversal with heap
- **632. Smallest Range Covering Elements from K Lists** - Range optimization
- **295. Find Median from Data Stream** - Related heap-based streaming problem
- **264. Ugly Number II** - K-way merge variant with multiple sequences

---

## 🧠 Brain Connections

- **Top K Elements** → [[patterns/top-k-element|Top K Elements Pattern]] - Related heap-based selection problems
- **Two Heaps** → [[patterns/two-heaps|Two Heaps Pattern]] - Advanced heap coordination techniques
- **Merge Sort** → Foundation algorithm for understanding merge operations
- **Priority Queues** → Core data structure for maintaining order across multiple sources

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when you need to merge or find optimal elements across multiple sorted sources
- 🔧 **Implementation Choice:** Heap-based coordination maintains global order while processing only necessary elements
- ⚡ **Performance:** O(n log k) complexity is optimal for most K-way merge problems when k << n
- 🎯 **Edge Cases:** Handle empty inputs, varying list lengths, and optimize heap size to maintain O(k) space

---
