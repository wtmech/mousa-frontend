const API_BASE_URL = 'http://localhost:3001/api';

// Auth token handling
const getAuthToken = () => localStorage.getItem('token');

const authHeaders = () => ({
  'Authorization': `Bearer ${getAuthToken()}`,
  'Content-Type': 'application/json'
});

export async function fetchPlaylists() {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists`, {
      headers: authHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch playlists');
    return await response.json();
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
}

export const createPlaylist = async (playlistData) => {
  try {
    // Validate input
    if (!playlistData || typeof playlistData !== 'object') {
      throw new Error('Invalid playlist data format');
    }

    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    // previewImage is already base64, so we can send it directly
    const response = await fetch(`${API_BASE_URL}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playlistData)  // includes previewImage in base64
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create playlist:', error);
    throw error;
  }
};

export async function login(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function validateToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/validate`, {
      headers: authHeaders()
    });
    if (!response.ok) throw new Error('Invalid token');
    return await response.json();
  } catch (error) {
    console.error('Token validation error:', error);
    localStorage.removeItem('token'); // Clear invalid token
    throw error;
  }
}

export async function fetchFolders() {
  try {
    const response = await fetch(`${API_BASE_URL}/folders`, {
      headers: authHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch folders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching folders:', error);
    throw error;
  }
}

export async function fetchTrack(trackId) {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks/${trackId}`, {
      headers: authHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch track');
    return await response.json();
  } catch (error) {
    console.error('Error fetching track:', error);
    throw error;
  }
}