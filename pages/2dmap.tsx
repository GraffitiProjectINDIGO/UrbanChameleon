import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function Map() {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}
