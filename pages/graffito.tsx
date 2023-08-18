import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Artifact, getGraffitoDetails } from '../components/api'; 
import React from 'react';
import styles from './styles.module.scss';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const GraffitoPage: React.FC = () => {
    const router = useRouter();
    const [graffito, setGraffito] = useState<Artifact | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const id = router.query.id as string;
        if (id) {
        const fetchGraffitoDetails = async () => {
            try {
            const data = await getGraffitoDetails(id);
            setGraffito(data);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                    console.error(err);
                }
                throw err;
            }
        }
        fetchGraffitoDetails();
        }
    }, [router.query]);

    if (error) return <p>{error}</p>;
    if (!graffito) return <p>Loading...</p>;

    return (
        <div>
            <Navbar/>
            <div style={{ height: 'calc(100vh - 88px)', width: '100%', paddingTop: '60px', paddingLeft: '10px', paddingRight: '10px' }}>
            <div className="flex justify-end p-4">
            <button 
                onClick={() => router.back()} 
                className="bg-navbar-gradient text-white font-bold py-2 px-4 rounded-full">
                X
            </button>
            </div>
            <h1>{graffito.title}</h1>
            <img src={graffito.imageUrl} alt={graffito.title} />
            <p>{graffito.description}</p>
            </div>
            <Footer />
        </div>
    );
};
  
export default GraffitoPage;
