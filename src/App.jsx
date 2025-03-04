import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import { Suspense, lazy } from 'react';
import ThemeProvider from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

// Import new pages
import CollectionPage from './pages/CollectionPage';
import ArtistHubPage from './pages/ArtistHubPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import ManageFoldersPage from './pages/ManageFoldersPage';

// Lazy load Feed pages
const FeedPage = lazy(() => import('./pages/feed/FeedPage'));

// Lazy load Collection sub-pages
const PlaylistsPage = lazy(() => import('./pages/collection/PlaylistsPage'));
const LikedMusicPage = lazy(() => import('./pages/collection/LikedMusicPage'));
const PurchasedPage = lazy(() => import('./pages/collection/PurchasedPage'));
const DownloadsPage = lazy(() => import('./pages/collection/DownloadsPage'));
const ExclusiveContentPage = lazy(() => import('./pages/collection/ExclusiveContentPage'));
const HistoryPage = lazy(() => import('./pages/collection/HistoryPage'));

// Lazy load less critical pages
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const PlaylistPage = lazy(() => import('./pages/PlaylistPage'));
const ArtistPage = lazy(() => import('./pages/ArtistPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                {/* Redirect root path to discover page */}
                <Route index element={<Navigate to="/discover" replace />} />
                <Route path="discover" element={<DiscoverPage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="collection" element={<CollectionPage />} />

                {/* Collection sub-routes */}
                <Route
                  path="collection/playlists"
                  element={
                    <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                      <PlaylistsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="collection/liked"
                  element={
                    <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                      <LikedMusicPage />
                    </Suspense>
                  }
                />
                <Route
                  path="collection/purchased"
                  element={
                    <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                      <PurchasedPage />
                    </Suspense>
                  }
                />
                <Route
                  path="collection/downloads"
                  element={
                    <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                      <DownloadsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="collection/exclusive"
                  element={
                    <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                      <ExclusiveContentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="collection/history"
                  element={
                    <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                      <HistoryPage />
                    </Suspense>
                  }
                />

                <Route path="artist-hub" element={<ArtistHubPage />} />

                <Route
                  path="library"
                  element={
                    <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                      <LibraryPage />
                    </Suspense>
                  }
                />

                {/* New Playlist Routes */}
                <Route path="playlists/create" element={<CreatePlaylistPage />} />
                <Route path="playlists/folders" element={<ManageFoldersPage />} />

                <Route
                  path="playlists/:id"
                  element={
                    <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                      <PlaylistPage />
                    </Suspense>
                  }
                />

                <Route
                  path="artists/:id"
                  element={
                    <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                      <ArtistPage />
                    </Suspense>
                  }
                />

                {/* Feed routes */}
                <Route path="feed" element={<FeedPage />} />

                <Route
                  path="*"
                  element={
                    <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                      <NotFoundPage />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
