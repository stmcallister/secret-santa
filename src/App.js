import React from 'react';
import './App.css';

function App() {
  let givers = ["Dad","Mom","Ashley","Andrew","Katie","Emily"];
  let receivers = ["Dad","Mom","Ashley","Andrew","Katie","Emily"];
  let matchesObj = {};

  const santaStorageKey = 'secret-santa-matches';
  let matchesAry = [];

  // if storage item doesn't exist, add defined matches
  localStorage.setItem(santaStorageKey, JSON.stringify(matchesObj));  

  createMatches();

  matchesAry = getCurrentMatchesArray(getCurrentMatches());

  function getPrevReceivers(name, matchesObj) {
    let prevRec = [];
    /* eslint-disable no-unused-vars */
    for (const [key, value] of Object.entries(matchesObj)) {
      prevRec.push(value[name]);
    }
  /* eslint-disable no-unused-vars */

    return prevRec;
  }

  function createMatches() {
    console.log('createMatches');
    let todaysMatches = {};
    const dateStr = new Date().toLocaleDateString().replaceAll(/\//g, '-');

    // get matches from localstorage
    console.log(`santaStorageKey: ${santaStorageKey}`);
    console.log(`storedMatches: ${JSON.stringify(localStorage)}`);

    let storedMatches = JSON.parse(localStorage.getItem(santaStorageKey));
    // If matches already created today don't create new matches
    if(storedMatches[dateStr]) {
      console.log('already created match. exit');
      return;
    } 
    givers.forEach(person => {
      // get available receivers by filtering out giver from list of possible receivers
      let pool = receivers.filter(name => name !== person);

      // get all previous receivers for the giver person
      const prevReceivers = getPrevReceivers(person, storedMatches);

      // randomly pick a number between 0 and length of receivers
      let randIndex = Math.floor(Math.random() * pool.length);
      
      // while the randomly selected receiver matches 
      while(prevReceivers.includes(pool[randIndex])) {
        randIndex = Math.floor(Math.random() * pool.length);
      }
      // match found! set it to the matches object
      todaysMatches[person] = pool[randIndex];

      // review the matched receiver from the available receivers list
      receivers = receivers.filter(n => n !== todaysMatches[person]);
    });

    // add todays matches to matches
    storedMatches[dateStr] = todaysMatches;
    localStorage.setItem(santaStorageKey, JSON.stringify(storedMatches));  
  }

  function getCurrentMatches() {
    const stored = JSON.parse(localStorage.getItem(santaStorageKey));
    // get the last element in the stored matches object and return it
    return stored[Object.keys(stored)[Object.keys(stored).length - 1]];
  }

  function getCurrentMatchesArray(currentObj) {
    return Object.entries(currentObj);
  }

  function resetMatches() {
    localStorage.removeItem(santaStorageKey); 
    createMatches(); 
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
        <div><button onClick={() => resetMatches() }>Get New Matches!</button></div>
      </header>
    </div>
  );
}

export default App;
