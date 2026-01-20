import { Link } from "react-router"
import MaterialInput from "../../components/MaterialInput"

export default function Login() {
  return (
    <div className="rounded-xl bg-[hsl(var(--color-surface))] p-8 shadow-lg">
      <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">
        Sign in
      </h2>
      <p className="mt-1 text-sm text-[hsl(var(--text-secondary))]">
        Continue to your admin dashboard
      </p>

      <form className="mt-6 space-y-5">
        <MaterialInput label="Email address" type="email" />
        <MaterialInput label="Password" type="password" />

        <button
          type="submit"
          className="
            w-full rounded-md bg-[hsl(var(--color-primary))]
            py-3 text-sm font-semibold
            text-[hsl(var(--color-primary-foreground))]
            shadow-md transition hover:shadow-lg
          "
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[hsl(var(--text-muted))]">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-[hsl(var(--color-primary))]"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}
