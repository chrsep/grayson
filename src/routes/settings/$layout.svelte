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
  import BgPrimary from "../../../static/bg-secondary.png?w=300;500;800&format=jpg;webp;avif&srcset"

  export let user: User
</script>

<nav class="border-b relative">
  <div class="max-w-7xl mx-auto w-full flex items-center p-3 relative z-10">
    <a class="block" href="/"> Grayson </a>

    <CartButton />
  </div>

  <div class="flex max-w-7xl mx-auto w-full p-3 relative z-10">
    <h1 class="text-3xl font-black">Pengaturan</h1>
  </div>

  <div class="flex max-w-7xl mx-auto w-full text-sm px-3 relative z-10">
    <TabLink href="/settings/stores" text="Toko" />
    <TabLink href="/settings/account" text="Akun" />
  </div>

  <img
    srcset={BgPrimary}
    class="absolute top-0 bottom-0 right-0 h-full z-0 opacity-20"
    alt="background pattern"
  />
</nav>

<slot />
