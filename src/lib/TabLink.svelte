<script lang="ts">
  import { page } from "$app/stores"

  export let text: string
  export let href: string

  $: isActive = $page.path.includes(href)
</script>

<a class:active={isActive} class="px-3 py-2 border-primary text-sm flex-shrink-0" {href}>
  {text}
</a>

<style>
  .active {
    @apply text-primary border-b-2;
  }
</style>
