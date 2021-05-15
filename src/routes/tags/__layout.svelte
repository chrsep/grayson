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
  import type { Tag, User } from "$lib/domain"
  import Navbar from "$lib/Navbar.svelte"

  export let user: User
  export let tags: Tag[]
</script>

<Navbar {user} {tags} />

<slot />
