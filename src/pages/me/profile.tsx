import React, { FC } from "react"
import Button from "@components/Button"
import Divider from "@components/Divider"
import TextField from "@components/TextField"
import { getSession } from "next-auth/client"
import { findUserByEmail } from "@lib/db"
import { InferGetServerSidePropsType, NextPage } from "next"
import { useForm } from "react-hook-form"
import { PatchUserBody } from "@api/me"
import Image from "next/image"

const Profile: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => (
  <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8 pb-32">
    <div className="px-4 sm:px-0 mt-2 md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Profil anda
        </h2>
      </div>
    </div>

    <Divider />
    <PersonalInfoForm name={user.name} image={user.image} email={user.email} />
    <Divider className="hidden sm:block" />
    <ContactForm
      phone={user.phone}
      address={user.address}
      postcode={user.postcode}
      city={user.city}
      province={user.province}
    />
  </div>
)

const PersonalInfoForm: FC<{
  name: string
  email: string
  image: string
}> = ({ image, name, email }) => {
  const { register, handleSubmit, formState } = useForm<PatchUserBody>({
    defaultValues: { name, email, image }
  })

  const submit = async (data: PatchUserBody) => {
    await fetch("/api/me", {
      method: "PATCH",
      body: JSON.stringify(data)
    })
  }

  return (
    <div className="mt-6 md:mt-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Data diri</h3>
            <p className="mt-1 text-sm text-gray-600">
              Data ini akan ditampilkan pada halaman profil dan pada listing produk anda.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit(submit)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <TextField
                  label="Nama"
                  autocomplete="full-name"
                  containerClassName="max-w-md"
                  {...register("name")}
                />

                <TextField
                  label="Alamat email"
                  autocomplete="email"
                  containerClassName="col-span-6 sm:col-span-4"
                  iconSrc="/icons/mail.svg"
                  placeholder="jessica@hey.com"
                  {...register("email")}
                />

                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                  Foto Profil
                  <input id="avatar" type="file" className="hidden" />
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        width={48}
                        height={48}
                        src="/icons/user-circle.svg"
                        className="h-full w-full text-gray-300"
                      />
                    </span>
                    <Button variant="outline" className="ml-4">
                      Ubah
                    </Button>
                  </div>
                </label>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <Button type="submit" className="ml-auto" disabled={!formState.isDirty}>
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const ContactForm: FC<{
  phone: string
  address: string
  city: string
  province: string
  postcode: string
}> = ({ address, city, province, postcode, phone }) => {
  const { register, handleSubmit, formState } = useForm<PatchUserBody>({
    defaultValues: { phone, address, city, province, postcode }
  })

  const submit = async (data: PatchUserBody) => {
    await fetch("/api/me", {
      method: "PATCH",
      body: JSON.stringify(data)
    })
  }
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Data kontak</h3>
            <p className="mt-1 text-sm text-gray-600">
              Berikan data kontak lengkap anda agar pengguna lain dapat menghubungi anda.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit(submit)}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <TextField
                    label="Nomor telefon / WhatApp"
                    autocomplete="phone"
                    containerClassName="col-span-6 sm:col-span-4"
                    placeholder="+62-1234-2322-1999"
                    iconSrc="/icons/phone.svg"
                    {...register("phone")}
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
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <Button type="submit" className="ml-auto" disabled={!formState.isDirty}>
                  Simpan
                </Button>
              </div>
            </div>
          </form>
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

  const user = await findUserByEmail(session.user.email)

  // Pass data to the page via props
  return {
    props: {
      user: {
        ...user,
        emailVerified: user?.emailVerified?.toISOString(),
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    }
  }
}

export default Profile
