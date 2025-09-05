<script>
  export let skillId = '';
  export let targetLevel = 1;
  export let linkTo = '';
  export let isComplete = false;

  const levelColors = {
    1: '#4caf50',
    2: '#ff9800', 
    3: '#f44336'
  };
</script>

<span class="skill-chip" class:complete={isComplete}>
  <span class="skill-name">{skillId}</span>
  <span class="level" style="background-color: {levelColors[targetLevel]}">
    L{targetLevel}
  </span>
  {#if linkTo}
    <a href={linkTo} class="review-link">review</a>
  {/if}
</span>

<style>
  .skill-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 16px;
    padding: 0.25rem 0.75rem;
    margin: 0.25rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }
  
  .skill-chip:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .skill-chip.complete {
    background: #e8f5e8;
    border-color: #4caf50;
  }
  
  .skill-name {
    font-weight: 500;
  }
  
  .level {
    color: white;
    padding: 0.125rem 0.375rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: bold;
  }
  
  .review-link {
    color: #1976d2;
    text-decoration: none;
    font-size: 0.75rem;
  }
  
  .review-link:hover {
    text-decoration: underline;
  }
</style>