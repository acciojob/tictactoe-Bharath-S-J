//your JS code here. If required.
const submitBtn = document.getElementById('submit');
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const gameArea = document.querySelector('.game-area');
    const messageDiv = document.querySelector('.message');
    const boardDiv = document.getElementById('board');

    let player1 = "", player2 = "";
    let currentPlayer = "X";
    let players = {};
    let board = Array(9).fill("");

    const winningCombinations = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diagonals
    ];

    function renderBoard() {
      boardDiv.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", i + 1);
        cell.textContent = board[i];
        cell.addEventListener("click", () => handleMove(i));
        boardDiv.appendChild(cell);
      }
    }


    function handleMove(index) {
      if (board[index] !== "") return;

      board[index] = currentPlayer;
      renderBoard();

      if (checkWin()) {
        messageDiv.textContent = `${players[currentPlayer]}, congratulations you won!`;
        boardDiv.querySelectorAll(".cell").forEach(cell => cell.style.pointerEvents = "none");
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      messageDiv.textContent = `${players[currentPlayer]}, you're up`;
    }

    function checkWin() {
      return winningCombinations.some(comb => 
        comb.every(i => board[i] === currentPlayer)
      );
    }

    submitBtn.addEventListener("click", () => {
      player1 = player1Input.value.trim();
      player2 = player2Input.value.trim();

      if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
      }

      players = { X: player1, O: player2 };
      currentPlayer = "X";
      board = Array(9).fill("");
      document.querySelector('.input-area').classList.add("hidden");
      gameArea.classList.remove("hidden");
      messageDiv.textContent = `${players[currentPlayer]}, you're up`;
      renderBoard();
    });