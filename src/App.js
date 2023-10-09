import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
      const apiKey = '39936628-087c1fb511886e6762e01f9c2'; // Replace with your Pixabay API key
      const response = await axios.get(
        `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo`
      );
      setImages(response.data.hits);
      setQuery(''); // Clear the query after fetching images
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect to clear query on component update
  useEffect(() => {
    setQuery('');
  }, [images]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Image Generator</h1>
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search for images..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            {/* Increase image size by using webformatURL */}
            <img
              src={image.webformatURL}
              alt={`Pixabay ${image.id}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
