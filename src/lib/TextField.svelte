<script lang="ts">
  export let inputType: "text" | "email" | "password" = "text"
  export let value = ""
  export let label = ""

  let clazz
  export { clazz as class }
</script>

<label class="{clazz} flex flex-col w-full">
  {label}
  <input type={inputType} {value} on:change on:input class="rounded border w-full" />
</label>
