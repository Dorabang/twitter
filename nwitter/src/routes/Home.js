import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, orderBy } from 'firebase/firestore';
import Sweet from 'components/Sweet';

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]);
  /*
  // 아래 방법을 사용하면 re-render 발생

  const getSweets = async () => {
    const dbSweets = await dbService.collection('sweets').get();
    dbSweets.forEach((document) => {
      const sweetObj = {
        ...document.data(),
        id: document.id,
      };
      setSweets((prev) => [sweetObj, ...prev]);
    });
  };

  useEffect(() => {
      setSweets();
  }, []);

  */
  useEffect(() => {
    dbService
      .collection('sweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const sweetArray = snapshot.docs.reverse().map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSweets(sweetArray);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, 'sweets'), {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
      <div>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
