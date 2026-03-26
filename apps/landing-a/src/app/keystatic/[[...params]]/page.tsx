"use client";

import { useEffect, useState } from "react";
import { makePage } from "@keystatic/next/ui/app";
import keystaticConfig from "@/../keystatic.config";

const KeystaticPage = makePage(keystaticConfig);

export default function Page() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    if (basePath && window.location.pathname.startsWith(basePath)) {
      // Patch history so Keystatic sees /keystatic/... instead of /landing-a/keystatic/...
      const stripped = window.location.pathname.slice(basePath.length);
      window.history.replaceState(null, "", stripped + window.location.search);
    }
    // If no branch in URL and github mode, redirect to /keystatic/branch/main
    if (
      keystaticConfig.storage.kind === "github" &&
      window.location.pathname === "/keystatic"
    ) {
      window.location.replace("/keystatic/branch/main");
      return;
    }
    setReady(true);
  }, []);

  if (!ready) return null;
  return <KeystaticPage />;
}
