<!-- src/lib/components/PreflightChecklist.svelte -->
<script>
  let { required = [], projectSlug = '' } = $props();

  let checks = $state({});
  let storageKey = $derived(`preflight:${projectSlug}`);
  let allComplete = $derived(required.every((r) => checks[r.id]));
  let completionPercent = $derived.by(() => {
    const completed = required.filter((r) => checks[r.id]).length;
    return ((completed / required.length) * 100).toFixed(0);
  });

  // Load from localStorage on mount
  $effect(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        checks = JSON.parse(saved);
      }
    }
  });

  // Save to localStorage when checks change
  $effect(() => {
    if (
      typeof localStorage !== 'undefined' &&
      Object.keys(checks).length > 0
    ) {
      localStorage.setItem(storageKey, JSON.stringify(checks));
    }
  });

  function toggleCheck(skillId) {
    checks[skillId] = !checks[skillId];
  }
</script>

{#snippet skillItem(skill)}
  <label class="skill-item">
    <input
      type="checkbox"
      checked={checks[skill.id]}
      onchange={() => toggleCheck(skill.id)}
    />
    <span class="skill-info">
      <span class="skill-name">{skill.id}</span>
      <span class="skill-level">L{skill.level}</span>
    </span>
    <a href="/skills/{skill.id}" class="review-link">Review</a>
  </label>
{/snippet}

{#if required.length}
  <aside class="preflight-checklist">
    <header>
      <strong>Preflight: Required Skills</strong>
      {#if !allComplete}
        <span class="progress">{completionPercent}% ready</span>
      {/if}
    </header>

    <div class="skills-list">
      {#each required as skill}
        {@render skillItem(skill)}
      {/each}
    </div>

    {#if allComplete}
      <div class="completion-message">
        ✅ All skills checked! You're ready to begin.
      </div>
    {/if}

    <div class="progress-bar">
      <div
        class="progress-fill"
        style="width: {completionPercent}%"
      ></div>
    </div>
  </aside>
{/if}

<style>
  .preflight-checklist {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .progress {
    font-size: 0.875rem;
    color: #64748b;
  }

  .progress-bar {
    height: 4px;
    background: #e2e8f0;
    border-radius: 2px;
    overflow: hidden;
    margin-top: 1rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transition: width 0.3s ease;
  }

  .completion-message {
    background: #dcfce7;
    color: #166534;
    padding: 0.75rem;
    border-radius: 6px;
    margin-top: 1rem;
    font-weight: 500;
  }
</style>
