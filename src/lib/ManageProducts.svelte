<script>
  import TextField from "$lib/TextField.svelte"
  import Button from "$lib/Button.svelte"
</script>

<div class="w-full border rounded -lg">
  <div class="p-3 flex">
    <TextField placeholder="Cari produk" />
    <Button primary class="flex-shrink-0 ml-3">Buat produk</Button>
  </div>
</div>
