// Header.js - Componente de Cabeçalho
import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>TechFlix</Logo>
    </HeaderContainer>
  );
};

export default Header;

// Styled Components
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #141414;
  height: 60px;
`;

const Logo = styled.h1`
  color: #e50914;
  font-size: 32px;
  font-weight: bold;
  margin-left: 20px;
`;
