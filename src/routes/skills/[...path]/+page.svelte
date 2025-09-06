<script>
  const { data } = $props();
  const { default: Content, metadata } = data.mod;
</script>

<svelte:head>
  <title>{metadata.title} — Skill</title>
</svelte:head>

<h1>{metadata.title}</h1>
<Content />
