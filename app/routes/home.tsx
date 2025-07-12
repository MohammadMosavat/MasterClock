import type { Route } from "./+types/home";
import ClockifyData from "~/components/ClockifyData";
import ClockifyConnect from "~/components/ClockifyConnect";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-8">
      <ClockifyConnect />
      <ClockifyData />
    </main>
  );
}
