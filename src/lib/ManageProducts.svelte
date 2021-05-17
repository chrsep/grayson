<script lang="ts">
  import { page } from "$app/stores"
  import TextField from "$lib/TextField.svelte"
  import Button from "$lib/Button.svelte"
  import ProductIllustration from "./illustrations/ProductIllustration.svelte"
  import type { Product } from "$lib/domain"
  import { formatCurrency } from "./domain"

  export let products: Product[]
  let newProduct = `/settings/stores/${$page.params.slug}/products/new`
</script>

<div class="w-full border md:rounded-xl sm:mx-4">
  <div class="p-3 flex">
    <TextField placeholder="Cari produk" />
    <a href={newProduct}>
      <Button class="flex-shrink-0 ml-3">
        <img src="/icons/plus.svg" class="mr-2 w-4" alt="" />
        Produk
      </Button>
    </a>
  </div>

  {#if products.length === 0}
    <div class="flex">
      <div class="mx-auto w-3/4 my-8 md:my-20 md:w-1/3">
        <ProductIllustration class="mb-8" />
        <h3 class="text-center font-black text-2xl opacity-70 mb-4">Buat produk pertama anda</h3>
        <a href={newProduct}>
          <Button primary class="mx-auto">
            <img src="/icons/plus.svg" class="mr-2 w-4" alt="" />
            Tambah produk
          </Button>
        </a>
      </div>
    </div>
  {:else}
    <div>
      <div class="flex border-b w-full items-center opacity-60">
        <div class="w-0 w-14 m-4" />
        <div class="w-2/4 mr-3">Nama</div>
        <div class="w-2/4 sm:w-1/4">Harga</div>
        <div class="w-1/4 hidden sm:block">Tag</div>
      </div>
      <div>
        {#each products as product}
          <div class="flex border-b w-full items-center">
            <div class="w-14 m-4">
              <div class="aspect-w-4 aspect-h-3 bg-black rounded-lg" />
            </div>
            <div class="w-2/4 truncate mr-3">{product.name}</div>
            <div class="w-2/4 sm:w-1/4">
              {formatCurrency(product.price)}
            </div>
            <div class="w-1/4 hidden sm:block">
              {#each product.tags as tag}
                <div>{tag.name}</div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
