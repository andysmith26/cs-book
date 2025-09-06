<script>
  export let data;
  const skill = data.skill;

  // helper to normalize prerequisite entry to an id string
  const prereqId = (p) => {
    if (!p) return '';
    if (typeof p === 'string') return p;
    return p.id ?? p.skillId ?? '';
  };
</script>

<svelte:head>
  <title>{skill?.title || 'Skill'} — Skill</title>
</svelte:head>

{#if skill}
  <article class="skill">
    <header>
      <h1>{skill.title}</h1>
      {#if skill.description}
        <p>{skill.description}</p>
      {/if}
      {#if skill.category}
        <div class="meta">Category: {skill.category}</div>
      {/if}
    </header>

    {#if Object.keys(skill.levels).length}
      <section>
        <h2>Levels</h2>
        <ul>
          {#each Object.entries(skill.levels) as [level, desc]}
            <li><strong>{level}:</strong> {desc}</li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if skill.learn?.explainer || skill.learn?.references}
      <section>
        <h2>Learn</h2>
        {#if skill.learn.explainer}
          <div class="explainer">{@html skill.learn.explainer}</div>
        {/if}
        {#if skill.learn.references?.length}
          <ul>
            {#each skill.learn.references as ref}
              <li><a href={ref.url}>{ref.title}</a></li>
            {/each}
          </ul>
        {/if}
      </section>
    {/if}

    {#if Object.keys(skill.practice || {}).length}
      <section>
        <h2>Practice</h2>
        {#each Object.entries(skill.practice) as [k, v]}
          <p><strong>{k}:</strong> {v}</p>
        {/each}
      </section>
    {/if}

    {#if skill.prerequisites?.length}
      <section>
        <h2>Prerequisites</h2>
        <ul>
          {#each skill.prerequisites as p}
            <li>
              {#if prereqId(p)}
                <a href={'/skills/' + prereqId(p)}>{prereqId(p)}</a>
              {:else}
                <span>{JSON.stringify(p)}</span>
              {/if}
            </li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if skill.projectsUsing?.length}
      <section>
        <h2>Projects Using This Skill</h2>
        <ul>
          {#each skill.projectsUsing as proj}
            <li><a href={'/projects/' + proj}>{proj}</a></li>
          {/each}
        </ul>
      </section>
    {/if}
  </article>
{:else}
  <p>Skill not found or still loading...</p>
{/if}

<style>
  .skill {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    line-height: 1.6;
  }
  .meta {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  .explainer {
    margin-bottom: 1rem;
  }
  section {
    margin-bottom: 1.5rem;
  }
  h2 {
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
  }
</style>
