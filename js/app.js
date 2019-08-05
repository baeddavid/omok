/*----- app's state (variables) -----*/ 
let board, history, timer, plsCache, clsCache, clsMoves;
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
    plsCache = [];
    clsCache = [
        // Dummy cls object to get computer started 
        {
            clsLength: 0,
            clsIdx: [0,0],
            clsType: 'R'
        }
    ];
    clsMoves = [];
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
    cls = 0;
    clearBoard();
}

function handleClick(evt) {
    let idx = evt.target.id;
    // After we get our idx from the div id clean it
    let idxArr = cleanIdx(idx);
    // If the game is in 2 player mode
    if(is2p) {
        if(isPlayerWhite) {
            // If the tile is taken exit function
            if(board[idxArr[0]][idxArr[1]] != null) {
                document.querySelector('.win').innerHTML = '<span class="dsp">TILE HAS BEEN CHOSEN!</span>';
                return;
            } else {
                // If tile is placed, switch turns and reset timer
                document.querySelector('.win').innerHTML = '<span class="dsp"></span>';
                board[idxArr[0]][idxArr[1]] = 'W';
                timer = 15;
                counter++;
                // Push a deep copy of the board to our history array
                history.push(board.map(inner => inner.slice())); 
                render1(idxArr);
                // Check if the move played was a winner
                checkWhiteWin(idxArr[0], idxArr[1]);
                // If it was a winner exit the function and display text
                if(winnerPresent) {
                    document.querySelector('.win').innerHTML = `<span class="dsp">White Wins in ${counter} turns!</span>`;
                    return;
                }
                // Switch player
                isPlayerWhite = false;
                document.querySelector('.player').innerHTML = '<span class="etc">Player: Black\'s Turn</span>'
            }
        } else {
            // Player Black
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
        // If the game is CPU
    } else {
        // If player turn
        if(isPlayerWhite) {
            // Same as above
            if(board[idxArr[0]][idxArr[1]] != null) {
                document.querySelector('.win').innerHTML = '<span class="dsp">TILE HAS BEEN CHOSEN!</span>';
                return;
            } else {
                // Same as above
                document.querySelector('.win').innerHTML = '<span class="dsp"></span>';
                board[idxArr[0]][idxArr[1]] = 'W';
                plsCache.push(getPLS(evt));
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
            // CPU Turn
            // Retrieve the Player's Longest Sequence from the plsCache
            pls = plsCache[plsCache.length - 1].plsLength; 
            // Retrieve the Computer's Longest Sequene from the clsCache.
            // computer needs to constantly compare if it has cls already or if 
            // cache has the cls
            cls = Math.max(cls, clsCache[clsCache.length - 1].clsLength);
            // If the player has a pls greater than or equal to cls
            if(pls >= cls) {
                // play defensively
                defensiveAction();
                // push the move the computer just palyed into the clsCache
                clsCache.push(getCLS());
                counter++;
                // Push a deep copy into the history array
                history.push(board.map(inner => inner.slice()));
                // Switch turns
                isPlayerWhite = true;
                document.querySelector('.player').innerHTML = 'Player: White\'s Turn'
            } else {
                // If the computer has a cls greater than pls perform call agressive action
                agressiveAction();
                counter++;
                history.push(board.map(inner => inner.slice()));
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
            document.querySelector('.win').innerHTML = `<span class="dsp2">Black Wins in ${counter} turns!</span>`;
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
            document.querySelector('.win').innerHTML = `<span class="dsp2">Black Wins in ${counter} turns!</span>`;
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
            document.querySelector('.win').innerHTML = `<span class="dsp2">Black Wins in ${counter} turns!</span>`;
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
            document.querySelector('.win').innerHTML = `<span class="dsp2">Black Wins in ${counter} turns!</span>`;
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
            document.querySelector('.win').innerHTML = `<span class="dsp2">Black Wins in ${counter} turns!</span>`;
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
            document.querySelector('.win').innerHTML = `<span class="dsp2">Black Wins in ${counter} turns!</span>`;
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
            document.querySelector('.win').innerHTML = `<span class="dsp2">Black Wins in ${counter} turns!</span>`;
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
            document.querySelector('.win').innerHTML = `<span class="dsp2">Black Wins in ${counter} turns!</span>`;
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

function filterArray(arr) {
    let tmp = [];
    let answer = arr.filter(function (v) {
        if (tmp.indexOf(v.toString()) < 0) {
            tmp.push(v.toString());
            return v;
        }
    });
    return answer;
}
/*----- CPU CODE -----*/ 
// Retrieves the Player's Longest Sequence (PLS)
function getPLS(evt) {
    // We need to initialize multiple variables here
    // counterPLS holds the current pls of the type e.g. -> row or column
    let counterPLS = 0;
    // maxPLS is the maximum pls of all possible combinations
    let maxPLS = 0;
    // blockLeft and blockRight indicate whether the current pls is blocke by 
    // opposing tiles
    let blockLeft = false, blockRight = false;
    // A temporary array to hold the indices of the pls
    let tempArr = [];
    // The pls object that will be returned which contains all data on 
    // pls length, the indices that make it up, and the type of pls it is.
    let objPLS = {
        plsLength: 0,
        plsIdx: [],
        plsType: '0'
    };

    // Begin by cleaning our div id and returning a two element array [row, col]
    let idxArr = cleanIdx(evt.target.id);
    
    // Start at our row right
    for(let i = idxArr[1]; i < board.length; i++) {
        // If the tile right if i is 'W' add one to our counter and add its indices
        // to tempArr
        if(board[idxArr[0]][i] == 'W') {
            counterPLS++;
            tempArr.push([idxArr[0], i]);
        }
        // If it is interrupted by a null break
        else if(board[idxArr[0]][i] != 'W') {
            // If it is interrupted by a black tile, set blocked right to true and break
            if(board[idxArr[0]][i] == 'B')
                blockRight = true;
            break;    
        }
    }

    //Start at tile left of initial tile
    for(let i = idxArr[1] - 1; i >= 0; i--) {
        // If tiles left of i - 1 are 'W' add one to our counter and add its indices
        if(board[idxArr[0]][i] == 'W') {
            counterPLS++;
            tempArr.push([idxArr[0], i]);
        }
        // Refer to above
        else if(board[idxArr[0]][i] != 'W') {
            // If it is interrupted by a black tile, set blocked left to true and break
            if(board[idxArr[0]][i] ==  'B')
                blockLeft = true;
            break;
        }
    }

    // If both blockLeft and blockRight are blocked it is not a valid pls
    // reset our counterPLS and remove our indices since it is not a row-threat
    if(blockLeft && blockRight) {
        counterPLS = 0;
        tempArr = [];
    }

    // If it is not blocked
    // Reset our flags for the next check
    blockLeft = false, blockRight = false;
    // Store the current max pls
    maxPLS = counterPLS;
    // In case our array has duplicates, filter it
    objPLS.plsIdx = filterArray(tempArr);
    // Preemptively set the type to Row
    objPLS.plsType = 'R'

    // Before checking columns reset our counters, now that we have saved them
    counterPLS = 0;
    tempArr = [];
    // Check tiles beneath i
    for(let i = idxArr[0]; i < board.length; i++) {
        if(board[i][idxArr[1]] == 'W') {
            counterPLS++;
            tempArr.push([i, idxArr[1]]);
        }
        else if(board[i][idxArr[1]] != 'W') {
            if(board[i][idxArr[1]] == 'B')
                blockLeft = true;
            break;
        }
    }
    // Check tiles above i + 1
    for(let i = idxArr[0] - 1; i >= 0; i--) {
        if(board[i][idxArr[1]] == 'W') {
            counterPLS++;
            tempArr.push([i, idxArr[1]]);
        }
        else if(board[i][idxArr[1]] != 'W') {
            if(board[i][idxArr[1]] == 'B')
                blockRight = true;
            break;
        }
    }
    // Refer above
    if(blockLeft && blockRight) {
        counterPLS = 0;
        tempArr = [];
    }
    // If the maxPLS is less than the pls of the current type
    if(maxPLS < counterPLS) {
        // Set maxPLS to counterPLS
        maxPLS = counterPLS;
        // Our array of indices must also be replaced
        objPLS.plsIdx = filterArray(tempArr);
        // Then replace the type of pls to 'C'
        objPLS.plsType = 'C'
    }
    
    // Again reset our counters and block checkers
    blockLeft = false, blockRight = false;
    tempArr = [];
    counterPLS = 0;

    // Check our diag now
    // Check for all tiles going bottom left to top right to i 
    for(let i = idxArr[0], j = idxArr[1]; i < board.length; i++, j--) {
        if(board[i][j] == 'W') {
            counterPLS++;
            tempArr.push([i, j]);
        }
        else if(board[i][j] != 'W') {
            if(board[i][j] == 'B')
                blockLeft = true;
            break;
        }
    }
    // Check all tiles going from i to bottom left and top right to end of board
    for(let i = idxArr[0] - 1, j = idxArr[1] + 1; i >= 0; i--, j++) {
        if(board[i][j] == 'W') {
            counterPLS++;
            tempArr.push([i, j]);
        }
            else if(board[i][j] != 'W') {
                if(board[i][j] == 'B')
                    blockRight = true;
                break;
        }
    }
    if(blockLeft && blockRight) {
        counterPLS = 0;
        tempArr = [];
    }
    if(maxPLS < counterPLS) {
        maxPLS = counterPLS;
        objPLS.plsIdx = filterArray(tempArr);
        objPLS.plsType = 'D'
    }
    // Reset counters and block checks
    blockLeft = false, blockRight = false;
    tempArr = [];
    counterPLS = 0;

    // Check anti diag now
    // Check for all tiles above left of i.
    for(let i = idxArr[0], j = idxArr[1]; i >= 0; i--, j--) {
        if(board[i][j] == 'W') {
            counterPLS++;
            tempArr.push([i, j]);
        }
        else if(board[i][j] != 'W') {
            if(board[i][j] == 'B')
                blockLeft = true;
            break;
        }
    }
    // Check for all tiles going bottom right of i
    for(let i = idxArr[0] + 1, j = idxArr[1] + 1; i < board.length; i++, j++) {
        if(board[i][j] == 'W') {
            counterPLS++;
            tempArr.push([i, j]);
        }
        else if(board[i][j] != 'W') {
            if(board[i][j] == 'B')
                blockRight = true;
            break;
        }
    }
    if(blockLeft && blockRight) {
        counterPLS = 0;
        tempArr = [];
    }
    if(maxPLS < counterPLS) {
        maxPLS = counterPLS;
        objPLS.plsIdx = filterArray(tempArr);
        objPLS.plsType = 'AD'
    }
    // Set the pls length equal to the max pls of all combinations
    objPLS.plsLength = maxPLS;
    // Return the object
    return objPLS;
}
// COMPLETE REWRITE MUST BE DONE
function getCLS() {
    let counterCLS = 0;
    let maxCLS = 0;
    let blockLeft = false, blockRight = false;
    let tempArr = [];
    let objCLS = {
        clsLength: 0,
        clsIdx: [],
        clsType: '0'
    };

    // Do I need to loop through our cells?
    // Attempt without looping through cells
    let idxArr = clsMoves[clsMoves.length - 1];
    for(let i = idxArr[1]; i < board.length; i++) {
        if(board[idxArr[0]][i] == 'B') {
            counterCLS++;
            tempArr.push([idxArr[0], i]);
        }
        else if(board[idxArr[0]][i] != 'B') {
            if(board[idxArr[0]][i] == 'W')
                blockRight = true;
            break;    
        }
    }

    for(let i = idxArr[1] - 1; i >= 0; i--) {
        if(board[idxArr[0]][i] == 'B') {
            counterCLS++;
            tempArr.push([idxArr[0], i]);
        }
        else if(board[idxArr[0]][i] != 'B') {
            if(board[idxArr[0]][i] ==  'W')
                blockLeft = true;
            break;
        }
    }

    // If both left and right are blocked then it is not a
    // valid PLS. Reset counters and idx array

    if(blockLeft && blockRight) {
        counterCLS = 0;
        objCLS.clsIdx = [];
    }

    // Reset our flags for the next check
    blockLeft = false, blockRight = false;
    // Our store our counter pls
    maxCLS = counterCLS;
    // In case our array has duplicates, filter it
    objCLS.clsIdx = filterArray(tempArr);
    objCLS.clsType = 'R'

    // Since we are checking our columns now reset 
    counterCLS = 0;
    tempArr = [];
    for(let i = idxArr[0]; i < board.length; i++) {
        if(board[i][idxArr[1]] == 'B') {
            counterCLS++;
            tempArr.push([i, idxArr[1]]);
        }
        else if(board[i][idxArr[1]] != 'B') {
            if(board[i][idxArr[1]] == 'W')
                blockLeft = true;
            break;
        }
    }

    for(let i = idxArr[0] - 1; i >= 0; i--) {
        if(board[i][idxArr[1]] == 'B') {
            counterCLS++;
            tempArr.push([i, idxArr[1]]);
        }
        else if(board[i][idxArr[1]] != 'B') {
            if(board[i][idxArr[1]] == 'W')
                blockRight = true;
            break;
        }
    }

    if(blockLeft && blockRight) {
        counterCLS = 0;
        objCLS.clsIdx = [];
    }
    
    if(maxCLS < counterCLS) {
        maxCLS = counterCLS;
        objCLS.clsIdx = filterArray(tempArr);
        objCLS.clsType = 'C'
    }
    
    blockLeft = false, blockRight = false;
    tempArr = [];
    counterCLS = 0;
    for(let i = idxArr[0], j = idxArr[1]; i < board.length; i++, j--) {
        if(board[i][j] == 'B') {
            counterCLS++;
            tempArr.push([i, j]);
        }
        else if(board[i][j] != 'B') {
            if(board[i][j] == 'W')
                blockLeft = true;
            break;
        }
    }
    for(let i = idxArr[0] - 1, j = idxArr[1] + 1; i >= 0; i--, j++) {
        if(board[i][j] == 'B') {
            counterCLS++;
            tempArr.push([i, j]);
        }
            else if(board[i][j] != 'B') {
                if(board[i][j] == 'W')
                    blockRight = true;
                break;
        }
    }
    if(blockLeft && blockRight) {
        counterCLS = 0;
        objCLS.plsIdx = [];
    }
    if(maxCLS < counterCLS) {
        maxCLS = counterCLS;
        objCLS.plsIdx = filterArray(tempArr);
        objCLS.plsType = 'D'
    }
    
    blockLeft = false, blockRight = false;
    tempArr = [];
    counterCLS = 0;
    for(let i = idxArr[0], j = idxArr[1]; i >= 0; i--, j--) {
        if(board[i][j] == 'B') {
            counterCLS++;
            tempArr.push([i, j]);
        }
        else if(board[i][j] != 'B') {
            if(board[i][j] == 'W')
                blockLeft = true;
            break;
        }
    }
    for(let i = idxArr[0] + 1, j = idxArr[1] + 1; i < board.length; i++, j++) {
        if(board[i][j] == 'B') {
            counterCLS++;
            tempArr.push([i, j]);
        }
        else if(board[i][j] != 'B') {
            if(board[i][j] == 'W')
                blockRight = true;
            break;
        }
    }
    if(blockLeft && blockRight) {
        counterCLS = 0;
        objCLS.clsIdx = [];
    }
    if(maxCLS < counterCLS) {
        maxCLS = counterCLS;
        objCLS.clsIdx = filterArray(tempArr);
        objCLS.clsType = 'AD'
    }  
    blockLeft = false, blockRight = false;
    objCLS.clsLength = maxCLS;
    objCLS.clsIdx = objCLS.clsIdx.sort();
    return objCLS;
}
// The defensive move the CPU can perform
function defensiveAction() {
    // Begin by getting the current pls
    let plsObj = plsCache[plsCache.length - 1];
    // Isolate the array of indices for ease of access
    let plsArr = plsObj.plsIdx;
    console.log(plsObj);

    // Switch to check what type pls is.
    switch(plsObj.plsType) {
        // If the pls is a row
        case 'R':
            // Begin by sorting the array of indices so that the y axis is in ascending order
            plsArr = plsArr.sort((a,b) => a[1] - b[1]);
            // We are only concerned with the first and last indices of the pls, because we
            // must block on either end
            let left = plsArr[0];
            let right = plsArr[plsArr.length - 1];
            // Begin by prioritizing the left side of the pls. If the tile left of pls is null
            if(board[left[0]][left[1] - 1] == null) {
                // Set the left tile to null
                board[left[0]][left[1] - 1] = 'B';
                // Render that tile
                render2([left[0], left[1] - 1]);
                // Push that move into the clsCache so the computer can retrieve its cls
                clsMoves.push([left[0], left[1] - 1]);
            // If the left side is already blocked, go right
            } else if(board[right[0]][right[1] + 1] == null) {
                board[right[0]][right[1] + 1] = 'B';
                render2([right[0], right[1] + 1]);
                clsMoves.push([right[0], right[1] + 1]);
            }
            break;
        // If the pls type is a column
        case 'C':
            // Sort the indices by the x axis in ascending order
            plsArr = plsArr.sort((a,b) => a[0] - b[0]);
            let top = plsArr[0];
            let bottom = plsArr[plsArr.length - 1];
            if(board[top[0] - 1][top[1]] == null) {
                board[top[0] - 1][top[1]] = 'B';
                render2([top[0] - 1, top[1]]);
                clsMoves.push([top[0] - 1, top[1]]);
            } else if(board[bottom[0] + 1][bottom[1]] == null) {
                board[bottom[0] + 1][bottom[1]] = 'B';
                render2([bottom[0] + 1, bottom[1]]);
                clsMoves.push([bottom[0] + 1, bottom[1]]);
            }
            break;
        // If the type is an anti-diagonal
        case 'AD':
            // Sort the indices by the x axis in ascending order
            plsArr = plsArr.sort((a,b) => a[0] - b[0]);
            let topLeft = plsArr[0];
            let bottomRight = plsArr[plsArr.length - 1];
            if(board[topLeft[0] - 1][topLeft[1] - 1] == null) {
                board[topLeft[0] - 1][topLeft[1] - 1] = 'B';
                render2([[topLeft[0] - 1], [topLeft[1] - 1]]);
                clsMoves.push([topLeft[0] - 1, topLeft[1] - 1]);
            } else if(board[bottomRight[0] + 1][bottomRight[1] + 1] == null) {
                board[bottomRight[0] + 1][bottomRight[1] + 1] = 'B';
                render2([[bottomRight[0] + 1], [bottomRight[1] + 1]]);
                clsMoves.push([bottomRight[0] + 1, bottomRight[1] + 1]);
            }
            break;
        // If the type is a diagonal
        case 'D':
            // Sort the indices by the x axis in ascending order
            plsArr = plsArr.sort((a,b) => a[0] - b[0]);
            let topRight = plsArr[0];
            let bottomLeft = plsArr[plsArr.length - 1];
            if(board[topRight[0] - 1][topRight[1] + 1] == null) {
                board[topRight[0] - 1][topRight[1] + 1] = 'B';
                render2([[topRight[0] - 1],[topRight[1] + 1]]);
                clsMoves.push([topRight[0] - 1,topRight[1] + 1]);
            } else if(board[bottomLeft[0] + 1][bottomLeft[1] - 1] == null) {
                board[bottomLeft[0] + 1][bottomLeft[1] - 1] = 'B';
                render2([bottomLeft[0] + 1,bottomLeft[1] - 1]);
                clsMoves.push([bottomLeft[0] + 1,bottomLeft[1] - 1]);
            }
            break;
    }
}
// COMPLETELY DEPENDANT ON GETCLS
function agressiveAction() {
    let clsObj = clsCache[clsCache.length - 1];
    let clsArr = clsObj.clsIdx;
    console.log('??')
    switch(clsObj.clsType) {
        case 'undefined':
            console.log('i fucked up')
            break;
        case 'R':

            clsArr = clsArr.sort((a,b) => a[1] - b[1]);
            let left = clsArr[0];
            let right = clsArr[clsArr.length - 1];
            if(board[left[0]][left[1] - 1] == null) {
                board[left[0]][left[1] - 1] = 'B';
                checkBlackWin(left[0], left[1] - 1)
                render2([left[0], left[1] - 1]);
                clsCache.push(getCLS());
            } else if(board[right[0]][right[1] + 1] == null) {
                board[right[0]][right[1] + 1] = 'B';
                checkBlackWin(left[0], left[1] + 1)
                render2([right[0], right[1] + 1]);
                clsCache.push(getCLS());
            } 
            break;
        case 'C':
            clsArr = clsArr.sort((a,b) => a[0] - b[0]);
            let top = clsArr[0];
            let bottom = clsArr[clsArr.length - 1];
            if(board[top[0] - 1][top[1]] == null) {
                board[top[0] - 1][top[1]] = 'B';
                checkBlackWin(top[0] + 1, top[1])
                render2([top[0] - 1, top[1]]);
                clsCache.push(getCLS());
            } else if(board[bottom[0] + 1][bottom[1]] == null) {
                board[bottom[0] + 1][bottom[1]] = 'B';
                checkBlackWin(top[0] + 1, top[1])
                render2([bottom[0] + 1, bottom[1]]);
                clsCache.push(getCLS());
            }
            break;
        case 'AD':
            clsArr = clsArr.sort((a,b) => a[0] - b[0]);
            let topLeft = clsArr[0];
            let bottomRight = clsArr[clsArr.length - 1];
            if(board[topLeft[0] - 1][topLeft[1] - 1] == null) {
                board[topLeft[0] - 1][topLeft[1] - 1] = 'B';
                checkBlackWin([topLeft[0] - 1], [topLeft[1] - 1])
                render2([[topLeft[0] - 1], [topLeft[1] - 1]]);
                clsCache.push(getCLS());
            } else if(board[bottomRight[0] + 1][bottomRight[1] + 1] == null) {
                board[bottomRight[0] + 1][bottomRight[1] + 1] = 'B';
                checkBlackWin([topLeft[0] + 1], [topLeft[1] + 1])
                render2([[bottomRight[0] + 1], [bottomRight[1] + 1]]);
                clsCache.push(getCLS());
            }
            break;
        case 'D':
            clsArr = clsArr.sort((a,b) => a[0] - b[0]);
            let topRight = clsArr[0];
            let bottomLeft = clsArr[clsArr.length - 1];
            if(board[topRight[0] - 1][topRight[1] + 1] == null) {
                board[topRight[0] - 1][topRight[1] + 1] = 'B';
                checkBlackWin([topRight[0] - 1], [topRight[1] + 1])
                render2([[topRight[0] - 1], [topRight[1] + 1]]);
                clsCache.push(getCLS());
            } else if(board[bottomLeft[0] + 1][bottomLeft[1] - 1] == null) {
                board[bottomLeft[0] + 1][bottomLeft[1] - 1] = 'B';
                checkBlackWin([bottomLeft[0] + 1, bottomLeft[1] - 1])
                render2([[bottomLeft[0] + 1, bottomLeft[1] - 1]]);
                clsCache.push(getCLS());
            }
            break;
    }
}