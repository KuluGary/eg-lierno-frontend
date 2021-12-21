import jwt from "next-auth/jwt";

const secret = process.env.SECRET;

export default async (req, res) => {
  const token = await jwt.getToken({ req, secret, raw: true }).catch((e) => console.error(e));

  if (token) {
    // Signed in
    res.send(JSON.stringify(token, null, 2));
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
