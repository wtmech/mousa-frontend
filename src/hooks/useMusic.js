import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { musicService, playlistService } from '../api';

export function usePopularTracks(limit = 10) {
  return useQuery({
    queryKey: ['popularTracks', limit],
    queryFn: () => musicService.getPopularTracks(limit),
  });
}

export function useTracks(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['tracks', page, limit],
    queryFn: () => musicService.getTracks(page, limit),
  });
}

export function useTrack(trackId) {
  return useQuery({
    queryKey: ['track', trackId],
    queryFn: () => musicService.getTrack(trackId),
    enabled: !!trackId, // Only run if trackId exists
  });
}

export function useAlbums(limit = 10) {
  return useQuery({
    queryKey: ['albums', limit],
    queryFn: () => musicService.getAlbums(limit),
  });
}

export function useAlbum(albumId) {
  return useQuery({
    queryKey: ['album', albumId],
    queryFn: () => musicService.getAlbum(albumId),
    enabled: !!albumId, // Only run if albumId exists
  });
}

export function useArtists(limit = 10) {
  return useQuery({
    queryKey: ['artists', limit],
    queryFn: () => musicService.getArtists(limit),
  });
}

export function useArtist(artistId) {
  return useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => musicService.getArtist(artistId),
    enabled: !!artistId, // Only run if artistId exists
  });
}

export function useArtistAlbums(artistId) {
  return useQuery({
    queryKey: ['artistAlbums', artistId],
    queryFn: () => musicService.getArtistAlbums(artistId),
    enabled: !!artistId, // Only run if artistId exists
  });
}

export function useArtistTracks(artistId) {
  return useQuery({
    queryKey: ['artistTracks', artistId],
    queryFn: () => musicService.getArtistTracks(artistId),
    enabled: !!artistId, // Only run if artistId exists
  });
}

export function useSearch(query, type = 'all') {
  return useQuery({
    queryKey: ['search', query, type],
    queryFn: () => musicService.search(query, type),
    enabled: !!query, // Only run if query exists
  });
}

export function usePlaylists() {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: () => playlistService.getUserPlaylists(),
  });
}

export function usePlaylist(playlistId) {
  return useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: () => playlistService.getPlaylist(playlistId),
    enabled: !!playlistId, // Only run if playlistId exists
  });
}

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (playlistData) => playlistService.createPlaylist(playlistData),
    onSuccess: () => {
      // Invalidate playlists query to refetch
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
  });
}

export function useAddTrackToPlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playlistId, trackId }) =>
      playlistService.addTrackToPlaylist(playlistId, trackId),
    onSuccess: (_, variables) => {
      // Invalidate specific playlist query to refetch
      queryClient.invalidateQueries({ queryKey: ['playlist', variables.playlistId] });
    },
  });
}

export function useToggleLikedTrack() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackId) => playlistService.toggleLikedTrack(trackId),
    onSuccess: () => {
      // Invalidate queries that might be affected
      queryClient.invalidateQueries({ queryKey: ['likedTracks'] });
      queryClient.invalidateQueries({ queryKey: ['userLibrary'] });
    },
  });
}

export function useCheckTrackLiked(trackId) {
  return useQuery({
    queryKey: ['trackLiked', trackId],
    queryFn: () => playlistService.isTrackLiked(trackId),
    enabled: !!trackId,
  });
}