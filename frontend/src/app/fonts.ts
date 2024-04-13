import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  display: 'swap'
});

const poppinsCss = Poppins({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-poppins',
});

export {
  poppins,
  poppinsCss
};