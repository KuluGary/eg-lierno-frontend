export default class Api {
    static async fetchInternal(url, options, version = "v1") {
        url = process.env.NEXT_PUBLIC_ENDPOINT + version + url;

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            withCredentials: true
        };

        return fetch(url, {
            headers,
            credentials: "include",
            ...options
        })
            .then(async (response) => {
                const json = await response.json();

                if (response.status === 403) {
                    throw new Error(json.message);
                }

                return json.payload || json;
            })
    }
}