export async function ajax(url, options = {}) {
  if (!url) {
    const error = new Error("URL missing");
    error.status = 0;
    throw error;
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const fetchOptions = {
    ...options,
    method: (options.method || "GET").toUpperCase(),
    headers:
      options.body instanceof FormData
        ? options.headers || {}
        : { ...defaultHeaders, ...options.headers },
  };

  if (
    fetchOptions.method !== "GET" &&
    fetchOptions.method !== "HEAD" &&
    options.body !== undefined
  ) {
    fetchOptions.body =
      options.body instanceof FormData
        ? options.body
        : JSON.stringify(options.body);
  }

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      const error = new Error(res.statusText || "Request failed");
      error.status = res.status;
      throw error;
    }

    if (res.status === 204) return null;

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return await res.json();
    }

    return await res.text();
  } catch (error) {
    if (!(error instanceof Error)) {
      const err = new Error("Unknown Error");
      Object.assign(err, error);
      throw err;
    }

    if (!("status" in error)) {
      error.status = 0;
    }

    throw error;
  }
}
