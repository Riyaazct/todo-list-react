const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const { OAuth2Client } = require("google-auth-library");

exports.request = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectUrl = "http://127.0.0.1:3100/api/auth/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
};

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  console.log("data", data);
}

exports.oAuth = async (req, res) => {
  const code = req.query.code;

  try {
    const redirectUrl = "http://127.0.0.1:3100/api/auth/oauth";

    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const r = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(r.tokens);
    console.log("Tokens Acquired.");
    const user = oAuth2Client.credentials;
    console.log("credentials", user);
    await getUserData(user.access_token);
  } catch (err) {
    console.log("Error with signing in with Google", err);
  }

  res.redirect(303, "http://localhost:3000/");
};
