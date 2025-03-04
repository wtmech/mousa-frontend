import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageFoldersPage = () => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // New folder form state
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderDescription, setNewFolderDescription] = useState('');
  const [newFolderParent, setNewFolderParent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit folder state
  const [editingFolder, setEditingFolder] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editParent, setEditParent] = useState('');
  const [editPublic, setEditPublic] = useState(true);

  // Fetch folders when component mounts
  useEffect(() => {
    fetchFolders();
  }, []);

  // Function to fetch folders
  const fetchFolders = async () => {
    setIsLoading(true);
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
      setError(err.response?.data?.message || 'Failed to load folders');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle creating a new folder
  const handleCreateFolder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const folderData = {
        name: newFolderName,
        description: newFolderDescription,
        isPublic
      };

      if (newFolderParent) {
        folderData.parentFolder = newFolderParent;
      }

      await axios.post('/api/playlist-folders', folderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Reset form and refresh folders
      setNewFolderName('');
      setNewFolderDescription('');
      setNewFolderParent('');
      setIsPublic(true);
      fetchFolders();
    } catch (err) {
      console.error('Error creating folder:', err);
      setError(err.response?.data?.message || 'Failed to create folder');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set up editing a folder
  const handleStartEdit = (folder) => {
    setEditingFolder(folder._id);
    setEditName(folder.name);
    setEditDescription(folder.description || '');
    setEditParent(folder.parentFolder || '');
    setEditPublic(folder.isPublic);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingFolder(null);
  };

  // Save folder edit
  const handleSaveEdit = async (folderId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const folderData = {
        name: editName,
        description: editDescription,
        isPublic: editPublic
      };

      if (editParent) {
        folderData.parentFolder = editParent;
      }

      await axios.put(`/api/playlist-folders/${folderId}`, folderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEditingFolder(null);
      fetchFolders();
    } catch (err) {
      console.error('Error updating folder:', err);
      setError(err.response?.data?.message || 'Failed to update folder');
    }
  };

  // Delete a folder
  const handleDeleteFolder = async (folderId) => {
    if (!window.confirm('Are you sure you want to delete this folder? This will not delete any playlists inside it.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      await axios.delete(`/api/playlist-folders/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchFolders();
    } catch (err) {
      console.error('Error deleting folder:', err);
      setError(err.response?.data?.message || 'Failed to delete folder');
    }
  };

  // Get parent folder name
  const getParentName = (parentId) => {
    const parent = folders.find(folder => folder._id === parentId);
    return parent ? parent.name : 'None';
  };

  if (isLoading && folders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Manage Playlist Folders</h1>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 mb-6 rounded-md">
          {error}
        </div>
      )}

      {/* Create New Folder Form */}
      <div className="bg-secondary/30 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Folder</h2>
        <form onSubmit={handleCreateFolder} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="folderName" className="block text-sm font-medium mb-1">
                Folder Name *
              </label>
              <input
                id="folderName"
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full rounded-md border-border bg-background px-4 py-2"
                placeholder="My Playlist Collection"
                required
              />
            </div>

            <div>
              <label htmlFor="parentFolder" className="block text-sm font-medium mb-1">
                Parent Folder
              </label>
              <select
                id="parentFolder"
                value={newFolderParent}
                onChange={(e) => setNewFolderParent(e.target.value)}
                className="w-full rounded-md border-border bg-background px-4 py-2"
              >
                <option value="">None (Root Level)</option>
                {folders.map((folder) => (
                  <option key={folder._id} value={folder._id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="folderDescription" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="folderDescription"
              value={newFolderDescription}
              onChange={(e) => setNewFolderDescription(e.target.value)}
              className="w-full rounded-md border-border bg-background px-4 py-2"
              placeholder="Optional description for your folder"
              rows="2"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="isPublicFolder"
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="isPublicFolder" className="text-sm font-medium">
              Make folder public
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Folder'}
            </button>
          </div>
        </form>
      </div>

      {/* Folders List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Folders</h2>

        {folders.length === 0 ? (
          <p className="text-muted-foreground">You don't have any folders yet. Create one above!</p>
        ) : (
          <div className="bg-secondary/30 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Parent</th>
                  <th className="px-4 py-3 text-center">Public</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {folders.map((folder) => (
                  <tr key={folder._id} className="border-t border-border">
                    {editingFolder === folder._id ? (
                      // Edit mode
                      <>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full rounded-md border-border bg-background px-2 py-1"
                            required
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full rounded-md border-border bg-background px-2 py-1"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={editParent}
                            onChange={(e) => setEditParent(e.target.value)}
                            className="w-full rounded-md border-border bg-background px-2 py-1"
                          >
                            <option value="">None (Root Level)</option>
                            {folders
                              .filter(f => f._id !== folder._id) // Prevent selecting self
                              .map((f) => (
                                <option key={f._id} value={f._id}>
                                  {f.name}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={editPublic}
                            onChange={(e) => setEditPublic(e.target.checked)}
                            className="rounded"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleSaveEdit(folder._id)}
                              className="text-green-500 hover:text-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      // View mode
                      <>
                        <td className="px-4 py-3 font-medium">{folder.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {folder.description || '—'}
                        </td>
                        <td className="px-4 py-3">
                          {folder.parentFolder ? getParentName(folder.parentFolder) : '—'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {folder.isPublic ? '✓' : '—'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleStartEdit(folder)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteFolder(folder._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFoldersPage;