<script>
  import PreflightChecklist from '$lib/components/PreflightChecklist.svelte';
  const { data } = $props();
  const { default: Content, metadata } = data.mod;
</script>

<svelte:head>
  <title>{metadata.title} — Project</title>
</svelte:head>

<h1>{metadata.title}</h1>
<PreflightChecklist
  required={metadata.skillsRequired ?? []}
  projectSlug={metadata.title}
/>

<!-- Render mdsvex content -->
<Content />
