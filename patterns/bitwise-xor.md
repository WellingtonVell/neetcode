---
tags: [pattern, bitwise, xor, bit-manipulation, algorithms, mathematics]
aliases: [xor-tricks, bit-operations, exclusive-or]
type: pattern-guide
difficulty: Intermediate
time_complexity: "O(n)"
space_complexity: "O(1)"
prerequisites: [bit-manipulation, binary-operations]
related_patterns: [bit-manipulation, mathematical]
leetcode_problems: [136, 137, 260, 268, 389, 421]
emoji: ⚡
title: Bitwise XOR
description: Use XOR properties to solve problems with duplicates, missing numbers, and bit manipulation elegantly
---

# ⚡ Bitwise XOR

## Overview [[README|🏠]]

The Bitwise XOR pattern leverages the unique mathematical properties of the XOR operation to solve complex problems elegantly:

- **Duplicate Detection** - Find single numbers among pairs using XOR's self-canceling property
- **Missing Number Problems** - Use XOR to find missing elements in sequences
- **Bit Complement Operations** - Generate complements and toggle bits efficiently
- **Encoding/Decoding** - XOR for simple encryption and data transformation
- **Array Transformation** - Solve array problems without extra space using XOR properties
- **Mathematical Tricks** - Leverage XOR properties for elegant solutions

This pattern is powerful because XOR has unique properties: `a ⊕ a = 0`, `a ⊕ 0 = a`, and it's commutative and associative.

> _**Think of XOR as a magical eraser - identical items cancel each other out, leaving only the unique ones visible!**_

---

## 🎯 When to Use [[README|🏠]]

> [!success]- Perfect For
>
> - **Finding Unique Elements** - When all elements appear twice except one or two
> - **Missing Number Problems** - Finding missing elements in sequences or ranges
> - **Bit Toggle Operations** - Flipping specific bits or generating complements
> - **Space-Efficient Solutions** - When you need O(1) space for array problems
> - **Mathematical Properties** - Leveraging XOR's commutative and associative nature
> - **Simple Encryption** - Basic encoding/decoding operations

> [!warning]- Avoid When
>
> - **Complex Bit Patterns** - When multiple bits need sophisticated manipulation
> - **Non-Binary Problems** - When problem doesn't involve pairs or duplicates
> - **Order Matters** - When sequence or position is important (XOR is commutative)
> - **Multiple Conditions** - When problem has complex logical requirements
> - **Performance Critical** - Bit operations might be slower than simple arithmetic on some systems

---

## 💻 Core Implementations [[README|🏠]]

> [!info]- TypeScript
>
> ### 1. Single Number (Find Unique in Pairs)
>
> ```typescript
> function singleNumber(nums: number[]): number {
>   let result = 0;
>
>   // XOR all numbers - pairs cancel out, unique remains
>   for (const num of nums) {
>     result ^= num;
>   }
>
>   return result;
> }
>
> // Example: [2,2,1,1,4] -> 4
> // 0 ^ 2 ^ 2 ^ 1 ^ 1 ^ 4 = 4
> ```
>
> ### 2. Two Single Numbers (Find Two Uniques)
>
> ```typescript
> function singleNumber3(nums: number[]): number[] {
>   // Step 1: XOR all numbers to get XOR of two unique numbers
>   let xorAll = 0;
>   for (const num of nums) {
>     xorAll ^= num;
>   }
>
>   // Step 2: Find rightmost set bit to differentiate the two numbers
>   const rightmostBit = xorAll & -xorAll;
>
>   // Step 3: Partition numbers and XOR each group
>   let num1 = 0,
>     num2 = 0;
>   for (const num of nums) {
>     if (num & rightmostBit) {
>       num1 ^= num;
>     } else {
>       num2 ^= num;
>     }
>   }
>
>   return [num1, num2];
> }
> ```
>
> ### 3. Missing Number
>
> ```typescript
> function missingNumber(nums: number[]): number {
>   const n = nums.length;
>   let result = n; // Start with the highest expected number
>
>   // XOR with indices and array values
>   for (let i = 0; i < n; i++) {
>     result ^= i ^ nums[i];
>   }
>
>   return result;
> }
>
> // Alternative approach using sum formula
> function missingNumberSum(nums: number[]): number {
>   const n = nums.length;
>   const expectedSum = (n * (n + 1)) / 2;
>   const actualSum = nums.reduce((sum, num) => sum + num, 0);
>   return expectedSum - actualSum;
> }
> ```
>
> ### 4. Number Complement
>
> ```typescript
> function findComplement(num: number): number {
>   // Find number of bits in the number
>   let bitLength = 0;
>   let temp = num;
>   while (temp > 0) {
>     bitLength++;
>     temp >>= 1;
>   }
>
>   // Create mask with all 1s for the bit length
>   const mask = (1 << bitLength) - 1;
>
>   // XOR with mask to flip all bits
>   return num ^ mask;
> }
>
> // Example: 5 (101) -> 2 (010)
> // mask = 111, 101 ^ 111 = 010
> ```

> [!info]- Golang
>
> ### 1. Single Number
>
> ```go
> func singleNumber(nums []int) int {
>     result := 0
>
>     // XOR all numbers
>     for _, num := range nums {
>         result ^= num
>     }
>
>     return result
> }
> ```
>
> ### 2. Find Difference
>
> ```go
> func findTheDifference(s string, t string) byte {
>     var result byte = 0
>
>     // XOR all characters in both strings
>     for i := 0; i < len(s); i++ {
>         result ^= s[i]
>     }
>
>     for i := 0; i < len(t); i++ {
>         result ^= t[i]
>     }
>
>     return result
> }
> ```
>
> ### 3. XOR Operation in Array
>
> ```go
> func xorOperation(n int, start int) int {
>     result := 0
>
>     for i := 0; i < n; i++ {
>         result ^= start + 2*i
>     }
>
>     return result
> }
>
> // Can be optimized using XOR properties
> func xorOperationOptimized(n int, start int) int {
>     // Use mathematical properties to calculate without loop
>     // This leverages XOR patterns in sequences
>     return start + n + ((n-1) & 1)
> }
> ```
>
> ### 4. Maximum XOR of Two Numbers
>
> ```go
> func findMaximumXOR(nums []int) int {
>     maxXor := 0
>     mask := 0
>
>     // Build the answer bit by bit from left to right
>     for i := 30; i >= 0; i-- {
>         mask |= (1 << i) // Update mask to include current bit
>
>         // Get prefixes of all numbers with current mask
>         prefixes := make(map[int]bool)
>         for _, num := range nums {
>             prefixes[num & mask] = true
>         }
>
>         // Try to update maxXor with current bit set
>         candidate := maxXor | (1 << i)
>
>         // Check if candidate is achievable
>         for prefix := range prefixes {
>             if prefixes[candidate ^ prefix] {
>                 maxXor = candidate
>                 break
>             }
>         }
>     }
>
>     return maxXor
> }
> ```

---

## 🧩 Common Problem Patterns [[README|🏠]]

> [!example]- Pattern 1: Single Number in Array of Pairs
>
> **Problem:** Find the element that appears once when all others appear twice
>
> ```typescript
> function singleNumber(nums: number[]): number {
>   let result = 0;
>
>   // XOR cancels out pairs, leaves unique element
>   for (const num of nums) {
>     result ^= num;
>   }
>
>   return result;
> }
>
> // Example: [4,1,2,1,2] -> 4
> // 0 ^ 4 ^ 1 ^ 2 ^ 1 ^ 2 = 4
> ```
>
> **Key Insight:** XOR's self-canceling property (a ⊕ a = 0) eliminates pairs automatically

> [!example]- Pattern 2: Find Two Single Numbers
>
> **Problem:** Find two elements that appear once when all others appear twice
>
> ```typescript
> function singleNumber3(nums: number[]): number[] {
>   // Get XOR of the two unique numbers
>   let xorResult = 0;
>   for (const num of nums) {
>     xorResult ^= num;
>   }
>
>   // Find any set bit to distinguish the two numbers
>   const differentiatingBit = xorResult & -xorResult;
>
>   // Partition and XOR each group
>   let num1 = 0,
>     num2 = 0;
>   for (const num of nums) {
>     if (num & differentiatingBit) {
>       num1 ^= num;
>     } else {
>       num2 ^= num;
>     }
>   }
>
>   return [num1, num2];
> }
> ```
>
> **Key Insight:** Use rightmost set bit of XOR result to partition numbers into two groups

> [!example]- Pattern 3: Missing Number in Range
>
> **Problem:** Find missing number in array containing n distinct numbers in range [0, n]
>
> ```typescript
> function missingNumber(nums: number[]): number {
>   const n = nums.length;
>   let result = n; // XOR with the expected last number
>
>   // XOR all indices with their corresponding values
>   for (let i = 0; i < n; i++) {
>     result ^= i ^ nums[i];
>   }
>
>   return result;
> }
>
> // Example: [3,0,1] (missing 2)
> // result = 3 ^ 0 ^ 3 ^ 1 ^ 0 ^ 2 ^ 1 = 2
> ```
>
> **Key Insight:** XOR expected sequence with actual sequence to find the difference

> [!example]- Pattern 4: Flip Bit to Win
>
> **Problem:** Find length of longest sequence of 1s after flipping one bit
>
> ```typescript
> function flipBit(num: number): number {
>   let currentLength = 0;
>   let previousLength = 0;
>   let maxLength = 1;
>
>   while (num !== 0) {
>     if ((num & 1) === 1) {
>       currentLength++;
>     } else {
>       // Update previousLength based on next bit
>       previousLength = (num & 2) === 0 ? 0 : currentLength;
>       currentLength = 0;
>     }
>
>     maxLength = Math.max(maxLength, previousLength + currentLength + 1);
>     num >>>= 1;
>   }
>
>   return maxLength;
> }
> ```
>
> **Key Insight:** Track sequences separated by single 0 bits using bit manipulation

---

## ⚡ Performance Analysis [[README|🏠]]

