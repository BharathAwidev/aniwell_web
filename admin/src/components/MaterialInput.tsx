import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

type Props = {
  label: string
  type?: "text" | "email" | "password"
}

export default function MaterialInput({
  label,
  type = "text",
}: Props) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === "password"
  const inputType =
    isPassword && showPassword ? "text" : type

  return (
    <div className="relative">
      {/* INPUT */}
      <input
        type={inputType}
        placeholder=" "
        className="
          peer w-full rounded-md border
          border-[hsl(var(--color-border))]
          bg-transparent px-3 py-3 pr-10 text-sm
          text-[hsl(var(--text-primary))]
          focus:border-[hsl(var(--color-primary))]
          focus:outline-none
        "
      />

      {/* FLOATING LABEL (FIXED) */}
      <label
        className="
          pointer-events-none absolute left-3 z-10
          origin-[0]
          text-sm text-[hsl(var(--text-muted))]
          transition-all

          /* default */
          top-3

          /* float when input has value */
          peer-not-placeholder-shown:-top-2
          peer-not-placeholder-shown:bg-[hsl(var(--color-surface))]
          peer-not-placeholder-shown:px-1
          peer-not-placeholder-shown:text-xs

          /* float on focus OR focus-within */
          peer-focus:-top-2
          peer-focus:bg-[hsl(var(--color-surface))]
          peer-focus:px-1
          peer-focus:text-xs
          peer-focus:text-[hsl(var(--color-primary))]

          peer-focus-within:-top-2
          peer-focus-within:bg-[hsl(var(--color-surface))]
          peer-focus-within:px-1
          peer-focus-within:text-xs
        "
      >
        {label}
      </label>

      {/* SHOW / HIDE PASSWORD */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(p => !p)}
          aria-label={
            showPassword ? "Hide password" : "Show password"
          }
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-[hsl(var(--text-muted))]
            hover:text-[hsl(var(--text-primary))]
            focus:outline-none
          "
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      )}
    </div>
  )
}
