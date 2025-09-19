---
title: Two Sum
leetcode_id: 1
difficulty: 🟢
category: Arrays & Hashing
status: ✔️
tags: [array, hash-table]
companies: [Google, Amazon, Microsoft, Apple, Facebook, Uber, Adobe]
related_problems: [15, 18, 167, 170, 653, 1099, 1213, 1498, 1711, 2006]
---

# [1. Two Sum](https://leetcode.com/problems/two-sum/description/) [[README|🏠]]

## 📝 Problem Statement

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

---

> [!example]- Example 1
>
> **Input:**  
> `nums = [2,7,11,15], target = 9`
>
> **Output:**  
> `[0,1]`
>
> **Explanation:**  
> Because nums[0] + nums[1] == 9, we return [0, 1].

> [!example]- Example 2
>
> **Input:**  
> `nums = [3,2,4], target = 6`
>
> **Output:**  
> `[1,2]`
>
> **Explanation:**  
> Because nums[1] + nums[2] == 6, we return [1, 2].

> [!example]- Example 3
>
> **Input:**  
> `nums = [3,3], target = 6`
>
> **Output:**  
> `[0,1]`
>
> **Explanation:**  
> Because nums[0] + nums[1] == 6, we return [0, 1].

> [!warning]- Constraints
>
> - `2 <= nums.length <= 10^4`
> - `-10^9 <= nums[i] <= 10^9`
> - `-10^9 <= target <= 10^9`
> - Only one valid answer exists.

> [!info]- Follow Up
>
> **Question:** Can you come up with an algorithm that is less than O(n²) time complexity?
>
> **Answer:** Yes, using a hash map we can achieve O(n) time complexity.

---

## 🛠️ Solutions [[README|🏠]]

### Approach 1: Brute Force

- **Time Complexity:** O(n²)
- **Space Complexity:** O(1)
- **Pattern:** Nested loops

### Approach 2: Hash Map

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)
- **Pattern:** Hash table for complement lookup

---

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** This is a classic "complement" problem - for each number, we need to find its complement (target - current number)
- 🔧 **Data Structure:** Hash map is perfect for O(1) lookup of complements
- ⚡ **Optimization:** Trade space for time - use extra O(n) space to reduce time from O(n²) to O(n)
- 🎯 **Edge Cases:** Duplicate numbers, negative numbers, large numbers, single valid solution guarantee

---

## 💻 Implementations [[README|🏠]]

![[problems/1/solve.ts#TypeScript Solution]]

![[problems/1/solve.go#Go Solution]]
