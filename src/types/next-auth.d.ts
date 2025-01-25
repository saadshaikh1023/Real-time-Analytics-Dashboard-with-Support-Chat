// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the id property
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // Add the id property
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Add the id property to the token
  }
}
