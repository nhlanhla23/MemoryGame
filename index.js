const emojis = ["😄","😄","🧑","🧑","😠","😠","💗","💗","🐞","🐞","🐤","🐤","👶","👶","🚕","🚕","🚩","🚩","💃","💃"];
var shuf_emojis = emojis.slice().sort(() => Math.random() - 0.5);
var selectedCards = [];
var playerCount = 1; // Default to 1 player
var currentPlayer = 1; // Default to player 1

document.getElementById('playerCount').addEventListener('change', function() {
  playerCount = parseInt(this.value);
  resetGame();
});

function resetGame() {
  selectedCards = [];
  currentPlayer = 1; // Reset current player to 1
  document.querySelector('.game').innerHTML = ''; // Clear the game board
  document.getElementById('currentPlayer').textContent = `Player ${currentPlayer}'s turn`;
  document.getElementById('message').textContent = ''; // Clear the message

  for (var i = 0; i < shuf_emojis.length * playerCount; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuf_emojis[i % shuf_emojis.length];
    box.addEventListener('click', handleCardClick);
    document.querySelector('.game').appendChild(box);
  }
}

function handleCardClick() {
  if (selectedCards.length < 2) {
    this.classList.add('boxOpen');
    selectedCards.push(this);

    if (selectedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [firstCard, secondCard] = selectedCards;

  if (firstCard.innerHTML === secondCard.innerHTML) {
    // Matched
    selectedCards = [];
  } else {
    // Not matched, close the cards
    selectedCards.forEach(card => card.classList.remove('boxOpen'));
    selectedCards = [];
    currentPlayer = currentPlayer % playerCount + 1; // Switch to the next player
    document.getElementById('currentPlayer').textContent = `Player ${currentPlayer}'s turn`;

    // Display a message indicating the turn of the other player
    document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Initialize the game with default settings
resetGame();