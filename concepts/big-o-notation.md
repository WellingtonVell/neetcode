---
tags: [concept, complexity, big-o, algorithms, fundamentals]
aliases: [complexity, time-complexity, space-complexity, asymptotic-analysis]
type: concept-guide
difficulty: 🟢
prerequisites: [basic-math, loops, functions]
related_concepts: [algorithms, data-structures, optimization]
emoji: 📊
title: Big O Notation
description: Understanding algorithmic time and space complexity analysis
---

# 📊 Big O Notation

## Overview [[README|🏠]]

Big O notation is a mathematical way to describe the **worst-case performance** of algorithms as input size grows. It helps us:

- **Compare algorithms** - Choose the most efficient approach
- **Predict scalability** - Understand how performance changes with larger inputs
- **Optimize code** - Identify bottlenecks and improve efficiency
- **Make informed decisions** - Balance time vs space trade-offs

Understanding Big O is fundamental for writing efficient code and acing technical interviews.

> _**Think of Big O as a speedometer for your code - it tells you how fast (or slow) your algorithm will go as you give it more data to process!**_

---

## 🎯 Common Complexities [[README|🏠]]

### O(1) — Constant Time

> [!success]- Characteristics
>
> - **Performance:** Same execution time regardless of input size
> - **Examples:** Array index access, hash table lookup, basic arithmetic
> - **Space:** Usually O(1) space as well
> - **Scalability:** Perfect - performance never degrades

```typescript
// O(1) - Always takes the same time
function getFirstElement(arr: number[]): number {
  return arr[0]; // Single operation
}

function hashLookup(map: Map<string, any>, key: string): any {
  return map.get(key); // Hash table access
}
```

### O(log n) — Logarithmic Time

> [!success]- Characteristics
>
> - **Performance:** Grows slowly, even with massive inputs
> - **Examples:** Binary search, balanced tree operations
> - **Space:** Often O(1) or O(log n) for recursion
> - **Scalability:** Excellent - handles large datasets efficiently

```typescript
// O(log n) - Cuts search space in half each iteration
function binarySearch(arr: number[], target: number): number {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

### O(n) — Linear Time

> [!info]- Characteristics
>
> - **Performance:** Time increases proportionally with input size
> - **Examples:** Single loop, linear search, array traversal
> - **Space:** Often O(1) but can be O(n) with additional storage
> - **Scalability:** Good - reasonable performance for most inputs

```typescript
// O(n) - Must check every element
function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function sumArray(arr: number[]): number {
  let sum = 0;
  for (const num of arr) {
    // O(n) iteration
    sum += num; // O(1) operation
  }
  return sum;
}
```

### O(n log n) — Linearithmic Time

> [!info]- Characteristics
>
> - **Performance:** Efficient for comparison-based sorting
> - **Examples:** Merge sort, heap sort, efficient sorting algorithms
> - **Space:** Can be O(1) to O(n) depending on implementation
> - **Scalability:** Good - optimal for many divide-and-conquer algorithms

```typescript
// O(n log n) - Merge Sort example
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid)); // O(log n) divisions
  const right = mergeSort(arr.slice(mid)); // O(log n) divisions

  return merge(left, right); // O(n) merge operation
}
```

### O(n²) — Quadratic Time

> [!warning]- Characteristics
>
> - **Performance:** Time increases quadratically with input size
> - **Examples:** Bubble sort, nested loops, brute force solutions
> - **Space:** Usually O(1) but can be higher
> - **Scalability:** Poor - becomes slow with moderate input sizes

```typescript
// O(n²) - Nested loops over same data
function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    // O(n)
    for (let j = 0; j < n - i - 1; j++) {
      // O(n)
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Finding all pairs in an array
function findAllPairs(arr: number[]): number[][] {
  const pairs: number[][] = [];
  for (let i = 0; i < arr.length; i++) {
    // O(n)
    for (let j = i + 1; j < arr.length; j++) {
      // O(n)
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs;
}
```

---

## ⚡ Performance Comparison [[README|🏠]]

| Complexity | n=10 | n=100  | n=1,000   | n=10,000    | n=100,000      | Growth Rate |
| ---------- | ---- | ------ | --------- | ----------- | -------------- | ----------- |
| O(1)       | 1    | 1      | 1         | 1           | 1              | Constant    |
| O(log n)   | 3    | 7      | 10        | 13          | 17             | Very Slow   |
| O(n)       | 10   | 100    | 1,000     | 10,000      | 100,000        | Linear      |
| O(n log n) | 30   | 700    | 10,000    | 130,000     | 1,700,000      | Moderate    |
| O(n²)      | 100  | 10,000 | 1,000,000 | 100,000,000 | 10,000,000,000 | Fast        |

> [!tip]- Performance Insights
>
> - **O(1) and O(log n):** Excellent for any input size
> - **O(n) and O(n log n):** Good for reasonable input sizes
> - **O(n²) and worse:** Only acceptable for small inputs
> - **Rule of thumb:** Prefer logarithmic and linear solutions when possible

---

## 🧠 Space Complexity [[README|🏠]]

Space complexity measures **additional memory** used by an algorithm:

> [!example]- O(1) Space - Constant
>
> ```typescript
> function reverseArray(arr: number[]): void {
>   let left = 0,
>     right = arr.length - 1;
>   while (left < right) {
>     [arr[left], arr[right]] = [arr[right], arr[left]];
>     left++;
>     right--;
>   }
>   // Only uses a few variables - O(1) space
> }
> ```

> [!example]- O(n) Space - Linear
>
> ```typescript
> function fibonacci(n: number, memo: Map<number, number> = new Map()): number {
>   if (n <= 1) return n;
>   if (memo.has(n)) return memo.get(n)!;
>
>   const result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
>   memo.set(n, result); // Storing O(n) values
>   return result;
> }
> ```

---

## ⚠️ Common Pitfalls [[README|🏠]]

> [!warning]- Analysis Mistakes
>
> - **Confusing average vs worst case:** Big O describes worst-case scenario
> - **Ignoring hidden constants:** O(100n) is still O(n), but may be slower than O(log n) for small inputs
> - **Forgetting space complexity:** An O(n) time algorithm might use O(n²) space
> - **Misunderstanding amortized complexity:** Some operations average out over time
> - **Nested loops assumption:** Not all nested loops are O(n²) if inner loop depends on outer loop differently

> [!tip]- Analysis Tips
>
> 1. **Count the loops:** Nested loops often multiply complexities
> 2. **Look for divide-and-conquer:** Often leads to O(log n) or O(n log n)
> 3. **Consider input size:** What happens when input doubles?
> 4. **Don't optimize prematurely:** Readable code first, then optimize bottlenecks
> 5. **Use profiling tools:** Measure actual performance in your specific context

---

## 🔗 Related Concepts [[README|🏠]]

- **Data Structures** → [[README|Data Structures]] - Understanding complexity of operations
- **Algorithms** → [[README|Algorithms]] - Analyzing algorithmic efficiency
- **Optimization** → [[README|Optimization]] - Improving algorithm performance
- **Sorting** → [[patterns/merge-intervals|Sorting Patterns]] - Comparing sorting algorithm complexities

---

## 🔑 Key Takeaways [[README|🏠]]

- 🧠 **Focus on growth rate:** How does performance change as input size increases?
- 🔧 **Worst-case analysis:** Big O describes the worst possible scenario
- ⚡ **Practical implications:** O(n²) algorithms become unusable with large inputs
- 🎯 **Optimization targets:** Identify the most expensive operations in your code
