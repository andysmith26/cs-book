<script>
  const { data } = $props();
</script>

<h1>CSP Unit 3 — Algorithms & Programming</h1>
<h2>Skills</h2>
<ul>
  {#each data.skills as s}
    <li><a href={'/skills/' + s.id}>{s.title}</a></li>
  {/each}
</ul>
<h2>Projects</h2>
<ul>
  {#each data.projects as p}
    <li><a href={'/projects/' + p.slug}>{p.title}</a></li>
  {/each}
</ul>
