<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ page, fetch }) => {
    const url = `/data/stores/${page.params.slug}`
    const store = await fetch(url)

    return {
      status: 200,
      props: {
        store: await store.json()
      }
    }
  }
</script>

<script lang="ts">
  import type { Store } from "$lib/domain"
  import StoreSettingsSidebar from "$lib/StoreSettingsSidebar.svelte"
  import SettingsBreadcrumbs from "$lib/SettingsBreadcrumbs.svelte"
  import ManageProducts from "../../../../lib/ManageProducts.svelte"
  import SEO from "$lib/SEO.svelte"

  export let store: Store
</script>

<SEO title={store.name} />

<SettingsBreadcrumbs href="/settings/stores" text="Semuat Toko / {store.name}" />

<div class="max-w-7xl mx-auto px-3 pt-8 hidden sm:flex">
  <StoreSettingsSidebar storeSlug={store.slug} />

  <ManageProducts />
</div>

<div class="sm:hidden px-5">
  <div class="w-full">
    <a
      class="block font-black border-b w-full text-xl py-4"
      href="/settings/stores/{store.slug}/products"
    >
      Produk
    </a>
    <a
      class="block font-black border-b w-full text-xl py-4"
      href="/settings/stores/{store.slug}/profil"
    >
      Profil Toko
    </a>
  </div>
</div>
