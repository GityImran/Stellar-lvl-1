"use client";

import { useEffect } from "react";
import { Button } from "./components/ui/Button";
import { Card, CardContent, CardHeader } from "./components/ui/Card";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // keep a breadcrumb in console for dev
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen">
      <div className="app-container py-10 sm:py-14">
        <Card className="overflow-hidden">
          <CardHeader>
            <p className="text-sm font-semibold text-slate-600">
              Something broke
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">
              We hit an unexpected error.
            </h1>
            {error?.digest ? (
              <p className="mt-2 text-sm text-slate-500">
                Digest: {error.digest}
              </p>
            ) : null}
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-sm text-slate-700">
              Try again. If it keeps happening, refresh the page.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={reset}>Try again</Button>
              <Button
                variant="secondary"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

