import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Player from './Player';
import TopBar from './TopBar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg overflow-hidden">
      {/* Sidebar - Width will be handled by the Sidebar component's state */}
      <div className="h-screen overflow-hidden">
        <Sidebar />
      </div>

      {/* Main Content - Will adapt to the sidebar width due to flex-1 */}
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        {/* Top Navigation Bar */}
        <TopBar />

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 pb-24">
          <Outlet />
        </main>
      </div>

      {/* Player - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Player />
      </div>
    </div>
  );
};

export default MainLayout;