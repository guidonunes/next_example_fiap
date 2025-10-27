import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get("authenticated");
  return authenticated?.value === "true";
}

