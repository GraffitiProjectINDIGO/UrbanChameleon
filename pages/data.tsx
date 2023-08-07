import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { Artifact, getArtifactsData } from '../components/api';
import { EyeIcon } from '../components/EyeIcon';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface TablePageProps {
  artifacts: Artifact[];
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'types', headerName: 'Type', flex: 1 },
  {
    field: 'imageUrl',
    headerName: 'Depiction',
    flex: 1,
    renderCell: (params: GridCellParams) => (
      <img
        src={`${params.value}?image_size=table`}
        alt={params.row.title as string}
        style={{ width: '100%' }}
      />
    ),
  },
  { field: 'longitude', headerName: 'Longitude', flex: 1 },
  { field: 'latitude', headerName: 'Latitude', flex: 1 },
  {
    field: 'details',
    headerName: 'Details',
    flex: 1,
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
      <div style={{ height: 'calc(100vh - 100px)', width: '100%', paddingTop: '50px', paddingLeft: '10px', paddingRight: '10px' }}>
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

export async function getStaticProps() {
  try {
    const artifacts = await getArtifactsData();
    return {
      props: {
        artifacts,
      },
      revalidate: 60, // Optional: Time in seconds after which a page re-generation can occur (in this case, 60 seconds)
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
