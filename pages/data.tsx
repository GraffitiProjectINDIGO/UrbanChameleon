import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Artifact, getArtifactsData } from '../components/api';
import Backdrop from '../components/Blackdrop';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from './styles.module.scss';

const GraffitoOverlay = dynamic(() => import('../components/GraffitoOverlay'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface TablePageProps {
  artifacts: Artifact[];
}

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 1, resizable: true },
  { field: 'description', headerName: 'Description', flex: 1, resizable: true },
  {
    field: 'graffitist',
    headerName: 'Graffitist',
    flex: 1,
    resizable: true,
  },
  { field: 'types', headerName: 'Type', flex: 2, resizable: true },
  {
    field: 'colors',
    headerName: 'Colors',
    flex: 1,
    renderCell: (params: GridCellParams) =>
      Array.isArray(params.value) ? params.value.join(', ') : '',
    resizable: true,
  },
  {
    field: 'imageUrl',
    headerName: 'Depiction',
    flex: 1,
    renderCell: (params: GridCellParams) => (
      <img
        src={`${params.value}?image_size=table`}
        alt={params.row.title as string}
        style={{ width: '100%' }}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    ),
    resizable: true,
  },
  {
    field: 'area',
    headerName: 'Area',
    flex: 1,
    resizable: true,
  },
  { field: 'longitude', headerName: 'Longitude', flex: 1, resizable: true },
  { field: 'latitude', headerName: 'Latitude', flex: 1, resizable: true },
];

const TablePage: React.FC<TablePageProps> = ({ artifacts }) => {
  if (!artifacts || artifacts.length === 0) {
    return <p>Loading graffiti data...</p>;
  }
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedGraffito, setSelectedGraffito] = useState<Artifact | null>(
    null,
  );

  const openOverlay = (artifact: Artifact) => {
    setSelectedGraffito(artifact);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedGraffito(null);
  };

  return (
    <>
      <div className={`${styles.dataContainer}`}>
        <Navbar />
        <div
          style={{
            height: 'calc(100vh - 100px)',
            width: '100%',
            paddingTop: '60px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          <DataGrid
            rows={artifacts}
            columns={columns}
            disableColumnMenu
            disableRowSelectionOnClick
            onRowClick={(param) => {
              const artifact = artifacts.find((a) => a.id === param.id);
              if (artifact) {
                openOverlay(artifact);
              }
            }}
          />
        </div>
        <Footer />
      </div>
      {isOverlayOpen && selectedGraffito && <Backdrop onClick={closeOverlay} />}
      <GraffitoOverlay graffito={selectedGraffito} onClose={closeOverlay} />
    </>
  );
};

export default TablePage;

export async function getStaticProps() {
  try {
    const artifacts = await getArtifactsData();
    return {
      props: {
        artifacts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching artifacts data:', error);
    return {
      props: {
        artifacts: [],
      },
      revalidate: 60,
    };
  }
}
