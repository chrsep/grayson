<script lang="ts">
  import { goto } from "$app/navigation"
  import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons/src"
  import TextField from "$lib/TextField.svelte"
  import Button from "$lib/Button.svelte"
  import SEO from "$lib/SEO.svelte"

  let name = ""
  let description = ""
  let address = ""
  let phone = ""

  const handleSave = async (e: any) => {
    e.preventDefault()
    const result = await fetch("/api/me/stores", {
      method: "POST",
      body: JSON.stringify({ name, description, address, phone })
    })

    if (result.ok) goto("/settings/stores")
  }
</script>

<SEO title="Toko Baru" />

<div class="max-w-7xl mx-auto">
  <a
    class="flex px-3 py-6 text-sm items-center opacity-60 hover:opacity-100"
    href="/settings/stores"
  >
    <ChevronLeftIcon size="24" />
    <p class="ml-3">Semua Toko / Toko Baru</p>
  </a>
</div>

<div class="max-w-7xl mx-auto px-3 md:flex block">
  <div class="w-full max-w-sm pl-2 pr-16 mb-8 pt-7">
    <h2 class="font-black mb-3">Buat Toko Baru</h2>
    <p class="opacity-70">
      Buat toko untuk memulai menunjukan produk/jasa yang anda punya ke jemaat lain.
    </p>
  </div>

  <form class="w-full border rounded-lg pt-6" on:submit={handleSave}>
    <h2 class="text-xl font-black mb-3 px-6">Data Toko</h2>

    <p class="mb-6 px-6 opacity-70">
      Data ini akan digunakan untuk menghubungkan toko anda dengan jemaat lain.
    </p>

    <div class="px-6 max-w-lg">
      <TextField required label="Nama toko" class="mb-3" bind:value={name} />
      <TextField required label="Alamat" class="mb-3" bind:value={address} />
      <TextField required label="No. Telpon" class="mb-6" bind:value={phone} />
      <TextField label="Deskripsi" class="mb-3" bind:value={description} />
    </div>

    <div class="px-6 py-2 mt-8 bg-dark-surface border-t flex items-center rounded-b-lg">
      <Button type="submit" primary class="ml-auto text-sm">
        Lanjut
        <ChevronRightIcon size="20" class="ml-2" />
      </Button>
    </div>
  </form>
</div>
