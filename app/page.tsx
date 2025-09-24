import HomePage from "@/app/home/page";
import { connection } from 'next/server'

export default async function Home() {
  await connection()
  return <HomePage />;
}
