---
title: Contains Duplicate
leetcode_id: 217
difficulty: Easy
category: Arrays & Hashing
status: solved
tags: [sorting, array, hash-table]
companies: [google, amazon, microsoft]
related_problems: [242, 1, 49]
---

[[README|🏠HOME]]

# 217. [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/description/)

## 📝 Problem Statement

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

---

> [!example]- Example 1
>
> **Input:**  
> `nums = [1,2,3,1]`
>
> **Output:**  
> `true`
>
> **Explanation:**  
> The element `1` occurs at the indices 0 and 3.

> [!example]- Example 2
>
> **Input:**  
> `nums = [1,2,3,4]`
>
> **Output:**  
> `false`
>
> **Explanation:**  
> All elements are distinct.

> [!example]- Example 3
>
> **Input:**  
> `nums = [1,1,1,3,3,4,3,2,4,2]`
>
> **Output:**  
> `true`

> [!warning]- Constraints
>
> - `1 <= nums.length <= 10^5`
> - `-10^9 <= nums[i] <= 10^9`

---

## 🛠️ Solutions

### Approach 1: Hash Set (Optimal)

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)
- **Pattern:** Hash Set for duplicate detection

## 🔑 Key Insights

- 🧠 **Pattern Recognition:** Classic duplicate detection problem
- 🔧 **Data Structure:** Hash Set provides O(1) average lookup time
- ⚡ **Optimization:** Early termination when duplicate found
- 🎯 **Edge Cases:** Single element array, all duplicates, no duplicates

---

#### 💻 Implementations

![[problems/arrays-and-hashing/217/solve.ts#TypeScript Solution]]

![[problems/arrays-and-hashing/217/solve.go#Go Solution]]
