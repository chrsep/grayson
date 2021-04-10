<script lang="ts">
  import TextField from "$lib/TextField.svelte"
  import Button from "./Button.svelte"

  export let title = ""
  export let description = ""
  export let hint = ""

  export let value: string
  export let onSave: () => void
  export let type: "text" | "email" | "password" = "text"

  let clazz = ""
  export { clazz as class }
</script>

<div class="{clazz} border rounded-lg w-full mb-8">
  <h2 class="text-xl font-black mb-3 px-6 pt-6">{title}</h2>
  <p class="mb-3 px-6 opacity-60">{description}</p>

  <div class="max-w-lg">
    <TextField {type} class="px-6" bind:value />
  </div>

  <div class="px-6 py-2 mt-8 bg-dark-surface border-t flex items-center rounded-b-lg">
    <p class="opacity-60 leading-tight pr-3 text-sm">{hint}</p>
    <Button primary class="ml-auto text-sm" on:click={onSave}>Simpan</Button>
  </div>
</div>
