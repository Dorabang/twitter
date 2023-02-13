import React, { useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';

const Home = () => {
  const [sweet, setSweet] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, 'sweets'), {
      sweet,
      createdAt: Date.now(),
    });
    setSweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={sweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='submit' value='Sweet' />
      </form>
    </div>
  );
};

export default Home;
