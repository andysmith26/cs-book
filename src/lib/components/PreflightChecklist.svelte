<script>
  const { required = [], projectSlug = '' } = $props();
  const key = `preflight:${projectSlug}`;
  const checks = $state({});

  // initialize from localStorage
  $effect(() => {
    const saved = localStorage.getItem(key);
    if (saved) Object.assign(checks, JSON.parse(saved));
  });
  $effect(() => {
    localStorage.setItem(key, JSON.stringify(checks));
  });
</script>

{#if required.length}
  <aside
    style="border:1px solid #ddd; padding:12px; border-radius:8px; margin: 1rem 0;"
  >
    <strong>Preflight: required skills</strong>
    <ul>
      {#each required as r}
        <li>
          <label style="display:flex; gap:.5rem; align-items:center;">
            <input type="checkbox" bind:checked={checks[r.id]} />
            <span>{r.id} (L{r.level})</span>
            <a
              style="margin-left:auto; font-size:12px;"
              href={'/skills/' + r.id}>review</a
            >
          </label>
        </li>
      {/each}
    </ul>
  </aside>
{/if}
