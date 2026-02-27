import { request } from "./client";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
  User,
} from "@/lib/types/auth.types";

export async function loginApi(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  return request<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function getMeApi(accessToken: string): Promise<User> {
  return request<User>(API_ENDPOINTS.AUTH.ME, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function refreshTokenApi(
  payload: RefreshRequest,
): Promise<RefreshResponse> {
  return request<RefreshResponse>(API_ENDPOINTS.AUTH.REFRESH, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
