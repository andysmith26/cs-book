<script>
  const { p } = $props();
</script>

<a
  href={'/projects/' + p.slug}
  class="card"
  style="display:block; border:1px solid #ddd; border-radius:8px; padding:12px;"
>
  <h3 style="margin:0 0 6px;">{p.title}</h3>
  <div style="font-size:12px; opacity:0.8;">{p.tags?.join(', ')}</div>
  <div style="margin-top:8px; font-size:12px;">
    {#if p.courseFit?.length}
      Courses: {p.courseFit.map((c) => c.course).join(', ')}
    {/if}
  </div>
</a>
