export interface Artifact {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  longitude: number | null;
  latitude: number | null;
  types: string;
  startDate: string;
  endDate: string;
  colors: string[]; 
  area: number | null;
  graffitist?: string;
}

export async function getArtifactsData(): Promise<Artifact[]> {
  try {
    const response = await fetch(
      'https://indigo.openatlas.eu/api/system_class/artifact',
    );
    const { results } = await response.json();
    const artifacts: Artifact[] = results.map((artifact: any) => {
      const feature = artifact.features[0];
      let coordinates: number[] = [];
      if (feature.geometry?.type === 'Point') {
        coordinates = feature.geometry?.coordinates || [];
      }
    
      const colorTypes = ["red", "black", "white"];
      const colors = feature.types
        ? feature.types
            .filter((type: any) => colorTypes.includes(type.label))
            .map((colorType: any) => colorType.label)
        : [];

      const areaType = feature.types?.find((type: any) => type.label === "area");
      const area = areaType ? areaType.value : null;

      const graffitistRelation = artifact.relations?.find(
        (relation: any) => relation.relationType === "crm:P52 has current owner" && relation.relationSystemClass === "person"
      );
      const graffitist = graffitistRelation?.label || '';

      return {
        id: feature['@id'],
        title: feature.properties.title || '',
        description: feature.properties.description || '',
        imageUrl: feature.depictions?.[0]?.url || '',
        longitude: coordinates[0] || null,
        latitude: coordinates[1] || null,
        types: feature.types?.[0]?.label || '',
        startDate: feature.when?.timespans?.[0]?.start?.earliest || '',
        endDate: feature.when?.timespans?.[0]?.end?.earliest || '',
        colors: colors  || '',
        area: area  || '',
        graffitist: graffitist  || '',
      };
    });
    return artifacts;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export async function getGraffitoDetails(id: string): Promise<Artifact> {
  try {
    const response = await fetch(`https://indigo.openatlas.eu/api/system_class/artifact/${id}`);
    const artifactData = await response.json();

    if (!artifactData.features || artifactData.features.length === 0) {
      console.warn('No features found for the given graffito ID:', id);
      return {
        id: '',
        title: 'Unknown Graffito',
        description: 'Details for this graffito are not available.',
        imageUrl: '',
        longitude: null,
        latitude: null,
        types: '',
        startDate: '',
        endDate: '',
        colors: [],
        area: null,
        graffitist: '',
      };
    }

    if (!artifactData.features || artifactData.features.length === 0) {
      throw new Error('No features found for the given graffito ID.');
    }

    const feature = artifactData.features[0];
    let coordinates: number[] = [];
    if (feature.geometry?.type === 'Point') {
      coordinates = feature.geometry?.coordinates || [];
    }

    const colorTypes = ["red", "black", "white"];
    const colors = feature.types
      ? feature.types
          .filter((type: any) => colorTypes.includes(type.label))
          .map((colorType: any) => colorType.label)
      : [];

    const areaType = feature.types?.find((type: any) => type.label === "area");
    const area = areaType ? areaType.value : null;

    const graffitistRelation = artifactData.relations?.find(
      (relation: any) => relation.relationType === "crm:P52 has current owner" && relation.relationSystemClass === "person"
    );
    const graffitist = graffitistRelation?.label || '';

    const graffito: Artifact = {
      id: feature['@id'],
      title: feature.properties.title || '',
      description: feature.properties.description || '',
      imageUrl: feature.depictions?.[0]?.url || '',
      longitude: coordinates[0] || null,
      latitude: coordinates[1] || null,
      types: feature.types?.[0]?.label || '',
      startDate: feature.when?.timespans?.[0]?.start?.earliest || '',
      endDate: feature.when?.timespans?.[0]?.end?.earliest || '',
      colors: colors  || '',
      area: area  || '',
      graffitist: graffitist  || '',
    };
    return graffito;
  } catch (err) {
    console.error('Error fetching graffito details:', err);
    throw new Error('Failed to fetch graffito details.');
  }
}
