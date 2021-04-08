<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ fetch }) => {
    const result = await fetch("/api/me/stores")

    return {
      status: 200,
      props: {
        stores: await result.json()
      }
    }
  }
</script>

<script lang="ts">
  import { PlusIcon } from "svelte-feather-icons/src"
  import type { Store } from "$lib/domain"
  import StoreCard from "../../../lib/StoreCard.svelte"

  export let stores: Store
</script>

<!--<div class="max-w-7xl mx-auto flex">-->
<!--{#each stores as store}-->
<!--  <a-->
<!--    class="block border border-gray-300 aspect-w-16 aspect-h-9 rounded-2xl cursor-pointer hover:border-primary max-w-sm md:max-w-xs mx-auto md:mx-0 "-->
<!--    href="/settings/store/new"-->
<!--  >-->
<!--    {store.name}-->
<!--  </a>-->
<!--{/each}-->

<!--  <div class="p-3 pt-8 max-w-sm md:max-w-xs mx-auto md:mx-0 w-full">-->
<!--    <a-->
<!--      class="block border border-gray-300 border-dashed border-2 aspect-w-16 aspect-h-9 rounded-2xl cursor-pointer hover:border-primary"-->
<!--      href="/settings/store/new"-->
<!--    >-->
<!--      <div class="flex items-center justify-center">-->
<!--        <div>-->
<!--          <PlusIcon size="32" class="mx-auto mb-3" />-->
<!--          <p class="text-center">Buat toko baru</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </a>-->
<!--  </div>-->
<!--</div>-->

<div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-start flex-wrap pt-8">
  {#each stores as store}
    <StoreCard href="/settings/store/{store.name}">
      <div class="flex flex-col items-center justify-center">
        {store.name}
      </div>
    </StoreCard>
  {/each}

  <StoreCard class="border-dashed border-2 border-gray-300" href="/settings/store/new">
    <div class="flex flex-col items-center justify-center">
      <PlusIcon size="32" class="mb-2" />
      <p>Buat toko baru</p>
    </div>
  </StoreCard>
</div>
