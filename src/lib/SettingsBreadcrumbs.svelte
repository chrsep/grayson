<script lang="ts">
  export let href: string
  export let text: string

  let clazz = ""
  export { clazz as class }
</script>

<div class="{clazz} max-w-7xl mx-auto">
  <a class="flex px-3 py-6 text-sm items-center opacity-60 hover:opacity-100" {href}>
    <img src="/icons/chevron-left.svg" class="w-4" alt=""/>
    <p class="ml-3">
      {text}
    </p>
  </a>
</div>
