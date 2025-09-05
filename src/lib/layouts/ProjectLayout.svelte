<script>
  import PreflightChecklist from '$lib/components/PreflightChecklist.svelte';
  
  export let title = '';
  export let metadata = {};
</script>

<svelte:head>
  <title>{title || metadata.title || 'Project'}</title>
</svelte:head>

<article class="project">
  {#if metadata.title}
    <header class="project-header">
      <h1>{metadata.title}</h1>
      
      {#if metadata.courseFit?.length}
        <div class="course-badges">
          {#each metadata.courseFit as fit}
            <span class="badge">{fit.course} - {fit.unit}</span>
          {/each}
        </div>
      {/if}
      
      {#if metadata.tags?.length}
        <div class="tags">
          {#each metadata.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
    </header>
  {/if}

  {#if metadata.skillsRequired?.length}
    <PreflightChecklist
      required={metadata.skillsRequired}
      projectSlug={metadata.title || 'project'}
    />
  {/if}

  <main class="project-content">
    <slot />
  </main>
</article>

<style>
  .project {
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
    line-height: 1.6;
  }
  
  .project-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
  }
  
  .project-header h1 {
    margin: 0 0 1rem 0;
    color: #333;
  }
  
  .course-badges {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .badge {
    background: #e3f2fd;
    color: #1565c0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .tag {
    background: #f5f5f5;
    color: #666;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
  }
  
  .project-content {
    margin-top: 2rem;
  }
  
  .project-content :global(h2) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .project-content :global(h3) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .project-content :global(h4) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .project-content :global(h5) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .project-content :global(h6) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .project-content :global(p) {
    margin-bottom: 1rem;
  }
  
  .project-content :global(code) {
    background: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  .project-content :global(pre) {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
  }
  
  .project-content :global(ul) {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }
  
  .project-content :global(ol) {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }
  
  .project-content :global(li) {
    margin-bottom: 0.5rem;
  }
</style>