import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Star, Plus, Search, ArrowLeft, Play } from 'lucide-react';

// Sample initial movies data with trailer links and extended info
const initialMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    fullDescription: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an old con named Red -- for his integrity and unquenchable sense of hope.",
    posterURL: "https://images.unsplash.com/photo-1489599843726-b4fa1d91b30a?w=300&h=450&fit=crop",
    trailerURL: "https://www.youtube.com/embed/NmzuHjWmXOc",
    rating: 9.3,
    year: 1994,
    genre: "Drama",
    director: "Frank Darabont"
  },
  {
    id: 2,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    fullDescription: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    posterURL: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
    trailerURL: "https://www.youtube.com/embed/EXeTwQWrcwY",
    rating: 9.0,
    year: 2008,
    genre: "Action, Crime, Drama",
    director: "Christopher Nolan"
  },
  {
    id: 3,
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    fullDescription: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    posterURL: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    trailerURL: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    rating: 8.9,
    year: 1994,
    genre: "Crime, Drama",
    director: "Quentin Tarantino"
  },
  {
    id: 4,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    fullDescription: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved.",
    posterURL: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    trailerURL: "https://www.youtube.com/embed/YoHD9XEInc0",
    rating: 8.7,
    year: 2010,
    genre: "Action, Sci-Fi, Thriller",
    director: "Christopher Nolan"
  }
];

// MovieCard Component with React Router Navigation
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={movie.posterURL} 
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{movie.title}</h3>
          <span className="text-sm text-gray-500 ml-2">({movie.year})</span>
        </div>
        <p className="text-sm text-blue-600 mb-2 font-medium">{movie.genre}</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{movie.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(movie.rating)}
          </div>
          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">{movie.rating}/10</span>
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

// Movie Detail Page Component
const MovieDetail = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(id));

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-200 text-yellow-400" />);
    }

    const emptyStars = 10 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Movie not found</h1>
          <button 
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <button 
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Movie Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Left Side - Poster */}
            <div className="lg:w-1/3">
              <img 
                src={movie.posterURL} 
                alt={movie.title}
                className="w-full h-96 lg:h-full object-cover"
              />
            </div>

            {/* Right Side - Details */}
            <div className="lg:w-2/3 p-8">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{movie.year}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{movie.genre}</span>
                  <span className="text-sm">Directed by <strong>{movie.director}</strong></span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center space-x-1">
                  {renderStars(movie.rating)}
                </div>
                <span className="text-lg font-bold text-gray-800 bg-yellow-100 px-3 py-1 rounded">{movie.rating}/10</span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Plot Summary</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{movie.fullDescription}</p>
              </div>
            </div>
          </div>

          {/* Trailer Section */}
          <div className="p-8 bg-gray-50">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Play className="w-6 h-6 text-red-600" />
              Watch Trailer
            </h3>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={movie.trailerURL}
                title={`${movie.title} Trailer`}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Add Movie Form Component
const AddMovieForm = ({ onAddMovie, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    posterURL: '',
    trailerURL: '',
    rating: '',
    year: '',
    genre: '',
    director: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.rating) {
      onAddMovie({
        ...formData,
        rating: Number(formData.rating),
        year: Number(formData.year),
        id: Date.now()
      });
      setFormData({
        title: '',
        description: '',
        fullDescription: '',
        posterURL: '',
        trailerURL: '',
        rating: '',
        year: '',
        genre: '',
        director: ''
      });
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
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Movie</h2>
        <div>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="2023"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre *
              </label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Action, Drama, Comedy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Director *
              </label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Director name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief movie description for cards"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Description
            </label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detailed plot summary for movie detail page"
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trailer URL (YouTube Embed)
            </label>
            <input
              type="url"
              name="trailerURL"
              value={formData.trailerURL}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
            />
            <p className="text-xs text-gray-500 mt-1">Use the embed format: youtube.com/embed/VIDEO_ID</p>
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
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Add Movie
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ movies, onAddMovie }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // Filter movies based on title and rating
  const filteredMovies = movies.filter(movie => {
    const titleMatch = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const ratingMatch = movie.rating >= ratingFilter;
    return titleMatch && ratingMatch;
  });

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
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
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
          onAddMovie={onAddMovie}
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
        />
      </div>
    </div>
  );
};

// Main App Component with React Router
const MovieApp = () => {
  const [movies, setMovies] = useState(initialMovies);

  const handleAddMovie = (newMovie) => {
    // Add default values if not provided
    if (!newMovie.posterURL) {
      newMovie.posterURL = "https://images.unsplash.com/photo-1489599843726-b4fa1d91b30a?w=300&h=450&fit=crop";
    }
    if (!newMovie.trailerURL) {
      newMovie.trailerURL = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    }
    if (!newMovie.fullDescription) {
      newMovie.fullDescription = newMovie.description;
    }
    setMovies([...movies, newMovie]);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage movies={movies} onAddMovie={handleAddMovie} />} 
        />
        <Route 
          path="/movie/:id" 
          element={<MovieDetail movies={movies} />} 
        />
      </Routes>
    </Router>
  );
};

export default MovieApp;