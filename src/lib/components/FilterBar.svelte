<!-- src/lib/components/FilterBar.svelte -->
<script>
  let {
    filters = $bindable(), // Two-way binding with parent
    data,
  } = $props();

  let searchTerm = $state(filters.text || '');
  let selectedCourse = $state(filters.course || 'all');
  let selectedSkill = $state(filters.skill || '');

  const courses = ['all', 'csp', 'csa', 'ai'];

  // Update parent filters when local state changes
  $effect(() => {
    filters.text = searchTerm;
    filters.course = selectedCourse;
    filters.skill = selectedSkill;
  });
</script>

<div class="filter-bar">
  <input
    type="search"
    placeholder="Search projects..."
    bind:value={searchTerm}
    class="search-input"
  />

  <select bind:value={selectedCourse} class="filter-select">
    {#each courses as course}
      <option value={course}>
        {course === 'all' ? 'All Courses' : course.toUpperCase()}
      </option>
    {/each}
  </select>

  <select bind:value={selectedSkill} class="filter-select">
    <option value="">Any skill</option>
    {#each data.index.skills as skill}
      <option value={skill.id}>{skill.title}</option>
    {/each}
  </select>
</div>

<style>
  .filter-bar {
    display: flex;
    gap: 0.75rem;
    margin: 1rem 0;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .search-input {
    flex: 1;
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.875rem;
  }

  .filter-select {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    font-size: 0.875rem;
    cursor: pointer;
  }
</style>
