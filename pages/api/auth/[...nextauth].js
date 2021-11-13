import NextAuth from "next-auth";
import Providers from "next-auth/providers";

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
        console.log(url)

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

        console.log(user)

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
});
