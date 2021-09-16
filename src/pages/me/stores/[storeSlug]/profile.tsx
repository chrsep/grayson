import React, { ChangeEvent, FC } from "react"
import { findStoreBySlug } from "@lib/db"
import { getSession } from "next-auth/client"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import StoreAdminHeading from "@components/store-admin-heading"
import TextField from "@components/text-field"
import Textarea from "@components/textarea"
import ImageSelectorWIthSmallPreview from "@components/ImageSelectorWIthSmallPreview"
import Button from "@components/button"
import { useForm } from "react-hook-form"
import { PostStoreBody } from "@api/stores"
import { uploadImage } from "@lib/image-client"
import PageContainer from "@components/container"
import Divider from "@components/divider"
import { useRouter } from "next/router"
import { Store } from "@prisma/client"
import { Breadcrumb } from "@components/breadcrumbs"
import { ParsedUrlQuery } from "querystring"

const StoreProfile: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  breadcrumbs,
  tabs,
  store
}) => {
  const { reset, watch, setValue, setError, register, handleSubmit, formState } =
    useForm<PostStoreBody>({
      mode: "onChange",
      defaultValues: {
        logo: store.logo,
        name: store.name,
        description: store.description,
        whatsapp: store.whatsapp,
        postcode: store.postcode,
        province: store.province,
        city: store.city,
        address: store.address,
        phone: store.phone
        // howToPay: store.howToPay
      }
    })

  const { isDirty, isValid } = formState

  const onSubmit = async (data: PostStoreBody) => {
    const result = await fetch(`/api/stores/${store.id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(data)
    })

    if (result.ok) {
      const updatedStore = await result.json()
      reset({
        logo: updatedStore.logo,
        name: updatedStore.name,
        description: updatedStore.description,
        whatsapp: updatedStore.whatsapp,
        postcode: updatedStore.postcode,
        province: updatedStore.province,
        city: updatedStore.city,
        address: updatedStore.address,
        phone: updatedStore.phone
        // howToPay: updatedStore.howToPay
      })
    }
  }

  const handleChangeLogo = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
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
    <PageContainer>
      <div className="px-4 sm:px-0">
        <StoreAdminHeading breadcrumbs={breadcrumbs} name={store.name} tabs={tabs} />
      </div>

      <div className="mt-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="mb-2 text-lg font-bold leading-6 text-gray-900">Data kontak</h3>
              <p className="mt-1 text-sm text-gray-600">
                Data kontak anda akan digunakan pembeli untuk menghubungi anda dan melanjutkan
                transaksi saat checkout.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 mt-5 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="sm:overflow-hidden sm:rounded-md shadow">
                <div className="sm:p-6 py-5 px-4 bg-white">
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
                      label="Kota"
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

                    {/* TODO(cart): Enable when we start working on cart */}
                    {/* <div className="col-span-6"> */}
                    {/*  <Textarea */}
                    {/*    rows={6} */}
                    {/*    label="Cara pembayaran" */}
                    {/*    placeholder={howToPayPlaceholder} */}
                    {/*    {...register("howToPay")} */}
                    {/*  /> */}
                    {/*  <p className="mt-2 text-sm text-gray-500"> */}
                    {/*    Instruksi pembayaran akan ditunjukan ke pembeli saat checkout */}
                    {/*  </p> */}
                    {/* </div> */}
                  </div>
                </div>

                <div className="flex sticky sm:relative bottom-0 items-center py-3 px-4 sm:px-6 text-left bg-gray-50 border-t">
                  <p className="text-sm text-gray-500">Data dengan bintang (*) perlu di-isi. </p>
                  <Button type="submit" className="ml-auto" disabled={!isDirty || !isValid}>
                    Simpan
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Divider className="hidden sm:block" />
        <DangerZone storeId={store.id} />
      </div>
    </PageContainer>
  )
}

const DangerZone: FC<{ storeId: string }> = ({ storeId }) => {
  const router = useRouter()
  const handleDelete = async () => {
    const deleteResponse = await fetch(`/api/stores/${storeId}`, {
      method: "DELETE",
      credentials: "include"
    })

    if (deleteResponse.ok) await router.replace("/me/stores")
  }
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 mt-8 sm:mt-0">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="mb-4 text-lg leading-6 text-gray-900">Danger Zone</h3>
        </div>
      </div>

      <div className="md:col-span-2 mt-5 md:mt-0">
        <div className="flex sm:overflow-hidden items-center py-4 px-6 bg-white sm:rounded-md shadow">
          <p className="text-sm text-gray-500">
            Data toko tak akan bisa dikembalikan setelah dihapus
          </p>
          <Button
            variant="outline"
            className="flex-shrink-0 ml-auto text-red-700 hover:bg-red-100"
            onClick={handleDelete}
          >
            Hapus toko
          </Button>
        </div>
      </div>
    </div>
  )
}

interface Query extends ParsedUrlQuery {
  storeSlug: string
}

interface Props {
  store: Store
  breadcrumbs: Breadcrumb[]
  tabs: { name: string; href: string; current: boolean }[]
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (ctx) => {
  if (!ctx.params) return { notFound: true }
  const session = await getSession(ctx)
  if (session === null) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }

  const { storeSlug } = ctx.params
  const store = await findStoreBySlug(storeSlug)
  if (!store) return { notFound: true }

  // Pass data to the page via props
  return {
    props: {
      store,
      tabs: [
        { name: "Produk", href: `/me/stores/${storeSlug}`, current: false },
        { name: "Informasi toko", href: `/me/stores/${storeSlug}/profile`, current: true }
      ],
      breadcrumbs: [{ name: "Toko anda", href: "/me/stores", current: false }]
    }
  }
}

export default StoreProfile
