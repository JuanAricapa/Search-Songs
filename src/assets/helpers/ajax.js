export async function ajax(url, options = {}) {
  try {
    if (!url) throw { err: true, statusText: "URL missing" };

    let defaultHeaders = { "Content-Type": "application/json" };

    const fetchOptions = {
      ...options,
      headers:
        options.body instanceof FormData
          ? options.headers || {}
          : { ...defaultHeaders, ...options.headers },
      body:
        options.body instanceof FormData
          ? options.body
          : JSON.stringify(options.body ?? {}),
      method: options.method ? options.method.toUpperCase() : "GET",
    };

    if (fetchOptions.method === "GET" || fetchOptions.method === "HEAD") {
      delete fetchOptions.body;
    }

    let res = await fetch(url, fetchOptions);
    if (!res.ok)
      throw { err: true, status: res.status, statusText: res.statusText };

    if (res.status === 204) return null;

    let data;
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    return data;
  } catch (error) {
    throw {
      err: true,
      status: error.status || 0,
      statusText: error.statusText || "URL Not Found",
    };
  }
}
