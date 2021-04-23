<script lang="ts">
  import { SearchIcon } from "svelte-feather-icons/src"

  export let value = ""
  export let placeholder = ""

  let clazz: string
  export { clazz as class }
</script>

<label
  class="{clazz} relative flex items-center w-full rounded-full border bg-gray-100 ring-1 ring-transparent ring-offset-0 focus-within:ring-primary"
>
  <SearchIcon size="20" class="ml-3 absolute" />
  <input
    type="text"
    {value}
    on:input
    class="border-none ring-0 ring-offset-0 shadow-none rounded-full bg-transparent w-full pl-12"
    {placeholder}
  />
</label>
