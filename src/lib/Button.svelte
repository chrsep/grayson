<script lang="ts">
  export let type = "button"
  export let primary = false

  let clazz: string
  export { clazz as class }
</script>

<button
  class:primary
  class="{clazz} rounded-lg border border-gray-300 px-3 py-2 bg-white flex items-center justify-center"
  on:click
  {type}
>
  <slot />
</button>

<style>
  .primary {
    @apply text-on-primary bg-primary border-blue-700;
  }
</style>
