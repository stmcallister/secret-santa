import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let people = ["Scott","Amber","Ashley","Andrew","Katie","Emily","Jen"];
  let receivers = ["Amber","Ashley","Andrew","Katie","Scott","Emily","Jen"];
  let matches = {};
  const prevMatches = {
    "Amber": "Emily",
    "Scott": "Amber",
    "Ashley": "Scott",
    "Andrew": "",
    "Katie": "",
    "Emily": ""
  };

  people.map(person => {
      let pool = receivers.filter(name => name != person);
      matches[person] = pool[Math.floor(Math.random() * pool.length)];
      receivers = receivers.filter(n => n != matches[person]);
  });
  let matchesAry = Object.entries(matches);

  return (
    <div className="App">
      <header className="App-header">
        Secret Santa App!
        <ul>
          {
            matchesAry.map(match => {
              return <div style={{margin:15}} onClick={() => alert(`Hello, ${match[0]}!  Your secret sibling to serve this week is...${match[1]}!`)}>{match[0]}</div>
            })
          }
        </ul>
      </header>
    </div>
  );
}


export default App;
