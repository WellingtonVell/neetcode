---
tags: [pattern, merge-intervals, data-structure, algorithms, sorting]
aliases: [interval-merging, range-operations, interval-scheduling]
type: pattern-guide
status: complete
difficulty: Intermediate
time_complexity: "O(n log n)"
space_complexity: "O(n)"
prerequisites: [arrays, sorting]
related_patterns: [two-pointers, greedy-algorithms]
leetcode_problems: [56, 57, 435, 452, 986, 1288]
emoji: 📊
title: Merge Intervals
description: Efficiently merge overlapping intervals and solve interval-based scheduling problems
---

[[README|🏠HOME]]

# 📊 Merge Intervals

## Overview

The Merge Intervals pattern handles problems involving overlapping time intervals, ranges, or sequences efficiently:

- **Interval Merging** - Combine overlapping intervals into consolidated ranges
- **Scheduling Problems** - Solve meeting room and resource allocation problems
- **Range Operations** - Handle insertions, deletions, and intersections of ranges
- **Conflict Detection** - Identify overlapping appointments or bookings
- **Time Complexity Optimization** - Convert O(n²) brute force to O(n log n) solutions
- **Real-world Applications** - Calendar management, resource scheduling, data compression

This pattern is fundamental for problems involving time-based scheduling, range queries, and interval manipulation in sorted sequences.

> _**Think of this pattern as organizing a busy calendar - you need to merge overlapping meetings, find free time slots, and efficiently schedule new appointments without conflicts!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Overlapping Intervals** - Merging or handling overlapping time ranges
> - **Scheduling Problems** - Meeting rooms, resource allocation, task scheduling
> - **Range Queries** - Finding intersections, unions, or gaps in ranges
> - **Calendar Applications** - Managing appointments and time conflicts
> - **Data Compression** - Consolidating consecutive or overlapping data ranges
> - **Conflict Resolution** - Detecting and resolving scheduling conflicts

> [!warning]- Avoid When
>
> - **Point Queries** - When dealing with individual points rather than ranges
> - **Unsorted Data** - When intervals cannot be efficiently sorted
> - **Complex Dependencies** - When intervals have complex interdependencies
> - **Real-time Updates** - When frequent insertions/deletions are required
> - **Non-interval Problems** - When the problem doesn't involve ranges or intervals

---

## 💻 Core Implementations

> [!info]- TypeScript
>
> ### 1. Basic Interval Merging
>
> ```typescript
> function mergeIntervals(intervals: number[][]): number[][] {
>   if (intervals.length <= 1) return intervals;
>
>   // Sort intervals by start time
>   intervals.sort((a, b) => a[0] - b[0]);
>
>   const merged: number[][] = [intervals[0]];
>
>   for (let i = 1; i < intervals.length; i++) {
>     const current = intervals[i];
>     const lastMerged = merged[merged.length - 1];
>
>     // Check if current interval overlaps with the last merged interval
>     if (current[0] <= lastMerged[1]) {
>       // Merge intervals
>       lastMerged[1] = Math.max(lastMerged[1], current[1]);
>     } else {
>       // No overlap, add current interval
>       merged.push(current);
>     }
>   }
>
>   return merged;
> }
> ```
>
> ### 2. Insert New Interval
>
> ```typescript
> function insertInterval(
>   intervals: number[][],
>   newInterval: number[]
> ): number[][] {
>   const result: number[][] = [];
>   let i = 0;
>
>   // Add all intervals that end before newInterval starts
>   while (i < intervals.length && intervals[i][1] < newInterval[0]) {
>     result.push(intervals[i]);
>     i++;
>   }
>
>   // Merge all overlapping intervals with newInterval
>   while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
>     newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
>     newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
>     i++;
>   }
>   result.push(newInterval);
>
>   // Add remaining intervals
>   while (i < intervals.length) {
>     result.push(intervals[i]);
>     i++;
>   }
>
>   return result;
> }
> ```

