import { Suspense } from 'react';
import '@styles/globals.css';

const RootLayout = ({ children }) => {
  return <Suspense>{children}</Suspense>;
};

export default RootLayout;
