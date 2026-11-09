const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function request<T>(
  path: string,
  option: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const { json, ...init } = option; // getting the json from the frontent
  let response: Response;

  try {
    response = await fetch(VITE_API_URL + path, {
      // create a url with out own body
      ...init,
      body: json === undefined ? init.body : JSON.stringify(json), // sending the json
      credentials: "include",
      headers: {
        ...(json === undefined ? {} : { "Content-Type": "application/json" }), //setting the json
        ...(init.headers ?? {}),
      },
    });
  } catch {
    throw new ApiError(
      
      "Can't reach the server. Check that the backend is running.",
    null
    );
  }
  //getting the responsr
  const contentType = response.headers.get("content-type") ?? "";
  const body: unknown = contentType.includes("json")
    ? await response.json().catch(() => null)
    : await response.text();
  // handling the statuescode with erroor handling
  if (response.status == 204) return undefined as T;
  if (!response.ok) {
    const responseMessage =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof body.message === "string"
        ? body.message
        : typeof body === "object" &&
            body !== null &&
            "error" in body &&
            typeof body.error === "string"
          ? body.error
          : `Request failed with status ${response.status}`;
    throw new ApiError(responseMessage, response.status);
  }
  return body as T;
}

export class ApiError extends Error {
  public readonly status: number | null;

  constructor( message: string ,status: number | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, json: unknown) =>
  request<T>(path, { method: "POST", json }),
  update: <T>(path: string, json: unknown) =>
  request<T>(path, { method: "PATCH", json }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
