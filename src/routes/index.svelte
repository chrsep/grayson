<script>
  import Button from "$lib/Button.svelte"
  import { MenuIcon } from "svelte-feather-icons"
</script>
<nav class="pb-3 border-b">
  <div class="flex p-3 items-center">
    <Button>
      <MenuIcon class="w-6" />
    </Button>

    <h1 class="flex-grow text-center">Why World!</h1>

    <a href="/login">
      <Button>Masuk</Button>
    </a>
  </div>

  <div class="px-5 py-3 m-3 border rounded-full bg-gray-100">
    Cari produk
  </div>
</nav>
