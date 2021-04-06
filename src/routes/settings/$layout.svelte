<script lang="ts">
  import TabLink from "$lib/TabLink.svelte"
</script>

<nav class="border-b">
  <div class="max-w-7xl mx-auto w-full flex items-center">
    <a class="p-3 block" href="/"> Grayson </a>
  </div>

  <div class="flex max-w-7xl mx-auto w-full p-3">
    <h1 class="text-3xl font-black">Pengaturan</h1>
  </div>

  <div class="flex max-w-7xl mx-auto w-full text-sm px-3 pt-2">
    <TabLink href="/settings/store" text="Toko" />
    <TabLink href="/settings/account" text="Akun" />
  </div>
</nav>

<slot />
