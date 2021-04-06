<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ session, fetch }) => {
    const url = `/data/tags.json`
    const tags = await fetch(url)

    return {
      status: 200,
      props: {
        user: session.user,
        tags: await tags.json()
      }
    }
  }
</script>

<script lang="ts">
  import "../global.css"
  import Button from "$lib/Button.svelte"
  import { UserIcon } from "svelte-feather-icons/src"
  import type { Tag, User } from "$lib/domain"
  import Searchbar from "$lib/Searchbar.svelte"
  import TagSelector from "$lib/TagSelector.svelte"
  import { page } from "$app/stores"

  let hideNavbar = $page.path.match(/login|signup/)

  export let user: User
  export let tags: Tag[]
</script>

{#if !hideNavbar}
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
    </div>

    <div class="px-3  pb-2 md:hidden max-w-xl">
      <Searchbar placeholder="Cari produk" />
    </div>

    <TagSelector {tags} />
  </nav>
{/if}

<slot />
