---
tags: [pattern, sliding-window, data-structure, algorithms, arrays]
aliases: [window-technique, subarray-pattern, dynamic-window]
type: pattern-guide
difficulty: Intermediate
time_complexity: "O(n)"
space_complexity: "O(1)"
prerequisites: [arrays, two-pointers]
related_patterns: [two-pointers, fast-and-slow-pointers]
leetcode_problems: [3, 76, 209, 424, 567, 643]
emoji: 🪟
title: Sliding Window
description: Create a window over data and slide it to find optimal subarrays or substrings efficiently
---

[[README|🏠HOME]]

# 🪟 Sliding Window

## Overview [[README|🏠]]

The Sliding Window pattern creates a "window" over a data structure and slides it to efficiently solve subarray/substring problems:

- **Contiguous Subarray Problems** - Find optimal subarrays meeting specific criteria
- **String Pattern Matching** - Efficiently search for patterns in strings
- **Optimization Problems** - Find maximum/minimum values in sliding ranges
- **Fixed and Variable Windows** - Handle both fixed-size and dynamic window sizes
- **Linear Time Solutions** - Convert O(n²) brute force to O(n) optimal solutions
- **Memory Efficiency** - Solve complex problems with O(1) additional space

This pattern is fundamental for array and string problems that involve finding contiguous subsequences with specific properties.

> _**Think of this pattern as looking through a window on a moving train - you see a portion of the landscape, and as the train moves, the view slides to show new scenery while leaving behind what you've already seen!**_

---

## 🎯 When to Use [[README|🏠]]

> [!success]- Perfect For
>
> - **Contiguous Subarrays** - Finding subarrays with specific sum, length, or properties
> - **Substring Problems** - Finding substrings with certain character constraints
> - **Maximum/Minimum in Range** - Finding optimal values in sliding ranges
> - **Pattern Matching** - Searching for anagrams or character patterns
> - **Fixed Window Size** - Problems with constant window size requirements
> - **Dynamic Window Size** - Problems where window size changes based on conditions

> [!warning]- Avoid When
>
> - **Non-Contiguous Elements** - When elements don't need to be adjacent
> - **Global Optimization** - When you need to consider all possible combinations
> - **Complex State Tracking** - When window state is too complex for simple tracking
> - **Random Access Required** - When you need to jump to arbitrary positions
> - **Tree/Graph Problems** - When dealing with non-linear data structures

---

## 💻 Core Implementations [[README|🏠]]

> [!info]- TypeScript
>
> ### 1. Fixed Window Size
>
> ```typescript
> function maxSumFixedWindow(arr: number[], k: number): number {
>   if (arr.length < k) return -1;
>
>   // Calculate sum of first window
>   let windowSum = 0;
>   for (let i = 0; i < k; i++) {
>     windowSum += arr[i];
>   }
>
>   let maxSum = windowSum;
>
>   // Slide the window
>   for (let i = k; i < arr.length; i++) {
>     windowSum = windowSum - arr[i - k] + arr[i];
>     maxSum = Math.max(maxSum, windowSum);
>   }
>
>   return maxSum;
> }
> ```
>
> ### 2. Variable Window Size
>
> ```typescript
> function minWindowSubstring(s: string, t: string): string {
>   const need = new Map<string, number>();
>   const window = new Map<string, number>();
>
>   // Build need map
>   for (const char of t) {
>     need.set(char, (need.get(char) || 0) + 1);
>   }
>
>   let left = 0,
>     right = 0;
>   let valid = 0;
>   let start = 0,
>     len = Infinity;
>
>   while (right < s.length) {
>     // Expand window
>     const c = s[right];
>     right++;
>
>     if (need.has(c)) {
>       window.set(c, (window.get(c) || 0) + 1);
>       if (window.get(c) === need.get(c)) {
>         valid++;
>       }
>     }
>
>     // Contract window
>     while (valid === need.size) {
>       if (right - left < len) {
>         start = left;
>         len = right - left;
>       }
>
>       const d = s[left];
>       left++;
>
>       if (need.has(d)) {
>         if (window.get(d) === need.get(d)) {
>           valid--;
>         }
>         window.set(d, window.get(d)! - 1);
>       }
>     }
>   }
>
>   return len === Infinity ? "" : s.substr(start, len);
> }
> ```

