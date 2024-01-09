import { GoogleStrategy } from 'remix-auth-google';
import { Authenticator } from "remix-auth";
import { createCookieSessionStorage } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["s3cr3t"], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

const authenticator = new Authenticator<{ email: string }>(sessionStorage);

const googleStrategy = new GoogleStrategy(
  {
    clientID: '1061869997136-4cgv5hpq755n0mjhlebptegguio40h10.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/authed',
  },
  async ({
           // accessToken, refreshToken, extraParams,
           profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value })
    return { email: profile.emails[0].value };
  }
)

authenticator.use(googleStrategy);

export default authenticator;