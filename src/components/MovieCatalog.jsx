// MovieCatalog.js - Componente para renderizar o Catálogo de Filmes
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CatalogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  align-items: center; /* Centraliza os catálogos horizontalmente */
`;

const Catalog = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  gap: 20px;
  justify-content: center; /* Centraliza os cards dentro do catálogo */
`;
const MovieCard = styled.div`
  position: relative;
  min-width: 200px;
  max-width: 200px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const MovieRank = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const MovieTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
`;

const NewBadge = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: #e50914;
  padding: 5px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  border-radius: 4px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #222;
  padding: 40px;
  border-radius: 8px;
  color: #fff;
  max-width: 600px;
  width: 100%;
`;

const CloseButton = styled.button`
  background: #e50914;
  border: none;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    background: #f40612;
  }
`;

const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies', {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }); // URL do backend para obter os filmes
        setMovies(response.data);
      } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const renderCatalogs = () => {
    const catalogs = [];
    for (let i = 0; i < movies.length; i += 5) {
      const movieBatch = movies.slice(i, i + 5);
      catalogs.push(
        <Catalog key={i}>
          {movieBatch.map((movie, index) => (
            <MovieCard key={index} onClick={() => handleCardClick(movie)}>
              <MovieImage src={`data:image/jpeg;base64,${movie.image}`} alt={movie.title} />
              <MovieRank>#{i + index + 1}</MovieRank>
              <MovieTitle>{movie.title}</MovieTitle>
              {movie.isNew && <NewBadge>Novidade</NewBadge>}
            </MovieCard>
          ))}
        </Catalog>
      );
    }
    return catalogs;
  };

  return (
    <CatalogContainer>
      {renderCatalogs()}
      {selectedMovie && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>Fechar</CloseButton>
            <h2>{selectedMovie.title}</h2>
            <p><strong>Descrição:</strong> {selectedMovie.description}</p>
            <p><strong>Gênero:</strong> {selectedMovie.genre}</p>
          </ModalContent>
        </Modal>
      )}
    </CatalogContainer>
  );
};

export default MovieCatalog;