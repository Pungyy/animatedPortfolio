import { useState } from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { user, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl"
      >
        <h1 className="mb-2 text-3xl font-bold text-white">
          Portfolio CMS
        </h1>

        <p className="mb-8 text-zinc-400">
          Connecte-toi pour accéder au dashboard.
        </p>

        <div className="mb-4">
          <label className="mb-2 block text-sm text-zinc-300">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm text-zinc-300">
            Mot de passe
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500"
          />
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}