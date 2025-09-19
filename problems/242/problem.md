---
title: Valid Anagram
leetcode_id: 242
difficulty: 🟢
category: Arrays & Hashing
status: ✔️
tags: [hash-table, sorting, string]
companies: [facebook, amazon, microsoft, google]
related_problems: [217, 49, 438]
---

# [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/description/) [[README|🏠]]

## 📝 Problem Statement

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

---

> [!example]- Example 1
>
> **Input:**  
> `s = "anagram"`, `t = "nagaram"`
>
> **Output:**  
> `true`

> [!example]- Example 2
>
> **Input:**  
> `s = "rat"`, `t = "car"`
>
> **Output:**  
> `false`

> [!warning]- Constraints
>
> - `1 <= s.length, t.length <= 5 * 10^4`
> - `s` and `t` consist of lowercase English letters.

> [!info]- Follow Up
>
> **Unicode Characters:** What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
>
> **Answer:** Use a hash map instead of fixed-size array to handle unlimited Unicode characters.

---

## 🛠️ Solutions [[README|🏠]]

### Approach 1: Character Frequency Count (Hash Map)

- **Time Complexity:** O(n)
- **Space Complexity:** O(1) - limited to 26 characters
- **Pattern:** Frequency mapping for character counting

### Approach 2: Sorting

- **Time Complexity:** O(n log n)
- **Space Complexity:** O(1) - if sorting in place
- **Pattern:** Transform to canonical form

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** Anagram problems = character frequency matching
- 🔧 **Data Structure:** Hash map for character counting
- ⚡ **Optimization:** Early length check, single pass counting
- 🎯 **Edge Cases:** Different lengths, empty strings, single character

---

#### 💻 Implementations [[README|🏠]]

![[problems/242/solve.ts#TypeScript Solution]]

![[problems/242/solve.go#Go Solution]]
