import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

function App() {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  var fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        setCols(resp.cols);
        setRows(resp.rows);
      }
    });               
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" onChange={fileHandler} style={{"padding":"10px"}} />

      </header>
      <OutTable data={rows} columns={cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
    </div>
  );
}

export default App;
