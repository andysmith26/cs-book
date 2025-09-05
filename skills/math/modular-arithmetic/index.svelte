<!-- /skills/math/modular-arithmetic/index.svelte -->
<script>
  import { skillMeta } from './meta.js';
  import ModuloVisualizer from './components/ModuloVisualizer.svelte';
  import Practice from '$shared/components/Practice.svelte';
  import ProjectLink from '$shared/components/ProjectLink.svelte';

  let currentLevel = 1;
  let practiceComplete = false;
</script>

<div class="skill-page">
  <header>
    <h1>{skillMeta.title}</h1>
    <span class="category">{skillMeta.category}</span>
  </header>

  <!-- What This Skill Means -->
  <section class="description">
    <p>{skillMeta.description}</p>

    <!-- Levels -->
    <div class="levels">
      {#each Object.entries(skillMeta.levels) as [level, desc]}
        <div class="level" class:current={currentLevel == level}>
          <span class="level-num">Level {level}</span>
          <p>{desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Learn -->
  <section class="learn">
    <h2>Learn</h2>
    <div class="explainer">
      {@html skillMeta.learn.explainer}
    </div>

    <!-- Interactive Demo -->
    <ModuloVisualizer />

    <!-- External References -->
    <div class="references">
      {#each skillMeta.learn.references as ref}
        <a href={ref.url} target="_blank">{ref.title}</a>
      {/each}
    </div>
  </section>

  <!-- Practice -->
  <section class="practice">
    <h2>Practice</h2>
    <Practice
      drillId={skillMeta.practice.shortDrill}
      on:complete={() => (practiceComplete = true)}
    />
  </section>

  <!-- Projects Using This -->
  <section class="projects-using">
    <h2>Use This Skill In:</h2>
    {#each skillMeta.projectsUsing as projectId}
      <ProjectLink {projectId} />
    {/each}
  </section>
</div>
