<script>
  const { project } = $props();
</script>

<a
  href={'/projects/' + project.slug}
  class="card"
  style="display:block; border:1px solid #ddd; border-radius:8px; padding:12px;"
>
  <h3 style="margin:0 0 6px;">{project.title}</h3>
  <div style="font-size:12px; opacity:0.8;">
    {project.tags?.join(', ')}
  </div>
  <div style="margin-top:8px; font-size:12px;">
    {#if Array.isArray(project.courseFit) && project.courseFit.length}
      <div class="course-tags">
        {#each project.courseFit as fit}
          <span class="tag">{fit.course}</span>
        {/each}
      </div>
    {/if}
  </div>
</a>
