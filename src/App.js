import React from 'react';
import './App.css';

function App() {
  let givers = ["Scott","Amber","Ashley","Andrew","Katie","Emily","Jen"];
  let receivers = ["Scott","Amber","Ashley","Andrew","Katie","Emily","Jen"];
  let matches = {};
  const prevMatches = {
    "Amber": "Emily",
    "Scott": "Amber",
    "Ashley": "Scott",
    "Andrew": "Ashley",
    "Katie": "Andrew",
    "Emily": "Katie"
  };
  const santaStorageKey = 'secret-santa-matches';
  let matchesAry = [];
  createMatches();

  
  function createMatches() {
    console.log('createMatches');
    matches = {};
    if (!sessionStorage.getItem(santaStorageKey)) {
      givers.map(person => {
        let pool = receivers.filter(name => name !== person);
        let randIndex = Math.floor(Math.random() * pool.length);
        while(pool[randIndex] === prevMatches[person]) {
          randIndex = Math.floor(Math.random() * pool.length);
        }
        matches[person] = pool[randIndex];
        receivers = receivers.filter(n => n !== matches[person]);
      });
      sessionStorage.setItem(santaStorageKey, JSON.stringify(matches));  
    } else {
      matches = JSON.parse(sessionStorage.getItem(santaStorageKey));
    }
    matchesAry = Object.entries(matches);
  }

  function resetMatches() {
    sessionStorage.removeItem(santaStorageKey); 
    // createMatches(); 
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Secret Santa App!</h1>
        <p style={{fontStyle: "italic"}}>Click on your name to see who you are serving this week!</p>
          {
            matchesAry.map(match => {
              return <div style={{margin:15}} onClick={() => alert(`Hello, ${match[0]}!  Your secret sibling to serve this week is...${match[1]}!`)}>{match[0]}</div>
            })
          }
        <div><button onClick={() => resetMatches() }>Clear Matches!</button></div>
      </header>
    </div>
  );
}


export default App;
