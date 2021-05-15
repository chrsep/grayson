<script lang="ts">
  export let value = ""
  export let label = ""
  export let required = false
  export let placeholder = ""
  export let min = ""
  export let max = ""

  let clazz: string
  export { clazz as class }

  const handleInput = (e: any) => {
    value = e.target.value
  }
</script>

<label class="{clazz} flex flex-col w-full">
  {label}
  <input
    type="number"
    {min}
    {max}
    {value}
    on:input={handleInput}
    on:keypress
    {required}
    {placeholder}
    class="rounded-lg border border-gray-300 w-full bg-dark-surface"
  />
</label>