> [!info]- Golang
>
> ### 1. Fixed Window Size
>
> ```go
> func maxSumFixedWindow(arr []int, k int) int {
>     if len(arr) < k {
>         return -1
>     }
>
>     // Calculate sum of first window
>     windowSum := 0
>     for i := 0; i < k; i++ {
>         windowSum += arr[i]
>     }
>
>     maxSum := windowSum
>
>     // Slide the window
>     for i := k; i < len(arr); i++ {
>         windowSum = windowSum - arr[i-k] + arr[i]
>         if windowSum > maxSum {
>             maxSum = windowSum
>         }
>     }
>
>     return maxSum
> }
> ```
>
> **Note:** Go's slice operations are efficient for sliding window implementations

---

## 🧩 Common Problem Patterns [[README|🏠]]

> [!example]- Pattern 1: Fixed Size Window Maximum
>
> **Problem:** Find the maximum sum of any contiguous subarray of size k
>
> ```typescript
> function maxSumSubarray(arr: number[], k: number): number {
>   let windowSum = 0;
>
>   // Sum first k elements
>   for (let i = 0; i < k; i++) {
>     windowSum += arr[i];
>   }
>
>   let maxSum = windowSum;
>
>   // Slide window and update max
>   for (let i = k; i < arr.length; i++) {
>     windowSum += arr[i] - arr[i - k];
>     maxSum = Math.max(maxSum, windowSum);
>   }
>
>   return maxSum;
> }
> ```
>
> **Key Insight:** Remove the element going out of window and add the new element coming in

> [!example]- Pattern 2: Variable Size Window with Condition
>
> **Problem:** Find the smallest subarray with sum greater than or equal to target
>
> ```typescript
> function minSubArrayLen(target: number, nums: number[]): number {
>   let left = 0;
>   let sum = 0;
>   let minLen = Infinity;
>
>   for (let right = 0; right < nums.length; right++) {
>     sum += nums[right];
>
>     while (sum >= target) {
>       minLen = Math.min(minLen, right - left + 1);
>       sum -= nums[left];
>       left++;
>     }
>   }
>
>   return minLen === Infinity ? 0 : minLen;
> }
> ```
>
> **Key Insight:** Expand window until condition is met, then contract while maintaining condition

> [!example]- Pattern 3: Character Frequency Window
>
> **Problem:** Find the longest substring with at most k distinct characters
>
> ```typescript
> function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
>   const charCount = new Map<string, number>();
>   let left = 0;
>   let maxLen = 0;
>
>   for (let right = 0; right < s.length; right++) {
>     const rightChar = s[right];
>     charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
>
>     while (charCount.size > k) {
>       const leftChar = s[left];
>       charCount.set(leftChar, charCount.get(leftChar)! - 1);
>       if (charCount.get(leftChar) === 0) {
>         charCount.delete(leftChar);
>       }
>       left++;
>     }
>
>     maxLen = Math.max(maxLen, right - left + 1);
>   }
>
>   return maxLen;
> }
> ```
>
> **Key Insight:** Use a frequency map to track characters and maintain distinct count constraint

> [!example]- Pattern 4: Permutation in String
>
> **Problem:** Check if string s1's permutation is a substring of s2
>
> ```typescript
> function checkInclusion(s1: string, s2: string): boolean {
>   const need = new Map<string, number>();
>   const window = new Map<string, number>();
>
>   for (const char of s1) {
>     need.set(char, (need.get(char) || 0) + 1);
>   }
>
>   let left = 0,
>     right = 0;
>   let valid = 0;
>
>   while (right < s2.length) {
>     const c = s2[right];
>     right++;
>
>     if (need.has(c)) {
>       window.set(c, (window.get(c) || 0) + 1);
>       if (window.get(c) === need.get(c)) {
>         valid++;
>       }
>     }
>
>     while (right - left >= s1.length) {
>       if (valid === need.size) return true;
>
>       const d = s2[left];
>       left++;
>
>       if (need.has(d)) {
>         if (window.get(d) === need.get(d)) {
>           valid--;
>         }
>         window.set(d, window.get(d)! - 1);
>       }
>     }
>   }
>
>   return false;
> }
> ```
>
> **Key Insight:** Maintain exact character frequency match within a fixed-size sliding window

---

## ⚡ Performance Analysis [[README|🏠]]

| Operation           | Average | Worst Case | Space       | Notes                                 |
| ------------------- | ------- | ---------- | ----------- | ------------------------------------- |
| Fixed Window Sum    | O(n)    | O(n)       | O(1)        | Single pass with constant operations  |
| Variable Window     | O(n)    | O(n)       | O(k)        | k is the number of unique elements    |
| Character Frequency | O(n)    | O(n)       | O(min(m,n)) | m is charset size, n is string length |
| Pattern Matching    | O(n)    | O(n)       | O(m)        | m is pattern length                   |
| Maximum in Window   | O(n)    | O(n)       | O(k)        | Using deque, k is window size         |

