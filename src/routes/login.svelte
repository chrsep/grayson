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

  let email = ""
  let password = ""
  let error = false

  const handleLogin = async () => {
    error = false
    const result = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })

    if (result.ok) {
      window.location.href = "/"
    } else {
      error = true
    }
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

    <Button primary on:click={handleLogin} type="button">Masuk</Button>

    <div
      class:opacity-0={!error}
      class="text-center my-4 py-2 block font-bold bg-yellow-300 border border-yellow-500 text-sm rounded transition-opacity duration-100"
    >
      Yo, password nya salah
    </div>

    <div class="text-center my-6">
      Belum punya akun? <a sveltekit:prefetch href="/signup" class="font-bold">Daftar sekarang</a>
    </div>
  </div>
</div>
