<script lang="ts">
  export let title = ""
  export let description = ""
</script>

<svelte:head>
  <title>{title} | Grayson</title>
  <meta name="description" content={description} />
</svelte:head>
