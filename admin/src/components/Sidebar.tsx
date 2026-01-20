import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router"
import { sidebarNav,type SidebarItem } from "./sidebarNav"
import { matchRoute } from "../utils/matchRoute"

type Props = {
  mobile?: boolean
  onNavigate?: () => void
}

function Icon({ icon: Icon }: { icon?: React.ElementType }) {
  if (!Icon) return null
  return <Icon size={16} className="shrink-0" />
}

function SidebarItemView({
  item,
  onNavigate,
}: {
  item: SidebarItem
  onNavigate?: () => void
}) {
  const { pathname } = useLocation()
  const hasChildren =
    Array.isArray(item.children) && item.children.length > 0

  const [open, setOpen] = useState(false)

  /* ---------- TOP LEVEL (NO CHILDREN) ---------- */
  if (!hasChildren && item.to) {
    return (
      <NavLink
        to={item.to}
        onClick={onNavigate}
        className={({ isActive }) =>
          `group relative flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition
           ${
             isActive
               ? "bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))]"
               : "text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--color-hover))]"
           }`
        }
      >
        {/* Active indicator */}
        <span className="absolute left-0 top-0 h-full w-0.5 bg-[hsl(var(--color-primary))] opacity-0 group-[.active]:opacity-100" />

        <Icon icon={item.icon} />
        <span>{item.label}</span>
      </NavLink>
    )
  }

  /* ---------- CHILD ACTIVE CHECK ---------- */
  const isAnyChildActive =
    hasChildren &&
    item.children!.some(child =>
      child.match?.some(pattern =>
        matchRoute(pattern, pathname)
      )
    )

  useEffect(() => {
    if (isAnyChildActive) setOpen(true)
  }, [isAnyChildActive])

  return (
    <div>
      {/* ---------- PARENT ---------- */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`group relative flex w-full items-center justify-between rounded px-3 py-2 text-sm font-medium transition
          ${
            isAnyChildActive
              ? "bg-[hsl(var(--color-selected))] text-[hsl(var(--text-primary))]"
              : "text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--color-hover))]"
          }`}
      >
        {/* Active indicator */}
        {isAnyChildActive && (
          <span className="absolute left-0 top-0 h-full w-0.5 bg-[hsl(var(--color-primary))]" />
        )}

        <div className="flex items-center gap-3">
          <Icon icon={item.icon} />
          <span>{item.label}</span>
        </div>

        <svg
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-90" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* ---------- CHILDREN (ANIMATED) ---------- */}
      <div
        className={`ml-4 overflow-hidden border-l border-[hsl(var(--color-border))] pl-2 transition-all duration-200
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="mt-1 space-y-1">
          {item.children!.map(child => {
            const active =
              child.match?.some(pattern =>
                matchRoute(pattern, pathname)
              ) ?? false

            return (
              <NavLink
                key={child.to}
                to={child.to!}
                onClick={onNavigate}
                className={`group relative flex items-center gap-3 rounded px-3 py-1.5 text-sm transition
                  ${
                    active
                      ? "bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))] font-semibold"
                      : "text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--color-hover))]"
                  }`}
              >
                {/* Active indicator */}
                {active && (
                  <span className="absolute left-0 top-0 h-full w-0.5 bg-[hsl(var(--color-primary))]" />
                )}

                <Icon icon={child.icon} />
                <span>{child.label}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({ mobile, onNavigate }: Props) {
  return (
    <aside
      className={`h-full w-64 bg-[hsl(var(--color-surface))]
        border-r border-[hsl(var(--color-border))]
        ${mobile ? "fixed left-0 top-0 z-50 md:hidden" : ""}
      `}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-[hsl(var(--color-border))]">
        <span className="text-sm font-semibold text-[hsl(var(--text-primary))]">
          Admin Panel
        </span>

        {mobile && (
          <button
            onClick={onNavigate}
            aria-label="Close sidebar"
            className="rounded p-1 hover:bg-[hsl(var(--color-hover))]"
          >
            ✕
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="overflow-y-auto px-2 py-3">
        {sidebarNav.map(section => (
          <div key={section.section} className="mb-4">
            <p className="mb-1 px-3 text-xs font-semibold uppercase text-[hsl(var(--text-muted))]">
              {section.section}
            </p>

            <div className="space-y-1">
              {section.items.map(item => (
                <SidebarItemView
                  key={item.label}
                  item={item}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}


// import { useEffect, useState } from "react"
// import { NavLink, useLocation } from "react-router"
// import { sidebarNav, type SidebarItem } from "./sidebarNav"
// import { matchRoute } from "../utils/matchRoute"
// type Props = {
//     mobile?: boolean
//     onNavigate?: () => void
// }

// // /** util: normalize path */
// // const normalize = (p: string) =>
// //   p.replace(/\/+$/, "").split("?")[0]

// // export function SidebarItemView({
// //   item,
// //   onNavigate,
// // }: {
// //   item: SidebarItem
// //   onNavigate?: () => void
// // }) {
// //   const { pathname } = useLocation()
// //   const currentPath = normalize(pathname)

// //   const hasChildren = !!item.children?.length
// //   const [open, setOpen] = useState(false)

// //   // 🔥 EXACT match only
// //   const isExactChildActive = (to: string) =>
// //     normalize(to) === currentPath

// //   // auto open only if ONE child exactly matches
// //   useEffect(() => {
// //     if (
// //       hasChildren &&
// //       item.children!.some(c => isExactChildActive(c.to!))
// //     ) {
// //       setOpen(true)
// //     }
// //   }, [currentPath])

// //   return (
// //     <div>
// //       {/* TOP LEVEL (no children) */}
// //       {!hasChildren && item.to && (
// //         <NavLink
// //           to={item.to}
// //           onClick={onNavigate}
// //           className={({ isActive }) =>
// //             `block rounded px-3 py-2 text-sm font-medium
// //              ${
// //                isActive
// //                  ? "bg-black text-white"
// //                  : "text-gray-700 hover:bg-gray-200"
// //              }`
// //           }
// //         >
// //           {item.label}
// //         </NavLink>
// //       )}

// //       {/* PARENT (toggle only, NEVER highlighted) */}
// //       {hasChildren && (
// //         <>
// //           <button
// //             type="button"
// //             onClick={() => setOpen(o => !o)}
// //             className="flex w-full items-center justify-between rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
// //           >
// //             <span>{item.label}</span>

// //             <svg
// //               className={`h-4 w-4 transition-transform ${
// //                 open ? "rotate-90" : ""
// //               }`}
// //               viewBox="0 0 20 20"
// //               fill="currentColor"
// //             >
// //               <path d="M7 5l6 5-6 5" />
// //             </svg>
// //           </button>

// //           {/* CHILDREN — ONLY ONE CAN MATCH */}
// //           {open && (
// //             <div className="ml-4 mt-1 space-y-1 border-l pl-2">
// //               {item.children!.map(child => {
// //                 const active = isExactChildActive(child.to!)

// //                 return (
// //                   <NavLink
// //                     key={child.to}
// //                     to={child.to!}
// //                     onClick={onNavigate}
// //                     className={`block rounded px-3 py-1.5 text-sm
// //                       ${
// //                         active
// //                           ? "bg-black text-white"
// //                           : "text-gray-600 hover:bg-gray-200"
// //                       }`}
// //                   >
// //                     {child.label}
// //                   </NavLink>
// //                 )
// //               })}
// //             </div>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   )
// // }


// export function SidebarItemView({
//     item,
//     onNavigate,
// }: {
//     item: SidebarItem
//     onNavigate?: () => void
// }) {
//     const { pathname } = useLocation()
//     const hasChildren = Array.isArray(item.children) && item.children.length > 0
//     const [open, setOpen] = useState(false)

//     // ---- TOP LEVEL ITEM (NO CHILDREN) ----
//     if (!hasChildren && item.to) {
//         return (
//             <NavLink
//                 to={item.to}
//                 onClick={onNavigate}
//                 className={({ isActive }) =>
//                     `block rounded px-3 py-2 text-sm font-medium transition
//            ${isActive
//                         ? "bg-black text-white"
//                         : "text-gray-700 hover:bg-gray-200"
//                     }`
//                 }
//             >
//                 {item.label}
//             </NavLink>
//         )
//     }

//     // ---- CHILD MATCH CHECK (SAFE) ----
//     const isAnyChildActive = hasChildren
//         ? item.children!.some(child =>
//             child.match?.some(pattern =>
//                 matchRoute(pattern, pathname)
//             )
//         )
//         : false

//     // auto-open if a child matches
//     useEffect(() => {
//         if (isAnyChildActive) setOpen(true)
//     }, [isAnyChildActive])

//     // ---- PARENT WITH CHILDREN ----
//     return (
//         <div>
//             <button
//                 type="button"
//                 onClick={() => setOpen(o => !o)}
//                 className={`flex w-full items-center justify-between rounded px-3 py-2 text-sm transition
//     ${isAnyChildActive
//                         ? "bg-gray-100 text-gray-900 font-semibold"
//                         : "text-gray-700 hover:bg-gray-200"
//                     }`}
//             >
//                 <span>{item.label}</span>
//                 <svg
//                     className={`ml-2 h-4 w-4 transition-transform ${open ? "rotate-90" : ""
//                         }`}
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                 >
//                     <path
//                         fillRule="evenodd"
//                         d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                         clipRule="evenodd"
//                     />
//                 </svg>
//             </button>

//             {/* ---- CHILDREN (ONLY IF EXISTS) ---- */}
//             {open && hasChildren && (
//                 <div className="ml-4 mt-1 space-y-1 border-l pl-2">
//                     {item.children!.map(child => {
//                         const active = child.match?.some(pattern =>
//                             matchRoute(pattern, pathname)
//                         )

//                         return (
//                             <NavLink
//                                 key={child.to}
//                                 to={child.to!}
//                                 onClick={onNavigate}
//                                 className={`block rounded px-3 py-1.5 text-sm transition
//                   ${active
//                                         ? "bg-black text-white"
//                                         : "text-gray-600 hover:bg-gray-200"
//                                     }`}
//                             >
//                                 {child.label}
//                             </NavLink>
//                         )
//                     })}
//                 </div>
//             )}
//         </div>
//     )
// }
// export default function Sidebar({ mobile, onNavigate }: Props) {
//     return (
//         <aside
//             className={`h-full w-64 bg-white border-r ${mobile ? "fixed left-0 top-0 z-50 md:hidden" : ""
//                 }`}
//         >
//             {/* Header */}
//             <div className="flex h-14 items-center justify-between px-4 border-b">
//                 <span className="font-bold">Admin Panel</span>

//                 {mobile && (
//                     <button
//                         onClick={onNavigate}
//                         aria-label="Close sidebar"
//                         className="rounded p-1 text-xl hover:bg-gray-200"
//                     >
//                         ✕
//                     </button>
//                 )}
//             </div>

//             {/* Nav */}
//             <nav className="overflow-y-auto px-2 py-3">
//                 {sidebarNav.map(section => (
//                     <div key={section.section} className="mb-4">
//                         <p className="mb-1 px-3 text-xs font-semibold uppercase text-gray-500">
//                             {section.section}
//                         </p>

//                         <div className="space-y-1">
//                             {section.items.map(item => (
//                                 <SidebarItemView
//                                     key={item.label}
//                                     item={item}
//                                     onNavigate={onNavigate}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </nav>
//         </aside>
//     )
// }
