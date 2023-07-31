import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AllTodo from './AllTodo';
import TodoState from './TodoState';
import Backlog from './Backlog';

function App() {
  return (
    <TodoState>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllTodo />} />
        <Route path="/backlog" element={<Backlog/>}/>
      </Routes>
      </BrowserRouter>
    </TodoState>
  );
}

export default App;
