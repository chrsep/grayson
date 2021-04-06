<script lang="ts">
  import TabLink from "$lib/TabLink.svelte"
  import Button from "../../lib/Button.svelte"
  import { ShoppingCartIcon } from "svelte-feather-icons/src"
</script>

<nav class="border-b">
  <div class="max-w-7xl mx-auto w-full flex items-center py-2">
    <a class="p-3 block" href="/"> Grayson </a>

    <Button class="h-10 ml-auto mr-4">
      <ShoppingCartIcon class="w-4" />
    </Button>
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
