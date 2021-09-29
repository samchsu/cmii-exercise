import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

function App() {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([{}]);
  const [permRows, setPermRows] = useState([{}]);
  const [list, setList] = useState(rows);
  const [selected, setSelected] = useState({});
  const [started, setStarted] = useState(false);
  const [imported, setImported] = useState(false);
  const [selectedRows, setSelectedRows] = useState([{}]);
  const fs = require('fs');
  var [counter, setCounter] = useState(1);
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
        setPermRows(resp.rows);
        setImported(true);
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
    // selected[counter] = 
    // {
    //   date: completion,
    //   milestone: milestone
    // };
    if (counter === 1)
    {
      selected["Selected milestone(s)"] = [
      {
        milestone: milestone
      }]

      selected["Selected completion date"] = [
      {
        date: completion
      }]
    }
    else 
    {
      selected["Selected milestone(s)"].push({milestone: milestone})
      selected["Selected completion date"].push({})
    }
    
    console.log(selected);
    setCounter(counter+1);
    setStarted(true);
    const withoutSelected = rows.filter((data) => data[1] !== completion);
    setRows(withoutSelected);
    console.log(withoutSelected);
    const withSelected = rows.filter((data) => data[1] == completion);
    setSelectedRows(withSelected);
    completion = "selected";
  }

  async function sendExcel() {
    console.log(selected);
  //   fetch("http://localhost:5000", {
  //     method: "GET",
  //     headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json"
  //     },
  // })

    var res = await fetch("http://localhost:5000/export", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(selected)
    })
    .then(res => {
      console.log(res);
      
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Please choose an Excel Sheet to Import </p>
          <input type="file" onChange={fileHandler} style={{"padding":"10px"}} />
        <ul>
          { imported ? (<p>Please choose from the following milestones:</p>)
          : ""}
          { imported ? rows.map((data, i)=> (
            <li key={i}>
                   <a onClick={() => storeMilestone(data[0], data[1])}> {data[0]} - {data[1]}</a> 
            </li> 
          ))
          : ""}
        </ul>

        {/* <ul>
          { selectedRows ? selectedRows.map((data, i)=> (
            <li key={i}>
                    {data[0]} - {data[1]}
            </li> 
          ))
          : ""}
        </ul> */}

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
