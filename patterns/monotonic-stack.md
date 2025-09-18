---
tags:
  [pattern, monotonic-stack, stack, data-structure, algorithms, optimization]
aliases: [monotonic-deque, decreasing-stack, increasing-stack]
type: pattern-guide
status: complete
difficulty: Intermediate
time_complexity: "O(n)"
space_complexity: "O(n)"
prerequisites: [stack, arrays, linear-data-structures]
related_patterns: [sliding-window, two-pointers]
leetcode_problems: [496, 503, 739, 84, 85, 42]
emoji: 🏔️
title: Monotonic Stack
description: Use stacks with monotonic ordering to efficiently solve next greater/smaller element problems and optimize range queries
---

[[README|🏠HOME]]

# 🏔️ Monotonic Stack

## Overview

The Monotonic Stack pattern uses a stack data structure that maintains elements in monotonic (either strictly increasing or decreasing) order:

- **Next Greater/Smaller Elements** - Find the next larger or smaller element for each position
- **Range Maximum/Minimum Queries** - Efficiently compute range extremes
- **Histogram Problems** - Calculate areas in histograms and related geometric problems
- **Sliding Window Extremes** - Track maximum/minimum in sliding windows
- **Stock Span Problems** - Calculate spans and streaks in time series data
- **Bracket Matching Variants** - Solve complex bracket and parentheses problems

This pattern transforms O(n²) brute force solutions into O(n) efficient algorithms by maintaining useful structural information.

> _**Think of a monotonic stack as a mountain range where you can always see the next higher peak - it maintains just enough information to answer "what's next" questions efficiently!**_

---

## 🎯 When to Use

> [!success]- Perfect For
>
> - **Next Greater/Smaller Problems** - Finding next larger or smaller elements
> - **Range Extremes** - Computing maximum/minimum in ranges efficiently
> - **Histogram Calculations** - Largest rectangle in histogram and variants
> - **Stock Price Analysis** - Price spans, streaks, and trend analysis
> - **Sliding Window Extremes** - Maximum/minimum in sliding windows
> - **Array Preprocessing** - When you need to precompute relationships between elements

> [!warning]- Avoid When
>
> - **Random Access Needed** - When you need to access arbitrary positions
> - **Multiple Conditions** - Complex logic that doesn't fit monotonic property
> - **Small Arrays** - When brute force O(n²) is acceptable due to small size
> - **Dynamic Updates** - When array changes frequently during processing
> - **Memory Constraints** - When O(n) extra space is too expensive

---

## 💻 Core Implementations

> [!info]- TypeScript

> ### 1. Next Greater Element (Monotonic Decreasing Stack)
>
> ```typescript
> function nextGreaterElements(nums: number[]): number[] {
>   const n = nums.length;
>   const result: number[] = new Array(n).fill(-1);
>   const stack: number[] = []; // Store indices
>
>   // Process array twice to handle circular nature
>   for (let i = 0; i < 2 * n; i++) {
>     const currentIndex = i % n;
>     const currentValue = nums[currentIndex];
>
>     // Pop elements smaller than current (they found their next greater)
>     while (stack.length > 0 && nums[stack[stack.length - 1]] < currentValue) {
>       const index = stack.pop()!;
>       if (result[index] === -1) {
>         // Only fill if not already found
>         result[index] = currentValue;
>       }
>     }
>
>     // Only push in first iteration to avoid duplicates
>     if (i < n) {
>       stack.push(currentIndex);
>     }
>   }
>
>   return result;
> }
> ```
>
> ### 2. Daily Temperatures (Next Warmer Day)
>
> ```typescript
> function dailyTemperatures(temperatures: number[]): number[] {
>   const n = temperatures.length;
>   const result: number[] = new Array(n).fill(0);
>   const stack: number[] = []; // Store indices of temperatures
>
>   for (let i = 0; i < n; i++) {
>     // While current temperature is warmer than stack top
>     while (
>       stack.length > 0 &&
>       temperatures[i] > temperatures[stack[stack.length - 1]]
>     ) {
>       const prevIndex = stack.pop()!;
>       result[prevIndex] = i - prevIndex; // Distance to warmer day
>     }
>
>     stack.push(i); // Add current day to stack
>   }
>
>   return result;
> }
> ```
>
> ### 3. Largest Rectangle in Histogram
>
> ```typescript
> function largestRectangleArea(heights: number[]): number {
>   const stack: number[] = []; // Store indices
>   let maxArea = 0;
>   const n = heights.length;
>
>   for (let i = 0; i <= n; i++) {
>     const currentHeight = i === n ? 0 : heights[i]; // Add 0 at end to flush stack
>
>     while (
>       stack.length > 0 &&
>       currentHeight < heights[stack[stack.length - 1]]
>     ) {
>       const height = heights[stack.pop()!];
>       const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
>       maxArea = Math.max(maxArea, height * width);
>     }
>
>     stack.push(i);
>   }
>
>   return maxArea;
> }
> ```
>
> ### 4. Sliding Window Maximum using Monotonic Deque
>
> ```typescript
> function maxSlidingWindow(nums: number[], k: number): number[] {
>   const deque: number[] = []; // Store indices in decreasing order of values
>   const result: number[] = [];
>
>   for (let i = 0; i < nums.length; i++) {
>     // Remove indices outside current window
>     while (deque.length > 0 && deque[0] <= i - k) {
>       deque.shift();
>     }
>
>     // Remove smaller elements from back (maintain decreasing order)
>     while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
>       deque.pop();
>     }
>
>     deque.push(i);
>
>     // Add maximum to result when window is complete
>     if (i >= k - 1) {
>       result.push(nums[deque[0]]);
>     }
>   }
>
>   return result;
> }
> ```

