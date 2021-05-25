import React from "react"
import Button from "@components/Button"
import Divider from "@components/Divider"
import TextField from "@components/TextField"
import Textarea from "@components/Textarea"

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8 pb-32">
      <div className="px-4 sm:px-0 mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Profil anda
          </h2>
        </div>
      </div>

      <Divider />
      <PersonalInfoForm />
      <Divider className="hidden sm:block" />
      <ContactForm />
    </div>
  )
}

const PersonalInfoForm = () => (
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
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <TextField
                id="name"
                label="Nama"
                value=""
                onChange={() => {}}
                autocomplete="full-name"
                name="name"
                type="text"
                containerClassName="max-w-md"
              />

              <TextField
                id="email_address"
                label="Alamat email"
                value=""
                onChange={() => {}}
                autocomplete="email"
                name="email_address"
                type="text"
                containerClassName="col-span-6 sm:col-span-4"
                iconSrc="/icons/mail.svg"
                placeholder="jessica@hey.com"
              />

              <Textarea
                id="about"
                name="about"
                rows={3}
                label="Tentang diri anda"
                onChange={() => {}}
                value=""
              />

              <div>
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Button type="submit" className="ml-auto">
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
)

const ContactForm = () => (
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
        <form action="#" method="POST">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <TextField
                  label="Nomor telefon"
                  value=""
                  onChange={() => {}}
                  autocomplete="phone"
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  containerClassName="col-span-6 sm:col-span-4"
                  placeholder="+62-1234-2322-1999"
                  iconSrc="/icons/phone.svg"
                />

                <TextField
                  label="WhatsApp"
                  value=""
                  onChange={() => {}}
                  autocomplete="phone"
                  id="whatsapp"
                  name="whatsapp"
                  type="text"
                  containerClassName="col-span-6 sm:col-span-4"
                  iconSrc="/icons/brand-whatsapp.svg"
                  placeholder="+62-1234-2322-1999"
                />

                <TextField
                  label="Alamat"
                  value=""
                  onChange={() => {}}
                  containerClassName="col-span-6"
                  type="text"
                  name="street_address"
                  id="street_address"
                  autocomplete="street-address"
                />

                <TextField
                  label="Kota / Kecamatan"
                  value=""
                  onChange={() => {}}
                  containerClassName="col-span-6 md:col-span-2"
                  type="text"
                  name="city"
                  id="city"
                />

                <TextField
                  label="Provinsi"
                  value=""
                  onChange={() => {}}
                  containerClassName="col-span-3 md:col-span-2"
                  type="text"
                  name="province"
                  id="province"
                />

                <TextField
                  label="Kode Pos"
                  value=""
                  onChange={() => {}}
                  containerClassName="col-span-3 md:col-span-2"
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  autocomplete="postal-code"
                />
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Button className="ml-auto">Simpan</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
)

export default Profile
