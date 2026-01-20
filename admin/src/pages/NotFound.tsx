import { Link } from "react-router"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-lg text-gray-600">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Go back to dashboard
      </Link>
    </div>
  )
}
