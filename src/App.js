import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

function App() {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([{}]);
  const [selected, setSelected] = useState([[]]);
  const [started, setStarted] = useState(false);
  // var [counter, setCounter] = useState(0);
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
        console.log(resp.rows);
      }
    });               
  }

  async function storeMilestone(milestone, completion) {
    // console.log(milestone);
    // console.log(completion);
    // console.log(counter);
    // selected[counter][0] = milestone;
    // selected[counter][1] = completion;
    selected[milestone] = completion;
    console.log(selected);
    // setCounter(counter++);
    // counter++;
    setStarted(true);
    completion = "selected";
  }

  async function sendExcel() {
    console.log(selected);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Please choose an Excel Sheet to Import </p>
          <input type="file" onChange={fileHandler} style={{"padding":"10px"}} />
        <ul>
          { rows ? rows.map((data, i)=> (
            <li key={i}>
                   <a onClick={() => storeMilestone(data[0], data[1])}> {data[0]} - {data[1]}</a> 
            </li> 
          ))
          : ""}
        </ul>

        {console.log(selected)}

      <ul>
      { started ? <button onClick={() => sendExcel()}>Continue</button>
          : ""}
      </ul>
      </header>
    </div>
  );
}

export default App;
