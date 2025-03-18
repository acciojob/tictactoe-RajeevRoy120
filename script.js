//your JS code here. If required.
 let board = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer = 'X';
        let players = {};
        
        document.getElementById("start").addEventListener("click", () => {
            const p1 = document.getElementById("player-1").value;
            const p2 = document.getElementById("player-2").value;
            if (!p1 || !p2) return alert("Enter both player names!");
            
            players = { X: p1, O: p2 };
            document.querySelector(".message").innerText = `${players[currentPlayer]}, you're up!`;
            document.getElementById("board").style.display = "grid";
            startGame();
        });
        
        function startGame() {
            const boardElement = document.getElementById("board");
            boardElement.innerHTML = '';
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            
            for (let i = 0; i < 9; i++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = i;
                cell.addEventListener("click", handleMove);
                boardElement.appendChild(cell);
            }
        }
        
        function handleMove(event) {
            let index = event.target.dataset.index;
            if (board[index]) return;
            
            board[index] = currentPlayer;
            event.target.innerText = currentPlayer;
            
            if (checkWin()) {
                document.querySelector(".message").innerText = `${players[currentPlayer]} wins!`;
                return;
            }
            
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.querySelector(".message").innerText = `${players[currentPlayer]}, you're up!`;
        }
        
        function checkWin() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winPatterns.some(pattern =>
                pattern.every(index => board[index] === currentPlayer)
            );
        }