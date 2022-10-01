import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      // app/.env.local
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0

      // authorization: {
      //   params: {
      //     redirect_uri: "https://nft-id.vercel.app/api/auth/callback/github",
      //   },
      // },
      userinfo: {
        url: "https://api.twitter.com/2/users/me",
        params: {
          "user.fields":
            "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld",
        },
      },
      profile({ data }) {
        return {
          id: data.id,
          image: data,
        };
      },
    }),
  ],
  secret: process.env.SECRET, // https://github.com/nextauthjs/next-auth/issues/3245#issuecomment-974772884
  // callbacks: {
  //   async jwt({ token, ...rest }) {
  //     return { ...token, rest };
  //   },
  //   async session({ session, ...rest }) {
  //     return { ...session, rest };
  //   },
  // },
};
export default NextAuth(authOptions);
