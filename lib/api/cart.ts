import { request } from "./client";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import type { Cart, AddCartRequest } from "@/lib/types/cart.types";

export async function addCartApi(payload: AddCartRequest, token?: string): Promise<Cart> {
  return request<Cart>(API_ENDPOINTS.CARTS.ADD, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}
