<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = async ({ session }) => {
    return {
      status: 200,
      props: {
        user: session.user
      }
    }
  }
</script>

<script lang="ts">
  import { handleInput } from "$lib/ui"
  import type { User } from "$lib/domain"
  import SettingsCard from "../../lib/SettingsCard.svelte"

  export let user: User

  let name = user.name
  let email = user.email
</script>

<div class="max-w-7xl mx-auto pt-16 px-3 flex">
  <div class="w-full max-w-sm pl-2 pr-16 pt-7 hidden md:block">
    <h2 class="font-black mb-3">Data Diri</h2>
    <p>Ubah data diri anda menggunakan form disamping.</p>
  </div>

  <div class="w-full">
    <SettingsCard
      title="Nama Lengkap"
      description="Ubah nama lengkap anda disini."
      hint="Nama anda akan terlihat di listing produk anda."
      on:input={handleInput((value) => (name = value))}
      value={name}
    />

    <SettingsCard
      title="Alamat Email"
      description="Alamat email akan anda gunakan untuk komunikasi dan login."
      hint="Alamat email anda akan dapat dilihat pengguna lain."
      on:input={handleInput((value) => (email = value))}
      value={email}
      inputType="email"
    />
  </div>
</div>
