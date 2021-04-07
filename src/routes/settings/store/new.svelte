<script lang="ts">
  import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons/src"
  import TextField from "$lib/TextField.svelte"
  import Button from "$lib/Button.svelte"
</script>

<div class="max-w-7xl mx-auto">
  <a
    class="flex px-3 py-6 text-sm items-center opacity-60 hover:opacity-100"
    href="/settings/store"
  >
    <ChevronLeftIcon size="24" />
    <p class="ml-3">Semua Toko / Toko Baru</p>
  </a>
</div>

<div class="max-w-7xl mx-auto px-3 md:flex block">
  <div class="w-full max-w-sm pl-2 pr-16 mb-8 md:pt-8">
    <h2 class="font-black mb-3">Buat Toko Baru</h2>
    <p class="opacity-70">
      Buat toko untuk memulai menunjukan produk/jasa yang anda punya ke jemaat lain.
    </p>
  </div>

  <div class="w-full border rounded-lg pt-6">
    <h2 class="text-xl font-black mb-3 px-6">Data Toko</h2>

    <p class="mb-6 px-6 opacity-70">
      Data ini akan digunakan untuk menghubungkan toko anda dengan jemaat lain.
    </p>

    <div class="px-6 max-w-lg">
      <TextField label="Nama toko" class="mb-3" />
      <TextField label="Alamat" class="mb-3" />
      <TextField label="No. Telpon" class="mb-6" />
    </div>

    <div class="px-6 py-2 mt-8 bg-dark-surface border-t flex items-center rounded-b-lg">
      <Button primary class="ml-auto text-sm">
        Lanjut
        <ChevronRightIcon size="20" class="ml-2" />
      </Button>
    </div>
  </div>
</div>
