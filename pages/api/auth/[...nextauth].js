import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";

export default NextAuth({
  adapter: TypeORMLegacyAdapter(process.env.DATABASE_URL),
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const url = process.env.NEXT_PUBLIC_ENDPOINT + "v1/auth/signin";

        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          withCredentials: true,
        };

        const res = await fetch(url, {
          method: "POST",
          headers,
          credentials: "include",
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (res.ok && !!user) {
          return user;
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  theme: "light",
  debug: false,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ token }) {
      return token;
    },
  },
  jwt: {
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    encode: async ({ secret, token, maxAge }) => {
      const encodedToken = jwt.sign(token, secret);

      return encodedToken;
    },
    decode: async ({ secret, token, maxAge }) => {
      const verify = jwt.verify(token, secret);

      return verify;
    },
  },
});
