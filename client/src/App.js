import React, {Fragment, useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Signin from './components/Signin';
import Signup from './components/Signup';
import WarnModal from './components/WarnModal';
import Edit from './components/Edit';
import New from './components/New';
import Home from './components/public/Home';
import Post from './components/public/Post';
import About from './components/public/About';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [delPostId, setDelPostId] = useState(null);
  const [editPostId, setEditPostId] = useState(null);

  const setAuth = boolean => setIsAuthenticated(boolean);
  
  window.addEventListener('storage', (e) => {
    if (e.storageArea != localStorage) return;

    if (e.key === 'token' && e.newValue === null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }

  });

  async function isAuth() {
    try {
      if (localStorage.getItem('token') !== null) {
        const res = await fetch("/auth/verified", {
          method: "GET",
          headers: {
            token: localStorage.getItem('token')
          }
        });

        if (res.status === 200) {
          const parsedRes = await res.json();
          if (parsedRes) {
            setAuth(true);            
          } else {
            setAuth(false);
          }
        }
      }  
      
    } catch (err) {
        console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  }, []);

  return (
    <Fragment>
      <Router>
        <div className="wrapper">
          <Switch>
            <Route
              exact
              path="/signin"
              render={ props =>
                !isAuthenticated ? (
                  <Fragment>
                    <main className="main-content">
                      <Signin {...props} setAuth={setAuth} />
                    </main>
                    <Footer />
                  </Fragment>
                 ) : (
                  <Redirect to="/admin" setAuth={setAuth} />
                 )
              }
            />
            <Route
              exact
              path="/signup"
              render={ props =>
                !isAuthenticated ? (
                  <Fragment>
                    <main className="main-content">
                      <Signup {...props} setAuth={setAuth} />
                    </main>
                    <Footer />
                  </Fragment>
                ) : (
                  <Redirect to="/signin" setAuth={setAuth} />
                )
              }
            />
                
            <Route
              exact
              path="/admin"
              render={ props =>
                isAuthenticated ? (
                  <Fragment>
                    <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />
                    <main className="main-content">
                      <Admin
                        {...props}
                        delPostId={delPostId}
                        setShowModal={setShowModal}
                        setDelPostId={setDelPostId}
                        setEditPostId={setEditPostId}
                      />
                    </main>
                    {showModal ? (
                      <WarnModal 
                        delPostId={delPostId} 
                        setDelPostId={setDelPostId}
                        setShowModal={setShowModal} /> 
                      ) : null}
                    <Footer />
                  </Fragment>
                ) : 
                (
                  <Signin {...props} setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/edit"
              render={ props =>
                isAuthenticated ? (
                  <Fragment>
                    <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />
                    <main className="main-content">
                      <Edit {...props} editPostId={editPostId} />
                    </main>
                    <Footer />
                  </Fragment>
                ) : 
                (
                  <Signin {...props} setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/new"
              render={ props =>
                isAuthenticated ? (
                  <Fragment>
                    <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />
                    <main className="main-content">
                      <New {...props} />
                    </main>
                    <Footer />
                  </Fragment>
                ) : 
                (
                  <Signin {...props} setAuth={setAuth} />
                )
              }
            />
            <Route 
              exact
              path="/"
              render={ props => 
                <Fragment>
                    <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />
                    <main className="main-content">
                      <Home {...props} />
                    </main>
                    <Footer />
                </Fragment>
              }
            />
            <Route 
              exact
              path="/post/:id"
              render={ props => 
                <Fragment>
                    <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />
                    <main className="main-content">
                      <Post {...props} />
                    </main>
                    <Footer />
                </Fragment>
              }
            />
            <Route 
              exact
              path="/about"
              render={ props => 
                <Fragment>
                    <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />
                    <main className="main-content">
                      <About {...props} />
                    </main>
                    <Footer />
                </Fragment>
              }
            />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
