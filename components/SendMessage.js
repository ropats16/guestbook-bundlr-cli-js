import { useEffect, useState } from 'react';
import { useContract, useSigner } from 'wagmi';

import GuestbookABI from '/deployments/rinkeby/Guestbook.json'

export const SendMessage = () => {
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { data: signerData } = useSigner();

  const guestbookAddress = "0x249fBb7ab5992f22af4E4FFaCb1B686f9686692B";
  const guestbookABI = GuestbookABI.abi;

  const guestbookContract = useContract({
    addressOrName: guestbookAddress,
    contractInterface: guestbookABI,
    signerOrProvider: signerData,
  });

  useEffect(() => {
    if (signerData) {
      setError('');
      setLoading(false);
    } else {
      setLoading(false);
      setError('please connect your wallet');
    }
  }, [signerData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const tx = await guestbookContract.message(newMessage);
      await tx.wait();
      setNewMessage('');
      setLoading(false);
    } catch (error) {
      setError('txn failed, check contract');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{
      marginLeft: '10em', 
      marginRight: '10em'
    }}>
      <form style={{ 
        display: 'flex',
        flexDirection: 'column',
        marginTop: '1em',
        }} 
        onSubmit={(e) => handleSubmit(e)}>
        <textarea
          required
          value={newMessage}
          placeholder='new message'
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            padding: '1em', 
            border: '0.1em solid #e8e8e8',  
            borderRadius: '0.5em', 
            boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)'
        }}
        />
        <button style={{ 
            fontWeight: '700', 
            width: '7em', 
            padding: '0.4em', 
            alignSelf: 'center', 
            marginTop: '1em', 
            border: '0.2em solid white', 
            color: 'white', 
            backgroundColor: '#2b77ff', 
            borderRadius: '0.5em', 
            boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)'
            }} 
            type="submit">
          submit
        </button>
      </form>
    </div>
  );
};
