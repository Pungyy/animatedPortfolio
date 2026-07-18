import useAuth from "../../hooks/useAuth";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-8">
      <div>
        <h2 className="text-xl font-semibold">
          Bonjour 👋
        </h2>

        <p className="text-sm text-zinc-400">
          {user?.email}
        </p>
      </div>

      <button
        onClick={signOut}
        className="rounded-lg bg-red-500 px-5 py-2 transition hover:bg-red-600"
      >
        Déconnexion
      </button>
    </header>
  );
}