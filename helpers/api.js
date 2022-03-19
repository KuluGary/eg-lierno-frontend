export default class Api {
  currentToken;

  static async fetchInternal(url, options, version = "v1") {
    url = process.env.NEXT_PUBLIC_ENDPOINT + version + url;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      withCredentials: true,
    };

    if (typeof window !== undefined) {
      if (!this.currentToken) {
        const token = await fetch(`${process.env.NEXT_PUBLIC_CLIENT}/api/token`)
          .then((res) => res.json())
          .catch(() => {});

        if (!!token) {
          headers["Authorization"] = "Bearer " + token;
          this.currentToken = token;
        }
      } else {
        headers["Authorization"] = "Bearer " + this.currentToken;
      }
    }

    return fetch(url, {
      headers,
      credentials: "include",
      ...options,
    }).then(async (response) => {
      const json = await response.json();

      if (response.status >= 400 && response.status < 500) {
        throw new Error(json.message);
      }

      return json.payload || json;
    });
  }
}
