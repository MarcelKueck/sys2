'use client';

export default function TestEnv() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NODE_ENV: process.env.NODE_ENV,
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(envVars, null, 2)}
      </pre>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">All NEXT_PUBLIC_ variables:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(
            Object.keys(process.env)
              .filter(key => key.startsWith('NEXT_PUBLIC_'))
              .reduce((obj, key) => {
                obj[key] = process.env[key];
                return obj;
              }, {} as Record<string, string | undefined>),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
