import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Inter } from 'next/font/google';
import React from 'react';
import { Artifact, getArtifactsData } from '../components/api';
import { EyeIcon } from '../components/EyeIcon';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

interface TablePageProps {
  artifacts: Artifact[];
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'types', headerName: 'Type', width: 150 },
  {
    field: 'imageUrl',
    headerName: 'Depiction',
    width: 150,
    renderCell: (params: GridCellParams) => (
      <img
        src={`${params.value}?image_size=table`}
        alt={params.row.title as string}
        style={{ width: '100%' }}
      />
    ),
  },
  { field: 'longitude', headerName: 'Longitude', width: 150 },
  { field: 'latitude', headerName: 'Latitude', width: 150 },
  {
    field: 'details',
    headerName: 'Details',
    width: 150,
    renderCell: (params: GridCellParams) => (
      <Tooltip title="Details">
        <IconButton onClick={() => console.log('View artifact', params.row.id)}>
          <EyeIcon size={20} fill="#979797" />
        </IconButton>
      </Tooltip>
    ),
  },
];

const TablePage: React.FC<TablePageProps> = ({ artifacts }) => {
  if (!artifacts || artifacts.length === 0) {
    return <p>Loading graffiti data...</p>;
  }

  return (
    <>
      <Navbar />
      <h1>Table Page</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={artifacts}
          columns={columns}
          disableColumnMenu
          disableRowSelectionOnClick
        />
      </div>
      <Footer />
    </>
  );
};

export default TablePage;

export async function getServerSideProps() {
  try {
    const artifacts = await getArtifactsData();
    return {
      props: {
        artifacts,
      },
    };
  } catch (error) {
    console.error('Error fetching artifacts data:', error);
    return {
      props: {
        artifacts: [],
      },
    };
  }
}
