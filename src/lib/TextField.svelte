<script lang="ts">
  import { handleInput } from "$lib/ui"

  export let type: "text" | "email" | "password" = "text"
  export let value = ""
  export let label = ""

  let clazz: string
  export { clazz as class }
</script>

<label class="{clazz} flex flex-col w-full">
  {label}
  <input
    {type}
    {value}
    on:input={handleInput((newValue) => (value = newValue))}
    class="rounded border border-gray-300 w-full bg-dark-surface"
  />
</label>
