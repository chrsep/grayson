<script lang="ts">
  export let type = "button"

  let clazz: string
  export { clazz as class }
</script>

<button class="{clazz} rounded border px-3 py-2" on:click {type}>
  <slot />
</button>
