<script lang="ts">
  import TagSelector from "./TagSelector.svelte"
  import Searchbar from "./Searchbar.svelte"
  import Button from "./Button.svelte"
  import { UserIcon } from "svelte-feather-icons/src"
  import type { Tag, User } from "./domain"
  import CartButton from "./CartButton.svelte"

  import BgPrimary from "../../static/bg-primary.png?w=300;500&format=jpg;webp;avif&srcset"

  export let user: User
  export let tags: Tag[]
</script>

<nav class="border-b relative">
  <div class="flex p-3 items-center z-10 relative">
    <h1 class="text-center flex-shrink-0">Grayson</h1>

    <div class="px-3 hidden md:block w-full max-w-xl ml-16">
      <Searchbar class="max-w-xl" placeholder="Cari produk" />
    </div>

    <CartButton />

    {#if user}
      <a href="/settings/stores" class="ml-3">
        <Button class="h-10">
          <UserIcon class="w-4" />
        </Button>
      </a>
    {:else}
      <a href="/login" class="ml-3">
        <Button class="h-10">Masuk</Button>
      </a>
    {/if}
  </div>

  <div class="px-3  pb-2 md:hidden max-w-xl z-10 relative">
    <Searchbar placeholder="Cari produk" />
  </div>

  <TagSelector {tags} />

  <img
    srcset={BgPrimary}
    class="absolute top-0 bottom-0 right-0 h-full z-0 opacity-20"
    alt="background pattern"
  />
</nav>
