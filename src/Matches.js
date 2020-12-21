function Matches() {
  function getMatches() {
      let givers = ["Dad","Mom","Ashley","Andrew","Katie","Emily"];
    let receivers = ["Dad","Mom","Ashley","Andrew","Katie","Emily"];
    let matches = {};
    const prevMatches = {
      "Mom": "Emily",
      "Dad": "Katie",
      "Ashley": "Mom",
      "Andrew": "Dad",
      "Katie": "Ashley",
      "Emily": "Andrew"
    };
    const dateStr = new Date().toLocaleDateString().replaceAll(/\//g, '-');
    const santaStorageKey = `secrets-${dateStr}`;
    let keysArray = [];
    let matchesAry = [];

    // const santaStorageKey = 'secret-santa-matches';

    // set the current santaStorageKey to the secretKeys item in storage
    if (localStorage.getItem('secretKeys')) {
      keysArray = JSON.parse(localStorage.getItem('secretKeys'));
    }
    console.log(`keysArray: ${keysArray}`);

    keysArray.push(santaStorageKey);
    localStorage.setItem('secretKeys', JSON.stringify(keysArray));

    keysArray.forEach(skey => {
      if (!localStorage.getItem(skey)) {
      
        givers.forEach(person => {
          console.log(`Person: ${person}`);
          let pool = receivers.filter(name => name !== person);
          let randIndex = Math.floor(Math.random() * pool.length);
          while(pool[randIndex] === prevMatches[person]) {
            randIndex = Math.floor(Math.random() * pool.length);
          }
          matches[person] = pool[randIndex];
          receivers = receivers.filter(n => n !== matches[person]);
        });
        localStorage.setItem(skey, JSON.stringify(matches));
      } else {
        matches = JSON.parse(localStorage.getItem(skey));
      }
      matchesAry = Object.entries(matches);
    }

    );
    return matchesAry;
  }
  function getStorageKeys() {

  }
}
export default Matches;