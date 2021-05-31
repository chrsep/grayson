import Divider from "@components/Divider"
import React, { ChangeEvent } from "react"
import { getSession } from "next-auth/client"
import { InferGetServerSidePropsType, NextPage } from "next"
import TextField from "@components/TextField"
import Button from "@components/Button"
import Textarea from "@components/Textarea"
import { useForm } from "react-hook-form"
import { PostStoreBody } from "@api/stores"
import { useRouter } from "next/router"
import ImageSelectorWIthSmallPreview from "@components/ImageSelectorWIthSmallPreview"
import { uploadImage } from "@lib/image"

const howToPayPlaceholder = `Contoh: 
- Pembayaran dapat dilakukan dengan transfer ke .... 
- Pembayaran dapat dilakukan saat saya sampai di lokasi anda...
`

const NewStore: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const { watch, setValue, setError, register, handleSubmit, formState } = useForm<PostStoreBody>({
    mode: "onChange",
    defaultValues: {
      logo: null
    }
  })
  const router = useRouter()
  const { isDirty, isValid } = formState

  const onSubmit = async (data: PostStoreBody) => {
    const result = await fetch("/api/stores", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data)
    })

    if (result.ok) await router.push("/me/stores")
  }

  const handleChangeLogo = async (e: ChangeEvent<HTMLInputElement>) => {
    const result = await uploadImage(e.target.files[0])
    if (result === null) {
      setError("logo", {
        type: "fetch",
        message: "Oops, upload gambar gagal, tolong coba kembali."
      })
      return
    }

    setValue("logo", result, { shouldDirty: true })
  }

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8 pb-32">
      <div className="px-4 sm:px-0 mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Buat toko baru
          </h2>
        </div>
      </div>

      <Divider />

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Data kontak</h3>
              <p className="mt-1 text-sm text-gray-600">
                Data kontak anda akan digunakan pembeli untuk menghubungi anda dan melanjutkan
                transaksi saat checkout.
              </p>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <ImageSelectorWIthSmallPreview
                      label="Logo toko"
                      onChange={handleChangeLogo}
                      className="col-span-full"
                      placeholder="/icons/building-warehouse.svg"
                      value={watch("logo")}
                    />

                    <TextField
                      label="Nama toko*"
                      type="text"
                      containerClassName="col-span-6 sm:col-span-4"
                      required
                      {...register("name")}
                    />

                    <Textarea
                      rows={3}
                      label="Tentang toko anda"
                      containerClassName="col-span-6"
                      {...register("description")}
                    />

                    <TextField
                      label="Nomor telefon"
                      autocomplete="phone"
                      containerClassName="col-span-6 sm:col-span-4"
                      placeholder="+62-1234-2322-1999"
                      iconSrc="/icons/phone.svg"
                      {...register("phone")}
                    />

                    <TextField
                      label="WhatsApp"
                      autocomplete="phone"
                      containerClassName="col-span-6 sm:col-span-4"
                      iconSrc="/icons/brand-whatsapp.svg"
                      placeholder="+62-1234-2322-1999"
                      {...register("whatsapp")}
                    />

                    <TextField
                      label="Alamat"
                      containerClassName="col-span-6"
                      autocomplete="street-address"
                      {...register("address")}
                    />

                    <TextField
                      label="Kota / Kecamatan"
                      containerClassName="col-span-6 md:col-span-2"
                      {...register("city")}
                    />

                    <TextField
                      label="Provinsi"
                      containerClassName="col-span-3 md:col-span-2"
                      {...register("province")}
                    />

                    <TextField
                      label="Kode Pos"
                      containerClassName="col-span-3 md:col-span-2"
                      autocomplete="postal-code"
                      {...register("postcode")}
                    />

                    <Textarea
                      rows={6}
                      label="Cara pembayaran"
                      containerClassName="col-span-6"
                      placeholder={howToPayPlaceholder}
                      {...register("howToPay")}
                    />
                    <p className="col-span-4 text-sm text-gray-500">
                      Berikan instruksi cara pembayaran setelah pembeli checkout
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-left sm:px-6 flex items-center">
                  <p className="text-sm text-gray-500">
                    Data yang ditandai dengan bintang (*) harus diisi
                  </p>
                  <Button type="submit" className="ml-auto" disabled={!isDirty || !isValid}>
                    Simpan
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session === null) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }
  // Pass data to the page via props
  return { props: {} }
}

export default NewStore
