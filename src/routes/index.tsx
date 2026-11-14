import { createFileRoute, redirect } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { browserLanguage } from "@/lib/shop-rules";

// French browsers get the French shop; every other browser language gets English.
const detectLanguage = createIsomorphicFn()
  .server(() => browserLanguage(getRequestHeader("accept-language") ?? ""))
  .client(() => browserLanguage(navigator.language));

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: detectLanguage() === "fr" ? "/fr" : "/en", replace: true });
  },
});
