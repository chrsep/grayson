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

  let name = ""
  let email = ""
  let password = ""
  let error = ""

  const handleSignUp = async () => {
    const result = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    if (result.ok) {
      window.location.href = "/"
    } else {
      const { message } = await result.json()
      error = message
    }
  }
</script>

<div class="w-screen h-screen flex">
  <div class="bg-black w-1/2 h-full hidden md:block" />

  <div class="flex flex-col justify-center max-w-xs w-full mx-auto">
    <h1 class="text-center mb-3">Selamat Datang</h1>

    <TextField
      class="mb-3"
      inputType="text"
      label="Nama Lengkap"
      value={name}
      on:input={handleInput((value) => (name = value))}
    />

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

    <Button on:click={handleSignUp}>Daftar</Button>

    <div
      class:opacity-0={!error}
      class="text-center my-4 py-2 block font-bold bg-yellow-300 border border-yellow-500 text-sm rounded transition-opacity duration-100"
    >
      Hmm, Ada yang kurang sepertinya....
    </div>

    <div class="text-center my-6">
      Sudah punya akun? <a sveltekit:prefetch href="/login" class="font-bold">Masuk</a>
    </div>
  </div>
</div>
