<script>
  import { createEventDispatcher } from 'svelte';
  
  export let requiredSkills = [];
  
  const dispatch = createEventDispatcher();
  
  let skillChecks = {};
  let allComplete = false;
  
  // Initialize checks from localStorage
  const storageKey = 'preflight-checks';
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      skillChecks = JSON.parse(saved);
    }
  }
  
  $: {
    allComplete = requiredSkills.every(skill => skillChecks[skill.skillId]);
    if (allComplete) {
      dispatch('complete');
    }
  }
  
  function updateCheck(skillId, checked) {
    skillChecks[skillId] = checked;
    skillChecks = { ...skillChecks };
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(skillChecks));
    }
  }
</script>

<div class="preflight-section">
  <h3>Preflight Check: Required Skills</h3>
  <p>Make sure you're ready by reviewing these required skills. Check off each skill when you feel confident.</p>
  
  <div class="skills-list">
    {#each requiredSkills as skill}
      <label class="skill-item">
        <input 
          type="checkbox" 
          bind:checked={skillChecks[skill.skillId]}
          on:change={() => updateCheck(skill.skillId, skillChecks[skill.skillId])}
        />
        <span class="skill-info">
          <span class="skill-name">{skill.skillId}</span>
          <span class="skill-level">Level {skill.level}</span>
        </span>
        <a href="/skills/{skill.skillId}" class="review-link">Review</a>
      </label>
    {/each}
  </div>
  
  {#if allComplete}
    <div class="completion-message">
      ✓ All skills checked! You're ready to begin the project.
    </div>
  {:else}
    <div class="progress-message">
      Check off all skills above when you're ready to proceed.
    </div>
  {/if}
</div>

<style>
  .preflight-section {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
  }
  
  .preflight-section h3 {
    margin: 0 0 1rem 0;
    color: #495057;
  }
  
  .preflight-section p {
    margin: 0 0 1.5rem 0;
    color: #6c757d;
  }
  
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .skill-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    background: white;
    border-radius: 6px;
    border: 1px solid #e9ecef;
  }
  
  .skill-item input[type="checkbox"] {
    margin: 0;
  }
  
  .skill-info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .skill-name {
    font-weight: 500;
    color: #495057;
  }
  
  .skill-level {
    background: #e9ecef;
    color: #6c757d;
    padding: 0.125rem 0.375rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .review-link {
    color: #0d6efd;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .review-link:hover {
    text-decoration: underline;
  }
  
  .completion-message {
    background: #d1edff;
    color: #0c63e4;
    padding: 0.75rem;
    border-radius: 6px;
    font-weight: 500;
  }
  
  .progress-message {
    background: #fff3cd;
    color: #856404;
    padding: 0.75rem;
    border-radius: 6px;
  }
</style>