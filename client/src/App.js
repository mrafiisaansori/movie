import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import './App.css';
import Menu from './components/Menu';

import Home from './pages/Home';
import Movies from './pages/Movies';
import Genres from './pages/Genres';
import Admin from './pages/Admin';
import ShowMovie from './pages/Movies/Show';
import ShowMoviesGenre from './pages/Genres/Show';
import MovieForm from './components/movies/MovieForm';


function App() {
  return (
    <Router>
      <div className='container'>
        <div className='row'>
          <h1 className='mt-3'>Go React Movie</h1>
          <div className='mb-3'></div>
          {/* <h1 className='mb-3'/> */}
        </div>
        <div className='row'>
          <div className='col-2'>
          <Menu/>
          </div>
          <div className='col-10'>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route exact path='/movies/:id' element={<ShowMovie/>}></Route>
              <Route path='/movies' element={<Movies/>}></Route>
              <Route path='/genres' element={<Genres/>}></Route>
              <Route path='/genres/:id/movies' element={<ShowMoviesGenre/>}></Route>
              <Route path='/admin' element={<Admin/>}></Route>
              <Route path='/admin/movies/create' element={<MovieForm/>}></Route>
              <Route path='/admin/movies/:id/edit' element={<MovieForm/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
