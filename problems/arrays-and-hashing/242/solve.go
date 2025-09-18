// go run problems/arrays-and-hashing/242/solve.go

package main

import "fmt"

// Runtime: 2ms, Memory: 4.73MB
func isAnagram(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}

	count := make(map[rune]int)

	for _, char := range s {
		count[char-'a']++
	}

	for _, char := range t {
		count[char-'a']--
	}

	for _, c := range count {
		if c != 0 {
			fmt.Println(false)
			return false
		}
	}

	fmt.Println(true)
	return true
}

// Runtime: 4ms, Memory: 4.69MB
func isAnagram2(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}

	map1 := make(map[rune]int)
	map2 := make(map[rune]int)

	for _, char := range s {
		map1[char]++
	}

	for _, char := range t {
		map2[char]++
	}

	for char, count := range map1 {
		if map2[char] != count {
			fmt.Println(false)
			return false
		}
	}

	fmt.Println(true)
	return true
}

// Runtime: 0ms, Memory: 4.81MB
func isAnagram3(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}

	charCount := [26]int{}

	for _, char := range s {
		charCount[char-'a']++
	}

	for _, char := range t {
		charCount[char-'a']--
	}

	for _, count := range charCount {
		if count != 0 {
			fmt.Println(false)
			return false
		}
	}

	fmt.Println(true)
	return true
}

func main() {
	fmt.Printf("Test 1\n")
	isAnagram3("anagram", "nagaram")

	fmt.Printf("Test 2\n")
	isAnagram3("rat", "car")
}
