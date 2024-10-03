import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

interface LinkContentProps {
  to: string
  children: React.ReactNode
}

export function LinkContent({
  to,
  children,
}: LinkContentProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return clsx(
          'flex items-center text-sm gap-2 px-2 py-3 rounded group',
          {
            'bg-gray-50 font-semibold text-black': isActive,
            'text-gray-300': !isActive,
          }
        )
      }}
    >
      <span className="truncate flex-1">{children}</span>
    </NavLink>
  )
}
