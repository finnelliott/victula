import Hero from "@/components/marketing/landing-page/Hero";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (user) redirect('/app');
  return (
    <main>
      <Hero />
    </main>
  )
}
