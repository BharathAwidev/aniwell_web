type Props = {
  onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: Props) {
  return (
    <header className="flex h-14 items-center gap-3 border-b bg-white px-4">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-xl"
        aria-label="Open menu"
      >
        ☰
      </button>

      <h1 className="text-lg font-semibold">E-Commerce Admin</h1>

      <div className="ml-auto text-sm text-gray-600">
        Admin
      </div>
    </header>
  )
}
