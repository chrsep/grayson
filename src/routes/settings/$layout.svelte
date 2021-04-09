<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ session }) => {
    if (session.user === null) {
      return {
        status: 302,
        redirect: "/"
      }
    }

    return {
      status: 200,
      props: {
        user: session.user
      }
    }
  }
</script>

<script lang="ts">
  import TabLink from "$lib/TabLink.svelte"
  import CartButton from "$lib/CartButton.svelte"
  import type { User } from "$lib/domain"
  import Button from "$lib/Button.svelte"
  import { SettingsIcon } from "svelte-feather-icons/src"

  export let user: User
</script>

<nav class="border-b">
  <div class="max-w-7xl mx-auto w-full flex items-center p-3">
    <a class="block" href="/"> Grayson </a>

    <CartButton />

    {#if user}
      <a href="/settings/stores">
        <Button class="h-10 ml-3">
          <SettingsIcon class="w-4" />
        </Button>
      </a>
    {:else}
      <a href="/login" class="ml-3">
        <Button class="h-10">Masuk</Button>
      </a>
    {/if}
  </div>

  <div class="flex max-w-7xl mx-auto w-full p-3">
    <h1 class="text-3xl font-black">Pengaturan</h1>
  </div>

  <div class="flex max-w-7xl mx-auto w-full text-sm px-3">
    <TabLink href="/settings/stores" text="Toko" />
    <TabLink href="/settings/account" text="Akun" />
  </div>
</nav>

<slot />
