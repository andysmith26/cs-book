<!-- projects/game-of-sticks/components/GameBoard.svelte -->
<script>
  import { learningProgress } from '$lib/stores/learning-progress.js';

  let { onGameEnd = () => {}, recordInteraction = () => {} } =
    $props();

  // All state using $state
  let sticks = $state(21);
  let gameOver = $state(false);
  let winner = $state('');
  let playerTurn = $state(true);
  let gameHistory = $state([]);
  let aiMode = $state('random'); // 'random', 'smart', 'learning'
  let aiMemory = $state({});

  // Derived values using $derived
  let canTake1 = $derived(sticks >= 1 && playerTurn && !gameOver);
  let canTake2 = $derived(sticks >= 2 && playerTurn && !gameOver);
  let canTake3 = $derived(sticks >= 3 && playerTurn && !gameOver);
  let winRate = $derived.by(() => {
    const won = gameHistory.filter(
      (g) => g.winner === 'human'
    ).length;
    const total = gameHistory.filter((g) => g.winner).length;
    return total > 0 ? ((won / total) * 100).toFixed(1) : 0;
  });

  // Pattern detection (key learning insight)
  let patternDetected = $derived.by(() => {
    const lastThreeGames = gameHistory.slice(-3);
    if (lastThreeGames.length < 3) return null;

    // Check if player discovered the mod 4 pattern
    const playerMovesOptimal = lastThreeGames.every((game) => {
      return game.moves?.some(
        (m) =>
          m.player === 'human' &&
          (m.previousSticks - m.took - 1) % 4 === 0
      );
    });

    return playerMovesOptimal ? 'modulo-4' : null;
  });

  // Effect to track pattern discovery
  $effect(() => {
    if (patternDetected && !gameHistory.patternRecorded) {
      recordInteraction('pattern-discovered', {
        pattern: patternDetected,
        afterGames: gameHistory.length,
        isDiscovery: true,
      });
      gameHistory.patternRecorded = true;
    }
  });

  function playerMove(take) {
    if (!canTake(take)) return;

    const move = {
      player: 'human',
      took: take,
      previousSticks: sticks,
      remaining: sticks - take,
    };

    sticks -= take;
    gameHistory = [...gameHistory, { ...move }];

    recordInteraction('player-move', {
      take,
      remaining: sticks,
      calculation: `${move.previousSticks} - ${take} = ${sticks}`,
    });

    if (sticks <= 0) {
      endGame('AI');
    } else {
      playerTurn = false;
      setTimeout(aiMove, 1000);
    }
  }

  function canTake(n) {
    return !gameOver && playerTurn && n >= 1 && n <= 3 && n <= sticks;
  }

  function aiMove() {
    if (gameOver) return;

    let aiTake;
    switch (aiMode) {
      case 'smart':
        // Optimal strategy
        aiTake = sticks % 4 || 1;
        if (aiTake > 3) aiTake = 1;
        break;
      case 'learning':
        aiTake =
          getLearnedMove() ||
          Math.floor(Math.random() * Math.min(3, sticks)) + 1;
        break;
      default:
        aiTake = Math.floor(Math.random() * Math.min(3, sticks)) + 1;
    }

    sticks -= aiTake;
    gameHistory = [
      ...gameHistory,
      {
        player: 'ai',
        took: aiTake,
        previousSticks: sticks + aiTake,
        remaining: sticks,
      },
    ];

    if (sticks <= 0) {
      endGame('Player');
      updateAiMemory(false);
    } else {
      updateAiMemory(true);
      playerTurn = true;
    }
  }

  function getLearnedMove() {
    const key = sticks.toString();
    if (!aiMemory[key]?.length) return null;

    return aiMemory[key].reduce((best, current) =>
      current.wins / current.tries > best.wins / best.tries
        ? current
        : best
    ).move;
  }

  function updateAiMemory(success) {
    // Implementation stays similar but uses new state
  }

  function endGame(winnerName) {
    winner = winnerName;
    gameOver = true;
    onGameEnd({ winner: winnerName, moves: gameHistory });
  }

  function resetGame() {
    sticks = 21;
    gameOver = false;
    winner = '';
    playerTurn = true;
    gameHistory = [];
  }
</script>

<!-- Using snippets for reusable UI patterns -->
{#snippet stickVisual(count)}
  <div class="sticks-visual">
    {#each Array(Math.min(count, 21)) as _, i}
      <span class="stick" style="animation-delay: {i * 30}ms">|</span>
    {/each}
  </div>
{/snippet}

{#snippet moveButton(num)}
  <button
    onclick={() => playerMove(num)}
    disabled={!canTake(num)}
    class="move-btn"
  >
    Take {num}
  </button>
{/snippet}

<div class="game-board">
  <header class="game-header">
    <h3>Game of Sticks</h3>
    <select bind:value={aiMode} onchange={resetGame}>
      <option value="random">Random AI</option>
      <option value="smart">Smart AI (Optimal)</option>
      <option value="learning">Learning AI</option>
    </select>
    {#if winRate > 0}
      <span class="win-rate">Win Rate: {winRate}%</span>
    {/if}
  </header>

  <div class="game-state">
    <div class="sticks-display">
      <div class="sticks-count">
        Sticks: <strong>{sticks}</strong>
        {#if patternDetected}
          <span class="pattern-badge">Pattern Found! 🎯</span>
        {/if}
      </div>
      {@render stickVisual(sticks)}
    </div>

    {#if gameOver}
      <div class="game-over">
        <h4>{winner} wins!</h4>
        <button onclick={resetGame}>Play Again</button>
      </div>
    {:else if playerTurn}
      <div class="player-controls">
        <p>Your turn!</p>
        <div class="move-buttons">
          {@render moveButton(1)}
          {@render moveButton(2)}
          {@render moveButton(3)}
        </div>
      </div>
    {:else}
      <div class="ai-thinking">AI is thinking...</div>
    {/if}
  </div>
</div>

<style>
  /* Styles remain similar but with animations */
  .stick {
    display: inline-block;
    animation: dropIn 0.3s ease-out forwards;
    opacity: 0;
  }

  @keyframes dropIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .pattern-badge {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    margin-left: 0.5rem;
    font-size: 0.875rem;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
</style>
