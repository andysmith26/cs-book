<!-- src/routes/projects/+page.svelte -->
<script>
  import FilterBar from '$lib/components/FilterBar.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';

  let { data } = $props();

  let filters = $state({
    course: 'all',
    text: '',
    skill: '',
  });

  // Filtered projects using $derived
  let filteredProjects = $derived.by(() => {
    // normalize and drop falsy/non-object entries immediately
    const raw = data.index?.projects ?? [];
    let projects = raw.filter((p) => {
      const ok = p && typeof p === 'object';
      if (!ok && raw.length && import.meta.env.DEV) {
        console.warn(
          'Skipping invalid project entry in projects array',
          p
        );
      }
      return ok;
    });

    if (filters.course !== 'all') {
      projects = projects.filter(
        (p) =>
          Array.isArray(p.courseFit) &&
          p.courseFit.some((c) => c.course === filters.course)
      );
    }

    if (filters.text) {
      const searchLower = filters.text.toLowerCase();
      projects = projects.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(searchLower)) ||
          (Array.isArray(p.tags) &&
            p.tags.some((tag) =>
              tag.toLowerCase().includes(searchLower)
            ))
      );
    }

    if (filters.skill) {
      projects = projects.filter(
        (p) =>
          (Array.isArray(p.skillsRequired) &&
            p.skillsRequired.some((s) => s.id === filters.skill)) ||
          (Array.isArray(p.skillsSuggested) &&
            p.skillsSuggested.some((s) => s.id === filters.skill))
      );
    }

    return projects;
  });

  // compute a safe total for the UI
  let totalProjects = $derived.by(
    () => (data.index?.projects ?? []).length
  );

  // Save filters to localStorage
  $effect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('projectFilters', JSON.stringify(filters));
    }
  });
</script>

<h1>Projects</h1>

<FilterBar bind:filters {data} />

<div class="results-count">
  Showing {filteredProjects.length} of {totalProjects} projects
</div>

<div class="projects-grid">
  {#each filteredProjects as project}
    <ProjectCard {project} />
  {/each}
</div>

{#if filteredProjects.length === 0}
  <div class="no-results">
    <p>No projects match your filters.</p>
    <button
      onclick={() =>
        (filters = { course: 'all', text: '', skill: '' })}
    >
      Clear filters
    </button>
  </div>
{/if}

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .results-count {
    color: #64748b;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: #64748b;
  }

  .no-results button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
