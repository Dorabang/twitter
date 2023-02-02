import { authService } from 'fbase';
import React from 'react';
import { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAcount] = useState(true);

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
      console.log(error);
    }
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
        <input type='submit' value={newAccount ? 'Create Acount' : 'Login'} />
      </form>

      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
