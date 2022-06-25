import Head from 'next/head';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SendMessage, GetMessages } from '../components';

export default function Home() {
  return (
    <div className={''}>
      <Head>
        <title>Guestbook App</title>
        <meta name="description" content="Generated by npx create-web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={{ padding: '1rem' }}>
        <ConnectButton />
      </header>

      <main
        style={{
          minHeight: '60vh',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Ropats&apos; Guestbook</h1>
        <SendMessage />
        <GetMessages />
      </main>
    </div>
  );
}
