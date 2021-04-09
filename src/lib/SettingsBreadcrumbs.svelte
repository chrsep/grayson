<script lang="ts">
  import { ChevronLeftIcon } from "svelte-feather-icons/src"

  export let href: string
  export let text: string

  let clazz = ""
  export { clazz as class }
</script>

<div class="{clazz} max-w-7xl mx-auto">
  <a class="flex px-3 py-6 text-sm items-center opacity-60 hover:opacity-100" {href}>
    <ChevronLeftIcon size="24" />
    <p class="ml-3">
      {text}
    </p>
  </a>
</div>
