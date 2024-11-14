// Footer.js - Componente de Rodapé
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 TechFlix. Todos os direitos reservados.</FooterText>
    </FooterContainer>
  );
};

export default Footer;

// Styled Components
const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: #b3b3b3;
  font-size: 14px;
`;

const FooterText = styled.p`
  margin: 0;
`;
