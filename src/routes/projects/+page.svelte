<script>
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  const { data } = $props();

  // fall back to empty array if data/index missing
  const projects = data?.index?.projects ?? [];
</script>

<h1>Projects</h1>

{#if projects.length === 0}
  <p>
    No projects found. Did you run <code>npm run build</code> to
    generate <code>static/data/content-index.json</code>?
  </p>
{:else}
  <div
    class="grid"
    style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;"
  >
    {#each projects as p}
      <ProjectCard {p} />
    {/each}
  </div>
{/if}
