import React, { useContext } from 'react';

import { credentialContext } from '../App';
const Welcome = () => {
 const [credentials] = useContext(credentialContext);

  return (
    <div>
      <h1>Welcome {credentials && credentials.username}</h1>
    </div>
  )
}

export default Welcome
