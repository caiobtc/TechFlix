import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../assets/images/imageBackGround.jpg'; // Caminho atualizado para a imagem de fundo

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'O email é obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    if (!formData.password) errors.password = 'A senha é obrigatória';
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('http://localhost:5000/api/users/login', formData);
        console.log('Login efetuado com sucesso:', formData);
        localStorage.setItem('user', JSON.stringify({ name: 'Usuário Teste' })); // Salvar usuário logado no localStorage
        navigate('/home');
      } catch (error) {
        console.error('Erro ao efetuar login:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container>
      <BackgroundImage />
      <FormContainer>
        <h2>Entrar</h2>
        <Form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
          <Input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
          <Button type="submit">Entrar</Button>
          <RegisterButton type="button" onClick={handleRegister}>Registrar</RegisterButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Login;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
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

const FormContainer = styled.div`
  background: rgba(34, 34, 34, 0.9);
  padding: 40px;
  border-radius: 8px;
  color: #fff;
  max-width: 400px;
  width: 100%;
  z-index: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 15px;
  border-radius: 4px;
  border: none;
  background: #e50914;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

const RegisterButton = styled(Button)`
  background: #555;
  transition: background 0.3s ease;

  &:hover {
    background: #444;
  }
`;

const ErrorText = styled.p`
  color: #e50914;
  font-size: 14px;
`;
