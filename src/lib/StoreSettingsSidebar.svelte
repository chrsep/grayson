<script lang="ts">
  import { page } from "$app/stores"

  export let storeSlug: string

  $: productActive =
    $page.path === `/settings/stores/${storeSlug}` ||
    $page.path === `/settings/stores/${storeSlug}/products`
  $: profileActive = $page.path === `/settings/stores/${storeSlug}/profile`
</script>

<div class="w-full max-w-xs pl-2 pr-16 hidden sm:block">
  <a
    class:active={productActive}
    class="block mb-2 opacity-70"
    href="/settings/stores/{storeSlug}/products"
  >
    Produk
  </a>
  <a
    class:active={profileActive}
    class="block mb-2 opacity-70 hover:opacity-100"
    href="/settings/stores/{storeSlug}/profile"
  >
    Profil Toko
  </a>
</div>

<style>
  .active {
    @apply font-black opacity-100;
  }
</style>
