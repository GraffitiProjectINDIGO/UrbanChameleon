// api.ts
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

      return {
        id: feature['@id'].split('/').pop(),
        title: feature.properties.title || '',
        description: feature.properties.description || '',
        imageUrl: feature.depictions?.[0]?.url || '',
        longitude: coordinates[0] || null,
        latitude: coordinates[1] || null,
        types: feature.types?.[0]?.label || '',
        startDate: feature.when?.timespans?.[0]?.start?.earliest || '',
        endDate: feature.when?.timespans?.[0]?.end?.earliest || '',
      };
    });
    return artifacts;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
}
