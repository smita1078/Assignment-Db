import React, { useState } from 'react';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoDescription, setNewPhotoDescription] = useState('');
  const [editing, setEditing] = useState(null);
  const [editingDescription, setEditingDescription] = useState('');

  const AddPhoto = () => {
    const newPhoto = {
      id: photos.length + 1,
      url: newPhotoUrl,
      description: newPhotoDescription,
    };
    setPhotos([...photos, newPhoto]);
    setNewPhotoUrl('');
    setNewPhotoDescription('');
  };

  const DeletePhoto = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const EditPhoto = (id) => {
    const photo = photos.find(photo => photo.id === id);
    setEditing(id);
    setEditingDescription(photo.description);
  };

  const SaveEdit = (id) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, description: editingDescription } : photo
    ));
    setEditing(null);
  };

  return (
    <div className="photo-gallery-container">
      <h1>Photo Gallery</h1>
      <div className="add-photo">
        <input
          type="text"
          placeholder="Enter photo URL"
          value={newPhotoUrl}
          onChange={(e) => setNewPhotoUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter photo description"
          value={newPhotoDescription}
          onChange={(e) => setNewPhotoDescription(e.target.value)}
        />
        <button onClick={AddPhoto}>Add Photo</button>
      </div>
      <div className="photo-gallery">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.url} alt={photo.description} />
            {editing === photo.id ? (
              <div>
                <input 
                  type="text" 
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                />
                <button onClick={() => SaveEdit(photo.id)}>Save</button>
              </div>
            ) : (
              <div>
                <p>{photo.description}</p>
                <button onClick={() => EditPhoto(photo.id)}>Edit</button>
                <button onClick={() => DeletePhoto(photo.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;


