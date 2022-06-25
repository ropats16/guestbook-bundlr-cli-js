import { useEffect, useState, useCallback } from 'react';
import { useContract, useProvider } from 'wagmi';

import GuestbookABI from '/deployments/rinkeby/Guestbook.json'

export const GetMessages = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const provider = useProvider();

  const guestbookAddress = "0x249fBb7ab5992f22af4E4FFaCb1B686f9686692B";
  const guestbookABI = GuestbookABI.abi;

  const guestbookContract = useContract({
    addressOrName: guestbookAddress,
    contractInterface: guestbookABI,
    signerOrProvider: provider,
  });

  const getTruncatedAddress = (
    address,
    length
  ) => {
    if (!address) {
      return '';
    }

    return `${address.slice(0, length + 2)}...${address.slice(
      address.length - length
    )}`;
  }; 

  const fetchData = useCallback(async () => {
    try {
      const messages = await guestbookContract.getAllMessages();
      let messagesCleaned = [];
      messages.forEach(message => {
        messagesCleaned.push({
          address: message.sender,
          message: message.message,
        })
      });
      setAllMessages(messagesCleaned);
      setError('');
    } catch (error) {
      setError("Contract couldn't be fetched.  Please check your network.");
    }
    setLoading(false);
  }, [guestbookContract]);

  useEffect(() => {
    if (provider) {
      fetchData();
    }
  }, [provider, guestbookContract, fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignSelf: 'stretch', 
        marginTop: '1em', 
        marginLeft: '10em', 
        marginRight: '10em' 
        }}>
      <h2 style={{ alignSelf: 'center' }}>Messages</h2>
      {allMessages.map((message, index) => {
          return (
            <div key={index} style={{ 
                marginTop: '1em',
                padding: '1em', 
                border: '0.1em solid #e8e8e8',  
                borderRadius: '0.5em', 
                boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)'
                }}>
              <div>Address: {getTruncatedAddress(message.address, 3)}</div>
              <div>Message: {message.message}</div>
            </div>)
        })}
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
        onClick={() => fetchData()}>
        refresh
      </button>
    </div>
  );
};
