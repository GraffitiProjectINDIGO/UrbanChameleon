import React from 'react';
import styled from 'styled-components';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4 logos side by side on larger screens
  justify-content: center;
  grid-gap: 20px;
  background-color: #f6f6f6;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // 1 logo per row on smaller screens
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  }
`;

const StyledImage = styled.img`
  height: 60px; // consistent height for all logos
  width: auto; // width adjusts based on the logo's aspect ratio
  max-width: 100%; // ensures the logo doesn't exceed its container's width

  @media (max-width: 768px) {
    width: 100%; // logo takes full width of its container on smaller screens
  }
`;

const LogosGrid: React.FC = () => {
  return (
    <Grid>
      <LogoContainer>
        <a
          target="_blank"
          href="https://archpro.lbg.ac.at/"
          rel="noopener"
          aria-label="Link"
        >
          <StyledImage
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
          <StyledImage
            src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_GEO_with_text.png"
            alt="Geo TU Wien"
            decoding="async"
            loading="lazy"
          />
        </a>
      </LogoContainer>
      <LogoContainer>
        <a
          target="_blank"
          href="https://spraycity.at/"
          rel="noopener"
          aria-label="Link"
        >
          <StyledImage
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
          <StyledImage
            src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_OEAW-ACDH-CH_smaller.png"
            alt="ACDH-CH"
            decoding="async"
            loading="lazy"
          />
        </a>
      </LogoContainer>
      {/* 
      <LogoContainer>
        <a
          target="_blank"
          href="https://www.wien.gv.at/stadtentwicklung/stadtvermessung/"
          rel="noopener"
          aria-label="Link"
        >
          <StyledImage
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
          <StyledImage
            src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_UPV-GIFLE.png"
            alt="UPV GIFLE"
            decoding="async"
            loading="lazy"
          />
        </a>
      </LogoContainer>*/}
    </Grid>
  );
};

export default LogosGrid;
