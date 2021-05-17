<script>
  import Button from "$lib/Button.svelte"

  $: active = false

  const toggleActive = () => (active = !active)

  export let buttonClass = ""
</script>

<Button class="{buttonClass} h-10 ml-auto" on:click={toggleActive}>
  <img src="/icons/shopping-cart.svg" class="w-4"  alt=""/>
</Button>

<div
  class:right-0={active}
  class:-right-full={!active}
  class:md:-right-96={!active}
  class="w-full md:w-96 bg-surface fixed top-0 bottom-0 transition-all border-l z-40"
>
  <div class="flex items-center">
    <Button class="m-3" on:click={toggleActive}>
      <img src="/icons/x.svg" class="w-4" alt=""/>
    </Button>

    <h1 class="ml-4 text-2xl font-black">Belanjaan-mu</h1>
  </div>
</div>

<div
  class:opacity-40={active}
  class:opacity-0={!active}
  class:pointer-events-none={!active}
  class="bg-black top-0 bottom-0 left-0 right-0 fixed z-30 transition-opacity"
  on:click={toggleActive}
/>
