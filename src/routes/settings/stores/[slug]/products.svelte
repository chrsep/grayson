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
  import ManageProducts from "$lib/ManageProducts.svelte"

  export let store: Store
</script>

<SettingsBreadcrumbs
  class="hidden sm:block"
  href="/settings/stores"
  text="Semuat Toko / {store.name} / Produk"
/>

<SettingsBreadcrumbs
  class="sm:hidden"
  href="/settings/stores/{store.slug}"
  text="Semuat Toko / {store.name} / Produk"
/>

<div class="max-w-7xl mx-auto flex pt-8">
  <div class="sm:px-3 hidden sm:block flex-shrink-0 max-w-xs w-full">
    <StoreSettingsSidebar storeSlug={store.slug} />
  </div>

  <ManageProducts />
</div>
