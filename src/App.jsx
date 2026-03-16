import { useState, useEffect } from 'react';
import PeriodicTable from './components/PeriodicTable';
import ElementModal from './components/ElementModal';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleCloseModal = () => {
    setSelectedElement(null);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes (e.g., user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className={`app ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      {/* Fullscreen Toggle Button */}
      <button 
        className="fullscreen-btn" 
        onClick={toggleFullscreen}
        title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Presentation Mode'}
      >
        {isFullscreen ? '✕' : '⛶'}
      </button>

      {!isFullscreen && (
        <>
          <header className="app-header">
            <h1>Interactive Periodic Table</h1>
            <p className="subtitle">Click on any element to learn more about it</p>
          </header>

          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </>
      )}

      <CategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isFullscreen={isFullscreen}
      />

      <main className={`main-content ${isFullscreen ? 'fullscreen-content' : ''}`}>
        <PeriodicTable 
          onElementClick={handleElementClick}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          isFullscreen={isFullscreen}
        />
      </main>

      <ElementModal 
        element={selectedElement}
        onClose={handleCloseModal}
      />

      {!isFullscreen && (
        <footer className="app-footer">
          <p>Built with React</p>
        </footer>
      )}
    </div>
  );
}

export default App;
