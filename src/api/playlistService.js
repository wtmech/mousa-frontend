import apiClient from './client';

const playlistService = {
  // Get user playlists
  getUserPlaylists: async () => {
    const response = await apiClient.get('/playlists');
    return response.data;
  },

  // Get playlist by ID
  getPlaylist: async (playlistId) => {
    const response = await apiClient.get(`/playlists/${playlistId}`);
    return response.data;
  },

  // Create new playlist
  createPlaylist: async (playlistData) => {
    const response = await apiClient.post('/playlists', playlistData);
    return response.data;
  },

  // Update playlist
  updatePlaylist: async (playlistId, updates) => {
    const response = await apiClient.put(`/playlists/${playlistId}`, updates);
    return response.data;
  },

  // Delete playlist
  deletePlaylist: async (playlistId) => {
    const response = await apiClient.delete(`/playlists/${playlistId}`);
    return response.data;
  },

  // Add track to playlist
  addTrackToPlaylist: async (playlistId, trackId) => {
    const response = await apiClient.post(`/playlists/${playlistId}/tracks`, { trackId });
    return response.data;
  },

  // Remove track from playlist
  removeTrackFromPlaylist: async (playlistId, trackId) => {
    const response = await apiClient.delete(`/playlists/${playlistId}/tracks/${trackId}`);
    return response.data;
  },

  // Toggle track in liked playlist (add/remove)
  toggleLikedTrack: async (trackId) => {
    const response = await apiClient.post(`/playlists/liked/toggle/${trackId}`);
    return response.data;
  },

  // Check if track is liked
  isTrackLiked: async (trackId) => {
    const response = await apiClient.get(`/playlists/liked/check/${trackId}`);
    return response.data.isLiked;
  },

  // Get playlist folders
  getPlaylistFolders: async () => {
    const response = await apiClient.get('/playlist-folders');
    return response.data;
  },

  // Create playlist folder
  createPlaylistFolder: async (folderData) => {
    const response = await apiClient.post('/playlist-folders', folderData);
    return response.data;
  },

  // Update playlist folder
  updatePlaylistFolder: async (folderId, updates) => {
    const response = await apiClient.put(`/playlist-folders/${folderId}`, updates);
    return response.data;
  },

  // Delete playlist folder
  deletePlaylistFolder: async (folderId) => {
    const response = await apiClient.delete(`/playlist-folders/${folderId}`);
    return response.data;
  },

  // Get folder statistics
  getFolderStats: async (folderId) => {
    const response = await apiClient.get(`/playlist-folders/${folderId}/stats`);
    return response.data;
  },

  // Move playlists to folder
  movePlaylistsToFolder: async (playlistIds, folderId) => {
    const response = await apiClient.post('/playlists/batch-update', {
      playlistIds,
      updates: { folder: folderId }
    });
    return response.data;
  }
};

export default playlistService;