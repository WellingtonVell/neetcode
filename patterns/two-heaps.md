---
tags: [pattern, two-heaps, data-structure, algorithms, priority-queue]
aliases: [dual-heap, heap-balancing, median-heap]
type: pattern-guide
status: complete
difficulty: Advanced
time_complexity: "O(log n)"
space_complexity: "O(n)"
prerequisites: [heaps, priority-queues]
related_patterns: [sliding-window, binary-search]
leetcode_problems: [295, 480, 502, 436, 253, 1606]
emoji: ⚖️
title: Two Heaps
description: Use two heaps to efficiently maintain balance and find medians in dynamic data streams
---

[[README|🏠HOME]]

# ⚖️ Two Heaps

## Overview

The Two Heaps pattern uses two priority queues (heaps) to efficiently maintain a balanced partition of data:

- **Dynamic Median Finding** - Maintain running median in streaming data with O(log n) insertions
- **Balanced Partitioning** - Keep data split into two balanced halves efficiently
- **Priority Queue Management** - Use max-heap for smaller half, min-heap for larger half
- **Stream Processing** - Handle continuous data streams with optimal performance
- **Sliding Window Optimization** - Extend to sliding window problems with heap balancing
- **Real-time Analytics** - Provide instant median/percentile calculations

This pattern is fundamental for problems requiring dynamic median calculation, balanced data partitioning, or streaming analytics.

> _**Think of this pattern as a balance scale - you keep roughly equal amounts on both sides, and the middle point tells you the median!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Dynamic Median** - Finding median in streaming or continuously changing data
> - **Balanced Partitioning** - Maintaining two balanced halves of a dataset
> - **Sliding Window Median** - Computing median over sliding windows efficiently
> - **Percentile Calculations** - Finding any percentile in dynamic datasets
> - **Stream Analytics** - Real-time statistics on data streams
> - **Priority-based Scheduling** - Managing tasks with priority balancing

> [!warning]- Avoid When
>
> - **Static Data** - When data doesn't change (simple sorting is better)
> - **Small Datasets** - Overhead not justified for small amounts of data
> - **Exact Median Unnecessary** - When approximate median is sufficient
> - **Memory Constraints** - When space for two heaps is too expensive
> - **Simple Queries** - When you only need min/max, not median

---

## 💻 Core Implementations

> [!info]- TypeScript
>
> ### 1. MedianFinder Class
>
> ```typescript
> class MedianFinder {
>   private maxHeap: number[]; // For smaller half (max at top)
>   private minHeap: number[]; // For larger half (min at top)
>
>   constructor() {
>     this.maxHeap = [];
>     this.minHeap = [];
>   }
>
>   addNum(num: number): void {
>     // Add to max heap (smaller half) by default
>     if (this.maxHeap.length === 0 || num <= this.getMaxHeapTop()) {
>       this.insertMaxHeap(num);
>     } else {
>       this.insertMinHeap(num);
>     }
>
>     // Balance heaps
>     this.balanceHeaps();
>   }
>
>   findMedian(): number {
>     if (this.maxHeap.length === this.minHeap.length) {
>       return (this.getMaxHeapTop() + this.getMinHeapTop()) / 2;
>     }
>     return this.maxHeap.length > this.minHeap.length
>       ? this.getMaxHeapTop()
>       : this.getMinHeapTop();
>   }
>
>   private balanceHeaps(): void {
>     // Max heap should not have more than 1 extra element
>     if (this.maxHeap.length > this.minHeap.length + 1) {
>       this.insertMinHeap(this.extractMaxHeap());
>     }
>     // Min heap should not have more than 1 extra element
>     else if (this.minHeap.length > this.maxHeap.length + 1) {
>       this.insertMaxHeap(this.extractMinHeap());
>     }
>   }
>
>   private insertMaxHeap(val: number): void {
>     this.maxHeap.push(val);
>     this.heapifyUpMax(this.maxHeap.length - 1);
>   }
>
>   private insertMinHeap(val: number): void {
>     this.minHeap.push(val);
>     this.heapifyUpMin(this.minHeap.length - 1);
>   }
>
>   private extractMaxHeap(): number {
>     const max = this.maxHeap[0];
>     this.maxHeap[0] = this.maxHeap[this.maxHeap.length - 1];
>     this.maxHeap.pop();
>     if (this.maxHeap.length > 0) {
>       this.heapifyDownMax(0);
>     }
>     return max;
>   }
>
>   private extractMinHeap(): number {
>     const min = this.minHeap[0];
>     this.minHeap[0] = this.minHeap[this.minHeap.length - 1];
>     this.minHeap.pop();
>     if (this.minHeap.length > 0) {
>       this.heapifyDownMin(0);
>     }
>     return min;
>   }
>
>   private getMaxHeapTop(): number {
>     return this.maxHeap.length > 0
>       ? this.maxHeap[0]
>       : Number.MIN_SAFE_INTEGER;
>   }
>
>   private getMinHeapTop(): number {
>     return this.minHeap.length > 0
>       ? this.minHeap[0]
>       : Number.MAX_SAFE_INTEGER;
>   }
>
>   // Heap operations (simplified - production code would need full implementation)
>   private heapifyUpMax(index: number): void {
>     // Implementation for max heap upward heapify
>   }
>
>   private heapifyDownMax(index: number): void {
>     // Implementation for max heap downward heapify
>   }
>
>   private heapifyUpMin(index: number): void {
>     // Implementation for min heap upward heapify
>   }
>
>   private heapifyDownMin(index: number): void {
>     // Implementation for min heap downward heapify
>   }
> }
> ```
>
> ### 2. Sliding Window Median
>
> ```typescript
> function medianSlidingWindow(nums: number[], k: number): number[] {
>   const result: number[] = [];
>   const maxHeap: number[] = []; // Smaller half
>   const minHeap: number[] = []; // Larger half
>
>   for (let i = 0; i < nums.length; i++) {
>     // Add current number
>     addNumber(nums[i], maxHeap, minHeap);
>
>     // Remove number going out of window
>     if (i >= k) {
>       removeNumber(nums[i - k], maxHeap, minHeap);
>     }
>
>     // Calculate median when window is full
>     if (i >= k - 1) {
>       result.push(getMedian(maxHeap, minHeap));
>     }
>   }
>
>   return result;
> }
> ```

> [!info]- Golang
>
> ### 1. MedianFinder with container/heap
>
> ```go
> import (
>     "container/heap"
> )
>
> type MaxHeap []int
> func (h MaxHeap) Len() int           { return len(h) }
> func (h MaxHeap) Less(i, j int) bool { return h[i] > h[j] } // Max heap
> func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
> func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
> func (h *MaxHeap) Pop() interface{} {
>     old := *h
>     n := len(old)
>     x := old[n-1]
>     *h = old[0 : n-1]
>     return x
> }
>
> type MinHeap []int
> func (h MinHeap) Len() int           { return len(h) }
> func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] } // Min heap
> func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
> func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
> func (h *MinHeap) Pop() interface{} {
>     old := *h
>     n := len(old)
>     x := old[n-1]
>     *h = old[0 : n-1]
>     return x
> }
>
> type MedianFinder struct {
>     maxHeap *MaxHeap // Smaller half
>     minHeap *MinHeap // Larger half
> }
>
> func Constructor() MedianFinder {
>     maxH := &MaxHeap{}
>     minH := &MinHeap{}
>     heap.Init(maxH)
>     heap.Init(minH)
>     return MedianFinder{maxHeap: maxH, minHeap: minH}
> }
>
> func (mf *MedianFinder) AddNum(num int) {
>     // Add to appropriate heap
>     if mf.maxHeap.Len() == 0 || num <= (*mf.maxHeap)[0] {
>         heap.Push(mf.maxHeap, num)
>     } else {
>         heap.Push(mf.minHeap, num)
>     }
>
>     // Balance heaps
>     mf.balanceHeaps()
> }
>
> func (mf *MedianFinder) FindMedian() float64 {
>     if mf.maxHeap.Len() == mf.minHeap.Len() {
>         return float64((*mf.maxHeap)[0] + (*mf.minHeap)[0]) / 2.0
>     }
>     if mf.maxHeap.Len() > mf.minHeap.Len() {
>         return float64((*mf.maxHeap)[0])
>     }
>     return float64((*mf.minHeap)[0])
> }
>
> func (mf *MedianFinder) balanceHeaps() {
>     if mf.maxHeap.Len() > mf.minHeap.Len() + 1 {
>         heap.Push(mf.minHeap, heap.Pop(mf.maxHeap))
>     } else if mf.minHeap.Len() > mf.maxHeap.Len() + 1 {
>         heap.Push(mf.maxHeap, heap.Pop(mf.minHeap))
>     }
> }
> ```
>
> **Note:** Go's container/heap package provides efficient heap operations

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Find Median from Data Stream
>
> **Problem:** Design a data structure that supports adding numbers and finding the median
>
> ```typescript
> class MedianFinder {
>   private maxHeap: number[] = []; // Smaller half
>   private minHeap: number[] = []; // Larger half
>
>   addNum(num: number): void {
>     // Always add to max heap first, then balance
>     if (this.maxHeap.length === 0 || num <= this.getMax()) {
>       this.maxHeap.push(num);
>       this.bubbleUpMax(this.maxHeap.length - 1);
>     } else {
>       this.minHeap.push(num);
>       this.bubbleUpMin(this.minHeap.length - 1);
>     }
>
>     this.balance();
>   }
>
>   findMedian(): number {
>     if (this.maxHeap.length === this.minHeap.length) {
>       return (this.getMax() + this.getMin()) / 2;
>     }
>     return this.maxHeap.length > this.minHeap.length
>       ? this.getMax()
>       : this.getMin();
>   }
>
>   private balance(): void {
>     if (this.maxHeap.length > this.minHeap.length + 1) {
>       const val = this.extractMax();
>       this.minHeap.push(val);
>       this.bubbleUpMin(this.minHeap.length - 1);
>     } else if (this.minHeap.length > this.maxHeap.length + 1) {
>       const val = this.extractMin();
>       this.maxHeap.push(val);
>       this.bubbleUpMax(this.maxHeap.length - 1);
>     }
>   }
> }
> ```
>
> **Key Insight:** Maintain balanced heaps where max heap stores smaller half, min heap stores larger half

> [!example]- Pattern 2: Sliding Window Median
>
> **Problem:** Find median of all subarrays of size k in an array
>
> ```typescript
> function medianSlidingWindow(nums: number[], k: number): number[] {
>   const result: number[] = [];
>   const window: number[] = [];
>
>   for (let i = 0; i < nums.length; i++) {
>     // Add current element to window
>     window.push(nums[i]);
>
>     // Remove element going out of window
>     if (window.length > k) {
>       const removeIdx = window.indexOf(nums[i - k]);
>       window.splice(removeIdx, 1);
>     }
>
>     // Calculate median when window is full
>     if (window.length === k) {
>       const sorted = [...window].sort((a, b) => a - b);
>       const median =
>         k % 2 === 1
>           ? sorted[Math.floor(k / 2)]
>           : (sorted[k / 2 - 1] + sorted[k / 2]) / 2;
>       result.push(median);
>     }
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** For sliding windows, maintain two heaps and handle element removal efficiently

> [!example]- Pattern 3: IPO (Maximize Capital)
>
> **Problem:** Select at most k projects to maximize capital
>
> ```typescript
> function findMaximizedCapital(
>   k: number,
>   w: number,
>   profits: number[],
>   capital: number[]
> ): number {
>   // Min heap for capital (projects we can afford)
>   const minCapitalHeap: [number, number][] = [];
>   // Max heap for profits (among affordable projects)
>   const maxProfitHeap: number[] = [];
>
>   // Initialize with all projects sorted by capital
>   const projects = profits.map((profit, i) => [capital[i], profit]);
>   projects.sort((a, b) => a[0] - b[0]);
>
>   let currentCapital = w;
>   let projectIndex = 0;
>
>   for (let i = 0; i < k; i++) {
>     // Add all affordable projects to profit heap
>     while (
>       projectIndex < projects.length &&
>       projects[projectIndex][0] <= currentCapital
>     ) {
>       maxProfitHeap.push(projects[projectIndex][1]);
>       this.bubbleUpMax(maxProfitHeap, maxProfitHeap.length - 1);
>       projectIndex++;
>     }
>
>     // If no affordable projects, break
>     if (maxProfitHeap.length === 0) break;
>
>     // Take the most profitable project
>     const maxProfit = this.extractMax(maxProfitHeap);
>     currentCapital += maxProfit;
>   }
>
>   return currentCapital;
> }
> ```
>
> **Key Insight:** Use heaps to efficiently track affordable projects and select most profitable ones

> [!example]- Pattern 4: Next Interval
>
> **Problem:** Find the next interval for each interval in an array
>
> ```typescript
> function findRightInterval(intervals: number[][]): number[] {
>   const n = intervals.length;
>   const result: number[] = new Array(n).fill(-1);
>
>   // Max heap for intervals by start time
>   const maxStartHeap: [number, number][] = []; // [start, index]
>   // Max heap for intervals by end time
>   const maxEndHeap: [number, number][] = []; // [end, index]
>
>   // Initialize heaps
>   for (let i = 0; i < n; i++) {
>     maxStartHeap.push([intervals[i][0], i]);
>     maxEndHeap.push([intervals[i][1], i]);
>   }
>
>   // Sort by start time (desc) and end time (desc)
>   maxStartHeap.sort((a, b) => b[0] - a[0]);
>   maxEndHeap.sort((a, b) => b[0] - a[0]);
>
>   // Process each interval by end time
>   while (maxEndHeap.length > 0) {
>     const [endTime, endIndex] = maxEndHeap.pop()!;
>
>     // Find next interval with start >= current end
>     let nextIndex = -1;
>     let minStart = Number.MAX_SAFE_INTEGER;
>
>     for (const [startTime, startIndex] of maxStartHeap) {
>       if (startTime >= endTime && startTime < minStart) {
>         minStart = startTime;
>         nextIndex = startIndex;
>       }
>     }
>
>     result[endIndex] = nextIndex;
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Use two heaps to efficiently match intervals based on different criteria

---

## ⚡ Performance Analysis

| Operation      | Average    | Worst Case | Space | Notes                        |
| -------------- | ---------- | ---------- | ----- | ---------------------------- |
| Add Number     | O(log n)   | O(log n)   | O(n)  | Heap insertion and balancing |
| Find Median    | O(1)       | O(1)       | O(1)  | Access heap tops             |
| Remove Number  | O(n)       | O(n)       | O(1)  | Need to find element in heap |
| Sliding Window | O(n log k) | O(n log k) | O(k)  | k operations per window      |
| IPO Problem    | O(n log n) | O(n log n) | O(n)  | Sorting and heap operations  |

> [!note]- Performance Considerations
>
> - **Insertion Efficiency:** O(log n) for balanced heap operations
> - **Median Access:** Constant time once heaps are balanced
> - **Removal Complexity:** Most expensive operation due to search requirement
> - **Memory Usage:** Linear space for storing all elements in heaps

---

## 🔄 Advanced Variations

> [!info]- Variation 1: K-way Heap Partitioning
>
> Extend to multiple heaps for finding any percentile, not just median
>
> - **Use case:** Finding any k-th percentile in streaming data
> - **Example:** 25th, 75th percentile calculations for analytics

> [!info]- Variation 2: Lazy Deletion with Hash Map
>
> Use hash map to mark elements as deleted instead of actual removal
>
> - **Use case:** Efficient sliding window median with lazy deletion
> - **Example:** Maintain deletion count and clean up periodically

> [!info]- Variation 3: Weighted Median
>
> Handle elements with different weights using modified heap balancing
>
> - **Use case:** Median calculation where elements have different importance
> - **Example:** Weighted average calculations in financial systems

> [!info]- Variation 4: Multi-dimensional Heaps
>
> Use heaps with custom comparators for complex objects
>
> - **Use case:** Finding median of objects based on multiple criteria
> - **Example:** Task scheduling with priority and deadline considerations

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Empty Heaps** - Handle case when no elements have been added
> - **Single Element** - Ensure median calculation works with one element
> - **Duplicate Values** - Handle identical values correctly in both heaps
> - **Integer Overflow** - Be careful with sum calculations for median
> - **Heap Balancing** - Maintain size difference of at most 1
> - **Removal Complexity** - Element removal from heap is expensive O(n)
> - **Sliding Window Edge** - Handle window boundaries correctly

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty stream
> - Single element `[5]`
> - Two elements `[1,2]`
> - Duplicate elements `[1,1,1]`
> - Large range `[1,1000000]`
> - Negative numbers `[-5,-1,0,3,8]`

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/heaps/295/problem|295. Find Median from Data Stream]]** - Master basic two-heap technique
> 2. **Practice:** Implement heap balancing logic correctly
> 3. **Practice:** Create sliding window median with efficient removal
> 4. **Challenge:** Solve IPO problem with dual heap optimization
>
> **Key Learning Points:**
>
> - Master heap balancing to maintain median property
> - Understand when to use max heap vs min heap
> - Practice efficient element removal strategies
> - Learn to adapt pattern for different optimization problems

