import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/admin/login',
  },
  providers: [], // Providers are configured in lib/auth.ts
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith('/admin');
      const isOnLoginPage = nextUrl.pathname === '/admin/login';

      if (isOnAdminPanel) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL('/admin', nextUrl));
      }
      return true;
    },
  },
};