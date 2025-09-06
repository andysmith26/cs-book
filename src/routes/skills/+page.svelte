<script>
  const { data } = $props();
  const skills = data?.index?.skills ?? [];
</script>

<h1>Skills</h1>

{#if skills.length === 0}
  <p>
    No skills found. Did you run <code>npm run build</code> to
    generate <code>static/data/content-index.json</code>?
  </p>
{:else}
  <ul>
    {#each skills as s}
      {#if s && s.title && s.id}
        <li>
          <a href={'/skills/' + s.id}>{s.title}</a>
          <span style="font-size: 0.85em; opacity: 0.7;"
            >({s.category})</span
          >
        </li>
      {/if}
    {/each}
  </ul>
{/if}
