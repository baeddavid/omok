let board = [
    [null,null,null,null,null,null,null,null,null,null], //0
    [null,null,null,null,null,null,null,null,null,null], //1
    [null,null,'W',null,null,null,null,null,'B',null], //2
    [null,null,null,'B',null,null,null,'B',null,null], //3
    [null,null,null,null,'W',null,'B',null,null,null], //4
    [null,null,null,null,null,'B',null,null,null,null], //5
    [null,null,null,null,'B',null,'W',null,null,null], //6
    [null,null,null,'W',null,null,null,'W',null,null], //7
    [null,null,null,null,null,null,null,null,'B',null], //8
    [null,null,null,null,null,null,null,null,null,null], //9
  ];
  

/*----- functions -----*/
// Function that checks if player Black has a winning move
function checkBlackWin(row, col) {
    // Check Row Right
    let counterB = 0;
    for(let i = col; i < board.length; i++) {
        if(board[row][i] == 'B')
            counterB++;
        else if(board[row][i] != 'B')
            break;
        if(counterB == 5)
            return 'BLACK WIN';
    }
    // Check Row Left
    for(let i = col - 1; i >= 0; i--) {
        if(board[row][i] == 'B')
            counterB++;
        else if(board[row][i] != 'B')
            break;
        if(counterB == 5)
            return 'BLACK WIN';
    }
    
    // Check Col Down
    counterB = 0;
    for(let i = row; i < board.length; i++) {
        if(board[i][col] == 'B')
            counterB++; 
        else if(board[i][col] != 'B')
            break;
        if(counterB == 5)
            return 'BLACK WIN';
    }
    // Check Col Up
    for(let i = row - 1; i >= 0; i--) {
        if(board[i][col] == 'B')
            counterB++;
        else if(board[i][col] != 'B')
            break;
        if(counterB == 5)
            return 'BLACK WIN';
    }
  // Check Lower Diag
    counterB = 0;
    for(let i = row, j = col; i < board.length; i++, j--) {
        if(board[i][j] == 'B')
            counterB++;
        else if(board[i][j] != 'B')
            break;
        if(counterB == 5)
            return 'BLACK WIN';
    }
    
    // Check Upper Diag
    for(let i = row - 1, j = col + 1; i >= 0; i--, j++) {
        if(board[i][j] == 'B')
            counterB++;
        else if(board[i][j] != 'B')
            break;
        if(counterB == 5)
            return 'BLACK WIN';
    }
    // Check Upper Anti-Diag
      counterB = 0;
    for(let i = row, j = col; i >= 0; i--, j--) {
        if(board[i][j] == 'B')
            counterB++;
        else if(board[i][j] != 'B')
            break;
        if(counterB == 5)
            return 'BLACK WIN';    
    }
    // Check Lower Anti-Diag
    for(let i = row + 1, j = col + 1; i < board.length; i++, j++) {
        if(board[i][j] == 'B')
            counterB++;
        else if(board[i][j] != 'B')
            break;
        if(counterB == 5)
            return 'BLACK WIN';     
    }  
  }
// Function that checks if player White has a winning move  
function checkWhiteWin(row, col) {
    // Check Row Right
    let counterW = 0;
    for(let i = col; i < board.length; i++) {
        if(board[row][i] == 'W')
            counterW++;
        else if(board[row][i] != 'W')
            break;
        if(counterW == 5)
            return 'WHITE WIN';
    }
    // Check Row Left
    for(let i = col - 1; i >= 0; i--) {
        if(board[row][i] == 'W')
            counterW++;
        else if(board[row][i] != 'W')
            break;
        if(counterW == 5)
            return 'WHITE WIN';
    }
    
    // Check Col Down
    counterW = 0;
    for(let i = row; i < board.length; i++) {
        if(board[i][col] == 'W')
            counterW++; 
        else if(board[i][col] != 'W')
            break;
        if(counterW == 5)
            return 'WHITE WIN';
    }
    // Check Col Up
    for(let i = row - 1; i >= 0; i--) {
        if(board[i][col] == 'W')
            counterW++;
        else if(board[i][col] != 'W')
            break;
        if(counterW == 5)
            return 'WHITE WIN';
    }
    
    // Check Lower Diag
    counterW = 0;
    for(let i = row, j = col; i < board.length; i++, j--) {
        if(board[i][j] == 'W')
            counterW++;
        else if(board[row][col] != 'W')
            break;
        if(counterW == 5)
            return 'WHITE WIN';
    }
    
    // Check Upper Diag
    for(let i = row - 1, j = col + 1; i >= 0; i--, j++) {
        if(board[i][j] == 'W')
            counterW++;
        else if(board[row][col] != 'W')
            break;
        if(counterW == 5)
            return 'WHITE WIN';
    }
    // Check Upper Anti-Diag
      counterW = 0;
    for(let i = row, j = col; i >= 0; i--, j--) {
        if(board[i][j] == 'W')
            counterW++;
        else if(board[i][j] != 'W')
            break;
        if(counterW == 5)
            return 'WHITE WIN';    
    }
    // Check Lower Anti-Diag
    for(let i = row + 1, j = col + 1; i < board.length; i++, j++) {
        if(board[i][j] == 'W')
            counterW++;
        else if(board[i][j] != 'W')
            break;
        if(counterW == 5)
            return 'WHITE WIN';     
    }
  }