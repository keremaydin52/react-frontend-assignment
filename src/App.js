import React, { useEffect, useState } from "react";
import './App.css';

const axios = require('axios');

function App() {

  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(20);
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if(token == null){
      axios.get('https://typhoon-jasper-celsius.glitch.me/api/token')
      .then(function (response) {
        // handle success
        setToken(response.data.token);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setToken(null);
      });
    }
  });

  function onClickHandler () {
    if(token){
      axios.get('https://typhoon-jasper-celsius.glitch.me/api/data', { 
      params: {from: from, to: to, token: token}
    })
      .then(function (response) {
        // handle success
        setData(response.data.data);
        setToken(response.data.token);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setData(null);
      });
    }
  }

  return (
    <div className="App">
      <label>from: </label>
      <input type='number' value={from} min='1' max='1000' onChange={e => {setFrom(e.target.value)}}/>
      <span>&emsp;</span>
      <label>to: </label>
      <input type='number' value={to} min='1' max='1000' onChange={e => {setTo(e.target.value)}}/>
      <span>&emsp;</span>
      <button onClick={onClickHandler}>load</button>
      <table className="DataTable">
        <thead>
          <tr className="HeaderRow">
            <th>Index</th>
            <th>Slot</th>
            <th>City</th>
            <th>Velocity</th>
          </tr>
        </thead>
        
        
        <tbody>
        {data ? data.map(e => {
          
          return <tr key={e.index}>
            <td>{e.index}</td>
            <td>{e.slot ? e.slot : 0}</td>
            <td>{e.city ? e.city : 'None'}</td>
            <td>{e.velocity ? e.velocity : 0.00}</td>
          </tr>
        }): <tr><td>No Data Yet</td></tr>}
        </tbody>


      </table>
    </div>
  );
}

export default App;
