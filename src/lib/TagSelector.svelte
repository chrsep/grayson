<script lang="ts">
  import { page } from "$app/stores"
  import type { Tag } from "$lib/domain"
  import TagLinks from "./TagLinks.svelte"

  export let tags: Tag[]

  $: isOnRoot = $page.path === "/"
</script>

<div class="flex px-3 overflow-auto">
  <a class:active={isOnRoot} class="px-4 py-2 border-primary text-sm" href="/"> Semua </a>

  {#each tags as tag}
    <TagLinks {tag} />
  {/each}
</div>

<style>
  .active {
    @apply text-primary-text border-b-2;
  }
</style>
