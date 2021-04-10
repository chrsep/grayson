<script lang="ts">
  import { page } from "$app/stores"
  import type { Tag } from "$lib/domain"
  import TabLink from "./TabLink.svelte"

  export let tags: Tag[]

  $: isOnRoot = $page.path === "/"
</script>

<div class="flex px-3 overflow-auto relative z-10">
  <a
    class:active={isOnRoot}
    class="px-4 py-2 border-primary text-sm opacity-70 transition-opacity hover:opacity-100"
    href="/"
  >
    Semua
  </a>

  {#each tags as tag}
    <TabLink href="/tags/{tag.slug}" text={tag.name} />
  {/each}
</div>

<style>
  .active {
    @apply text-primary-text border-b-2 opacity-100;
  }
</style>
