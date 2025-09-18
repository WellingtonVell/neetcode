// go run problems/arrays-and-hashing/1/solve.go

package main

import "fmt"

func twoSum(nums []int, target int) []int {
	fmt.Println(nums)
	fmt.Println(target)
	return []int{}
}

func main() {
	fmt.Println("Test 1")
	twoSum([]int{2, 7, 11, 15}, 9)
	fmt.Println("Test 2")
	twoSum([]int{3, 2, 4}, 6)
	fmt.Println("Test 3")
	twoSum([]int{3, 3}, 6)
}