> [!info]- Golang

> ### 1. Next Greater Element
>
> ```go
> func nextGreaterElement(nums1 []int, nums2 []int) []int {
>     // Build next greater map for nums2
>     nextGreater := make(map[int]int)
>     stack := []int{}
>
>     for _, num := range nums2 {
>         // Pop smaller elements (they found their next greater)
>         for len(stack) > 0 && stack[len(stack)-1] < num {
>             prev := stack[len(stack)-1]
>             stack = stack[:len(stack)-1]
>             nextGreater[prev] = num
>         }
>         stack = append(stack, num)
>     }
>
>     // Build result for nums1
>     result := make([]int, len(nums1))
>     for i, num := range nums1 {
>         if val, exists := nextGreater[num]; exists {
>             result[i] = val
>         } else {
>             result[i] = -1
>         }
>     }
>
>     return result
> }
> ```
>
> ### 2. Trapping Rain Water
>
> ```go
> func trap(height []int) int {
>     stack := []int{} // Store indices
>     water := 0
>
>     for i := 0; i < len(height); i++ {
>         for len(stack) > 0 && height[i] > height[stack[len(stack)-1]] {
>             top := stack[len(stack)-1]
>             stack = stack[:len(stack)-1]
>
>             if len(stack) == 0 {
>                 break
>             }
>
>             // Calculate trapped water
>             distance := i - stack[len(stack)-1] - 1
>             boundedHeight := min(height[i], height[stack[len(stack)-1]]) - height[top]
>             water += distance * boundedHeight
>         }
>         stack = append(stack, i)
>     }
>
>     return water
> }
>
> func min(a, b int) int {
>     if a < b {
>         return a
>     }
>     return b
> }
> ```
>
> ### 3. Remove K Digits
>
> ```go
> func removeKdigits(num string, k int) string {
>     stack := []byte{}
>
>     for i := 0; i < len(num); i++ {
>         digit := num[i]
>
>         // Remove larger digits from stack while we can
>         for len(stack) > 0 && k > 0 && stack[len(stack)-1] > digit {
>             stack = stack[:len(stack)-1]
>             k--
>         }
>
>         stack = append(stack, digit)
>     }
>
>     // Remove remaining digits from end if k > 0
>     for k > 0 && len(stack) > 0 {
>         stack = stack[:len(stack)-1]
>         k--
>     }
>
>     // Convert to string and remove leading zeros
>     result := string(stack)
>     result = strings.TrimLeft(result, "0")
>
>     if result == "" {
>         return "0"
>     }
>
>     return result
> }
> ```
>
> ### 4. Maximum Rectangle in Binary Matrix
>
> ```go
> func maximalRectangle(matrix [][]byte) int {
>     if len(matrix) == 0 || len(matrix[0]) == 0 {
>         return 0
>     }
>
>     rows, cols := len(matrix), len(matrix[0])
>     heights := make([]int, cols)
>     maxArea := 0
>
>     for i := 0; i < rows; i++ {
>         // Update heights for current row
>         for j := 0; j < cols; j++ {
>             if matrix[i][j] == '1' {
>                 heights[j]++
>             } else {
>                 heights[j] = 0
>             }
>         }
>
>         // Calculate max rectangle for current histogram
>         area := largestRectangleArea(heights)
>         if area > maxArea {
>             maxArea = area
>         }
>     }
>
>     return maxArea
> }
>
> func largestRectangleArea(heights []int) int {
>     stack := []int{}
>     maxArea := 0
>
>     for i := 0; i <= len(heights); i++ {
>         h := 0
>         if i < len(heights) {
>             h = heights[i]
>         }
>
>         for len(stack) > 0 && h < heights[stack[len(stack)-1]] {
>             height := heights[stack[len(stack)-1]]
>             stack = stack[:len(stack)-1]
>
>             width := i
>             if len(stack) > 0 {
>                 width = i - stack[len(stack)-1] - 1
>             }
>
>             area := height * width
>             if area > maxArea {
>                 maxArea = area
>             }
>         }
>
>         stack = append(stack, i)
>     }
>
>     return maxArea
> }
> ```

