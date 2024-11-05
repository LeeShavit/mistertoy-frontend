import './assets/style/styles.scss'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { store } from './store/store.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { ReviewExplore } from './pages/ReviewExplore.jsx'

function App() {

  return (
    <div  className="main-layout">
    <Provider store={store}>
      <Router>
        <AppHeader/>
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<AboutUs />} path='/about' />
          <Route element={<ToyIndex />} path='/toy' />
          <Route element={<ToyDetails />} path='/toy/:toyId' />
          <Route element={<ToyEdit />} path='/toy/edit/:toyId?' />
          <Route element={<UserDetails />} path='/user/:userId' />
          <Route element={<ReviewExplore />} path='/review' />
          <Route element={<Dashboard />} path='/dashboard' />
        </Routes>
      </Router>
    </Provider>
    </div>
  )
}

export default App
