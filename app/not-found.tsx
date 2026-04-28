import Link from "next/link";
import { Button } from "./components/ui/Button";
import { Card, CardContent, CardHeader } from "./components/ui/Card";

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <div className="app-container py-10 sm:py-14">
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-slate-600">404</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">
              Page not found.
            </h1>
            <p className="mt-2 text-sm text-slate-600 font-semibold">
              That route doesn’t exist (yet).
            </p>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button>Back to Stellar Pay</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

