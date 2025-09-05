<script>
  import { createEventDispatcher } from 'svelte';
  
  export let criterion = {};
  
  const dispatch = createEventDispatcher();
  
  function handleViewSkill() {
    dispatch('viewSkill', { skillId: criterion.skillId });
  }
</script>

<div class="rubric-row">
  <div class="description">
    <p>{criterion.description}</p>
    {#if criterion.skillId}
      <button 
        class="skill-link" 
        on:click={handleViewSkill}
        type="button"
      >
        View skill: {criterion.skillId}
      </button>
    {/if}
  </div>
  
  <div class="points">
    <span class="points-value">{criterion.points || 0} pts</span>
    {#if criterion.levelTarget}
      <span class="level-target">Level {criterion.levelTarget}</span>
    {/if}
  </div>
</div>

<style>
  .rubric-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    background: #fafafa;
  }
  
  .description {
    flex: 1;
    margin-right: 1rem;
  }
  
  .description p {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  .skill-link {
    background: none;
    border: none;
    color: #1976d2;
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.875rem;
    padding: 0;
  }
  
  .skill-link:hover {
    color: #1565c0;
  }
  
  .points {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }
  
  .points-value {
    font-weight: bold;
    color: #333;
    font-size: 1.125rem;
  }
  
  .level-target {
    background: #e3f2fd;
    color: #1565c0;
    padding: 0.125rem 0.375rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }
</style>