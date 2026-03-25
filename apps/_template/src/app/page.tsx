import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Home() {
  const hero = await reader.singletons.hero.read();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">{hero?.title ?? "LANDING_NAME"}</h1>
      <p className="text-xl text-gray-600 mb-8">{hero?.subtitle ?? ""}</p>
      {hero?.ctaText && (
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
          {hero.ctaText}
        </button>
      )}
    </main>
  );
}
