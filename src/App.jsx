import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Album from "./Album.jsx";
import AlbumAdmin from "./AlbumAdmin.jsx";

function App() {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
      caption: "Cute Puppy",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9",
      caption: "Happy Dog",
    },
  ]);

  const addPhoto = (newPhoto) => {
    setPhotos([...photos, { id: photos.length + 1, ...newPhoto }]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Album photos={photos} />} />
          <Route
            path="/admin"
            element={<AlbumAdmin addPhoto={addPhoto} photos={photos} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
