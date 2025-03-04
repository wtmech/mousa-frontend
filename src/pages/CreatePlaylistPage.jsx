import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const COLORS = [
  '#FF5733', // Coral
  '#33FF57', // Lime Green
  '#3357FF', // Royal Blue
  '#FF33A8', // Pink
  '#33FFEC', // Turquoise
  '#FF5733', // Orange
  '#C133FF', // Purple
  '#FFD133', // Yellow
  '#33FFA8', // Mint
  '#FF3333', // Red
];

const CreatePlaylistPage = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch folders when component mounts
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required');
        }

        const response = await axios.get('/api/playlist-folders', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFolders(response.data);
      } catch (err) {
        console.error('Failed to fetch folders:', err);
        // We don't set error here because folders are optional
      }
    };

    fetchFolders();
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const formData = new FormData();
      formData.append('name', playlistName);
      formData.append('description', description);
      formData.append('color', selectedColor);
      formData.append('isPublic', isPublic);

      if (selectedFolder) {
        formData.append('folder', selectedFolder);
      }

      if (coverImage) {
        formData.append('coverImage', coverImage);
      }

      const response = await axios.post('/api/playlists', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Navigate to the new playlist page
      navigate(`/playlist/${response.data._id}`);
    } catch (err) {
      console.error('Error creating playlist:', err);
      setError(err.response?.data?.message || 'Failed to create playlist');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Create New Playlist</h1>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 mb-6 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Playlist Cover */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-48 h-48 rounded-md overflow-hidden flex items-center justify-center mb-2"
            style={{ backgroundColor: selectedColor }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Playlist cover preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">🎵</span>
            )}
          </div>
          <label className="btn btn-outline btn-sm">
            Upload Cover
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Playlist Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Playlist Name *
          </label>
          <input
            id="name"
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full rounded-md border-border bg-background px-4 py-2"
            placeholder="My Awesome Playlist"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border-border bg-background px-4 py-2"
            placeholder="Add an optional description"
            rows="3"
          />
        </div>

        {/* Color Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Playlist Color
          </label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Folder Selector */}
        <div>
          <label htmlFor="folder" className="block text-sm font-medium mb-1">
            Add to Folder
          </label>
          <select
            id="folder"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full rounded-md border-border bg-background px-4 py-2"
          >
            <option value="">None</option>
            {folders.map((folder) => (
              <option key={folder._id} value={folder._id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        {/* Privacy Toggle */}
        <div className="flex items-center space-x-2">
          <input
            id="isPublic"
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="isPublic" className="text-sm font-medium">
            Make playlist public
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Playlist'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylistPage;