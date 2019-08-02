/*----- app's state (variables) -----*/ 
let board;
let isPlayerWhite, winnerPresent;
/*----- event listeners -----*/ 
let cell = document.querySelector('section.playable');
cell.addEventListener('click', handleClick);
/*----- functions -----*/
// Function that checks if player Black has a winning move
play();

function play() {
    board = [
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], //9
        ];
    isPlayerWhite = true;
    winnerPresent = false;
}

function handleClick(evt) {
    let idx = evt.target.id;
    let idxArr = cleanIdx(idx);
    if(isPlayerWhite) {
        if(board[idxArr[0]][idxArr[1]] != null) {
            alert('TILE HAS BEEN CHOSEN');
            return;
        } else {
            board[idxArr[0]][idxArr[1]] = 'W';
            render1(idxArr);
            checkWhiteWin(idxArr[0], idxArr[1]);
            isPlayerWhite = false;
        }
    } else {
        if(board[idxArr[0]][idxArr[1]] != null) {
            alert('TILE HAS BEEN CHOSEN');
            return;
        } else {
            board[idxArr[0]][idxArr[1]] = 'B';
            render2(idxArr);
            checkBlackWin(idxArr[0], idxArr[1]);
            isPlayerWhite = true;
        }
    }
}
//1de9b6
function render1(idxArr) {
    let marker = document.getElementById(`c${idxArr[0]}r${idxArr[1]}`);
    marker.style.backgroundColor = '#AFEEEE';  
}

function render2(idxArr) {
    let marker = document.getElementById(`c${idxArr[0]}r${idxArr[1]}`);
    marker.style.backgroundColor = 'black';  
}

function checkBlackWin(row, col) {
    // Check Row Right
    let counterB = 0;
    for(let i = col; i < board.length; i++) {
        if(board[row][i] == 'B')
            counterB++;
        else if(board[row][i] != 'B')
            break;
        if(counterB == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('BLACK WIN');
            winnerPresent = true;
        }
            
    }
    // Check Row Left
    for(let i = col - 1; i >= 0; i--) {
        if(board[row][i] == 'B')
            counterB++;
        else if(board[row][i] != 'B')
            break;
        if(counterB == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('BLACK WIN');
            winnerPresent = true;
        }
    }
    
    // Check Col Down
    counterB = 0;
    for(let i = row; i < board.length; i++) {
        if(board[i][col] == 'B')
            counterB++; 
        else if(board[i][col] != 'B')
            break;
        if(counterB == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('BLACK WIN');
            winnerPresent = true;
        }
    }
    // Check Col Up
    for(let i = row - 1; i >= 0; i--) {
        if(board[i][col] == 'B')
            counterB++;
        else if(board[i][col] != 'B')
            break;
        if(counterB == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('BLACK WIN');
            winnerPresent = true;
        }
    }
  // Check Lower Diag
    counterB = 0;
    for(let i = row, j = col; i < board.length; i++, j--) {
        if(board[i][j] == 'B')
            counterB++;
        else if(board[i][j] != 'B')
            break;
        if(counterB == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('BLACK WIN');
            winnerPresent = true;
        }
    }
    
    // Check Upper Diag
    for(let i = row - 1, j = col + 1; i >= 0; i--, j++) {
        if(board[i][j] == 'B')
            counterB++;
        else if(board[i][j] != 'B')
            break;
        if(counterB == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('BLACK WIN');
            winnerPresent = true;
        }
    }
    // Check Upper Anti-Diag
      counterB = 0;
    for(let i = row, j = col; i >= 0; i--, j--) {
        if(board[i][j] == 'B')
            counterB++;
        else if(board[i][j] != 'B')
            break;
        if(counterB == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('BLACK WIN');
            winnerPresent = true;
        }  
    }
    // Check Lower Anti-Diag
    for(let i = row + 1, j = col + 1; i < board.length; i++, j++) {
        if(board[i][j] == 'B')
            counterB++;
        else if(board[i][j] != 'B')
            break;
        if(counterB == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('BLACK WIN');
            winnerPresent = true;
        }  
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
        if(counterW == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('WHITE WIN');
            winnerPresent = true;
        } 
    }
    // Check Row Left
    for(let i = col - 1; i >= 0; i--) {
        if(board[row][i] == 'W')
            counterW++;
        else if(board[row][i] != 'W')
            break;
        if(counterW == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('WHITE WIN');
            winnerPresent = true;
        } 
    }
    
    // Check Col Down
    counterW = 0;
    for(let i = row; i < board.length; i++) {
        if(board[i][col] == 'W')
            counterW++; 
        else if(board[i][col] != 'W')
            break;
        if(counterW == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('WHITE WIN');
            winnerPresent = true;
        } 
    }
    // Check Col Up
    for(let i = row - 1; i >= 0; i--) {
        if(board[i][col] == 'W')
            counterW++;
        else if(board[i][col] != 'W')
            break;
        if(counterW == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('WHITE WIN');
            winnerPresent = true;
        } 
    }
    
    // Check Lower Diag
    counterW = 0;
    for(let i = row, j = col; i < board.length; i++, j--) {
        if(board[i][j] == 'W')
            counterW++;
        else if(board[row][col] != 'W')
            break;
        if(counterW == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('WHITE WIN');
            winnerPresent = true;
        } 
    }
    
    // Check Upper Diag
    for(let i = row - 1, j = col + 1; i >= 0; i--, j++) {
        if(board[i][j] == 'W')
            counterW++;
        else if(board[row][col] != 'W')
            break;
        if(counterW == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('WHITE WIN');
            winnerPresent = true;
        } 
    }
    // Check Upper Anti-Diag
      counterW = 0;
    for(let i = row, j = col; i >= 0; i--, j--) {
        if(board[i][j] == 'W')
            counterW++;
        else if(board[i][j] != 'W')
            break;
        if(counterW == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('WHITE WIN');
            winnerPresent = true;
        } 
    }
    // Check Lower Anti-Diag
    for(let i = row + 1, j = col + 1; i < board.length; i++, j++) {
        if(board[i][j] == 'W')
            counterW++;
        else if(board[i][j] != 'W')
            break;
        if(counterW == 5) {
            cell.removeEventListener('click', handleClick);
            console.log('WHITE WIN');
            winnerPresent = true;
        }   
    }
  }

function cleanIdx(idxString) {
    idxString = idxString.substring(1);
    let idxArr = [], idx = '', i = 0, j;
    while(idxString.charAt(i) != 'r') {
        idx += idxString.charAt(i++);
        j = i;
    }
    idxArr.push(parseInt(idx));
    idx = '';
    j++;
    
    while(j < idxString.length)
        idx += idxString.charAt(j++);
        
    idxArr.push(parseInt(idx));
    return idxArr;
}