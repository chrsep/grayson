<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ session, fetch, page }) => {
    const product = await fetch(`/data/products/${page.params.slug}.json`)
    const tags = await fetch(`/data/tags.json`)
    const products = await fetch(`/data/products.json`)

    return {
      props: {
        user: session.user,
        tags: await tags.json(),
        product: await product.json()
      }
    }
  }
</script>

<script lang="ts">
  import type { Tag, User, Product } from "$lib/domain"
  import Navbar from "../../lib/Navbar.svelte"
  import Breadcrumb from "../../lib/Breadcrumb.svelte"
  import { formatCurrency } from "../../lib/domain"
  import Button from "../../lib/Button.svelte"
  import NumberField from "../../lib/NumberField.svelte"

  export let product: Product
  export let user: User
  export let tags: Tag[]

  let qty = 1
</script>

<Navbar {user} {tags} />

<Breadcrumb
  href="/"
  text="Semua Produk / {product.store.name} / {product.name}"
  class="max-w-7xl mx-auto"
/>

<main class="flex flex-col md:flex-row max-w-7xl mx-auto">
  <div class="flex-1 bg-black min-h-screen" />

  <div class="flex-1">
    <section class="m-4 border prose p-4 rounded-xl md:max-w-md">
      <h1>{product.name}</h1>
      <strong>{formatCurrency(product.price)}</strong>
      <p>{product.description}</p>

      <div class="flex items-end">
        <NumberField label="Jumlah" class="mr-4" bind:value={qty} min="1" />
        <Button primary>Tambah ke Keranjang</Button>
      </div>
    </section>

    <section class="m-4 border p-4 rounded-xl md:max-w-md">
      <p class="text-sm opacity-70">Dikelola oleh {product.store.owner.name}</p>

      <div class="prose">
        <h2>{product.store.name}</h2>
        <p>{product.store.description}</p>
        <p>{product.store.address}</p>
        <a href="tel:{product.store.phone}">
          Tel: {product.store.phone}
        </a>
      </div>
    </section>
  </div>
</main>
