const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL environment variable is not defined",
  );
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type NextFetchOptions = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
};

export async function request<T>(
  endpoint: string,
  options: NextFetchOptions = {},
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const { headers, ...restOptions } = options;

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    const body = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new ApiError(response.status, body.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

export async function withAuth<T>(
  fn: (token: string) => Promise<T>,
  getToken: () => string | undefined,
  refreshToken: () => Promise<boolean>,
): Promise<T> {
  const token = getToken();
  if (!token) throw new ApiError(401, "No access token");

  try {
    return await fn(token);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      const refreshed = await refreshToken();
      if (!refreshed) throw new ApiError(401, "Token refresh failed");

      const newToken = getToken();
      if (!newToken) throw new ApiError(401, "No access token after refresh");

      return fn(newToken);
    }
    throw error;
  }
}
