export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface LoginResponse extends User, AuthTokens {}

export interface RefreshRequest {
  refreshToken: string;
  expiresInMins?: number;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  brand?: string;
  tags: string[];
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartProduct {
  id: number;
  quantity: number;
}

export interface CartItem extends CartProduct {
  title: string;
  price: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface AddCartRequest {
  userId: number;
  products: CartProduct[];
}

export interface UpdateCartRequest {
  merge: boolean;
  products: CartProduct[];
}
