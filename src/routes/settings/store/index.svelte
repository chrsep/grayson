<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"
  import { browser } from "$app/env"

  export const load: Load = async ({ fetch }) => {
    const result = await fetch("/api/me/stores")

    if (result.ok) {
      return {
        status: 200,
        props: {
          stores: await result.json()
        }
      }
    }

    if (result.status === 401 && browser) {
      window.location.href = "/"
    }

    return {
      status: 302,
      redirect: "/"
    }
  }
</script>

<script lang="ts">
  import { PlusIcon } from "svelte-feather-icons/src"
  import type { Store } from "$lib/domain"
  import StoreCard from "../../../lib/StoreCard.svelte"

  export let stores: Store[]
</script>

<div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-start flex-wrap pt-8">
  {#each stores as store}
    <StoreCard href="/settings/store/{store.slug}">
      <div class="flex items-end">
        <h1 class="block mx-6 mb-4 text-2xl font-black">{store.name}</h1>
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
