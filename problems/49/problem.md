---
title: Group Anagrams
leetcode_id: 49
difficulty: 🟡
category: Arrays & Hashing
status: 🗒️
tags: [hashmap, sorting, string]
companies: [Amazon, Google, Microsoft, Facebook, Apple]
related_problems: [242, 438, 49]
---

# [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/description/) [[README|🏠]]

## 📝 Problem Statement

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

---

> [!example]- Example 1
>
> **Input:**  
> `strs = ["eat","tea","tan","ate","nat","bat"]`
>
> **Output:**  
> `[["bat"],["nat","tan"],["ate","eat","tea"]]`
>
> **Explanation:**  
> There is no string in strs that can be rearranged to form "bat".  
> The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.  
> The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

> [!example]- Example 2
>
> **Input:**  
> `strs = [""]`
>
> **Output:**  
> `[[""]]`

> [!example]- Example 3
>
> **Input:**  
> `strs = ["a"]`
>
> **Output:**  
> `[["a"]]`

> [!warning]- Constraints
>
> - `1 <= strs.length <= 104`
> - `0 <= strs[i].length <= 100`
> - `strs[i]` consists of lowercase English letters.

---

## 🛠️ Solutions [[README|🏠]]

### Approach 1: Hash Map with Sorted Keys

- **Time Complexity:** O(N \* M log M) where N is the number of strings and M is the average length of strings
- **Space Complexity:** O(N \* M)
- **Pattern:** [Hash Map](mdc:patterns/hashmap.md)

### Approach 2: Hash Map with Character Count

- **Time Complexity:** O(N \* M) where N is the number of strings and M is the average length of strings
- **Space Complexity:** O(N \* M)
- **Pattern:** [Hash Map](mdc:patterns/hashmap.md)

---

## 🔑 Key Insights [[README|🏠]]

- 🧠 **Pattern Recognition:** Anagrams have the same character frequency, so we can use this as a key to group them
- 🔧 **Data Structure:** Use a hash map where the key is either the sorted string or character count array
- ⚡ **Optimization:** Character count approach is more efficient than sorting for longer strings
- 🎯 **Edge Cases:** Empty strings, single character strings, and strings with same characters but different frequencies

---

## 💻 Implementations [[README|🏠]]

![[problems/49/solve.ts#TypeScript Solution]]

![[problems/49/solve.go#Go Solution]]