> [!info]- Golang
>
> ### 1. Basic Interval Merging
>
> ```go
> import "sort"
>
> func merge(intervals [][]int) [][]int {
>     if len(intervals) <= 1 {
>         return intervals
>     }
>
>     // Sort intervals by start time
>     sort.Slice(intervals, func(i, j int) bool {
>         return intervals[i][0] < intervals[j][0]
>     })
>
>     merged := [][]int{intervals[0]}
>
>     for i := 1; i < len(intervals); i++ {
>         current := intervals[i]
>         lastMerged := merged[len(merged)-1]
>
>         // Check if current interval overlaps
>         if current[0] <= lastMerged[1] {
>             // Merge intervals
>             if current[1] > lastMerged[1] {
>                 lastMerged[1] = current[1]
>             }
>         } else {
>             // No overlap, add current interval
>             merged = append(merged, current)
>         }
>     }
>
>     return merged
> }
> ```
>
> **Note:** Go's sort package is efficient for interval-based algorithms

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Basic Interval Merging
>
> **Problem:** Given a collection of intervals, merge all overlapping intervals
>
> ```typescript
> function mergeOverlapping(intervals: number[][]): number[][] {
>   if (intervals.length <= 1) return intervals;
>
>   // Sort by start time
>   intervals.sort((a, b) => a[0] - b[0]);
>
>   const result: number[][] = [intervals[0]];
>
>   for (let i = 1; i < intervals.length; i++) {
>     const current = intervals[i];
>     const last = result[result.length - 1];
>
>     if (current[0] <= last[1]) {
>       // Overlapping - merge
>       last[1] = Math.max(last[1], current[1]);
>     } else {
>       // Non-overlapping - add new interval
>       result.push(current);
>     }
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Sort first, then merge consecutive overlapping intervals in one pass

> [!example]- Pattern 2: Meeting Rooms (Resource Scheduling)
>
> **Problem:** Determine the minimum number of meeting rooms required for given intervals
>
> ```typescript
> function minMeetingRooms(intervals: number[][]): number {
>   if (intervals.length === 0) return 0;
>
>   const starts = intervals
>     .map((interval) => interval[0])
>     .sort((a, b) => a - b);
>   const ends = intervals.map((interval) => interval[1]).sort((a, b) => a - b);
>
>   let startPointer = 0;
>   let endPointer = 0;
>   let usedRooms = 0;
>   let maxRooms = 0;
>
>   while (startPointer < intervals.length) {
>     if (starts[startPointer] >= ends[endPointer]) {
>       // A meeting ended, room becomes available
>       usedRooms--;
>       endPointer++;
>     }
>
>     // A meeting started, need a room
>     usedRooms++;
>     startPointer++;
>
>     maxRooms = Math.max(maxRooms, usedRooms);
>   }
>
>   return maxRooms;
> }
> ```
>
> **Key Insight:** Track start and end events separately to count simultaneous meetings

> [!example]- Pattern 3: Non-overlapping Intervals (Greedy)
>
> **Problem:** Find minimum number of intervals to remove to make the rest non-overlapping
>
> ```typescript
> function eraseOverlapIntervals(intervals: number[][]): number {
>   if (intervals.length <= 1) return 0;
>
>   // Sort by end time (greedy approach)
>   intervals.sort((a, b) => a[1] - b[1]);
>
>   let count = 0;
>   let lastEnd = intervals[0][1];
>
>   for (let i = 1; i < intervals.length; i++) {
>     if (intervals[i][0] < lastEnd) {
>       // Overlapping interval - remove it
>       count++;
>     } else {
>       // Non-overlapping - update last end time
>       lastEnd = intervals[i][1];
>     }
>   }
>
>   return count;
> }
> ```
>
> **Key Insight:** Greedy approach - always keep the interval that ends earliest

> [!example]- Pattern 4: Interval Intersections
>
> **Problem:** Find intersection of two interval lists
>
> ```typescript
> function intervalIntersection(
>   firstList: number[][],
>   secondList: number[][]
> ): number[][] {
>   const result: number[][] = [];
>   let i = 0,
>     j = 0;
>
>   while (i < firstList.length && j < secondList.length) {
>     const first = firstList[i];
>     const second = secondList[j];
>
>     // Find intersection
>     const start = Math.max(first[0], second[0]);
>     const end = Math.min(first[1], second[1]);
>
>     // If there's an intersection
>     if (start <= end) {
>       result.push([start, end]);
>     }
>
>     // Move pointer for interval that ends first
>     if (first[1] < second[1]) {
>       i++;
>     } else {
>       j++;
>     }
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Use two pointers to efficiently find intersections between sorted lists

---

## ⚡ Performance Analysis

| Operation        | Average    | Worst Case | Space       | Notes                                |
| ---------------- | ---------- | ---------- | ----------- | ------------------------------------ |
| Interval Merging | O(n log n) | O(n log n) | O(n)        | Dominated by sorting step            |
| Insert Interval  | O(n)       | O(n)       | O(n)        | Linear scan through sorted intervals |
| Intersection     | O(n + m)   | O(n + m)   | O(min(n,m)) | Two-pointer approach                 |
| Meeting Rooms    | O(n log n) | O(n log n) | O(n)        | Sorting start and end times          |
| Non-overlapping  | O(n log n) | O(n log n) | O(1)        | Greedy with sorting                  |

> [!note]- Performance Considerations
>
> - **Sorting Dominance:** Most interval problems are dominated by the O(n log n) sorting step
> - **Space Trade-offs:** Can often reduce space by modifying input arrays in-place
> - **Greedy Optimization:** Many problems have greedy solutions once intervals are sorted
> - **Two-pointer Efficiency:** Intersection problems benefit from two-pointer techniques

---

## 🔄 Advanced Variations

> [!info]- Variation 1: Interval Tree
>
> Build tree structures for efficient range queries and updates
>
> - **Use case:** Dynamic interval insertion/deletion with fast queries
> - **Example:** Calendar applications with frequent updates

> [!info]- Variation 2: Sweep Line Algorithm
>
> Process events in chronological order using coordinate compression
>
> - **Use case:** Complex geometric problems with intervals
> - **Example:** Rectangle area coverage, skyline problems

> [!info]- Variation 3: Priority Queue Scheduling
>
> Use heaps to efficiently manage interval end times
>
> - **Use case:** Resource allocation with priorities
> - **Example:** CPU scheduling, meeting room optimization

> [!info]- Variation 4: Segment Tree for Intervals
>
> Combine interval concepts with segment trees for range operations
>
> - **Use case:** Range update and query problems
> - **Example:** Booking systems with capacity constraints

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Empty Input** - Handle zero intervals gracefully
> - **Single Interval** - Ensure algorithms work with one interval
> - **Touching Intervals** - Decide whether [1,2] and [2,3] should merge
> - **Nested Intervals** - Handle completely contained intervals correctly
> - **Same Start/End Times** - Deal with identical interval boundaries
> - **Integer Overflow** - Be careful with large time values
> - **Negative Times** - Consider if negative intervals are valid

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty list `[]`
> - Single interval `[[1,3]]`
> - Non-overlapping `[[1,2],[3,4]]`
> - Touching intervals `[[1,2],[2,3]]`
> - Completely nested `[[1,10],[2,3]]`
> - Same start times `[[1,3],[1,5]]`

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/intervals/56/problem|56. Merge Intervals]]** - Learn basic interval merging
> 2. **Practice:** Implement `insertInterval()` for sorted interval lists
> 3. **Practice:** Create `findFreeTime()` to identify gaps in schedules
> 4. **Challenge:** Solve meeting rooms with minimum cost room allocation
>
> **Key Learning Points:**
>
> - Master the sort-then-merge pattern
> - Understand when to sort by start vs end times
> - Practice two-pointer techniques for intersections
> - Learn greedy approaches for optimization problems

