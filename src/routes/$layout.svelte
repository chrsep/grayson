<script lang="ts">
  import "../global.css"

  //App.svelte
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query"

  // Create a client
  const queryClient = new QueryClient()
</script>

<QueryClientProvider class={queryClient}>
  <slot />
</QueryClientProvider>
