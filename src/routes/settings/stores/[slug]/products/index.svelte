<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ page, fetch }) => {
    const store = await fetch(`/data/stores/${page.params.slug}.json`)

    const products = await fetch(`/data/stores/${page.params.slug}/products.json`)

    return {
      status: 200,
      props: {
        store: await store.json(),
        products: await products.json()
      }
    }
  }
</script>

<script lang="ts">
  import type { Product, Store } from "$lib/domain"
  import StoreSettingsSidebar from "$lib/StoreSettingsSidebar.svelte"
  import SettingsBreadcrumbs from "$lib/SettingsBreadcrumbs.svelte"
  import ManageProducts from "$lib/ManageProducts.svelte"
  import SEO from "$lib/SEO.svelte"

  export let store: Store
  export let products: Product[]
</script>

<SEO title="Produk Toko" />

<SettingsBreadcrumbs
  class="hidden sm:block"
  href="/settings/stores"
  text="Semua Toko / {store.name} / Produk"
/>

<SettingsBreadcrumbs
  class="sm:hidden"
  href="/settings/stores/{store.slug}"
  text="Semua Toko / {store.name} / Produk"
/>

<div class="max-w-7xl mx-auto px-0 sm:px-3 flex">
  <StoreSettingsSidebar storeSlug={store.slug} />

  <ManageProducts {products} />
</div>
