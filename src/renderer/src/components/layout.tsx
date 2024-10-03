import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from './header'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState, useEffect } from 'react'
import { Sidebar } from './sidebar'

export function Layout() {
  const navigate = useNavigate()
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)

  function toggleSideBar() {
    setIsSideBarOpen(!isSideBarOpen)
  }

  useEffect(() => {
    function handleNavigate() {
      navigate('/create')
    }

    const unsub = window.api.onNewCustomer(handleNavigate)

    return () => {
      unsub()
    }
  }, [navigate])

  return (
    <Collapsible.Root
      defaultOpen
      className="h-screen w-screen bg-gray-950 text-slate-100 flex"
    >
      <Sidebar
        isSideBarOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
      />
      <div className="flex flex-col flex-1 max-h-screen">
        <Header
          isSideBarOpen={isSideBarOpen}
          toggleSideBar={toggleSideBar}
        />
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}
