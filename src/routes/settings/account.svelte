<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ session, fetch }) => {
    const url = `/data/tags.json`

    return {
      status: 200,
      props: {
        user: session.user
      }
    }
  }
</script>

<script lang="ts">
  import TextField from "$lib/TextField.svelte"
  import Button from "$lib/Button.svelte"
  import { handleInput } from "$lib/ui"
  import type { User } from "$lib/domain"

  export let user: User

  let name = user.name
</script>

<div class="max-w-7xl mx-auto pt-16 px-3 flex">
  <div class="w-full max-w-sm px-3">
    <h2 class="font-black">Data Diri</h2>
  </div>

  <div class="border rounded-lg w-full">
    <h2 class="text-xl font-black mb-3 px-6 pt-6">Nama Anda</h2>
    <p class="mb-3 px-6 ">Masukan nama lengkap anda disini.</p>

    <div class="max-w-lg">
      <TextField class="px-6 " value={name} onInput={handleInput((value) => (name = value))} />
    </div>

    <div class="px-6 py-2 mt-8 bg-dark-surface border-t flex items-center">
      <p class="opacity-70">Nama anda akan terlihat di listing produk anda.</p>
      <Button primary class="ml-auto">Simpan</Button>
    </div>
  </div>
</div>
