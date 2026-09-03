import { useState } from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Input from "../../components/admin/ui/Input";
import Button from "../../components/admin/ui/Button";

export default function Login() {
  const { user, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 text-[var(--text-primary)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]"
      >
        <h1 className="text-xl font-semibold tracking-tight">Portfolio</h1>

        <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
          Connecte-toi pour accéder au dashboard.
        </p>

        <div className="mt-8 space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <Input
            label="Mot de passe"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-[var(--danger)]">{error}</p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="mt-6 w-full"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}
