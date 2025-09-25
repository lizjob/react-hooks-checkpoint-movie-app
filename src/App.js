import React, { useState } from 'react';
import { Star, Plus, Search } from 'lucide-react';

// Sample initial movies data
const initialMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterURL: "https://images.unsplash.com/photo-1489599843726-b4fa1d91b30a?w=300&h=450&fit=crop",
    rating: 9.3
  },
  {
    id: 2,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    posterURL: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
    rating: 9.0
  },
  {
    id: 3,
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    posterURL: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    rating: 8.9
  }
];

// MovieCard Component
const MovieCard = ({ movie }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-200 text-yellow-400" />);
    }

    const emptyStars = 10 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={movie.posterURL} 
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{movie.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(movie.rating)}
          </div>
          <span className="text-sm font-medium text-gray-700">{movie.rating}/10</span>
        </div>
      </div>
    </div>
  );
};

// Filter Component
const Filter = ({ titleFilter, ratingFilter, onTitleChange, onRatingChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4">
        <span className="text-lg font-bold mr-2">⚙️</span>
        <h3 className="text-lg font-semibold text-gray-800">Filter Movies</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Title
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Enter movie title..."
              value={titleFilter}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <select
            value={ratingFilter}
            onChange={(e) => onRatingChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={0}>All Ratings</option>
            <option value={7}>7+ Stars</option>
            <option value={8}>8+ Stars</option>
            <option value={9}>9+ Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// MovieList Component
const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🎬</div>
        <p className="text-gray-600 text-lg">No movies found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

// Add Movie Form Component
const AddMovieForm = ({ onAddMovie, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.rating) {
      onAddMovie({
        ...formData,
        rating: Number(formData.rating),
        id: Date.now()
      });
      setFormData({ title: '', description: '', posterURL: '', rating: '' });
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Movie</h2>
        <div onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter movie title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter movie description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poster URL
            </label>
            <input
              type="url"
              name="posterURL"
              value={formData.posterURL}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/poster.jpg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating (0-10) *
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              min="0"
              max="10"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="8.5"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Movie
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const MovieApp = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // Filter movies based on title and rating
  const filteredMovies = movies.filter(movie => {
    const titleMatch = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const ratingMatch = movie.rating >= ratingFilter;
    return titleMatch && ratingMatch;
  });

  const handleAddMovie = (newMovie) => {
    // If no poster URL provided, use a placeholder
    if (!newMovie.posterURL) {
      newMovie.posterURL = "https://images.unsplash.com/photo-1489599843726-b4fa1d91b30a?w=300&h=450&fit=crop";
    }
    setMovies([...movies, newMovie]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎬 My Movie Collection</h1>
          <p className="text-gray-600">Discover and manage your favorite movies and TV shows</p>
        </div>

        {/* Add Movie Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Movie
          </button>
        </div>

        {/* Filter Component */}
        <Filter
          titleFilter={titleFilter}
          ratingFilter={ratingFilter}
          onTitleChange={setTitleFilter}
          onRatingChange={setRatingFilter}
        />

        {/* Movie List */}
        <MovieList movies={filteredMovies} />

        {/* Add Movie Form Modal */}
        <AddMovieForm
          onAddMovie={handleAddMovie}
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
        />
      </div>
    </div>
  );
};

export default MovieApp;