> [!note]- Pro Tips
>
> 1. **Sorting Strategy:** Choose sort key based on problem requirements (start vs end)
> 2. **Boundary Conditions:** Clearly define whether touching intervals overlap
> 3. **Greedy Intuition:** Many interval problems have elegant greedy solutions
> 4. **In-place Operations:** Consider modifying input to save space when possible
> 5. **Event Processing:** Think of intervals as start/end events for complex problems

---

## 🔗 Related LeetCode Problems

- [[problems/intervals/56/problem|56. Merge Intervals]] - Basic interval merging pattern
- **57. Insert Interval** - Insert into sorted interval list
- **435. Non-overlapping Intervals** - Greedy interval removal
- **452. Minimum Number of Arrows** - Interval intersection optimization
- **986. Interval List Intersections** - Two-pointer intersection finding
- **1288. Remove Covered Intervals** - Nested interval detection
- **253. Meeting Rooms II** - Resource scheduling with heap

---

## 🧠 Brain Connections

- **Sorting Algorithms** → Foundation for most interval algorithms
- **Greedy Algorithms** → Many optimal interval solutions use greedy approaches
- **Two Pointers** → [[patterns/two-pointers|Two Pointers Pattern]] - Essential for intersection problems
- **Heap/Priority Queue** → Efficient for dynamic interval management
- **Sweep Line** → [[README|Algorithm Patterns]] - Advanced geometric interval problems

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when dealing with overlapping ranges, scheduling, or time-based conflicts
- 🔧 **Implementation Choice:** Sort by start time for merging, by end time for greedy optimization
- ⚡ **Performance:** Most problems are O(n log n) due to sorting, with O(n) processing after
- 🎯 **Edge Cases:** Always consider touching intervals, nested ranges, and boundary conditions

---
