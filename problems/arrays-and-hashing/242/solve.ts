// npx tsx problems/arrays-and-hashing/242/solve.ts

// Runtime: 7ms, Memory: 57.9MB
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    console.log(false);
    return false;
  }

  const charCount = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    const index = s[i].charCodeAt(0) - "a".charCodeAt(0);
    charCount[index]++;
  }

  for (let i = 0; i < t.length; i++) {
    const index = t[i].charCodeAt(0) - "a".charCodeAt(0);
    charCount[index]--;
  }

  console.log(charCount.every((count) => count === 0));
  return charCount.every((count) => count === 0);
}

// Runtime: 19ms, Memory: 60.15MB
function isAnagram2(s: string, t: string): boolean {
  if (s.length !== t.length) {
    console.log(false);
    return false;
  }

  const map1 = new Map<string, number>();
  const map2 = new Map<string, number>();

  for (const char of s) {
    map1.set(char, (map1.get(char) || 0) + 1);
  }

  for (const char of t) {
    map2.set(char, (map2.get(char) || 0) + 1);
  }

  for (const [char, count] of map1) {
    if (map2.get(char) !== count) {
      console.log(false);
      return false;
    }
  }

  console.log(true);
  return true;
}

// Runtime: 13ms, Memory: 60.43MB
function isAnagram3(s: string, t: string): boolean {
  if (s.length !== t.length) {
    console.log(false);
    return false;
  }

  const charCount = new Map<string, number>();

  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  for (const char of t) {
    const count = charCount.get(char) || 0;
    if (count === 0) {
      console.log(false);
      return false;
    }
    charCount.set(char, count - 1);
  }

  console.log(true);
  return true;
}

console.log("Test 1");
isAnagram3("anagram", "nagaram");

console.log("Test 2");
isAnagram3("rat", "car");
