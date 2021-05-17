<script lang="ts">
  import TagSelector from "./TagSelector.svelte"
  import Searchbar from "./Searchbar.svelte"
  import Button from "./Button.svelte"
  import type { Tag, User } from "./domain"
  import CartButton from "./CartButton.svelte"

  import BgPrimary from "../../static/bg-secondary.png?w=300&format=jpg;webp;avif&srcset"

  export let user: User
  export let tags: Tag[]
</script>

<nav class="border-b relative z-10">
  <div class="relative z-10">
    <div class="flex p-3 items-center">
      <h1 class="text-center flex-shrink-0">Grayson</h1>

      <div class="px-3 hidden md:block w-full max-w-xl ml-16">
        <Searchbar class="max-w-xl" placeholder="Cari produk" />
      </div>

      <CartButton />

      {#if user}
        <a href="/settings/stores" class="ml-3">
          <Button class="h-10">
            <img src="/icons/user.svg" class="w-4" alt="" />
          </Button>
        </a>
      {:else}
        <a href="/login" class="ml-3">
          <Button class="h-10">Masuk</Button>
        </a>
      {/if}
    </div>

    <div class="px-3  pb-2 md:hidden max-w-xl relative">
      <Searchbar placeholder="Cari produk" />
    </div>

    <TagSelector {tags} />
  </div>

  <img
    srcset={BgPrimary}
    class="absolute top-0 bottom-0 right-0 h-full -z-10 opacity-20 pointer-events-none"
    alt=""
  />
</nav>
