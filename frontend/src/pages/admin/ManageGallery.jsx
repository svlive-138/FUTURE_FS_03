import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';

const ManageGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'equipment',
    image: null,
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/gallery`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGalleries(response.data);
    } catch (err) {
      setError('Failed to load gallery');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setError('Only JPEG, PNG, WebP, and GIF files are allowed');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    setFormData({ ...formData, image: file });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setError('Image file is required');
      return;
    }

    try {
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('category', formData.category);
      uploadData.append('image', formData.image);

      await axios.post(`${API_URL}/gallery`, uploadData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({
        title: '',
        description: '',
        category: 'equipment',
        image: null,
      });
      setShowForm(false);
      fetchGalleries();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add gallery image');
      console.error(err);
    }
  };

  const deleteGallery = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await axios.delete(`${API_URL}/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGalleries();
    } catch (err) {
      setError('Failed to delete image');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Gallery</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>{showForm ? 'Cancel' : 'Add Image'}</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Add Gallery Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="card p-6 mb-8 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Add Gallery Image</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Title <span className="text-gray-400">(Optional)</span></label>
                <input
                  type="text"
                  placeholder="Image title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description <span className="text-gray-400">(Optional)</span></label>
                <textarea
                  placeholder="Image description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Category <span className="text-gray-400">(Optional)</span></label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="equipment">Equipment</option>
                  <option value="classes">Classes</option>
                  <option value="members">Members</option>
                  <option value="facilities">Facilities</option>
                  <option value="transformations">Transformations</option>
                  <option value="events">Events</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Image File <span className="text-orange-400">*</span></label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Upload Image
              </button>
            </div>
          </form>
        )}

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading gallery...</p>
          </div>
        ) : galleries.length === 0 ? (
          <div className="card p-12 text-center">
            <ImageIcon size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400 mb-4">No gallery images yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Add First Image
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((gallery) => (
              <div
                key={gallery._id}
                className="card overflow-hidden hover:border-orange-500 transition"
              >
                {/* Image */}
                <div className="aspect-video bg-slate-800 overflow-hidden">
                  <img
                    src={gallery.imageUrl}
                    alt={gallery.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-bold text-white mb-1">{gallery.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {gallery.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                      {gallery.category}
                    </span>
                    <button
                      onClick={() => deleteGallery(gallery._id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageGallery;
