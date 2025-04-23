// src/Album.jsx
import { AlbumContainer, PhotoCard, PhotoImage, Caption } from "./Albumcss.jsx";

function Album({ photos }) {
  return (
    <AlbumContainer>
      {photos.map((photo) => (
        <PhotoCard key={photo.id}>
          <PhotoImage src={photo.url} alt={photo.caption} />
          <Caption>{photo.caption}</Caption>
        </PhotoCard>
      ))}
    </AlbumContainer>
  );
}

export default Album;
