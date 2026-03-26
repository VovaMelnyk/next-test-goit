"use client";

import { useEffect, useState } from "react";
import { makePage } from "@keystatic/next/ui/app";
import keystaticConfig from "@/../keystatic.config";

const KeystaticPage = makePage(keystaticConfig);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Page() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stripped = basePath
      ? window.location.pathname.replace(new RegExp(`^${basePath}`), "")
      : window.location.pathname;

    if (
      keystaticConfig.storage.kind === "github" &&
      (stripped === "/keystatic" || stripped === "/keystatic/")
    ) {
      window.location.replace(`${basePath}/keystatic/branch/main`);
      return;
    }

    if (basePath && window.location.pathname.startsWith(basePath)) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname.slice(basePath.length) +
          window.location.search
      );
    }

    setReady(true);
  }, []);

  if (!ready) return null;
  return <KeystaticPage />;
}
