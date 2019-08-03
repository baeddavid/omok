/*----- app's state (variables) -----*/ 
let board, history, timer, idxCache;
let isPlayerWhite, winnerPresent, is2p, counter, pls, cls;
/*----- event listeners -----*/ 
let cell = document.querySelector('section.playable');
cell.addEventListener('click', handleClick);

let rst = document.getElementById('reset');
rst.addEventListener('click', reset);

let mv5 = document.querySelector('button.mv5');
mv5.addEventListener('click', replay5);

let mv10 = document.querySelector('button.mv10');
mv10.addEventListener('click', replay10);

let mv15 = document.querySelector('button.mv15');
mv15.addEventListener('click', replay15);

let mvA = document.querySelector('button.mvA');
mvA.addEventListener('click', replayA);

let cpu = document.getElementById('CPU');
cpu.addEventListener('click',cpuPlay)

let time = document.getElementById('countDown');
let timerId = setInterval(countDown, 1000);
/*----- functions -----*/
play();

function play() {
    board = [
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], //9
        ];
    history = [];
    isPlayerWhite = true;
    winnerPresent = false;
    is2p = true;
    counter = 0;
    timer = 15;
    idxCache = [];
}

function reset() {
    play();
    document.querySelector('.win').innerHTML = '';
    document.querySelector('.player').innerHTML = 'Player: White';
    cell.addEventListener('click', handleClick);
    clearBoard();
}

function countDown() {
    if(timer == -1) {
        document.querySelector('.win').innerHTML = '<span class="dsp">OUT OF TIME!</span>';
        timer = 15;
        isPlayerWhite = !isPlayerWhite;
        if(isPlayerWhite)
            document.querySelector('.player').innerHTML = 'Player: White\'s Turn'
        else
            document.querySelector('.player').innerHTML = '<span class="etc">Player: Black\'s Turn</span>'
    } else if(timer > -1)
        time.innerHTML = timer--;
    if(winnerPresent == true)
        clearInterval(timerId);    
}

function cpuPlay() {
    board = [
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], //9
        ];
    history = [];
    isPlayerWhite = true;
    winnerPresent = false;
    is2p = false;
    clearBoard();
}

function handleClick(evt) {
    let idx = evt.target.id;
    let idxArr = cleanIdx(idx);
    if(is2p) {
        if(isPlayerWhite) {
            if(board[idxArr[0]][idxArr[1]] != null) {
                document.querySelector('.win').innerHTML = '<span class="dsp">TILE HAS BEEN CHOSEN!</span>';
                return;
            } else {
                idxCache.push(idxArr);
                document.querySelector('.win').innerHTML = '<span class="dsp"></span>';
                board[idxArr[0]][idxArr[1]] = 'W';
                timer = 15;
                counter++;
                history.push(board.map(inner => inner.slice())); 
                render1(idxArr);
                checkWhiteWin(idxArr[0], idxArr[1]);
                if(winnerPresent) {
                    document.querySelector('.win').innerHTML = `<span class="dsp">White Wins in ${counter} turns!</span>`;
                    return;
                }
                isPlayerWhite = false;
                document.querySelector('.player').innerHTML = '<span class="etc">Player: Black\'s Turn</span>'
            }
        } else {
            if(board[idxArr[0]][idxArr[1]] != null) {
                document.querySelector('.win').innerHTML = '<span class="dsp">TILE HAS BEEN CHOSEN!</span>';
                return;
            } else {
                document.querySelector('.win').innerHTML = '<span class="dsp"></span>';
                board[idxArr[0]][idxArr[1]] = 'B';
                timer = 15;
                counter++;
                history.push(board.map(inner => inner.slice())); 
                render2(idxArr);
                checkBlackWin(idxArr[0], idxArr[1]);
                if(winnerPresent) {
                    document.querySelector('.win').innerHTML = `<span class="dsp2">Black Wins in ${counter} turns!</span>`;
                    return;
                }
                isPlayerWhite = true;
                document.querySelector('.player').innerHTML = 'Player: White\'s Turn'
            }
        }
    }
}

function clearBoard() {
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board.length; j++) {
            let tCell = document.getElementById(`c${i}r${j}`);
            tCell.style.backgroundColor = "#565264";
        }
    }
}

function render1(idxArr) {
    let marker = document.getElementById(`c${idxArr[0]}r${idxArr[1]}`);
    marker.style.backgroundColor = '#ECF4FB';  
}

function render2(idxArr) {
    let marker = document.getElementById(`c${idxArr[0]}r${idxArr[1]}`);
    marker.style.backgroundColor = '#111416';  
}

function replay5() {
    clearBoard();
    let startIndex = history.length - 6;
    if(startIndex < 0)
        startIndex = 0;
    renderBoard(history[startIndex]);

    let interval = 750;
    for(let i = startIndex, j = 0; i < history.length; i++, j++) {
        setTimeout(function() {
            renderBoard(history[i]);
        },j * interval);
    }
}

function replay10() {
    clearBoard();
    let startIndex = history.length - 11;
    if(startIndex < 0)
        startIndex = 0;
    renderBoard(history[startIndex]);
    
    let interval = 550;
    for(let i = startIndex, j = 0; i < history.length; i++, j++) {
        setTimeout(function() {
            renderBoard(history[i]);
        },j * interval);
    }
}