---

## 🧩 Common Problem Patterns

> [!example]- Pattern 1: Next Greater Element
>
> **Problem:** Find the next greater element for each element in an array
>
> ```typescript
> function nextGreaterElements(nums: number[]): number[] {
>   const n = nums.length;
>   const result: number[] = new Array(n).fill(-1);
>   const stack: number[] = []; // Store indices, maintain decreasing order
>
>   // Process array twice for circular array
>   for (let i = 0; i < 2 * n; i++) {
>     const currentIndex = i % n;
>     const currentValue = nums[currentIndex];
>
>     // Pop smaller elements - they found their next greater
>     while (stack.length > 0 && nums[stack[stack.length - 1]] < currentValue) {
>       const index = stack.pop()!;
>       if (result[index] === -1) {
>         result[index] = currentValue;
>       }
>     }
>
>     // Only push in first iteration
>     if (i < n) {
>       stack.push(currentIndex);
>     }
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Maintain decreasing monotonic stack; when a larger element appears, it resolves all smaller elements

> [!example]- Pattern 2: Largest Rectangle in Histogram
>
> **Problem:** Find the area of the largest rectangle in a histogram
>
> ```typescript
> function largestRectangleArea(heights: number[]): number {
>   const stack: number[] = [];
>   let maxArea = 0;
>
>   for (let i = 0; i <= heights.length; i++) {
>     const h = i === heights.length ? 0 : heights[i];
>
>     while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
>       const height = heights[stack.pop()!];
>       const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
>       maxArea = Math.max(maxArea, height * width);
>     }
>
>     stack.push(i);
>   }
>
>   return maxArea;
> }
> ```
>
> **Key Insight:** Use increasing monotonic stack; when height decreases, calculate rectangle area for all taller bars

> [!example]- Pattern 3: Sliding Window Maximum
>
> **Problem:** Find maximum element in each sliding window of size k
>
> ```typescript
> function maxSlidingWindow(nums: number[], k: number): number[] {
>   const deque: number[] = []; // Store indices in decreasing order
>   const result: number[] = [];
>
>   for (let i = 0; i < nums.length; i++) {
>     // Remove indices outside window
>     while (deque.length > 0 && deque[0] <= i - k) {
>       deque.shift();
>     }
>
>     // Remove smaller elements from back
>     while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
>       deque.pop();
>     }
>
>     deque.push(i);
>
>     // Add maximum when window is complete
>     if (i >= k - 1) {
>       result.push(nums[deque[0]]);
>     }
>   }
>
>   return result;
> }
> ```
>
> **Key Insight:** Use monotonic deque to maintain window maximum; front always contains the largest element

> [!example]- Pattern 4: Stock Price Span
>
> **Problem:** Calculate the span of stock prices (consecutive days with price <= current)
>
> ```typescript
> class StockSpanner {
>   private stack: [number, number][] = []; // [price, span]
>
>   next(price: number): number {
>     let span = 1;
>
>     // Remove all prices smaller than or equal to current
>     while (
>       this.stack.length > 0 &&
>       this.stack[this.stack.length - 1][0] <= price
>     ) {
>       span += this.stack.pop()![1];
>     }
>
>     this.stack.push([price, span]);
>     return span;
>   }
> }
> ```
>
> **Key Insight:** Maintain decreasing stack of prices; accumulate spans when removing smaller prices

---

## ⚡ Performance Analysis

| Problem Type           | Time Complexity | Space Complexity | Notes                           |
| ---------------------- | --------------- | ---------------- | ------------------------------- |
| Next Greater Element   | O(n)            | O(n)             | Each element pushed/popped once |
| Daily Temperatures     | O(n)            | O(n)             | Amortized constant per element  |
| Largest Rectangle      | O(n)            | O(n)             | Single pass with stack          |
| Sliding Window Maximum | O(n)            | O(k)             | Deque size bounded by k         |
| Stock Span             | O(1) amortized  | O(n)             | Per next() call                 |

> [!note]- Performance Considerations
>
> - **Amortized Analysis:** Each element is pushed and popped at most once
> - **Stack vs Deque:** Use deque for sliding window problems with size constraints
> - **Index vs Value:** Store indices to calculate distances and positions
> - **Sentinel Values:** Add boundary values (0, infinity) to simplify edge cases

---

## 🔄 Advanced Variations

> [!info]- Variation 1: Monotonic Deque
>
> Use double-ended queue for sliding window problems with size constraints
>
> - **Use case:** Sliding window maximum/minimum with size limits
> - **Example:** Sliding Window Maximum, Shortest Subarray with Sum >= K

> [!info]- Variation 2: Multiple Stacks
>
> Use multiple monotonic stacks to track different properties simultaneously
>
> - **Use case:** Complex range queries with multiple constraints
> - **Example:** Buildings with sunset view, car fleet problems

> [!info]- Variation 3: 2D Monotonic Stack
>
> Extend concept to 2D matrices for area calculations
>
> - **Use case:** Rectangle problems in 2D grids
> - **Example:** Maximal Rectangle, Largest Rectangle in each row

> [!info]- Variation 4: Online Algorithms
>
> Process streaming data with monotonic stacks for real-time analysis
>
> - **Use case:** Real-time analytics, streaming data processing
> - **Example:** Online stock analysis, real-time maximum tracking

---

## ⚠️ Edge Cases & Gotchas

> [!warning]- Critical Edge Cases
>
> - **Empty Arrays** - Handle zero-length input appropriately
> - **Single Element** - Ensure algorithms work with one element
> - **All Same Values** - Handle arrays with identical elements
> - **Strictly Increasing/Decreasing** - Test with monotonic input arrays
> - **Circular Arrays** - Handle wraparound correctly for circular problems
> - **Boundary Values** - Add sentinel values carefully to avoid off-by-one errors
> - **Index vs Value** - Consistently use either indices or values in stack

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty array `[]`
> - Single element `[5]`
> - Strictly increasing `[1,2,3,4,5]`
> - Strictly decreasing `[5,4,3,2,1]`
> - All same values `[3,3,3,3]`
> - Mountain shape `[1,3,5,4,2]`
> - Valley shape `[5,2,1,3,4]`

---

## 🎯 Practice Exercises

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/monotonic-stack/496/problem|496. Next Greater Element I]]** - Master basic monotonic stack
> 2. **Practice:** Implement `dailyTemperatures()` for distance calculation
> 3. **Practice:** Solve `largestRectangleArea()` for area calculation
> 4. **Challenge:** Build `StockSpanner` for streaming applications
>
> **Key Learning Points:**
>
> - Understand when to use increasing vs decreasing monotonic stacks
> - Master the push-pop cycle and what triggers each operation
> - Practice storing indices vs values based on problem requirements
> - Learn to handle circular arrays and boundary conditions

> [!note]- Pro Tips
>
> 1. **Stack Content:** Store indices when you need positions/distances, values for comparisons
> 2. **Monotonic Property:** Increasing stack for "next smaller", decreasing for "next greater"
> 3. **Boundary Handling:** Add sentinel values (0, infinity) to flush remaining elements
> 4. **Amortized Analysis:** Remember each element is processed at most twice (push + pop)
> 5. **Circular Arrays:** Process array twice, push only in first iteration

---

## 🔗 Related LeetCode Problems

- [[problems/monotonic-stack/496/problem|496. Next Greater Element I]] - Basic monotonic stack introduction
- **503. Next Greater Element II** - Circular array variation
- **739. Daily Temperatures** - Distance calculation with monotonic stack
- **84. Largest Rectangle in Histogram** - Classic area calculation problem
- **85. Maximal Rectangle** - 2D extension of histogram problem
- **42. Trapping Rain Water** - Water trapping using monotonic stack

---

## 🧠 Brain Connections

- **Stack Data Structure** → Foundation for understanding LIFO operations
- **Sliding Window** → [[patterns/sliding-window|Sliding Window Pattern]] - Related window optimization technique
- **Two Pointers** → [[patterns/two-pointers|Two Pointers Pattern]] - Alternative approach for some problems
- **Dynamic Programming** → Some monotonic stack problems can be solved with DP but less efficiently

---

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Use when you need next/previous greater/smaller elements or range extremes
- 🔧 **Implementation Choice:** Choose increasing/decreasing based on what you're looking for; store indices for distances
- ⚡ **Performance:** Transforms O(n²) nested loops into O(n) single-pass algorithms through intelligent state maintenance
- 🎯 **Edge Cases:** Handle boundaries with sentinel values; test with monotonic and uniform arrays

---
