import { Link } from "react-router"
import MaterialInput from "../../components/MaterialInput"

export default function Signup() {
  return (
    <div className="rounded-xl bg-[hsl(var(--color-surface))] p-8 shadow-lg">
      <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">
        Create account
      </h2>
      <p className="mt-1 text-sm text-[hsl(var(--text-secondary))]">
        Start managing your store
      </p>

      <form className="mt-6 space-y-5">
        <MaterialInput label="Full name" />
        <MaterialInput label="Email address" />
        <MaterialInput label="Password" type="password" />

        <button
          type="submit"
          className="
            w-full rounded-md
            bg-[hsl(var(--color-primary))]
            py-3 text-sm font-semibold
            text-[hsl(var(--color-primary-foreground))]
            shadow-md
            transition
            hover:shadow-lg
          "
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[hsl(var(--text-muted))]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-[hsl(var(--color-primary))]"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
