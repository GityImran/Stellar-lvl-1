import Link from "next/link";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="app-container py-10 sm:py-14">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">About</h1>
            <p className="mt-2 text-sm text-slate-600 font-semibold">
              A tiny, beginner-friendly Stellar Testnet payment dApp.
            </p>
          </div>
          <Link href="/">
            <Button variant="secondary">Back</Button>
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">What it does</h2>
              <p className="mt-1 text-sm text-slate-600 font-semibold">
                Connect Freighter, view your XLM balance, and send a payment on
                Testnet.
              </p>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              This app intentionally keeps the flow simple so you can learn how
              wallet connection, transaction signing, and Horizon submission work.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">Safety</h2>
              <p className="mt-1 text-sm text-slate-600 font-semibold">
                This is Testnet-only.
              </p>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              The app uses the Stellar <span className="font-semibold">TESTNET</span>{" "}
              network passphrase and talks to the public Testnet Horizon server.
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

