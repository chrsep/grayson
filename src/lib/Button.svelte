<script lang="ts">
  export let type = "button"
  export let primary = false

  let clazz: string
  export { clazz as class }
</script>

<button class:primary class="{clazz} rounded-lg border px-3 py-2" on:click {type}>
  <slot />
</button>

<style>
  .primary {
    @apply text-on-primary bg-primary;
  }
</style>
