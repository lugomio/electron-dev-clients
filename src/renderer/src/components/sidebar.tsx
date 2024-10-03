import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { PanelLeftClose } from 'lucide-react'
import { LinkContent } from './linkcontent'

interface SidebarProps {
  isSideBarOpen: boolean
  toggleSideBar: () => void
}

export function Sidebar({
  isSideBarOpen,
  toggleSideBar,
}: SidebarProps) {
  const isMacOS = process.platform === 'darwin'

  return (
    <Collapsible.Content className="bg-gray-950 flex-shrink-0 border-r border-slate-600 h-screen relative group overflow-hidden data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut">
      <div className="flex-1 flex flex-col h-full gap-8 w-[220px] transition-opacity px-4 group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 duration-200">
        <div className="flex gap-2 justify-between items-center min-h-20 py-5">
          <h2 className="text-white font-semibold uppercase">
            Menu
          </h2>
          <Collapsible.Trigger
            className={clsx(
              'size-7 text-gray-800 bg-gray-100 p-1 rounded-full hover:scale-105',
              {
                'top-[1.125rem]': isMacOS,
                'top-6': !isMacOS,
              }
            )}
            onClick={toggleSideBar}
          >
            <PanelLeftClose className="size-5" />
          </Collapsible.Trigger>
        </div>
        <nav className="flex flex-col gap-8 text-slate-100">
          <section className="flex flex-col gap-px">
            <LinkContent to="/">Clientes</LinkContent>
            <LinkContent to="/create">
              Cadastrar Cliente
            </LinkContent>
            <LinkContent to="/about">Sobre</LinkContent>
          </section>
        </nav>
      </div>
    </Collapsible.Content>
  )
}
