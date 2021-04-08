<script lang="ts">
  let clazz = ""
  export { clazz as class }
  export let href = ""
</script>

<div class="w-full max-w-sm sm:max-w-xl mx-auto sm:mx-0 sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
  <a
    class="{clazz} block border w-full aspect-w-16 aspect-h-9 rounded-xl hover:border-primary relative"
    {href}
  >
    <slot />
  </a>
</div>
