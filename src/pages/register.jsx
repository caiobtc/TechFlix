import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../assets/images/imageBackGround.jpg'; // Caminho atualizado para a imagem de fundo

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'O nome é obrigatório';
    if (!formData.email) {
      errors.email = 'O email é obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    if (!formData.password) errors.password = 'A senha é obrigatória';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
    }
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
        await axios.post('http://localhost:5000/api/users/register', formData);
        console.log('Formulário enviado com sucesso:', formData);
        navigate('/'); // Redireciona para a página de login após o registro
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <FormContainer>
        <h2>Cadastro</h2>
        <Form onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
          <Input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
          <Input type="password" name="confirmPassword" placeholder="Confirme a Senha" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
          <Button type="submit">Cadastrar</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Register;

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

const ErrorText = styled.p`
  color: #e50914;
  font-size: 14px;
`;