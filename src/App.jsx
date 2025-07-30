import './App.css'
import { Route,Routes ,BrowserRouter as Router} from 'react-router-dom'
import UserRoute from './routes/userRoute'
import AdminRoutes from './routes/adminRoutes'
import ProductRoute from './routes/productRoute'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<UserRoute/>}/>
          <Route path='/admin/*' element={<AdminRoutes/>}/>
          <Route path='/product/*' element={<ProductRoute/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
