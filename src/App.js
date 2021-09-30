import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {ExcelRenderer} from 'react-excel-renderer';

function App() {
  // Hooks used
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([{}]);
  const [selected, setSelected] = useState({});
  const [started, setStarted] = useState(false);
  const [imported, setImported] = useState(false);
  const [selectedRows, setSelectedRows] = useState([{}]);
  const [browse, setBrowse] = useState(true);
  var [counter, setCounter] = useState(1);

  var fileHandler = (event) => {
    let fileObj = event.target.files[0];

    // Store the excel data into its respective hooks (cols and rows)
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        setCols(resp.cols);
        setRows(resp.rows);
        setImported(true);
        console.log(resp.rows);
      }
    });               
  }

  // Stores user selected milestones and first completion date into "selected" object
  async function storeMilestone(milestone, completion) {
    if (counter === 1)
    {
      setBrowse(false);
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
    
    setCounter(counter+1);
    setStarted(true);
    const withoutSelected = rows.filter((data) => data[1] !== completion);
    setRows(withoutSelected);
    const withSelected = rows.filter((data) => data[1] == completion);
    setSelectedRows(withSelected);
    completion = "selected";
  }

  // Refreshes the page/application
  function refresh() {
    window.location.reload();
  } 

  // Sends the JSON Object to the Backend
  async function sendExcel() {
    console.log(selected);

    var res = await fetch("http://localhost:5000/export", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(selected)
    })
    // Receives the Response as blob from the Backend and creates downloadable file
    .then(res => res.blob()) 
    .then(res => {
      console.log(res);
      var link = document.createElement('a');
      // convert into blob
      link.href = window.URL.createObjectURL(res);
      // set a name for the downloadable file
      link.download = 'my_selected_milestones.xlsx';
      // triggers download window
      link.click();
    })
    refresh();
  }

  return (
    <div className="exercise">
      <header className="exercise-header">
        <div onClick={refresh} className="Title">
            Milestones
        </div>
        {browse ? (<div><div className="instruction"> 
          Please choose an Excel Sheet to Import 
        </div>
        <label class="custom-file-upload">
          Browse Files...
          <input type="file" onChange={fileHandler} id="input-file" style={{"padding":"10px"}} />
        </label></div>) : <div onClick={refresh} className="start-over"> Start Over </div>}
        <ul>
          { imported ? (<div className='instruction'>Please choose from the following milestones:</div>)
          : ""}
          { imported ? rows.map((data, i)=> (
            <li key={i}>
                   <div className='milestones'><a onClick={() => storeMilestone(data[0], data[1])}> {data[0]} - {data[1]}</a></div> 
            </li> 
          ))
          : ""}
        </ul>
        <ul>
          { started ? <div className="button" onClick={() => sendExcel()}>Download</div>
              : ""}
        </ul>
      </header>
    </div>
  );
}

export default App;
