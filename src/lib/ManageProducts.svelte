<script lang="ts">
  import { page } from "$app/stores"
  import TextField from "$lib/TextField.svelte"
  import Button from "$lib/Button.svelte"
  import { PlusIcon } from "svelte-feather-icons/src"
  import ProductIllustration from "./illustrations/ProductIllustration.svelte"

  let newProduct = `/settings/stores/${$page.params.slug}/products/new`
</script>

<div class="w-full border md:rounded-xl sm:mx-4">
  <div class="p-3 flex">
    <TextField placeholder="Cari produk" />
    <a href={newProduct}>
      <Button class="flex-shrink-0 ml-3">
        <PlusIcon size="24" class="mr-2" />
        Produk
      </Button>
    </a>
  </div>

  <div class="flex">
    <div class="mx-auto w-3/4 my-8 md:my-20 md:w-1/3">
      <ProductIllustration class="mb-8" />
      <h3 class="text-center font-black text-2xl opacity-70 mb-4">Buat produk pertama anda</h3>
      <a href={newProduct}>
        <Button primary class="mx-auto">
          <PlusIcon size="24" class="mr-2" />
          Tambah produk
        </Button>
      </a>
    </div>
  </div>
</div>
