import React from 'react';
import styled from 'styled-components';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 20px;
  background-color: #f6f6f6;
  padding: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogosGrid: React.FC = () => {
  return (
    <Grid>
      {/* First row */}
      <LogoContainer>
        <a
          target="_blank"
          href="https://archpro.lbg.ac.at/"
          rel="noopener"
          aria-label="Link"
        >
          <img
            src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_LBI_ArchPro.svg"
            alt="LBI ArchPro"
            decoding="async"
            loading="lazy"
          />
        </a>
      </LogoContainer>
      <LogoContainer>
        <a
          target="_blank"
          href="https://www.geo.tuwien.ac.at/"
          rel="noopener"
          aria-label="Link"
        >
          <img
            src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_GEO_with_text.png"
            alt="Geo TU Wien"
            decoding="async"
            loading="lazy"
          />
        </a>
      </LogoContainer>
      {/* Second row */}
      <LogoContainer>
        <a
          target="_blank"
          href="https://spraycity.at/"
          rel="noopener"
          aria-label="Link"
        >
          <img
            src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_SprayCity_border-1536x1360.png"
            alt="SprayCity"
            decoding="async"
            loading="lazy"
          />
        </a>
      </LogoContainer>
      <LogoContainer>
        <a
          target="_blank"
          href="https://www.oeaw.ac.at/acdh/acdh-ch-home/"
          rel="noopener"
          aria-label="Link"
        >
          <img
            src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_OEAW-ACDH-CH_smaller.png"
            alt="ACDH-CH"
            decoding="async"
            loading="lazy"
          />
        </a>
      </LogoContainer>
      <LogoContainer>
        <a
          target="_blank"
          href="https://www.wien.gv.at/stadtentwicklung/stadtvermessung/"
          rel="noopener"
          aria-label="Link"
        >
          <img
            src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_Stadt_Wien-1536x701.png"
            alt="Stadt Wien"
            decoding="async"
            loading="lazy"
          />
        </a>
      </LogoContainer>
      <LogoContainer>
        <a
          target="_blank"
          href="http://gifle.webs.upv.es/home.html"
          rel="noopener"
          aria-label="Link"
        >
          <img
            src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_UPV-GIFLE.png"
            alt="UPV GIFLE"
            decoding="async"
            loading="lazy"
          />
        </a>
      </LogoContainer>
    </Grid>
  );
};

export default LogosGrid;
