import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

const token = async (req, res) => {
  const token = await getToken({ req, secret, raw: true }).catch((e) => console.error(e));

  if (token) {
    // Signed in
    res.send(JSON.stringify(token, null, 2));
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};

export default token;
