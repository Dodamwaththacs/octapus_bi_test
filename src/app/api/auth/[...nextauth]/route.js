import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: "orderManagementApp",
      clientSecret: "0Lni4iKzf4RkYvz2APzb9k4Q4ovyo7fu",
      issuer: "https://auth.chamika31.me/realms/octapusBi",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        
        if (account.access_token) {
          const decodedToken = JSON.parse(
            Buffer.from(account.access_token.split('.')[1], 'base64').toString()
          );
          token.roles = decodedToken.realm_access?.roles || [];
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.roles = token.roles || [];
      return session;
    },
  },
  secret: "mynameischamika",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };