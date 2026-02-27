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
