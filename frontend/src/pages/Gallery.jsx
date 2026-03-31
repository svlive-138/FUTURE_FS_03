import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const categories = [
    'equipment',
    'classes',
    'members',
    'facilities',
    'transformations',
    'events',
  ];

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/gallery`);
      setGalleries(response.data || []);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
      setGalleries([]);
    } finally {
      setLoading(false);
    }
  };

  // Group images by category
  const groupedGalleries = categories.map((category) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    categoryKey: category,
    images: galleries.filter(
      (img) => img.category === category && img.isPublished !== false
    ),
  }));

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">Gallery</h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            Explore our state-of-the-art facilities and vibrant community
          </p>
        </div>
      </section>

      {/* Gallery Sections */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading gallery...</p>
            </div>
          ) : galleries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No gallery images yet. Check back soon!</p>
            </div>
          ) : (
            groupedGalleries.map((gallery, gIdx) => {
              if (gallery.images.length === 0) return null;
              return (
                <div key={gIdx} className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-8">{gallery.category}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {gallery.images.map((image, imgIdx) => (
                      <div
                        key={imgIdx}
                        onClick={() => handleImageClick(image)}
                        className="group cursor-pointer relative aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src =
                              'https://via.placeholder.com/300x300?text=' +
                              encodeURIComponent(image.title || 'Image');
                          }}
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black bg-opacity-40">
                          <p className="text-white text-sm font-semibold text-center px-2">
                            {image.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div
            className="relative bg-slate-900 rounded-lg max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-orange-500 transition z-10"
            >
              <X size={24} />
            </button>

            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center rounded-t-lg overflow-hidden">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/600x400?text=' +
                    encodeURIComponent(selectedImage.title || 'Image');
                }}
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-orange-500 font-semibold mb-4 capitalize">
                {selectedImage.category}
              </p>
              <p className="text-gray-400 mb-6">
                {selectedImage.description || 'Experience our world-class facilities and professional training environment.'}
              </p>
              <a href="/membership" className="btn-primary inline-block">
                Join Our Community
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <section className="py-16 md:py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="card p-8">
              <h3 className="text-3xl font-bold text-orange-500 mb-2">10,000+</h3>
              <p className="text-gray-300">Square Feet of Gym Space</p>
            </div>
            <div className="card p-8">
              <h3 className="text-3xl font-bold text-orange-500 mb-2">500+</h3>
              <p className="text-gray-300">Pieces of Equipment</p>
            </div>
            <div className="card p-8">
              <h3 className="text-3xl font-bold text-orange-500 mb-2">24/7</h3>
              <p className="text-gray-300">Access & Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Visit?</h2>
          <p className="text-gray-400 mb-8">
            Come visit our facility today and experience the I Gym difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary px-8 py-3">Get Directions</a>
            <a href="https://wa.me/91YOUR_NUMBER" className="btn-outline px-8 py-3" target="_blank" rel="noopener noreferrer">
              Chat with Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;