import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string | null;
  }

  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      username?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string | null;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    username?: string | null;
  }
}
