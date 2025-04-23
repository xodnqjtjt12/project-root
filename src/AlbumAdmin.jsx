import { useState } from "react";
import { AdminContainer, Input, Button } from "./AlbumAdmincss.jsx";
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject as delObj } from "firebase/storage";
import { collection } from "firebase/firestore";
import { db } from "./firebase.js";

// 이미지 리사이징 헬퍼 (500×500)
function resizeImage(file, width = 500, height = 500) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d");
      const ratio = Math.max(width / img.width, height / img.height);
      const w = img.width * ratio, h = img.height * ratio;
      ctx.drawImage(img, (width-w)/2, (height-h)/2, w, h);
      canvas.toBlob(blob => {
        URL.revokeObjectURL(url);
        blob ? resolve(blob) : reject("toBlob failed");
      }, "image/png", 0.9);
    };
    img.onerror = e => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

function AlbumAdmin({ addPhoto, photos, updatePhoto, deletePhoto }) {
  const [file, setFile] = useState(null), [caption, setCaption] = useState(""), [progress, setProgress] = useState(0);

  const handleAdd = async () => {
    if (!file || !caption) return;
    const blob = await resizeImage(file);
    const path = `albums/${file.name}_${Date.now()}_500x500.png`;
    const sRef = ref(storage, path);
    const task = uploadBytesResumable(sRef, blob);

    task.on(
      "state_changed",
      snap => setProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
      console.error,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        await addPhoto({ url, caption, path });    // App.addPhoto 호출
        setFile(null); setCaption(""); setProgress(0);
      }
    );
  };

  return (
    <AdminContainer>
      <h2>Add Photo (500×500)</h2>
      <Input type="file" onChange={e => setFile(e.target.files[0])} />
      <Input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Caption" />
      <Button onClick={handleAdd}>Upload{progress?` (${progress}%)`:null}</Button>

      <hr />

      <div className="grid gap-4">
        {photos.map(p => (
          <div key={p.id} className="card">
            <img src={p.url} className="thumb" alt="" />
            <Input
              value={p.caption}
              onChange={e => updatePhoto(p.id, e.target.value)}
            />
            <Button onClick={() => deletePhoto(p.id, p.path)}>삭제</Button>
          </div>
        ))}
      </div>
    </AdminContainer>
  );
}

export default AlbumAdmin;
