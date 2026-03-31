import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, XCircle, Star, Trash2 } from 'lucide-react';
import api from '../../services/api';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchTestimonials(token);
  }, [navigate]);

  const fetchTestimonials = async (token) => {
    try {
      const response = await api.get('/admin/testimonials', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const approveTestimonial = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await api.put(`/admin/testimonials/${id}/approve`,
        { isApproved: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTestimonials(prev => prev.map(t => t._id === id ? { ...t, isApproved: true } : t));
    } catch (error) {
      alert('Error approving testimonial');
    }
  };

  const featureTestimonial = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const testimonial = testimonials.find(t => t._id === id);
      await api.put(`/admin/testimonials/${id}/approve`,
        { featured: !testimonial.featured },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTestimonials(prev => prev.map(t => t._id === id ? { ...t, featured: !t.featured } : t));
    } catch (error) {
      alert('Error updating testimonial');
    }
  };

  const deleteTestimonial = async (id) => {
    if (!confirm('Delete this testimonial?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await api.delete(`/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestimonials(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      alert('Error deleting testimonial');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="flex items-center space-x-2 text-gray-400 hover:text-white mb-4"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Manage Testimonials</h1>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : testimonials.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No testimonials yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(testimonial => (
            <div key={testimonial._id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-orange-500 fill-orange-500" />
                  ))}
                </div>
              </div>

              <p className="text-gray-300 italic mb-4">"{testimonial.testimonial}"</p>

              {testimonial.transformation && (
                <div className="bg-slate-800 p-3 rounded mb-4">
                  <p className="text-orange-500 font-semibold text-sm">{testimonial.transformation}</p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {!testimonial.isApproved && (
                  <button
                    onClick={() => approveTestimonial(testimonial._id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-900 hover:bg-green-800 text-green-300 rounded text-sm font-semibold"
                  >
                    <CheckCircle size={16} />
                    <span>Approve</span>
                  </button>
                )}

                {testimonial.isApproved && (
                  <button
                    onClick={() => featureTestimonial(testimonial._id)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded text-sm font-semibold ${
                      testimonial.featured
                        ? 'bg-orange-900 text-orange-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-gray-300'
                    }`}
                  >
                    <Star size={16} />
                    <span>Featured</span>
                  </button>
                )}

                <button
                  onClick={() => deleteTestimonial(testimonial._id)}
                  className="flex items-center space-x-1 px-3 py-2 bg-red-900 hover:bg-red-800 text-red-300 rounded text-sm font-semibold"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                {testimonial.isApproved ? (
                  <p className="text-green-400">✓ Approved</p>
                ) : (
                  <p className="text-yellow-400">⚠ Pending Approval</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;