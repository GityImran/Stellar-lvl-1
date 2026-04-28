import Link from "next/link";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function HelpPage() {
  return (
    <main className="min-h-screen">
      <div className="app-container py-10 sm:py-14">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Help</h1>
            <p className="mt-2 text-sm text-slate-600 font-semibold">
              Quick tips for getting unstuck on Testnet.
            </p>
          </div>
          <Link href="/">
            <Button variant="secondary">Back</Button>
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">Freighter</h2>
              <p className="mt-1 text-sm text-slate-600 font-semibold">
                You need Freighter installed and unlocked.
              </p>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              If “Connect Wallet” fails, open the Freighter extension, unlock it,
              and try again.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">Recipient not funded</h2>
              <p className="mt-1 text-sm text-slate-600 font-semibold">
                Testnet accounts must exist before receiving XLM.
              </p>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              If you see a destination error, fund the recipient on Testnet (e.g.
              Friendbot) then retry the payment.
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <h2 className="text-lg font-bold">Network hiccups</h2>
              <p className="mt-1 text-sm text-slate-600 font-semibold">
                Horizon may be slow sometimes.
              </p>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              If requests time out, simply retry. You can also refresh the page
              to reset the UI.
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

