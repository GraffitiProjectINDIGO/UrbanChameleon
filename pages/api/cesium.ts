import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const fs = require('fs');
const dir = '/vercel/output/static/cesium';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!process.env.CESIUM_ION_API_KEY) {
      throw new Error('CESIUM_ION_API_KEY environment variable is not set.');
    }

    const cesiumIonUrl = `https://api.cesium.com/v1/assets`;
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.CESIUM_ION_API_KEY}`,
      },
    };

    const { data } = await axios.get(cesiumIonUrl, config);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}
