import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { store } from './store/store.js'
import { AppHeader } from './cmps/AppHeader.jsx'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <AppHeader/>
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<AboutUs />} path='/about' />
          <Route element={<ToyIndex />} path='/toy' />
          <Route element={<ToyDetails />} path='/toy/:toyId' />
          <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
