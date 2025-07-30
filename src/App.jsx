import './App.css'
import { Route,Routes ,BrowserRouter as Router} from 'react-router-dom'
import UserRoute from './routes/userRoute'
import AdminRoutes from './routes/adminRoutes'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<UserRoute/>}/>
          <Route path='/admin/*' element={<AdminRoutes/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
