import React, { useEffect, useState } from 'react';
import { dbService, storageService } from 'fbase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';
import Sweet from 'components/Sweet';

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]);
  const [attachment, setAttachment] = useState('');
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
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
    }
    const sweetObj = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, 'sweets'), sweetObj);
    setSweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
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
        <input type='file' accept='image/*' onChange={onFileChange} />
        <input type='submit' value='Sweet' />
        {attachment && (
          <div>
            <img src={attachment} width='200px' height='200px' alt='이미지' />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
