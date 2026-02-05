import Image from "next/image";

async function getForms() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/forms`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    return [];
  }
}

export default async function Home() {
  const forms = await getForms();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <main className="mx-auto max-w-4xl rounded-md bg-white p-8 shadow">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24">
            <Image src="/aneco-logo.svg" alt="ANECO" width={96} height={96} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">ANECO.PH Digital Survey System</h1>
            <p className="text-sm text-gray-500">Welcome — choose a survey to begin.</p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-medium">Available Surveys</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {forms && forms.length > 0 ? (
              forms.map((f: any) => (
                <div key={f.id} className="rounded-md border p-4 shadow-sm">
                  <h3 className="font-medium">{f.form_name}</h3>
                  <p className="text-sm text-gray-500">{f.form_description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <a href={`/survey/${f.id}`} className="rounded bg-[#2a9d8f] px-3 py-1 text-white">Open</a>
                    <a href={`/api/forms/${f.id}`} className="text-sm text-gray-500">API</a>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-md border p-4">No forms available yet.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
