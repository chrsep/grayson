<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ session }) => {
    if (session.user !== null) {
      return {
        status: 200,
        props: {
          user: session.user
        }
      }
    }
  }
</script>

<script lang="ts">
  import Button from "$lib/Button.svelte"
  import { UserIcon, MenuIcon } from "svelte-feather-icons/src"
  import type { User } from "$lib/domain"

  export let user: User
</script>

<nav class="pb-3 border-b">
  <div class="flex p-3 items-center">
    <Button>
      <MenuIcon class="w-4" />
    </Button>

    <h1 class="flex-grow text-center">Why World!</h1>

    {#if user}
      <a href="/account">
        <Button>
          <UserIcon class="w-4" />
        </Button>
      </a>
    {:else}
      <a href="/login">
        <Button>Masuk</Button>
      </a>
    {/if}
  </div>

  <div class="px-5 py-3 m-3 border rounded-full bg-gray-100">Cari produk</div>
</nav>
