//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function() {
            let player1 = document.getElementById("player-1").value;
            let player2 = document.getElementById("player-2").value;
            if (player1 && player2) {
                document.querySelector(".message").innerText = player1 + ", you're up";
                document.getElementById("board").style.display = "grid";
                game(player1, player2);
            } else {
                alert("Please enter names for both players.");
            }
        });

        function game(player1, player2) {
            let currentPlayer = player1;
            let symbol = "X";
            let board = Array(9).fill(null);
            let cells = document.querySelectorAll(".cell");
            
            cells.forEach((cell, index) => {
                cell.addEventListener("click", function() {
                    if (!board[index]) {
                        board[index] = symbol;
                        cell.innerText = symbol;
                        if (checkWin(board, symbol)) {
                            document.querySelector(".message").innerText = `${currentPlayer} congratulations you won!`;
                            cells.forEach(cell => cell.style.pointerEvents = "none");
                            return;
                        }
                        symbol = symbol === "X" ? "O" : "X";
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                        document.querySelector(".message").innerText = `${currentPlayer}, you're up`;
                    }
                });
            });
        }

        function checkWin(board, symbol) {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winPatterns.some(pattern => pattern.every(index => board[index] === symbol));
        }