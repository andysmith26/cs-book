<script>
  const { filters, data } = $props();
  const courses = ['all', 'csp', 'csa'];
</script>

<div
  class="filters"
  style="display:flex; gap: 0.5rem; align-items:center; margin: 0.5rem 0 1rem;"
>
  <input
    placeholder="Search..."
    value={filters.text}
    on:input={(e) => (filters.text = e.currentTarget.value)}
  />
  <select bind:value={filters.course}>
    {#each courses as c}
      <option value={c}>{c.toUpperCase()}</option>
    {/each}
  </select>
  <select bind:value={filters.skill}>
    <option value="">Any skill</option>
    {#each data.index.skills as s}
      <option value={s.id}>{s.title}</option>
    {/each}
  </select>
</div>
