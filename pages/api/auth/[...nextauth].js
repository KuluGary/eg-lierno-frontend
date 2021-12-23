import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";

export default NextAuth({
  database: process.env.DATABASE_URL,
  pages: {
    signIn: "/login",
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
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
    // Providers.Email({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //     from: process.env.EMAIL_FROM
    //   },
    // }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  theme: "light",
  debug: false,
  callbacks: {
    async jwt(token, user, account) {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }

      if (user) {
        const userToReturn = { ...user, userId: user.id };
        delete userToReturn.id;

        return { ...userToReturn };
      }

      return token; // Every subsequent request should just return the previous token
    },
    async session(_, token) {
      return token; // Pass the jwt to the session
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
