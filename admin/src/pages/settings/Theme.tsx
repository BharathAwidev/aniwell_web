import { useEffect, useState } from "react"

type ThemeMode = "light" | "dark" | "system"

const BRAND_COLORS = [
  { name: "Blue", value: "221 83% 53%" },
  { name: "Purple", value: "262 83% 58%" },
  { name: "Green", value: "142 71% 45%" },
  { name: "Orange", value: "24 95% 53%" },
]

export default function ThemeSettings() {
  const [mode, setMode] = useState<ThemeMode>("system")
  const [brand, setBrand] = useState(BRAND_COLORS[0].value)

  /* -----------------------------
     APPLY THEME MODE
  ----------------------------- */
  useEffect(() => {
    const root = document.documentElement

    const apply = (m: ThemeMode) => {
      if (m === "dark") root.classList.add("dark")
      else root.classList.remove("dark")
    }

    if (mode === "system") {
      const isDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
      apply(isDark ? "dark" : "light")
    } else {
      apply(mode)
    }

    localStorage.setItem("theme-mode", mode)
  }, [mode])

  /* -----------------------------
     APPLY BRAND COLOR
  ----------------------------- */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-primary",
      brand
    )
    localStorage.setItem("brand-color", brand)
  }, [brand])

  /* -----------------------------
     LOAD SAVED SETTINGS
  ----------------------------- */
  useEffect(() => {
    const savedMode =
      (localStorage.getItem("theme-mode") as ThemeMode) ??
      "system"

    const savedBrand =
      localStorage.getItem("brand-color") ??
      BRAND_COLORS[0].value

    setMode(savedMode)
    setBrand(savedBrand)
  }, [])

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-xl font-semibold">
        Theme Settings
      </h1>

      {/* -----------------------------
         THEME MODE
      ----------------------------- */}
      <div className="space-y-2">
        <h2 className="text-sm font-medium text-[hsl(var(--color-muted))]">
          Appearance
        </h2>

        <div className="flex gap-2">
          {(["light", "dark", "system"] as ThemeMode[]).map(
            option => (
              <button
                key={option}
                onClick={() => setMode(option)}
                className={`rounded px-4 py-2 text-sm font-medium transition
                  ${
                    mode === option
                      ? "bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))]"
                      : "bg-[hsl(var(--color-hover))] text-[hsl(var(--color-text))]"
                  }`}
              >
                {option[0].toUpperCase() +
                  option.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* -----------------------------
         BRAND COLOR
      ----------------------------- */}
      <div className="space-y-2">
        <h2 className="text-sm font-medium text-[hsl(var(--color-muted))]">
          Brand Color
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {BRAND_COLORS.map(color => (
            <button
              key={color.value}
              onClick={() => setBrand(color.value)}
              className={`flex items-center justify-between rounded border px-3 py-2 text-sm transition
                ${
                  brand === color.value
                    ? "border-[hsl(var(--color-primary))]"
                    : "border-[hsl(var(--color-border))]"
                }`}
            >
              <span>{color.name}</span>
              <span
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor: `hsl(${color.value})`,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
