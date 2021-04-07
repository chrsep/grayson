<script lang="ts">
  import TabLink from "$lib/TabLink.svelte"
  import CartButton from "../../lib/CartButton.svelte"
</script>

<nav class="border-b">
  <div class="max-w-7xl mx-auto w-full flex items-center p-3">
    <a class="block" href="/"> Grayson </a>

    <CartButton />
  </div>

  <div class="flex max-w-7xl mx-auto w-full p-3">
    <h1 class="text-3xl font-black">Pengaturan</h1>
  </div>

  <div class="flex max-w-7xl mx-auto w-full text-sm px-1">
    <TabLink href="/settings/store" text="Toko" />
    <TabLink href="/settings/account" text="Akun" />
  </div>
</nav>

<slot />
