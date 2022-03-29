import './App.css';
import Home from './components/home';
import Landing from './components/landing';
import DogDetail from './components/dogdetail';
import AddDog from './components/adddog';
import {Route , Routes} from 'react-router'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<DogDetail/>}/>
        <Route path='/add' element={<AddDog/>}/>
      </Routes>
    </div>
  );
}

export default App;
 