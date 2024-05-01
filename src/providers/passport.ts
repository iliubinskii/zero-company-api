import {
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN
} from "../config";
import Auth0Strategy from "passport-auth0";
import passport from "passport";

/**
 * Initializes the passport strategy.
 */
export function initPassport(): void {
  const strategy = new Auth0Strategy(
    {
      callbackURL: AUTH0_CALLBACK_URL,
      clientID: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      domain: AUTH0_DOMAIN
    },
    (_accessToken, _refreshToken, _extraParams, profile, done) => {
      done(null, profile);
    }
  );

  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
    done(null, user as Express.User);
  });
}
