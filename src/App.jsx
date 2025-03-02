import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import { Suspense, lazy } from 'react';
import ThemeProvider from './context/ThemeContext';

// Import new pages
import CollectionPage from './pages/CollectionPage';
import ArtistHubPage from './pages/ArtistHubPage';

// Lazy load less critical pages
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const PlaylistPage = lazy(() => import('./pages/PlaylistPage'));
const ArtistPage = lazy(() => import('./pages/ArtistPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="collection" element={<CollectionPage />} />
            <Route path="artist-hub" element={<ArtistHubPage />} />

            <Route
              path="library"
              element={
                <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                  <LibraryPage />
                </Suspense>
              }
            />

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

            <Route
              path="*"
              element={
                <Suspense fallback={<div className="flex justify-center p-12">Loading...</div>}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