| Operation          | Average   | Worst Case | Space | Notes                           |
| ------------------ | --------- | ---------- | ----- | ------------------------------- |
| Single Number      | O(n)      | O(n)       | O(1)  | Single pass through array       |
| Two Single Numbers | O(n)      | O(n)       | O(1)  | Two passes through array        |
| Missing Number     | O(n)      | O(n)       | O(1)  | XOR approach is space-efficient |
| Number Complement  | O(log n)  | O(log n)   | O(1)  | Based on number of bits         |
| Maximum XOR        | O(n × 32) | O(n × 32)  | O(n)  | Bit-by-bit construction         |

> [!note]- Performance Considerations
>
> - **Bit Operations:** Usually very fast at hardware level
> - **Constant Space:** Most XOR problems can be solved with O(1) space
> - **Single Pass:** Many XOR solutions require only one iteration
> - **No Overflow:** XOR operations don't cause integer overflow

---

## 🔄 Advanced Variations [[README|🏠]]

> [!info]- Variation 1: XOR Linked List
>
> Use XOR to implement doubly linked list with single pointer per node
>
> - **Use case:** Memory-efficient doubly linked lists
> - **Example:** XOR doubly linked list, space optimization

> [!info]- Variation 2: Gray Code Generation
>
> Use XOR properties to generate Gray code sequences
>
> - **Use case:** Error correction, digital systems
> - **Example:** Gray Code, Binary to Gray conversion

> [!info]- Variation 3: XOR Encryption
>
> Apply XOR for simple encryption and decryption schemes
>
> - **Use case:** Basic data obfuscation, simple ciphers
> - **Example:** One-time pad, XOR cipher

> [!info]- Variation 4: Subset XOR
>
> Find subsets with specific XOR properties
>
> - **Use case:** Cryptography, subset analysis
> - **Example:** Maximum XOR subset, XOR queries

---

## ⚠️ Edge Cases & Gotchas [[README|🏠]]

> [!warning]- Critical Edge Cases
>
> - **Single Element Arrays** - Handle arrays with only one element
> - **Empty Arrays** - Check for empty input before processing
> - **Overflow in Large Numbers** - XOR doesn't overflow but intermediate calculations might
> - **Signed vs Unsigned** - Be careful with negative numbers and right shifts
> - **Bit Length Assumptions** - Don't assume fixed bit width (32-bit vs 64-bit)
> - **Zero Values** - Remember that anything XOR 0 equals itself
> - **Order Independence** - XOR is commutative, so order doesn't matter

> [!tip]- Testing Strategy
>
> Always test with:
>
> - Empty arrays `[]`
> - Single element `[5]`
> - All same elements `[3,3,3,3]`
> - Two elements `[1,2]`
> - Large numbers (test bit operations)
> - Negative numbers (signed integer behavior)
> - Zero values in input

---

## 🎯 Practice Exercises [[README|🏠]]

> [!tip]- Guided Learning
>
> **Start with these problems in order:**
>
> 1. **[[problems/136/problem|136. Single Number]]** - Master basic XOR elimination
> 2. **Practice:** Implement `missingNumber()` with XOR approach
> 3. **Practice:** Solve `findComplement()` with bit masking
> 4. **Challenge:** Tackle two single numbers problem with bit partitioning
>
> **Key Learning Points:**
>
> - Master XOR's fundamental properties (self-canceling, identity)
> - Understand bit manipulation techniques (masks, shifts)
> - Practice partitioning techniques for complex problems
> - Learn to combine XOR with other bit operations

> [!note]- Pro Tips
>
> 1. **XOR Properties:** Remember a ⊕ a = 0, a ⊕ 0 = a, XOR is commutative
> 2. **Bit Manipulation:** Use `&`, `|`, `~`, `<<`, `>>` alongside XOR
> 3. **Rightmost Set Bit:** Use `x & (-x)` to isolate rightmost set bit
> 4. **Mask Creation:** Use `(1 << n) - 1` to create n-bit mask
> 5. **Negative Numbers:** Be careful with signed integer operations

---

## 🔗 Related LeetCode Problems [[README|🏠]]

- [[problems/136/problem|136. Single Number]] - Classic XOR elimination problem
- **137. Single Number II** - Advanced single number with triples
- **260. Single Number III** - Find two single numbers
- **268. Missing Number** - XOR approach for missing elements
- **389. Find the Difference** - Character difference using XOR
- **421. Maximum XOR of Two Numbers** - Advanced XOR optimization

---

## 🧠 Brain Connections [[README|🏠]]

- **Bit Manipulation** → Foundation for understanding binary operations
- **Cyclic Sort** → [[patterns/cyclic-sort|Cyclic Sort Pattern]] - Alternative approach for finding missing/duplicate numbers
- **Hash Tables** → Alternative approach for duplicate detection problems
- **Array Problems** → Many array problems can be optimized with XOR

---

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** Use when dealing with pairs, duplicates, or missing elements in specific contexts
- 🔧 **Implementation Choice:** XOR provides O(1) space solutions for problems that typically need O(n) space
- ⚡ **Performance:** Bit operations are extremely fast and space-efficient
- 🎯 **Edge Cases:** Master XOR properties and bit manipulation fundamentals; watch for signed integer behavior
