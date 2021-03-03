import { useState } from 'react'
import Swal from 'sweetalert2'

export default function useTicTacToeController() {
    const [firstime, setFirstime] = useState(true)
    const [update, setUpdate] = useState(false)
    const [aI, setAI] = useState(2)

    function selectedItem(e, game, winnerButtons, setwinnerButtons, playerWins, setPlayerWins, aIWins, setAIWins) {
        const selectedItem = e.target.id;
        game[selectedItem] = aI === 1 ? 'O' : 'X'

        // AI's turn, if the game is not over
        if (!isGameOver(game))
            aIsTurn(game)

        if (isGameOver(game)) {
            if (isATieGame(game))
                sendMessage(true, null, game, setwinnerButtons);
            else {
                let winner = getWinner(game);
                if (winner === aI)
                    setAIWins(aIWins + 1)
                else
                    setPlayerWins(playerWins + 1)
                // Show the buttons that won
                colorWinners(game, winnerButtons)
                sendMessage(false, winner, game, setwinnerButtons)
            }
        }
        setUpdate(!update)
    }

    function colorWinners(game, winnerButtons) {
        for (let i = 0; i < 3; i++) {
            if (game[i * 3] === game[(i * 3) + 1] && game[(i * 3) + 1] === game[(i * 3) + 2]
                && game[i * 3]) {
                winnerButtons.push(i * 3)
                winnerButtons.push((i * 3) + 1)
                winnerButtons.push((i * 3) + 2)
            }

            if (game[i] === game[i + 3] && game[i + 3] === game[i + 6] && game[i]) {
                winnerButtons.push(i)
                winnerButtons.push(i + 3)
                winnerButtons.push(i + 6)
            }
        }

        // Check for the diagonals
        if (game[0] === game[4] && game[4] === game[8] && game[0]) {
            winnerButtons.push(0)
            winnerButtons.push(4)
            winnerButtons.push(8)
        }

        if (game[2] === game[4] && game[4] === game[6] && game[2]) {
            winnerButtons.push(2)
            winnerButtons.push(4)
            winnerButtons.push(6)
        }
    }

    function aIsTurn(game) {
        let depth = 9;
        let bestValue = Number.MIN_SAFE_INTEGER;
        let bestPosition = -1;

        for (let i = 0; i < 9; i++) {
            if (game[i] !== null)
                continue;

            game[i] = aI === 1 ? 'X' : 'O'
            let value = minMaxAI(game, depth, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, false);
            // Remove the try
            game[i] = null;
            if (value > bestValue) {
                bestValue = value;
                bestPosition = i;
            }
        }
        game[bestPosition] = aI === 1 ? 'X' : 'O'
    }

    function isGameOver(game) {
        return isATieGame(game) || getWinner(game) != null;
    }

    function isATieGame(game) {
        // Check if all the spaces are completed
        let complete = true;
        for (let i = 0; i < 9; i++) {
            if (game[i] === null) {
                complete = false;
                break;
            }
        }

        return complete && getWinner(game) === null;
    }

    function getWinner(game) {
        // Check if anyone won in the vertical or horizontal
        for (let i = 0; i < 3; i++) {
            if (game[i * 3] === game[(i * 3) + 1] && game[(i * 3) + 1] === game[(i * 3) + 2]
                && game[i * 3])
                return game[i * 3] === "X" ? 1 : 2;

            if (game[i] === game[i + 3] && game[i + 3] === game[i + 6] && game[i])
                return game[i] === "X" ? 1 : 2;
        }

        // Check for the diagonals
        if (game[0] === game[4] && game[4] === game[8] && game[0])
            return game[0] === "X" ? 1 : 2;

        if (game[2] === game[4] && game[4] === game[6] && game[2])
            return game[2] === "X" ? 1 : 2;

        return null;
    }

    // Score = +1 (win) + depth (minimum plays to win); -1 (lose); 0 (Tie);
    // Note: Maximize = AI (Player 2)
    // Alpha = BestValue until now. Beta = Lower value
    function minMaxAI(game, depth, alpha, beta, maximize) {
        if (depth === 0)
            return 0;

        if (isGameOver(game)) {
            if (isATieGame(game))
                return 0;
            else if (getWinner(game) === aI)
                return 1 + depth;
            else
                return -1 - depth;
        }

        // Initializing bestPosition, as the opposite of its best
        let bestPosition = maximize ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < 9; i++) {
            // Value it's already set
            if (game[i] !== null)
                continue;

            // Player1 always X
            // Player2 always O
            let valueMax = aI === 1 ? 'X' : 'O';
            let valueMin = aI === 1 ? 'O' : 'X';

            game[i] = maximize ? valueMax : valueMin;
            // Change to opposite turn (MinMax)
            let value = minMaxAI(game, depth - 1, alpha, beta, maximize ? false : true);

            // Remove the recent play
            game[i] = null;

            // AI's turn
            if (maximize) {
                bestPosition = Math.max(value, bestPosition);
                alpha = Math.max(alpha, value);
                if (alpha >= beta)
                    break;
            }
            // Human's turn
            else {
                bestPosition = Math.min(value, bestPosition);
                beta = Math.min(beta, value);
                if (alpha >= beta)
                    break;
            }
        }
        return bestPosition;
    }

    function reset(game, setwinnerButtons) {
        for (let i = 0; i < 9; i++)
            game[i] = null;
        setwinnerButtons([])
    }

    function sendMessage(tie, winner, game, setwinnerButtons) {
        Swal.fire({
            title: tie ? 'Game over, tied' : (aI === winner ? 'I won!!' : 'Congratulations, you won!'),
            text: "Do you want to play again?",
            icon: aI === winner ? 'question' : 'success',
            showCancelButton: true,
            confirmButtonColor: 'green',
            confirmButtonText: 'Yes',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Not now',
        }).then((result) => {
            if (result.isConfirmed) {
                // if (firstime) {
                //     Swal.fire({
                //         icon: 'info',
                //         title: 'I will go first now',
                //         showConfirmButton: false,
                //         timer: 1500
                //     })
                //     setFirstime(false)
                // }
                reset(game, setwinnerButtons)
                // let aiValue = aI === 1 ? 2 : 1;
                // setAI(() => { aiValue })
                // if (aiValue === 1) {
                //     aIsTurn(game)
                //     setUpdate(!update)
                // }
            }
        })
    }

    return { selectedItem, reset }
}