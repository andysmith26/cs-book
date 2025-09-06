<script>
  import PreflightChecklist from '$lib/components/PreflightChecklist.svelte';
  export let data;
  const project = data.project;
</script>

<svelte:head>
  <title>{project?.title || 'Project'} — Project</title>
</svelte:head>

{#if !project}
  <p>Loading project or project not found...</p>
{:else}
  <h1>{project.title}</h1>
  <PreflightChecklist
    required={project.skillsRequired ?? []}
    projectSlug={project.title}
  />

  <!-- Render content from JS object -->
  {#if project.brief}
    <p>{project.brief}</p>
  {/if}

  {#if project.preflight}
    <p><strong>Preflight:</strong> {project.preflight}</p>
  {/if}

  {#if project.buildSteps?.length}
    <h2>Build Steps</h2>
    <ol>
      {#each project.buildSteps as step}
        <li>{step}</li>
      {/each}
    </ol>
  {/if}

  {#if project.rubric}
    <h2>Rubric</h2>
    <p>{project.rubric}</p>
  {/if}

  {#if project.submit}
    <h2>Submit</h2>
    <p>{project.submit}</p>
  {/if}

  <!-- Add more fields as needed, e.g., for game-of-sticks: gameRules, learningObjectives, etc. -->
  {#if project.gameRules?.length}
    <h2>Game Rules</h2>
    <ul>
      {#each project.gameRules as rule}
        <li>{rule}</li>
      {/each}
    </ul>
  {/if}

  {#if project.learningObjectives?.length}
    <h2>Learning Objectives</h2>
    <ul>
      {#each project.learningObjectives as obj}
        <li>{obj}</li>
      {/each}
    </ul>
  {/if}
{/if}

<style>
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 1.125rem;
    margin: 0.5rem 0 1.5rem 0;
    color: #555;
  }
</style>