function replay15() {
    clearBoard();
    let startIndex = history.length - 16;
    if(startIndex < 0)
        startIndex = 0;
    renderBoard(history[startIndex]);
    
    let interval = 550;
    for(let i = startIndex, j = 0; i < history.length; i++, j++) {
        setTimeout(function() {
            renderBoard(history[i]);
        },j * interval);
    }
}

function replayA() {
    clearBoard();
    renderBoard(history[0]);
    
    let interval = 550;
    for(let i = 0, j = 0; i < history.length; i++, j++) {
        setTimeout(function() {
            renderBoard(history[i]);
        },j * interval);
    }
}

function renderBoard(gameState) {
    for(let i = 0; i < gameState.length; i++) {
        for(let j = 0; j < gameState.length; j++) {
            if(gameState[i][j] == 'W')
                render1([i,j]);
            else if(gameState[i][j] == 'B')
                render2([i,j]);
        }
    }
}
// Function that checks if player Black has a winning move
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
    if(idxString == null)
        return;
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

function getPLS() {
    let counterPLS = 0;
    let tempPLS = 0;
    let blockLeft = false, blockRight = false;
    let i = 1;
    
    for(let cell of idxCache) {
        // Find the PLS in row
        counterPLS = 0;
        for(let i = cell[1]; i < board.length; i++) {
            if(board[cell[0]][i] == 'W')
                counterPLS++;
            else if(board[cell[0]][i] != 'W') {
                if(board[cell[0]][i] == 'B')
                    blockRight = true;
                break;    
            }
        }
        for(let i = cell[1] - 1; i >= 0; i--) {
            if(board[cell[0]][i] == 'W')
                counterPLS++;
            else if(board[cell[0]][i] != 'W') {
                if(board[cell[0]][i] ==  'B')
                    blockLeft = true;
                break;
            }
        }
        console.log(`row, `,`blocked left: ${blockLeft}, `, `blocked right: ${blockRight}, `,`current PLS: ${counterPLS},`, `loop: ${i}`);
        // If both left and right are blocked it is not a threat
        if(blockLeft && blockRight) counterPLS = 0;
        blockLeft = false, blockRight = false;
        // Store current PLS in case we find larger PLS
        tempPLS = counterPLS;

        counterPLS = 0;
        for(let i = cell[0]; i < board.length; i++) {
            if(board[i][cell[1]] == 'W')
                counterPLS++; 
            else if(board[i][cell[1]] != 'W') {
                if(board[i][cell[1]] == 'B')
                    blockLeft = true;
                break;
            }
        }

        for(let i = cell[0] - 1; i >= 0; i--) {
            if(board[i][cell[1]] == 'W')
                counterPLS++;
            else if(board[i][cell[1]] != 'W') {
                if(board[i][cell[1]] == 'B')
                    blockRight = true;
                break;
            }
        }
        console.log(`col, `,`blocked left: ${blockLeft}, `, `blocked right: ${blockRight}, `,`current PLS: ${counterPLS},`, `loop: ${i}`);
        if(blockLeft && blockRight) counterPLS = 0;
        
        blockLeft = false, blockRight = false;
        tempPLS = Math.max(counterPLS, tempPLS);

        counterPLS = 0;
        for(let i = cell[0], j = cell[1]; i < board.length; i++, j--) {
            if(board[i][j] == 'W')
                counterPLS++;
            else if(board[i][j] != 'W') {
                if(board[i][j] == 'B')
                    blockLeft = true;
                break;
            }
        }
        for(let i = cell[0] - 1, j = cell[1] + 1; i >= 0; i--, j++) {
            if(board[i][j] == 'W')
                counterPLS++;
                else if(board[i][j] != 'W') {
                    if(board[i][j] == 'B')
                        blockRight = true;
                    break;
            }
        }
        console.log(`aDiag,`,`blocked left: ${blockLeft},`, `blocked right: ${blockRight}, `,`current PLS: ${counterPLS},`, `loop: ${i}`);
        if(blockLeft && blockRight) counterPLS = 0;
        
        blockLeft = false, blockRight = false;
        tempPLS = Math.max(counterPLS, tempPLS);

        counterPLS = 0;
        for(let i = cell[0], j = cell[1]; i >= 0; i--, j--) {
            if(board[i][j] == 'W')
                counterPLS++;
            else if(board[i][j] != 'W') {
                if(board[i][j] == 'B')
                    blockLeft = true;
                break;
            }
        }

        for(let i = cell[0] + 1, j = cell[1] + 1; i < board.length; i++, j++) {
            if(board[i][j] == 'W')
                counterPLS++;
            else if(board[i][j] != 'W') {
                if(board[i][j] == 'B')
                    blockRight = true;
                break;
            }
        }
        console.log(`diag,`,`blocked left: ${blockLeft}, `, `blocked right: ${blockRight}, `,`current PLS: ${counterPLS},`, `loop: ${i}`);
        if(blockLeft && blockRight) counterPLS = 0;
        blockLeft = false, blockRight = false;
        tempPLS = Math.max(counterPLS, tempPLS);
        i++;
    }
    return tempPLS;
}
