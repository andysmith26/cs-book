<script>
  let sticks = 21;
  let gameOver = false;
  let winner = '';
  let playerTurn = true;
  let gameHistory = [];
  let aiMode = 'random'; // 'random', 'smart', 'learning'
  
  // Simple AI state
  let aiMemory = {}; // For learning AI
  
  function playerMove(take) {
    if (gameOver || !playerTurn || take < 1 || take > 3 || take > sticks) return;
    
    sticks -= take;
    gameHistory.push({ player: 'human', took: take, remaining: sticks });
    
    if (sticks <= 0) {
      winner = 'AI';
      gameOver = true;
      return;
    }
    
    playerTurn = false;
    
    // AI turn after a short delay
    setTimeout(() => {
      aiMove();
    }, 1000);
  }
  
  function aiMove() {
    if (gameOver) return;
    
    let aiTake;
    
    switch (aiMode) {
      case 'smart':
        // Optimal strategy: leave a multiple of 4
        aiTake = sticks % 4 || 1;
        if (aiTake > 3) aiTake = 1;
        break;
      case 'learning':
        // Simple learning: remember what worked
        aiTake = getLearnedMove() || (Math.floor(Math.random() * 3) + 1);
        break;
      default:
        // Random
        aiTake = Math.floor(Math.random() * Math.min(3, sticks)) + 1;
    }
    
    sticks -= aiTake;
    gameHistory.push({ player: 'ai', took: aiTake, remaining: sticks });
    
    if (sticks <= 0) {
      winner = 'Player';
      gameOver = true;
      updateAiMemory(false); // AI lost
    } else {
      updateAiMemory(true); // AI didn't lose this move
    }
    
    playerTurn = true;
  }
  
  function getLearnedMove() {
    const key = sticks.toString();
    if (aiMemory[key] && aiMemory[key].length > 0) {
      // Choose the move with the best success rate
      const bestMove = aiMemory[key].reduce((best, current) => 
        current.wins / current.tries > best.wins / best.tries ? current : best
      );
      return bestMove.move;
    }
    return null;
  }
  
  function updateAiMemory(success) {
    if (aiMode !== 'learning' || gameHistory.length === 0) return;
    
    const lastMove = gameHistory[gameHistory.length - 1];
    if (lastMove.player === 'ai') {
      const situation = (lastMove.remaining + lastMove.took).toString();
      
      if (!aiMemory[situation]) {
        aiMemory[situation] = [];
      }
      
      let moveRecord = aiMemory[situation].find(m => m.move === lastMove.took);
      if (!moveRecord) {
        moveRecord = { move: lastMove.took, wins: 0, tries: 0 };
        aiMemory[situation].push(moveRecord);
      }
      
      moveRecord.tries++;
      if (success) moveRecord.wins++;
    }
  }
  
  function resetGame() {
    sticks = 21;
    gameOver = false;
    winner = '';
    playerTurn = true;
    gameHistory = [];
  }
  
  function setAiMode(mode) {
    aiMode = mode;
    resetGame();
  }
</script>

<div class="game-board">
  <div class="game-header">
    <h3>Game of Sticks</h3>
    <div class="ai-controls">
      <label>
        AI Mode:
        <select bind:value={aiMode} on:change={() => resetGame()}>
          <option value="random">Random</option>
          <option value="smart">Smart (Optimal)</option>
          <option value="learning">Learning</option>
        </select>
      </label>
    </div>
  </div>
  
  <div class="game-state">
    <div class="sticks-display">
      <div class="sticks-count">Sticks remaining: <strong>{sticks}</strong></div>
      <div class="sticks-visual">
        {#each Array(Math.min(sticks, 21)) as _, i}
          <span class="stick">|</span>
        {/each}
      </div>
    </div>
    
    {#if gameOver}
      <div class="game-over">
        <h4>Game Over!</h4>
        <p><strong>{winner}</strong> wins!</p>
        <button on:click={resetGame}>Play Again</button>
      </div>
    {:else if playerTurn}
      <div class="player-controls">
        <p>Your turn! Take 1, 2, or 3 sticks:</p>
        <div class="move-buttons">
          <button 
            on:click={() => playerMove(1)} 
            disabled={sticks < 1}
            class="move-btn"
          >
            Take 1
          </button>
          <button 
            on:click={() => playerMove(2)} 
            disabled={sticks < 2}
            class="move-btn"
          >
            Take 2
          </button>
          <button 
            on:click={() => playerMove(3)} 
            disabled={sticks < 3}
            class="move-btn"
          >
            Take 3
          </button>
        </div>
      </div>
    {:else}
      <div class="ai-thinking">
        <p>AI is thinking...</p>
      </div>
    {/if}
  </div>
  
  {#if gameHistory.length > 0}
    <div class="game-history">
      <h4>Move History</h4>
      <div class="history-list">
        {#each gameHistory as move, i}
          <div class="history-item">
            <span class="player">{move.player === 'human' ? 'You' : 'AI'}</span>
            <span class="action">took {move.took} stick{move.took > 1 ? 's' : ''}</span>
            <span class="remaining">({move.remaining} left)</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  
  {#if aiMode === 'learning' && Object.keys(aiMemory).length > 0}
    <div class="ai-memory">
      <h4>AI Learning Progress</h4>
      <div class="memory-display">
        {#each Object.entries(aiMemory) as [situation, moves]}
          <div class="memory-item">
            <strong>When {situation} sticks:</strong>
            {#each moves as move}
              <span class="move-stats">
                Take {move.move}: {move.wins}/{move.tries} 
                ({Math.round(move.wins/move.tries*100)}% success)
              </span>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .game-board {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fafafa;
  }
  
  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .game-header h3 {
    margin: 0;
  }
  
  .ai-controls select {
    margin-left: 0.5rem;
    padding: 0.25rem;
  }
  
  .sticks-display {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .sticks-count {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .sticks-visual {
    font-family: monospace;
    font-size: 1.5rem;
    color: #8B4513;
    letter-spacing: 0.1em;
  }
  
  .stick {
    display: inline-block;
    margin: 0 1px;
  }
  
  .player-controls {
    text-align: center;
    margin: 1rem 0;
  }
  
  .move-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 0.5rem;
  }
  
  .move-btn {
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .move-btn:hover:not(:disabled) {
    background: #0056b3;
  }
  
  .move-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .ai-thinking {
    text-align: center;
    color: #666;
    font-style: italic;
  }
  
  .game-over {
    text-align: center;
    background: #e8f5e8;
    padding: 1rem;
    border-radius: 6px;
    margin: 1rem 0;
  }
  
  .game-over h4 {
    margin: 0 0 0.5rem 0;
    color: #2e7d32;
  }
  
  .game-over button {
    background: #4caf50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 0.5rem;
  }
  
  .game-history {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
  
  .game-history h4 {
    margin: 0 0 0.5rem 0;
  }
  
  .history-list {
    max-height: 200px;
    overflow-y: auto;
  }
  
  .history-item {
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem 0;
    font-size: 0.875rem;
  }
  
  .player {
    font-weight: 500;
    min-width: 30px;
  }
  
  .action {
    flex: 1;
  }
  
  .remaining {
    color: #666;
  }
  
  .ai-memory {
    margin-top: 1rem;
    padding: 1rem;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #ddd;
  }
  
  .ai-memory h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  .memory-item {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }
  
  .move-stats {
    display: inline-block;
    margin-left: 1rem;
    color: #666;
  }
</style>