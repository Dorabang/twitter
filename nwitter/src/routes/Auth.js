import { authService, firebaseInstance } from 'fbase';
import React from 'react';
import { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    console.log(value);

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount === true) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          email&nbsp;
          <input
            type='email'
            placeholder='Email'
            name='email'
            required
            value={email}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Password&nbsp;
          <input
            type='password'
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={onChange}
          />
        </label>
        <span>{error}</span>
        <input type='submit' value={newAccount ? 'Create Acount' : 'Login'} />
        <span onClick={toggleAccount}>
          {newAccount ? 'Login' : 'Create Account'}
        </span>
      </form>

      <div>
        <button name='google' onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name='github' onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
