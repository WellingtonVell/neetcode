// go run problems/1/solve.go

package main

import "fmt"

// Runtime: 20ms, Memory: 5.44MB
func twoSum(nums []int, target int) []int {
	for i := 0; i < len(nums)-1; i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				fmt.Println([]int{i, j})
				return []int{i, j}
			}
		}
	}

	return []int{}
}

// Runtime: 0ms, Memory: 5.98MB
func twoSum2(nums []int, target int) []int {
	newMap := make(map[int]int)

	for i := 0; i < len(nums); i++ {
		x := nums[i]
		y := target - x

		if index, exists := newMap[y]; exists {
			return []int{index, i}
		}

		fmt.Println(newMap)
		newMap[x] = i
	}
	return []int{}
}

func main() {
	fmt.Println("Test 1")
	twoSum2([]int{2, 7, 11, 15}, 9)
	fmt.Println("Test 2")
	twoSum2([]int{3, 2, 4}, 6)
	fmt.Println("Test 3")
	twoSum2([]int{3, 3}, 6)
}
