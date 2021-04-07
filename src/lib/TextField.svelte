<script lang="ts">
  export let inputType: "text" | "email" | "password" = "text"
  export let value = ""
  export let label = ""

  let clazz: string
  export { clazz as class }
</script>

<label class="{clazz} flex flex-col w-full">
  {label}
  <input
    type={inputType}
    {value}
    on:input
    class="rounded border border-gray-300 w-full bg-dark-surface"
  />
</label>
