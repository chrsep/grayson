<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const prerender = true

  export const load: Load = async ({ session }) => {
    if (session.user !== null) {
      return {
        status: 302,
        redirect: "/"
      }
    }

    return { status: 200 }
  }
</script>

<script lang="ts">
  import TextField from "$lib/TextField.svelte"
  import Button from "$lib/Button.svelte"
  import { handleInput } from "$lib/ui"
  import { goto } from "$app/navigation"

  let email = ""
  let password = ""

  const handleLogin = async () => {
    const result = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })

    if (result.ok) goto("/")
  }
</script>

<div class="w-screen h-screen flex">
  <div class="bg-black w-1/2 h-full hidden md:block" />

  <div class="flex flex-col justify-center max-w-xs w-full mx-auto">
    <h1 class="text-center mb-3">Selamat Datang</h1>

    <TextField
      class="mb-3"
      inputType="email"
      label="E-mail"
      value={email}
      on:input={handleInput((value) => (email = value))}
    />

    <TextField
      class="mb-3"
      inputType="password"
      label="Password"
      value={password}
      on:input={handleInput((value) => (password = value))}
    />

    <Button on:click={handleLogin} type="button">Masuk</Button>

    <div class="text-center my-6">
      Belum punya akun? <a sveltekit:prefetch href="/signup" class="font-bold">Daftar sekarang</a>
    </div>
  </div>
</div>
