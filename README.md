---
tags: [homepage]
---

# 🧠 LeetCode Practice Vault

> _Building algorithmic thinking through systematic problem solving_

---

## 📚 Patterns Guides

> [!note]- These files need to be reviewed as they are AI generated
>
> ```dataview
> LIST WITHOUT ID emoji + " " + link(file.link, title) + ": " + description
> FROM "patterns"
> SORT title ASC
> ```

> [!note]- External Links
>
> > [Patterns](https://blog.algomaster.io/p/15-leetcode-patterns)
>
> > [Patterns](https://www.educative.io/courses/grokking-coding-interview)
>
> > [Patterns](https://www.designgurus.io/course-play/grokking-the-coding-interview/doc/coding-patterns-a-cheat-sheet)

## 🗂️ Problems Categories

> [!abstract]- Arrays & Hashing
>
> ```dataview
> TABLE WITHOUT ID
>   "[[" + file.path + "|" + leetcode_id + ". " + title + "]]" as "ID",
>   difficulty as "Difficulty",
>   tags as "Tags",
>   status as "Status"
> FROM "problems/arrays-and-hashing"
> WHERE file.name != "README"
> SORT leetcode_id ASC
> ```

---

## 📈 Difficulty Breakdown

> [!success]- Easy
>
> ```dataview
> TABLE WITHOUT ID
>   "[[" + file.path + "|" + leetcode_id + ". " + title + "]]" as "ID",
>   difficulty as "Difficulty",
>   tags as "Tags",
>   status as "Status"
> FROM "problems"
> WHERE file.name != "README"
> SORT leetcode_id ASC
> ```

> [!warning]- Medium
>
> ```dataview
> TABLE WITHOUT ID
>   "[[" + file.path + "|" + leetcode_id + ". " + title + "]]" as "ID",
>   difficulty as "Difficulty",
>   tags as "Tags",
>   status as "Status"
> FROM "problems"
> WHERE difficulty = "Medium"
> SORT leetcode_id ASC
> ```

> [!error]- Hard
>
> ```dataview
> TABLE WITHOUT ID
>   "[[" + file.path + "|" + leetcode_id + ". " + title + "]]" as "ID",
>   difficulty as "Difficulty",
>   tags as "Tags",
>   status as "Status"
> FROM "problems"
> WHERE difficulty = "Hard"
> SORT leetcode_id ASC
> ```
