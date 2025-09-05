<script>
  export let title = '';
  export let metadata = {};
</script>

<svelte:head>
  <title>{title || metadata.title || 'Content'}</title>
</svelte:head>

<article class="content">
  <slot />
</article>

<style>
  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    line-height: 1.6;
  }
  
  .content :global(h1) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .content :global(h2) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .content :global(h3) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .content :global(h4) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .content :global(h5) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .content :global(h6) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
  }
  
  .content :global(code) {
    background: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  .content :global(pre) {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
  }
  
  .content :global(blockquote) {
    border-left: 4px solid #ddd;
    margin: 1rem 0;
    padding-left: 1rem;
    color: #666;
  }
  
  .content :global(ul) {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }
  
  .content :global(ol) {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }
</style>