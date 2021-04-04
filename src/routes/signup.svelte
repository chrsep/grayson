<script>
  import TextField from "../lib/TextField.svelte"
  import Button from "../lib/Button.svelte"
</script>

<div class="w-screen h-screen flex">
  <div class="bg-black w-1/2 h-full hidden md:block" />


  <div class="flex flex-col justify-center max-w-xs w-full mx-auto">
    <h1 class="text-center mb-3">
      Selamat Datang
    </h1>

    <TextField class="mb-3" inputType="text" label="Nama Lengkap" />

    <TextField class="mb-3" inputType="email" label="E-mail" />

    <TextField class="mb-3" inputType="password" label="Password" />

    <Button>
      Masuk
    </Button>

    <div class="text-center my-6">
      Sudah punya akun? <a href="/login" class="font-bold">Masuk</a>
    </div>
  </div>
</div>
