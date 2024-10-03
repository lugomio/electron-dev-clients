import { Route } from 'react-router-dom'
import { Router } from './lib/electron-router-dom'
import Home from './pages/home'
import Detail from './pages/detail'
import Create from './pages/create'
import About from './pages/about'
import { Layout } from './components/layout'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/customer/:id"
            element={<Detail />}
          />
        </Route>
      }
    />
  )
}
