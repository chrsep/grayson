<script context="module" lang="ts">
  export const prerender = true

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ session }) {
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
  import TextField from "../lib/TextField.svelte"
  import Button from "../lib/Button.svelte"
  import { goto } from "$app/navigation"

  let name = ""
  let email = ""
  let password = ""

  const handleSignUp = async () => {
    const result = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password
      })
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
      inputType="text"
      label="Nama Lengkap"
      value={name}
      on:input={(e) => (name = e.target.value)}
    />

    <TextField
      class="mb-3"
      inputType="email"
      label="E-mail"
      value={email}
      on:input={(e) => (email = e.target.value)}
    />

    <TextField
      class="mb-3"
      inputType="password"
      label="Password"
      value={password}
      on:input={(e) => (password = e.target.value)}
    />

    <Button on:click={handleSignUp}>Daftar</Button>

    <div class="text-center my-6">
      Sudah punya akun? <a sveltekit:prefetch href="/login" class="font-bold">Masuk</a>
    </div>
  </div>
</div>
