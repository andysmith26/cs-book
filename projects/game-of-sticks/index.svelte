<!-- /projects/game-of-sticks/index.svelte -->
<script>
  import { page } from '$app/stores';
  import { projectMeta } from './meta.js';
  import Preflight from './components/Preflight.svelte';
  import GameBoard from './components/GameBoard.svelte';
  import SkillChip from '$shared/components/SkillChip.svelte';
  import RubricRow from '$shared/components/RubricRow.svelte';

  let preflightComplete = false;
  let currentSection = 'overview'; // overview | preflight | build | submit
</script>

<div class="project-page">
  <header>
    <h1>{projectMeta.title}</h1>
    <div class="course-badges">
      {#each projectMeta.courseFit as fit}
        <span class="badge">{fit.course} - {fit.unit}</span>
      {/each}
    </div>
  </header>

  <!-- Skills Required/Suggested -->
  <section class="skills-overview">
    <div class="required">
      <h3>Required Skills</h3>
      {#each projectMeta.skillsRequired as skill}
        <SkillChip
          skillId={skill.skillId}
          targetLevel={skill.level}
          linkTo="/skills/{skill.skillId}"
        />
      {/each}
    </div>

    <div class="suggested">
      <h3>Suggested Skills</h3>
      {#each projectMeta.skillsSuggested as skill}
        <SkillChip
          skillId={skill.skillId}
          targetLevel={skill.level}
          linkTo="/skills/{skill.skillId}"
        />
      {/each}
    </div>
  </section>

  <!-- Preflight Check -->
  {#if currentSection === 'preflight'}
    <Preflight
      requiredSkills={projectMeta.skillsRequired}
      on:complete={() => (preflightComplete = true)}
    />
  {/if}

  <!-- Main Project Content -->
  {#if preflightComplete && currentSection === 'build'}
    <div class="project-content">
      <GameBoard />

      <!-- Learning Path -->
      <nav class="learning-path">
        <a href="#play">Day 1: Play & Understand</a>
        <a href="#patterns">Day 2: Find Patterns</a>
        <a href="#ai-brain">Day 3: Build AI Brain</a>
        <a href="#training">Day 4: Train & Analyze</a>
        <a href="#extend">Day 5: Extend & Prove</a>
      </nav>
    </div>
  {/if}

  <!-- Rubric -->
  <section class="rubric">
    <h2>Assessment Rubric</h2>
    {#each projectMeta.rubric.criteria as criterion}
      <RubricRow
        {criterion}
        on:viewSkill={(e) => goto(`/skills/${e.detail.skillId}`)}
      />
    {/each}
  </section>
</div>
