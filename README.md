#오목

Omok, 오목, Chinese Checkers, GO, is an abstract strategy board game. The rule is simple. First player to have 5 pieces in a row wins.

## Design:

* 19 x 19 grid design

* Simplistic design, with a 'restaurant' menu to the left. 

## Features:
* Win Logic
* Keeps track of current player
* Declares winner and disables timer and game upon win
* New game button
* Choose to replay the last 5, 10, 15, or all moves
* CPU opponent

## Version:
0.9 → Alpha Build

## Implementation:
Two key algorithms

**Win Logic Algorithm**

* Similar to Tic-Tac-Toe we are checking for a line of *n* pieces. However Omok is different in that the *n* pieces required for a win do not need to equal the length/width of the board. This introduces a completely different challenge than Tic-Tac-Toe.
* The algorithm design is simple → 
  1. When a player chooses a cell 𝓐[𝔁, 𝔂] we need to check if the row, column, diagonal, and anti-diagonal is equal to a length of 5. 
  2. Pursuing the naive implementation of counting instances of *B* or *W* will lead to false positives. For example if 𝓐[𝔁, 𝔂] has 5 *B*'s present in column 𝔂<sub>𝓷</sub> to 𝔂<sub>𝓷+6</sub> but is interrupted by a *W* or a *NIL*, it will return a false win.
  3. To remedy this issue, we perform a linear scan starting 𝓐[𝔁, 𝔂] to *NIL* for all columns, rows, and diagonals. If the counter at any point reaches 5, we immediately return a winner.
  4. If during the linear scan, we are interrupted by a *NIL* or the second player's piece we immediately break and perform a linear scan backwards. For example if checking a row at 𝓐[𝔁, 𝔂] we begin by scanning 𝓐[𝔁, 𝔂] to 𝓐[𝔁, 𝔂<sub>𝓷+𝓲</sub>] until we either reach 5 or are interrupted. If we are interrupted we then perform a linear scan backwards 𝓐[𝔁, 𝔂<sub>𝓷-𝓲</sub>] until iterruption. If we still have not returned a winner, we then perform the same check on the column and diagonals.
  5. In the worst case that a piece does not have a winner at 4 pieces in all diagonals, column, and row, the algorithm has a time complexity of 𝒪(4𝓷 - 60). Although the algorithm initially seems to have a long run time due to the length of its implementation, it is relatively fast, due to the fact that we break out of each loop early if it is not a valid placement. The worst case only occurs when we have to check every possible combination and fail to return a winner with each counter ending at 4. 

**CPU Algorithm**

* The CPU algorithm is relatively simple in conception, but was difficult during implementation. The current CPU algorithm is designed to be 'competent', not impossible to beat. 
* The rules for it's implementation are as follows → 
  1. When a player places a piece, scan the board.
  2. If during the scan the Player's Longest Sequence(PLS) is greater than the Computer's Longest Sequnce(CLS) and is not completely blocked call the `defensiveAction()` algorithm. 
   * The `defensiveAction()` algorithm places a piece at either end of the PLS.
  3. If the CLS is greater than the PLS, call the `agressiveAction()` algorithm.
   * The `agressiveAction()` algorithm places a piece at either end of CLS.
