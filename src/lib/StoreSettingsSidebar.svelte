<script lang="ts">
  import { page } from "$app/stores"

  export let storeSlug: string

  $: productActive =
    $page.path === `/settings/stores/${storeSlug}` ||
    $page.path === `/settings/stores/${storeSlug}/products`
  $: profileActive = $page.path === `/settings/stores/${storeSlug}/profile`
</script>

<div class="w-full max-w-xs pl-2 pr-32 hidden sm:block pt-6">
  <a
    class:active={productActive}
    class="flex items-end mb-4 opacity-70 mb-3 hover:opacity-100"
    href="/settings/stores/{storeSlug}/products"
  >
    Produk <img src="/icons/chevron-right.svg" class="ml-auto w-3" alt="" />
  </a>
  <a
    class:active={profileActive}
    class="flex items-end mb-4 opacity-70 mb-3 hover:opacity-100"
    href="/settings/stores/{storeSlug}/profile"
  >
    Profil Toko
    <img src="/icons/chevron-right.svg" class="ml-auto w-3" alt="" />
  </a>
</div>

<style lang="postcss">
    .active {
        @apply font-black opacity-100;
    }
</style>
