<script lang="ts">
  import { page } from "$app/stores"
  import type { Tag } from "$lib/domain"

  export let tag: Tag

  const isActive = $page.path === "/tags/" + tag.slug
</script>

<a
  class:active={isActive}
  class="px-4 py-2 border-primary text-sm flex-shrink-0"
  href="/tags/{tag.slug}"
>
  {tag.name}
</a>

<style>
  .active {
    @apply font-bold text-primary;
  }
</style>
