<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = ({ session }) => {
    return {
      status: 200,
      props: {
        user: session.user
      }
    }
  }
</script>

<script lang="ts">
  import Button from "$lib/Button.svelte"
  import { UserIcon, MenuIcon } from "svelte-feather-icons/src"
  import type { User } from "$lib/domain"
  import Searchbar from "../lib/Searchbar.svelte"

  export let user: User
</script>

<nav class="border-b">
  <div class="flex p-3 items-center">
    <h1 class="text-center ml-3 flex-shrink-0a">Grayson</h1>

    <div class="px-3 hidden md:block w-full max-w-xl ml-16">
      <Searchbar class="max-w-xl" placeholder="Cari produk" />
    </div>

    {#if user}
      <a href="/account" class="ml-auto">
        <Button class="h-10">
          <UserIcon class="w-4" />
        </Button>
      </a>
    {:else}
      <a href="/login" class="ml-auto">
        <Button class="h-10">Masuk</Button>
      </a>
    {/if}

    <Button class="ml-3 h-10">
      <MenuIcon class="w-4" />
    </Button>
  </div>

  <div class="px-3  pb-2 md:hidden max-w-xl">
    <Searchbar placeholder="Cari produk" />
  </div>

  <div class="flex px-3">
    <div class="px-4 py-2 border-primary border-b-2 text-primary-text font-bold">Semua</div>
  </div>
</nav>
