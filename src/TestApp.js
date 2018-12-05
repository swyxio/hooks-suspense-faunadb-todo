import React, { useState } from 'react';
import { Router, Link } from '@reach/router';

import './App.css';
import './login.css';
import TodoModel from './TodoModel';
import useNetlifyIdentity from './hooks/useNetlifyIdentity';
const model = new TodoModel('react-todos');

let Home = () => {
  const modelRef = React.useRef(model);
  const { user, doLogout, doLogin, authedFetch } = useNetlifyIdentity(
    modelRef.current.onAuthChange
  );
  console.log({ modelRef });
  return (
    <div>
      Home
      <button
        onClick={() =>
          fetch('.netlify/functions/fauna-gateway')
            .then(res => res.json())
            .then(console.log)
        }
      >
        sldkjsd2
      </button>
      <div className="Login">
        {user ? (
          <LoggedIn doLogout={doLogout} authedFetch={authedFetch} />
        ) : (
          <span>
            <a onClick={doLogin}>Login or Sign Up</a>
          </span>
        )}
      </div>
    </div>
  );
};
const LoggedIn = ({ doLogout, authedFetch }) => {
  return (
    <div>
      dlskjd
      <a onClick={doLogout}>Logout</a>
      <button
        onClick={() =>
          authedFetch.get('.netlify/functions/fauna-gateway').then(console.log)
        }
      >
        sldkjsd
      </button>
    </div>
  );
};
const NotFound = () => <div>Sorry, nothing here.</div>;

export default function App(props) {
  return (
    <Router>
      <Home path="/" />
      {/* <div path="list">
        <List path=":listId" />
        <List path=":listId/active" />
        <List path=":listId/completed" />
      </div> */}
      <NotFound default />
    </Router>
  );
}