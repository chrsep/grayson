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
  import StoreSettingsSidebar from "../../../../lib/StoreSettingsSidebar.svelte"
  import SettingsBreadcrumbs from "../../../../lib/SettingsBreadcrumbs.svelte"
  import SettingsCard from "../../../../lib/SettingsCard.svelte"
  import SEO from "../../../../lib/SEO.svelte"

  export let store: Store

  let name = store.name
  let address = store.address
  let phone = store.phone
  let description = store.description

  const handleSave = async (store: Partial<Store>) => {
    const { ok } = await fetch(`/api/stores/${$page.params.slug}`, {
      method: "PATCH",
      body: JSON.stringify(store),
      credentials: "include"
    })

    if (ok) window.location.reload()
  }
</script>

<SEO title="Profil Toko" />

<SettingsBreadcrumbs
  class="hidden sm:block"
  href="/settings/stores"
  text="Semua Toko / {store.name} / Profil"
/>

<SettingsBreadcrumbs
  class="sm:hidden"
  href="/settings/stores/{store.slug}"
  text="Semua Toko / {store.name} / Profil"
/>

<div class="max-w-7xl mx-auto px-3 flex">
  <StoreSettingsSidebar storeSlug={store.slug} />

  <div class="w-full">
    <SettingsCard
      title="Nama Toko"
      bind:value={name}
      description="Ubah nama toko anda"
      onSave={() => {
        handleSave({ name })
      }}
    />

    <SettingsCard
      title="Deskripsi"
      bind:value={description}
      description="Beri sedikit cerita tentang toko anda"
      onSave={() => {
        handleSave({ description })
      }}
    />

    <SettingsCard
      title="Alamat"
      bind:value={address}
      description="Alamat yang jemaat lain bisa gunakan untuk menemukan toko anda."
      onSave={() => {
        handleSave({ address })
      }}
    />

    <SettingsCard
      title="Nomor Telefon"
      bind:value={phone}
      description="Nomor telfon yang jemmat lain bisa gunakan untuk menghubungi toko anda."
      onSave={() => {
        handleSave({ phone })
      }}
    />
  </div>
</div>
