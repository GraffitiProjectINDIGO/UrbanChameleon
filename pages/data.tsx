import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridColumnHeaderParams,
} from '@mui/x-data-grid';
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
  {
    field: 'title',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>{'Title'}</strong>
    ),
    flex: 1,
    resizable: true,
    minWidth: 100,
  },
  {
    field: 'description',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>{'Depiction'}</strong>
    ),
    flex: 1,
    resizable: true,
    minWidth: 100,
  },
  {
    field: 'graffitist',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>{'Graffitist'}</strong>
    ),
    flex: 1,
    resizable: true,
    minWidth: 100,
  },
  {
    field: 'types',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>{'Graffito Type'}</strong>
    ),
    flex: 2,
    resizable: true,
    minWidth: 100,
  },
  {
    field: 'colours',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>{'Colours'}</strong>
    ),
    flex: 1,
    renderCell: (params: GridCellParams) =>
      Array.isArray(params.value) ? params.value.join(', ') : '',
    resizable: true,
    minWidth: 100,
  },
  {
    field: 'imageUrl',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>{'Image'}</strong>
    ),
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
    minWidth: 100,
  },
  {
    field: 'area',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>{'Area (m²)'}</strong>
    ),
    flex: 1,
    resizable: true,
    minWidth: 100,
  },
  {
    field: 'startDate',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>{'Start of Visibility'}</strong>
    ),
    flex: 1,
    resizable: true,
    minWidth: 150,
  },
  {
    field: 'endDate',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>{'End of Visibility'}</strong>
    ),
    flex: 1,
    resizable: true,
    minWidth: 150,
  },
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

  const convertToCSV = (artifacts: Artifact[]) => {
    const header = Object.keys(artifacts[0]).join(',');
    const rows = artifacts.map((artifact) => {
      return Object.values(artifact).join(',');
    });
    return [header, ...rows].join('\n');
  };

  const downloadCSV = (artifacts: Artifact[]) => {
    const csvData = convertToCSV(artifacts);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'artifacts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={`${styles.dataContainer}`}>
        <Navbar />
        <div
          style={{
            height: 'calc(100vh - 150px)',
            width: '100%',
            paddingTop: '60px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          <DataGrid
            pageSize={20}
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
          <button
            className="bg-gradient-to-r from-e95095 via-e95095 to-7049ba text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => downloadCSV(artifacts)}
          >
            <FontAwesomeIcon icon={faDownload} /> Export to CSV
          </button>
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
