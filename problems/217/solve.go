// go run problems/217/solve.go

package main

import "fmt"

// Runtime: 17ms, Memory: 10.9MB
func containsDuplicate(nums []int) bool {
	values := make(map[int]bool)
	for _, value := range nums {
		if _, ok := values[value]; ok {
			fmt.Println(true)
			return true
		}
		values[value] = true
	}
	fmt.Println(false)
	return false
}

// Runtime: 24ms, Memory: 19.1MB
func containsDuplicate2(nums []int) bool {
	values := make(map[int]struct{})
	for _, value := range nums {
		if _, ok := values[value]; ok {
			fmt.Println(true)
			return true
		}
		values[value] = struct{}{}
	}
	fmt.Println(false)
	return false
}

func main() {
	fmt.Println("Test 1")
	containsDuplicate2([]int{1, 2, 3, 1})
	fmt.Println("Test 2")
	containsDuplicate2([]int{1, 2, 3, 4})
	fmt.Println("Test 3")
	containsDuplicate2([]int{1, 1, 1, 3, 3, 4, 3, 2, 4, 2})
}
