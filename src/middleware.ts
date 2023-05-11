import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  beforeAuth: (req) => {
    const path = req.nextUrl.pathname;
    if (!path.startsWith('/app')) {
      return false;
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/'"],
};