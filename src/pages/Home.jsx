import React from 'react';
import styled from 'styled-components';
import backgroundImg from '../assets/images/imageBackGround.jpg';
import MovieCatalog from '../components/MovieCatalog';

const Home = () => {
  return (
    <HomeContainer>
    <BackgroundImage />
      <MovieCatalog />
  </HomeContainer>
  );
};

export default Home;

// Styled Components
const HomeContainer = styled.div`
  padding: 20px;
  background-color: #141414;
  min-height: 100vh;
`;
const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(${backgroundImg}) no-repeat center center/cover;
  z-index: -1;
`;