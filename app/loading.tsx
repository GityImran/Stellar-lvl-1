export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="app-container py-10 sm:py-14">
        <div className="glass rounded-2xl p-6">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-blue-200/70" />
          <div className="mt-4 h-4 w-72 animate-pulse rounded bg-blue-200/70" />
          <div className="mt-8 grid gap-3">
            <div className="h-11 animate-pulse rounded-xl bg-blue-200/70" />
            <div className="h-11 animate-pulse rounded-xl bg-blue-200/70" />
            <div className="h-11 animate-pulse rounded-xl bg-blue-200/70" />
          </div>
        </div>
      </div>
    </main>
  );
}

