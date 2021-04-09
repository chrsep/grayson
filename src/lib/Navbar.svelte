<script lang="ts">
  import TagSelector from "./TagSelector.svelte"
  import Searchbar from "./Searchbar.svelte"
  import Button from "./Button.svelte"
  import { UserIcon } from "svelte-feather-icons/src"
  import type { Tag, User } from "./domain"
  import CartButton from "./CartButton.svelte"

  export let user: User
  export let tags: Tag[]
</script>

<nav class="border-b">
  <div class="flex p-3 items-center">
    <h1 class="text-center flex-shrink-0a">Grayson</h1>

    <div class="px-3 hidden md:block w-full max-w-xl ml-16">
      <Searchbar class="max-w-xl" placeholder="Cari produk" />
    </div>

    <CartButton />

    {#if user}
      <a href="/settings/stores">
        <Button class="h-10 ml-3">
          <UserIcon class="w-4" />
        </Button>
      </a>
    {:else}
      <a href="/login" class="ml-3">
        <Button class="h-10">Masuk</Button>
      </a>
    {/if}
  </div>

  <div class="px-3  pb-2 md:hidden max-w-xl">
    <Searchbar placeholder="Cari produk" />
  </div>

  <TagSelector {tags} />
</nav>
