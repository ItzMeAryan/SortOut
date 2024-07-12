document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const container = document.querySelector(".container"); // Select the sorting container
  const video = document.getElementById("load");

  loader.addEventListener('animationend', function () {
    loader.style.display = "none";
    container.style.display = "block";
    container.style.opacity = 1; // Set opacity to 1
});
  // Function to perform sorting based on selected algorithm
  function sortNumbers(numbers, selectedAlgorithm) {
    // Convert strings to integers
    numbers = numbers.map(Number);
    switch (selectedAlgorithm) {
      case "Bubble Sort":
        for (let i = 0; i < numbers.length; i++) {
          for (let j = 0; j < numbers.length - 1 - i; j++) {
            if (numbers[j] > numbers[j + 1]) {
              [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
            }
          }
        }
        break;
      case "Selection Sort":
        for (let i = 0; i < numbers.length; i++) {
          let minIndex = i;
          for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[j] < numbers[minIndex]) {
              minIndex = j;
            }
          }
          if (minIndex !== i) {
            [numbers[i], numbers[minIndex]] = [numbers[minIndex], numbers[i]];
          }
        }
        break;
      case "Insertion Sort":
        for (let i = 1; i < numbers.length; i++) {
          let key = numbers[i];
          let j = i - 1;
          while (j >= 0 && numbers[j] > key) {
            numbers[j + 1] = numbers[j];
            j--;
          }
          numbers[j + 1] = key;
        }
        break;
      case "Merge Sort":
        numbers = mergeSort(numbers);
        break;
      case "Quick Sort":
        numbers = quickSort(numbers, 0, numbers.length - 1);
        break;
      case "Count Sort":
        numbers = countSort(numbers);
        break;
      case "Radix Sort":
        numbers = radixSort(numbers);
        break;
      case "Heap Sort":
        numbers = heapSort(numbers);
        break;
      case "Bucket Sort":
        numbers = bucketSort(numbers);
        break;
    }
    return numbers;
  }
  document.getElementById("sortButton").addEventListener("click", function () {
    var numbers = document.getElementById("inputNumbers").value.split(",");
    var selectedAlgorithm = document.getElementById("sortingAlgorithm").value;
    var sortedNumbers = sortNumbers(numbers, selectedAlgorithm);
    document.getElementById("sortedOutput").innerText =
      sortedNumbers.join(", ");
  });
  function quickSort(arr, left, right) {
    if (left < right) {
      let pivotIndex = partition(arr, left, right);
      quickSort(arr, left, pivotIndex - 1);
      quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
  }

  function partition(arr, left, right) {
    let pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
  }

  // Count Sort algorithm
  function countSort(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let count = Array(max - min + 1).fill(0);
    let output = [];

    for (let num of arr) {
      count[num - min]++;
    }

    for (let i = 0; i < count.length; i++) {
      while (count[i] > 0) {
        output.push(i + min);
        count[i]--;
      }
    }

    return output;
  }

  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr; // Base case: single-element array is already sorted
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid)); // Recursively sort left half
    const right = mergeSort(arr.slice(mid)); // Recursively sort right half

    return merge(left, right);
  }

  function merge(left, right) {
    let result = []; // Create an empty array to store the merged elements
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]); // Add smaller element from left to result
        leftIndex++;
      } else {
        result.push(right[rightIndex]); // Add smaller element from right to result
        rightIndex++;
      }
    }

    // Add remaining elements from left and right arrays
    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      rightIndex++;
    }

    return result;
  }

  // Count Sort algorithm
  function countSort(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let count = Array(max - min + 1).fill(0);
    let output = [];

    for (let num of arr) {
      count[num - min]++;
    }

    for (let i = 0; i < count.length; i++) {
      while (count[i] > 0) {
        output.push(i + min);
        count[i]--;
      }
    }

    return output;
  }

  // Radix Sort algorithm
  function radixSort(arr) {
    let maxDigitCount = mostDigits(arr);

    for (let k = 0; k < maxDigitCount; k++) {
      let digitBuckets = Array.from({ length: 10 }, () => []);
      for (let i = 0; i < arr.length; i++) {
        let digit = getDigit(arr[i], k);
        digitBuckets[digit].push(arr[i]);
      }
      arr = [].concat(...digitBuckets);
    }

    return arr;
  }

  function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  }

  function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  }

  function mostDigits(arr) {
    let maxDigits = 0;
    for (let i = 0; i < arr.length; i++) {
      maxDigits = Math.max(maxDigits, digitCount(arr[i]));
    }
    return maxDigits;
  }

  // Heap Sort algorithm
  function heapSort(arr) {
    buildMaxHeap(arr);

    for (let i = arr.length - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(arr, 0, i);
    }

    return arr;
  }

  function buildMaxHeap(arr) {
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, i, n);
    }
  }

  function heapify(arr, i, heapSize) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < heapSize && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < heapSize && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, largest, heapSize);
    }
  }

  // Bucket Sort algorithm
  function bucketSort(arr) {
    const n = arr.length;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const bucketSize = Math.floor((max - min) / n) + 1;
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = Array.from({ length: bucketCount }, () => []);

    for (let i = 0; i < n; i++) {
      const index = Math.floor((arr[i] - min) / bucketSize);
      buckets[index].push(arr[i]);
    }

    for (let i = 0; i < bucketCount; i++) {
      buckets[i].sort((a, b) => a - b);
    }

    let result = [];
    for (let i = 0; i < bucketCount; i++) {
      result = result.concat(buckets[i]);
    }

    return result;
  }
});

