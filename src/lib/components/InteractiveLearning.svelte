<!-- src/lib/components/InteractiveLearning.svelte -->
<script>
  import { learningProgress } from '$lib/stores/learning-progress.js';

  let {
    projectId = '',
    conceptId = '',
    mode = 'explore', // explore | practice | assess
  } = $props();

  let interactions = $state([]);
  let currentHypothesis = $state('');
  let showHints = $state(false);

  // Derived state using $derived
  let interactionCount = $derived(interactions.length);
  let hasDiscovery = $derived(
    interactions.some((i) => i.type === 'discovery')
  );

  // Effects using $effect
  $effect(() => {
    if (interactions.length > 0) {
      const lastInteraction = interactions[interactions.length - 1];
      learningProgress.recordExploration(
        projectId,
        lastInteraction.action,
        lastInteraction.result
      );
    }
  });

  function recordInteraction(action, result) {
    interactions = [
      ...interactions,
      {
        action,
        result,
        timestamp: Date.now(),
        type: result.isDiscovery ? 'discovery' : 'exploration',
      },
    ];
  }
</script>

<!-- Using snippets instead of slots for more flexibility -->
{#snippet instructions()}
  <div class="instructions">
    {#if mode === 'explore'}
      <p>🔍 Explore freely. What patterns do you notice?</p>
    {:else if mode === 'practice'}
      <p>💪 Apply what you've learned</p>
    {:else}
      <p>📊 Show your understanding</p>
    {/if}
  </div>
{/snippet}

{#snippet reflectionPrompt()}
  {#if hasDiscovery}
    <div class="discovery-prompt">
      <h3>🎉 You made a discovery!</h3>
      <textarea
        bind:value={currentHypothesis}
        placeholder="What pattern did you find? Why do you think it works?"
      />
    </div>
  {/if}
{/snippet}

<div class="interactive-learning" data-project={projectId}>
  {@render instructions()}

  <div class="learning-area">
    <div class="stats">
      Explorations: {interactionCount}
      {#if hasDiscovery}
        <span class="badge">✨ Discovery Made</span>
      {/if}
    </div>

    <!-- Child components go here -->
    {#if $$slots.interactive}
      <slot name="interactive" {recordInteraction} />
    {:else}
      <p>Interactive component will load here</p>
    {/if}
  </div>

  {@render reflectionPrompt()}

  <button onclick={() => (showHints = !showHints)}>
    {showHints ? 'Hide' : 'Show'} Hints
  </button>
</div>

<style>
  .interactive-learning {
    display: grid;
    gap: 1rem;
  }
  .learning-area {
    min-height: 400px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1rem;
    position: relative;
  }
  .stats {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 0.875rem;
    color: #666;
  }
  .badge {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    margin-left: 0.5rem;
  }
  .discovery-prompt {
    background: #f0f9ff;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
  }
  textarea {
    width: 100%;
    min-height: 100px;
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
  }
</style>
