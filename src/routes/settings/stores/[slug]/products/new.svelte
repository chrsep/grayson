<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ page, fetch }) => {
    const url = `/data/stores/${page.params.slug}.json`
    const store = await fetch(url)

    return {
      status: 200,
      props: {
        store: await store.json()
      }
    }
  }
</script>

<script lang="ts">
  import { page } from "$app/stores"
  import type { Store } from "$lib/domain"
  import SettingsBreadcrumbs from "$lib/SettingsBreadcrumbs.svelte"
  import { goto } from "$app/navigation"
  import SEO from "$lib/SEO.svelte"
  import TextField from "$lib/TextField.svelte"
  import Button from "$lib/Button.svelte"
  import { ChevronRightIcon } from "svelte-feather-icons/src"
  import NumberField from "../../../../../lib/NumberField.svelte"

  export let store: Store

  let name = ""
  let description = ""
  let price = ""
  let tags = ""

  const handleSave = async (e: any) => {
    e.preventDefault()
    const result = await fetch(`/api/stores/${$page.params.slug}/products`, {
      method: "POST",
      body: JSON.stringify({ name, description, price, tags: [tags] })
    })

    if (result.ok) goto(`/settings/stores/${$page.params.slug}/products`)
  }
</script>

<SEO title="Produk Toko" />

<SettingsBreadcrumbs
  href="/settings/stores/{store.slug}/products"
  text="Semua Toko / {store.name} / Produk / Buat Baru"
/>

<div class="max-w-7xl mx-auto px-3 md:flex block">
  <div class="w-full max-w-sm pl-2 pr-16 mb-8 pt-7">
    <h2 class="font-black mb-3">Buat Produk Baru</h2>
    <p class="opacity-70">
      Tambahkan produk baru ke dalam <b>{store.name}</b>.
    </p>
  </div>

  <form class="w-full border rounded-lg pt-6" on:submit={handleSave}>
    <h2 class="text-xl font-black mb-3 px-6">Data Produk</h2>

    <p class="mb-6 px-6 opacity-70">Berikan penjelasan tentang produk anda.</p>

    <div class="px-6 max-w-lg">
      <TextField required label="Nama Produk" class="mb-3" bind:value={name} />
      <TextField required label="Deskripsi" class="mb-3" bind:value={description} />
      <NumberField min="0" required label="Harga" class="mb-6" bind:value={price} />
      <TextField required label="Tags" class="mb-6" bind:value={tags} />
    </div>

    <div class="px-6 py-2 mt-8 bg-dark-surface border-t flex items-center rounded-b-lg">
      <Button type="submit" primary class="ml-auto text-sm">
        Simpan
        <ChevronRightIcon size="20" class="ml-2" />
      </Button>
    </div>
  </form>
</div>
