import apiClient from './client';

const musicService = {
  // Get popular tracks
  getPopularTracks: async (limit = 10) => {
    const response = await apiClient.get(`/tracks/popular?limit=${limit}`);
    return response.data;
  },

  // Get track by ID
  getTrack: async (trackId) => {
    const response = await apiClient.get(`/tracks/${trackId}`);
    return response.data;
  },

  // Get all tracks (paginated)
  getTracks: async (page = 1, limit = 20) => {
    const response = await apiClient.get(`/tracks?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Note: For liked tracks functionality, please use playlistService.toggleLikedTrack()
  // and playlistService.isTrackLiked() methods

  // Get albums
  getAlbums: async (limit = 10) => {
    const response = await apiClient.get(`/albums?limit=${limit}`);
    return response.data;
  },

  // Get album by ID
  getAlbum: async (albumId) => {
    const response = await apiClient.get(`/albums/${albumId}`);
    return response.data;
  },

  // Get artists
  getArtists: async (limit = 10) => {
    const response = await apiClient.get(`/artists?limit=${limit}`);
    return response.data;
  },

  // Get artist by ID
  getArtist: async (artistId) => {
    const response = await apiClient.get(`/artists/${artistId}`);
    return response.data;
  },

  // Get artist's albums
  getArtistAlbums: async (artistId) => {
    const response = await apiClient.get(`/artists/${artistId}/albums`);
    return response.data;
  },

  // Get artist's tracks
  getArtistTracks: async (artistId) => {
    const response = await apiClient.get(`/artists/${artistId}/tracks`);
    return response.data;
  },

  // Search music
  search: async (query, type = 'all') => {
    const response = await apiClient.get(`/search?query=${query}&type=${type}`);
    return response.data;
  }
};

export default musicService;