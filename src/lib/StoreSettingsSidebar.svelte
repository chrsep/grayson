<script lang="ts">
  import { page } from "$app/stores"
  import { ChevronRightIcon } from "svelte-feather-icons/src"

  export let storeSlug: string

  let clazz = ""
  export { clazz as class }

  $: productActive =
    $page.path === `/settings/stores/${storeSlug}` ||
    $page.path === `/settings/stores/${storeSlug}/products`
  $: profileActive = $page.path === `/settings/stores/${storeSlug}/profile`
</script>

<div class="w-full max-w-xs pl-2 pr-32 hidden sm:block">
  <a
    class:active={productActive}
    class="flex items-end mb-4 opacity-70 mb-3"
    href="/settings/stores/{storeSlug}/products"
  >
    Produk <ChevronRightIcon size="20" class="ml-auto" />
  </a>
  <a
    class:active={profileActive}
    class="flex items-end mb-4 opacity-70 mb-3"
    href="/settings/stores/{storeSlug}/profile"
  >
    Profil Toko <ChevronRightIcon size="20" class="ml-auto" />
  </a>
</div>

<style>
  .active {
    @apply font-black opacity-100;
  }
</style>
