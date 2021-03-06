import { useState, useEffect } from 'react';
import { firebase } from './firebase.js';
import 'firebaseui/dist/firebaseui.css'
import Search from './Search'
import Wallet from './Wallet'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";


function App() {


  const limit = 13;

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [results, setResults] = useState([]);
  const [myGifs, setMyGifs] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [addedList, setAddedList] = useState([]);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const user = firebase.auth().currentUser

  const addGif = (mp4, bitly, userId, resultsIndex) => {
      firebase
        .firestore()
        .collection('gifs')
        .add({
            mp4: mp4,
            bitly: bitly,
            userId: userId
        })
        .then(() => {
          setAddedList([...addedList, resultsIndex])
          fetchGifs()
        }
        );
  };

  const fetchGifs = (userId) => {
    firebase
      .firestore()
      .collection('gifs')
      .where('userId','==',user.uid)
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => {
          return [doc.id, doc.data()]
        });
        setMyGifs(data);
      });
  }

  useEffect(() => {
    if (user !== null) {
      firebase
      .firestore()
      .collection('gifs')
      .where('userId','==',user.uid)
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => {
          return [doc.id, doc.data()]
        });
        setMyGifs(data);
      });
    }
    
  },[isSignedIn, user]);


  const handleChange = (e) => {
    setSearch(e.target.value);
    if (search.length > 2) {
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=faB9WSBNS7W0vQCqGRN1XMFcBWAB9nUo&q=${search}&limit=${limit}&offset=${page*limit}&rating=pg&lang=en`)
      .then(response => response.json())
      .then(json => {
        setResults(
        json.data.map(item => {
          return [item.images.preview.mp4, item.bitly_url];
        })
        );
        setAddedList([]);
      });
    }
  };

  const getMoreGifs = () => {
    setPage(page + 1);
    
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=faB9WSBNS7W0vQCqGRN1XMFcBWAB9nUo&q=${search}&limit=${limit}&offset=${page*limit}&rating=pg&lang=en`)
    .then(response => response.json())
    .then(json => setResults(results.concat(
      json.data.map(item => {
        return [item.images.preview.mp4, item.bitly_url];
      })
    )
    ));
  }

  const handleRemove = (id) => {
    firebase
      .firestore()
      .collection('gifs')
      .doc(id)
      .delete()
      .then(() => fetchGifs());
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
  }


  return (
    <Router className="app">
        
      <div className="header">
        <NavLink  exact activeClassName="selected" className="wallet-link" to="/">Wallet</NavLink>
        <NavLink  activeClassName="selected" className="search-link" to="/search">Search</NavLink>
      </div>

      <Switch>
        <Route path="/search">
          <Search 
            user={user}
            search={search}
            handleChange={handleChange}
            results={results}
            getMoreGifs={getMoreGifs}
            addGif={addGif}
            addedList={addedList}
          />
        </Route>
        <Route path="/">
          <Wallet 
          myGifs={myGifs}
          copyUrl={copyUrl}
          handleRemove={handleRemove}
          user={user}
          />
        </Route>
      </Switch>


    </Router>


);
}

export default App;



