<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ session, fetch }) => {
    const tags = await fetch(`/data/tags.json`)
    const products = await fetch(`/data/products.json`)

    return {
      status: 200,
      props: {
        user: session.user,
        tags: await tags.json(),
        products: await products.json()
      }
    }
  }
</script>

<script lang="ts">
  import SEO from "../lib/SEO.svelte"
  import Navbar from "../lib/Navbar.svelte"
  import type { Tag, User, Product } from "../lib/domain"
  import { formatCurrency } from "../lib/domain"

  export let user: User
  export let tags: Tag[]
  export let products: Product[]
</script>

<SEO title="Index " />

<Navbar {user} {tags} />

<div class="flex flex-wrap">
  {#each products as product}
    <div class="p-2 w-1/2 sm:w-1/4 md:w-1/6 ">
      <div class="overflow-hidden border rounded-lg">
        <div class="aspect-w-4 aspect-h-3 bg-black " />
        <div class="text-sm m-2 mb-0">{product.name}</div>
        <div class="opacity-80 m-2 text-sm">{formatCurrency(product.price)}</div>
      </div>
    </div>
  {/each}
</div>
