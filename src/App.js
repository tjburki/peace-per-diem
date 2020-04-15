import React from 'react';
import './App.css';
import Peace from './components/peace/peace';

function App() {
  return (
    <div className="App">
      <div style={{backgroundColor: '#BABC94'}}>
        <div style={{maxWidth: 800, margin: 'auto', padding: 15, fontSize: '1.5rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center'}}>
          <i className='fa fa-dove' style={{marginRight: 10}}></i>
          <div>
          <div>peace per diem</div><div style={{fontSize: '.8rem'}}>once a day positive meditations</div>
          </div>
        </div>
      </div>
      <div style={{padding: 15, flex: 1, maxWidth: 800, margin: 'auto'}}>
        <Peace text='yo yo yo what up' author='joe blow' />
      </div>
    </div>
  );
}

export default App;
