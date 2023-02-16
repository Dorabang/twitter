import { dbService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';

const Sweet = ({ sweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);
  const SweetTextRef = doc(dbService, 'sweets', `${sweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this sweet?');
    if (ok === true) {
      await deleteDoc(SweetTextRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(SweetTextRef, { text: newSweet });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewSweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Edit your sweet'
              value={newSweet}
              required
              onChange={onChange}
            />
            <input type='submit' value='Update Sweet' />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit</button>
              <button onClick={onDeleteClick}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;
