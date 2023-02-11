var numIslands = function(grid) {
  let row = grid[0].length
  let col = grid.length
  let count = 0
  for (let i = 0; i < col ; i++) {
      for (let j = 0; j < row; j ++) {
          if (grid[i][j] === "1") {
              count ++
              returnLands(i, j)
          }
      }
  }
  function returnLands(i, j) {
      if (i < 0 || i >= col || j < 0 || j >= row || grid[i][j] === '0') { return }
      grid[i][j] = "0"
      returnLands(i -1, j)
      returnLands(i + 1, j)
      returnLands(i, j + 1)
      returnLands(i, j -1)
  }
  return count
};


let nums = [["1","1","0","0","0"],
["1","1","0","0","0"],
["0","0","1","0","0"],
["0","0","0","1","1"]]
console.log(numIslands(nums))