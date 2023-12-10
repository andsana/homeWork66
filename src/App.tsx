import Appbar from './components/Appbar/Appbar';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import NewMeal from "./components/NewMeal/NewMeal";


function App() {


  return (
    <>
      <header>
        <Appbar/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/new-meal" element={<NewMeal/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
