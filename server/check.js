function printMaximumSumSubmatrix(mat, z) {
    const a = mat.length;
    
    const b = mat[0].length;
    console.log(a,b) 
    if (a < z || b < z) return;
  

    function getSumSubmatrix(topLeftX, topLeftY) {
      let sum = 0;
      for (let i = topLeftX; i < topLeftX + z; i++) {
        for (let j = topLeftY; j < topLeftY + z; j++) {
          sum += mat[i][j];
        }
      }
      return sum;
    }
  
    let maxSum = Number.MIN_SAFE_INTEGER;
    let maxSumSubmatrix = null;


    //Loop Start phase:--
    for (let i = 0; i <= a - z; i++) {
      for (let j = 0; j <= b - z; j++) {
        const currentSum = getSumSubmatrix(i, j);
        if (currentSum > maxSum) {
          maxSum = currentSum;
          maxSumSubmatrix = [i, j];
        }
      }
    }
  
    for (let i = 0; i < z; i++) {
      let row = "";
      for (let j = 0; j < z; j++) {
        row += mat[maxSumSubmatrix[0] + i][maxSumSubmatrix[1] + j] + " ";
      }
      console.log(row);
    }
  }
  
  const mat = [
    [2, 0, 6, 1, 2, 5],
    [1, 0, 5, 0, 1, 3],
    [3, 0, 1, 2, 4, 1],
    [0, 1, 3, 1, 1, 9],
    [4, 1, 0, 8, 5, 2],
    [0, 1, 0, 1, 2, 3],
    [6, 5, 3, 1, 0, 2],
    [0, 0, 1, 6, 0, 4],
  ]
  const z = 3;
    console.log("the sum of 3 x 3 matrix is");
    //calling
    printMaximumSumSubmatrix(mat, z);