> [!note]- Pro Tips
>
> 1. **Heap Choice:** Max heap for smaller half, min heap for larger half
> 2. **Balance Condition:** Size difference should never exceed 1
> 3. **Median Calculation:** Handle even/odd total count correctly
> 4. **Removal Strategy:** Consider lazy deletion for sliding windows
> 5. **Overflow Prevention:** Use appropriate data types for calculations

---

## 🔗 Related LeetCode Problems

- [[problems/heaps/295/problem|295. Find Median from Data Stream]] - Classic two heaps median problem
- **480. Sliding Window Median** - Extend median finding to sliding windows
- **502. IPO** - Use heaps for capital and profit optimization
- **436. Find Right Interval** - Heap-based interval matching
- **253. Meeting Rooms II** - Resource scheduling with heap balancing
- **1606. Find Servers That Handled Most Requests** - Load balancing with heaps

---

## 🧠 Brain Connections

- **Priority Queues** → Foundation data structure for heap operations
- **Sliding Window** → [[patterns/sliding-window|Sliding Window Pattern]] - Extension to windowed median
- **Binary Search** → [[patterns/modified-binary-search|Modified Binary Search Pattern]] - Alternative for some median problems
- **Top K Elements** → [[patterns/top-k-element|Top K Elements Pattern]] - Related heap-based selection problems

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when you need dynamic median/percentile calculation or balanced data partitioning
- 🔧 **Implementation Choice:** Max heap for smaller values, min heap for larger values, maintain balance invariant
- ⚡ **Performance:** O(log n) insertion with O(1) median access, but O(n) removal makes sliding windows challenging
- 🎯 **Edge Cases:** Handle empty heaps, single elements, duplicates, and maintain proper heap size balance

---
