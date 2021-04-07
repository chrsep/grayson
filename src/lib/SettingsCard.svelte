<script lang="ts">
  import TextField from "$lib/TextField.svelte"
  import Button from "./Button.svelte"

  export let title = ""
  export let description = ""
  export let hint = ""

  export let onInput: (value: string) => void
  export let value: string
  export let onSave: () => void
  export let type = "text"

  let clazz: string
  export { clazz as class }
</script>

<div class="{clazz} border rounded-lg w-full mb-8">
  <h2 class="text-xl font-black mb-3 px-6 pt-6">{title}</h2>
  <p class="mb-3 px-6 ">{description}</p>

  <div class="max-w-lg">
    <TextField {type} class="px-6" {value} {onInput} />
  </div>

  <div class="px-6 py-2 mt-8 bg-dark-surface border-t flex items-center">
    <p class="opacity-70 leading-tight pr-3">{hint}</p>
    <Button primary class="ml-auto" on:click={onSave}>Simpan</Button>
  </div>
</div>
