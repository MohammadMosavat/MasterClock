import type { Route } from "./+types/home";
import ActionTimer from "~/components/ClockifyData";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-8">
      <ActionTimer />
    </main>
  );
}
