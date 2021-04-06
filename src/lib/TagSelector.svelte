<script lang="ts">
  import type { Tag } from "./domain"

  export let tags: Tag[]
</script>

<div class="flex px-3 overflow-auto">
  <a class="px-4 py-2 border-primary border-b-2 text-primary-text font-bold text-sm" href="/"
    >Semua</a
  >

  {#each tags as tag}
    <a class="px-4 py-2 border-primary text-sm flex-shrink-0" href="/tags/{tag.slug}"
      >{tag.name}
    </a>
  {/each}
</div>
