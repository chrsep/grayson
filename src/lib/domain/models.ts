export interface User {
	id: string
	name: string
	email: string
	stores: Store[]
}

export interface Store {
	id: string
	name: string
	address: string
	phone: string
	products: Product[]
}

export interface Product {
	id: string
	images: Image[]
	name: string
	price: number
}

export interface Image {
	id: string
	key: string
}

