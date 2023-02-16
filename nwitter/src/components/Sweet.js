import React from 'react';

const Sweet = ({ sweetObj, isOwner }) => (
  <div>
    <h4>{sweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Edit</button>
        <button>Delete</button>
      </>
    )}
  </div>
);

export default Sweet;
