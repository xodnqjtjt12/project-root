import styled from "styled-components";

export const AlbumContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

export const PhotoCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const Caption = styled.p`
  padding: 0.5rem;
  text-align: center;
  font-size: 1rem;
  color: #333;
`;
