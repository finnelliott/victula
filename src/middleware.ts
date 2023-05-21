import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [ "/", "/api/shortcuts/entries" ]
  });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/'"],
};