import { promises as fs } from "fs";
import path from "path";

interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
}

interface FooterContent {
  description: string;
  email: string;
  phone: string;
  location: string;
}

async function readJson<T>(relativePath: string): Promise<T | null> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), relativePath),
      "utf-8",
    );
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export default async function Home() {
  const hero = await readJson<HeroContent>("src/content/hero.json");
  const footer = await readJson<FooterContent>("src/content/footer.json");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">
        {hero?.title ?? "Landing B"}
      </h1>
      <p className="text-xl text-gray-600 mb-8">{hero?.subtitle ?? ""}</p>
      {hero?.ctaText && (
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
          {hero.ctaText}
        </button>
      )}

      <footer className="mt-auto pt-16 pb-8 text-center text-gray-500 text-sm">
        {footer?.description && <p className="mb-2">{footer.description}</p>}
        <div className="flex flex-wrap justify-center gap-4">
          {footer?.email && <span>{footer.email}</span>}
          {footer?.phone && <span>{footer.phone}</span>}
          {footer?.location && <span>{footer.location}</span>}
        </div>
      </footer>
    </main>
  );
}
