import React from 'react';
import './App.scss';
import Registration from './views/Registration/Registration'
import Topbar from './components/layout/topbar/topbar';
// import ExampleForm from './views/ExampleForm/ExampleForm';

function App() {
  return (
    <div className="App">
      <Topbar />
      {/* <ExampleForm /> */}
      <Registration />
    </div>
  );
}

export default App;
