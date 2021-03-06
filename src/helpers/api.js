import Auth from "./auth";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export default class Api {
    static async fetchInternal(url, options, version = "v1") {
        url = process.env.REACT_APP_ENDPOINT + version + url;

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            withCredentials: true,
        };

        if (Auth.loggedIn()) {
            headers["Authorization"] = "Bearer " + (await Auth.getToken());
        }

        return fetch(url, {
            headers,
            credentials: "include",
            ...options,
        })
            .then((response) => response.json())
            .then((response) => response.payload || response);
    }

    static _checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            response.json();

            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };

    static isDev = () => {
        return process.env.NODE_ENV === "development";
    };

    static envVar = (name) => {
        return process.env[`REACT_APP_${name}`];
    };

    static getApolloErrors = (data) => {
        const apolloErrors = {};

        if (data) {
            for (const key in data) {
                const element = data[key];

                if (!!element.errors) {
                    apolloErrors[key] = element.errors;
                }
            }
        }

        return apolloErrors;
    };

    static hasApolloErrors = (data) => {
        return Object.keys(this.getApolloErrors(data)).length > 0;
    };
}

const apolloLink = createHttpLink({
    uri: process.env.REACT_APP_ENDPOINT + "v2",
    credentials: "include",
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false,
    }),
    link: apolloLink,
});
