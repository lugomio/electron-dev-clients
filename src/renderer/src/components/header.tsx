import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { PanelLeftOpen } from 'lucide-react'

interface HeaderProps {
  isSideBarOpen: boolean
  toggleSideBar: () => void
}

export function Header({
  isSideBarOpen,
  toggleSideBar,
}: HeaderProps) {
  const isMacOS = process.platform === 'darwin'

  return (
    <header
      className={clsx(
        'flex items-center gap-4 leading-tight border-b border-slate-600 transition-all duration-200 py-5 px-6 min-h-20 region-drag',
        {
          'pl-24': !isSideBarOpen && isMacOS,
          'w-screen': !isSideBarOpen,
          'w-[calc(100vw-220px)]': isSideBarOpen,
        }
      )}
    >
      <Collapsible.Trigger
        className={clsx(
          'size-7 text-gray-800 bg-gray-100 p-1 rounded-full hover:scale-105',
          { hidden: isSideBarOpen, block: !isSideBarOpen }
        )}
        onClick={toggleSideBar}
      >
        <PanelLeftOpen className="size-5" />
      </Collapsible.Trigger>

      <h1 className="text-white font-bold">Dev Clientes</h1>
    </header>
  )
}
