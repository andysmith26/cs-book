<script>
  import PreflightChecklist from '$lib/components/PreflightChecklist.svelte';
  import { page } from '$app/stores';
  
  const { data } = $props();
  
  // Handle different project types
  let Content = $state();
  let metadata = $state();
  let projectComponent = $state();
  
  // Process data when it changes
  $effect(() => {
    try {
      if (data.type === 'markdown') {
        // Traditional markdown project
        Content = data.mod.default;
        metadata = data.mod.metadata;
      } else if (data.type === 'interactive') {
        // Interactive Svelte component
        projectComponent = data.mod.default;
        metadata = data.mod.metadata || { title: data.slug };
      } else if (data.type === 'js-config') {
        // JS configuration file
        const config = data.mod.gameOfSticksProject || data.mod.default;
        metadata = {
          title: config.title || data.slug,
          skillsRequired: config.skillsRequired || [],
          courseFit: config.courseFit || [],
          tags: ['interactive']
        };
      }
    } catch (error) {
      console.error('Error processing project data:', error);
      metadata = { 
        title: data.slug || 'Unknown Project',
        skillsRequired: [],
        error: 'Failed to load project data'
      };
    }
  });
</script>

<svelte:head>
  <title>{metadata?.title || 'Project'} — Project</title>
</svelte:head>

{#if metadata?.error}
  <!-- Error state -->
  <div class="error-container">
    <h1>Project Loading Error</h1>
    <p>There was an issue loading this project:</p>
    <div class="error-message">{metadata.error}</div>
    <div class="error-actions">
      <a href="/projects">← Back to Projects</a>
      <button onclick={() => window.location.reload()}>Try Again</button>
    </div>
  </div>
{:else}
  <!-- Normal project content -->
  <article class="project-page">
    <header class="project-header">
      <h1>{metadata?.title || 'Untitled Project'}</h1>
      
      {#if metadata?.courseFit?.length}
        <div class="course-badges">
          {#each metadata.courseFit as fit}
            <span class="badge">{fit.course} - {fit.unit}</span>
          {/each}
        </div>
      {/if}
      
      {#if metadata?.tags?.length}
        <div class="tags">
          {#each metadata.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
    </header>

    <!-- Preflight checklist for required skills -->
    {#if metadata?.skillsRequired?.length}
      <PreflightChecklist
        required={metadata.skillsRequired}
        projectSlug={metadata.title || data.slug}
      />
    {/if}

    <!-- Project content based on type -->
    <main class="project-content">
      {#if data.type === 'markdown' && Content}
        <!-- Render mdsvex content -->
        <Content />
      {:else if data.type === 'interactive' && projectComponent}
        <!-- Render interactive Svelte component -->
        {@render projectComponent()}
      {:else if data.type === 'js-config'}
        <!-- Render placeholder for JS config projects -->
        <div class="js-config-placeholder">
          <h2>Interactive Project</h2>
          <p>This is an interactive project. The implementation is in development.</p>
          
          {#if metadata.skillsRequired?.length}
            <h3>Skills You'll Practice:</h3>
            <ul>
              {#each metadata.skillsRequired as skill}
                <li>
                  <strong>{skill.skillId}</strong> (Level {skill.level})
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {:else}
        <!-- Fallback for unknown project types -->
        <div class="content-fallback">
          <h2>Content Not Available</h2>
          <p>The content for this project is not yet available or failed to load.</p>
          <p>Project type: <code>{data.type || 'unknown'}</code></p>
          <a href="/projects">← Back to Projects</a>
        </div>
      {/if}
    </main>
  </article>
{/if}

<style>
  .project-page {
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
    flex-wrap: wrap;
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
  
  .error-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #f5c6cb;
    border-radius: 8px;
    background: #f8d7da;
    color: #721c24;
    text-align: center;
  }
  
  .error-container h1 {
    margin: 0 0 1rem 0;
    color: #721c24;
  }
  
  .error-message {
    background: rgba(255, 255, 255, 0.5);
    padding: 1rem;
    border-radius: 4px;
    margin: 1rem 0;
    font-family: monospace;
  }
  
  .error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
  }
  
  .error-actions a,
  .error-actions button {
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
  }
  
  .error-actions a {
    background: #6c757d;
    color: white;
  }
  
  .error-actions button {
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .js-config-placeholder,
  .content-fallback {
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f8f9fa;
    text-align: center;
    margin: 2rem 0;
  }
  
  .js-config-placeholder h2,
  .content-fallback h2 {
    margin: 0 0 1rem 0;
    color: #495057;
  }
  
  .js-config-placeholder h3 {
    margin: 1.5rem 0 0.5rem 0;
    color: #495057;
  }
  
  .js-config-placeholder ul {
    text-align: left;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .js-config-placeholder li {
    margin-bottom: 0.5rem;
  }
  
  .content-fallback code {
    background: #e9ecef;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
</style>