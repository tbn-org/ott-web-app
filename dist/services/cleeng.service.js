export const getBaseUrl = (sandbox) => sandbox ? "https://mediastore-sandbox.cleeng.com" : "https://mediastore.cleeng.com";
export const performRequest = async (sandbox, path = "/", method = "GET", body, jwt) => {
  try {
    const resp = await fetch(`${getBaseUrl(sandbox)}${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwt ? `Bearer ${jwt}` : ""
      },
      method,
      body
    });
    return await resp.json();
  } catch (error) {
    return {
      errors: Array.of(error)
    };
  }
};
export const get = (sandbox, path, jwt) => performRequest(sandbox, path, "GET", void 0, jwt);
export const patch = (sandbox, path, body, jwt) => performRequest(sandbox, path, "PATCH", body, jwt);
export const put = (sandbox, path, body, jwt) => performRequest(sandbox, path, "PUT", body, jwt);
export const post = (sandbox, path, body, jwt) => performRequest(sandbox, path, "POST", body, jwt);
