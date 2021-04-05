<script>
  export let type = "button"

  let clazz
  export { clazz as class }
</script>

<button class="{clazz} rounded border px-3 py-2" on:click {type}>
  <slot />
</button>