> [!note]- Performance Considerations
>
> - **Amortized Analysis:** Each element enters and exits the window exactly once
> - **Space Trade-offs:** Using hash maps for frequency tracking adds O(k) space
> - **Cache Efficiency:** Sequential access pattern is very cache-friendly
> - **Early Termination:** Many problems allow early exit when optimal solution is found

---

## 🔄 Advanced Variations [[README|🏠]]

> [!info]- Variation 1: Multiple Windows
>
> Track multiple overlapping or non-overlapping windows simultaneously
>
> - **Use case:** Finding multiple optimal subarrays with constraints
> - **Example:** Find k non-overlapping subarrays with maximum sum

> [!info]- Variation 2: 2D Sliding Window
>
> Extend sliding window concept to matrices and 2D arrays
>
> - **Use case:** Finding optimal submatrices in 2D grids
> - **Example:** Maximum sum rectangle in a matrix

> [!info]- Variation 3: Sliding Window with Deque
>
> Use deque to maintain maximum/minimum in the current window efficiently
>
> - **Use case:** Finding maximum/minimum in all windows of size k
> - **Example:** Sliding window maximum problem

> [!info]- Variation 4: Sliding Window with Stack
>
> Combine sliding window with stack for problems requiring range queries
>
> - **Use case:** Finding next greater element in sliding windows
> - **Example:** Daily temperatures with sliding window constraints

---

## ⚠️ Edge Cases & Gotchas [[README|🏠]]

> [!warning]- Critical Edge Cases
>
> - **Empty Arrays/Strings** - Handle zero-length inputs gracefully
> - **Window Size Larger Than Array** - Check if k > array.length
> - **Single Element** - Ensure window operations work with size 1
> - **All Same Elements** - Handle cases where all elements are identical
> - **Negative Numbers** - Consider how negative values affect sum-based windows
> - **Character Encoding** - Be careful with Unicode characters in string problems
> - **Integer Overflow** - Large sums might overflow in fixed window problems

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty input `[]` or `""`
> - Single element `[5]` or `"a"`
> - Window size equals array length `k = arr.length`
> - All positive/negative numbers `[1,2,3]` vs `[-1,-2,-3]`
> - Duplicate elements `[1,1,1,1]`
> - No valid solution case

---

## 🎯 Practice Exercises [[README|🏠]]

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/643/problem|643. Maximum Average Subarray I]]** - Learn basic fixed window
> 2. **Practice:** Implement `minSubarraySum()` for variable window
> 3. **Practice:** Create `longestSubstringKDistinct()` with character tracking
> 4. **Challenge:** Solve sliding window maximum with deque optimization
>
> **Key Learning Points:**
>
> - Master the expand-contract window technique
> - Understand when to use fixed vs variable windows
> - Practice efficient frequency tracking with hash maps
> - Learn to optimize with deque for min/max queries

> [!note]- Pro Tips
>
> 1. **Template Approach:** Memorize the variable window template pattern
> 2. **State Tracking:** Use hash maps efficiently for character/element frequency
> 3. **Boundary Conditions:** Always validate window size against input length
> 4. **Optimization:** Consider using deque for problems requiring min/max in window
> 5. **Debug Strategy:** Print window state to visualize the sliding process

---

## 🔗 Related LeetCode Problems [[README|🏠]]

- [[problems/3/problem|3. Longest Substring Without Repeating Characters]] - Variable window with character set
- **76. Minimum Window Substring** - Advanced variable window with frequency matching
- **209. Minimum Size Subarray Sum** - Variable window with sum condition
- **424. Longest Repeating Character Replacement** - Variable window with replacement constraint
- **567. Permutation in String** - Fixed window permutation matching
- **643. Maximum Average Subarray I** - Basic fixed window maximum
- **239. Sliding Window Maximum** - Advanced fixed window with deque optimization

---

## 🧠 Brain Connections [[README|🏠]]

- **Two Pointers** → [[patterns/two-pointers|Two Pointers Pattern]] - Foundation for variable window technique
- **Hash Maps** → Essential for frequency tracking in character problems
- **Deque/Queue** → Advanced optimization for min/max window queries
- **Monotonic Stack** → [[patterns/monotonic-stack|Monotonic Stack Pattern]] - Advanced optimization for min/max window queries

---

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** Use when you need to find optimal contiguous subarrays or substrings with specific properties
- 🔧 **Implementation Choice:** Choose fixed window for constant size problems, variable window for condition-based problems
- ⚡ **Performance:** Transforms O(n²) brute force solutions to O(n) by avoiding redundant calculations
- 🎯 **Edge Cases:** Always validate window size, handle empty inputs, and consider numeric overflow in sum-based problems

---
