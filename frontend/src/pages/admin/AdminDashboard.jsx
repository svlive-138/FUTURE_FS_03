import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, MessageSquare, Star, TrendingUp } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    if (!token || !userData) {
      navigate('/admin/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchStats(token);
  }, [navigate]);

  const fetchStats = async (token) => {
    try {
      const response = await api.get('/admin/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="text-white text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome, {user?.name}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 btn-outline px-4 py-2"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total Members</p>
              <p className="text-3xl font-bold text-white">{stats.totalMembers || 0}</p>
            </div>
            <Users className="w-12 h-12 text-blue-400 opacity-50" />
          </div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-orange-900 to-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">New Inquiries</p>
              <p className="text-3xl font-bold text-white">{stats.newInquiries || 0}</p>
            </div>
            <MessageSquare className="w-12 h-12 text-orange-400 opacity-50" />
          </div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-pink-900 to-pink-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Pending Testimonials</p>
              <p className="text-3xl font-bold text-white">{stats.pendingTestimonials || 0}</p>
            </div>
            <Star className="w-12 h-12 text-pink-400 opacity-50" />
          </div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-green-900 to-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Growth</p>
              <p className="text-3xl font-bold text-white">+12%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <a href="/admin/memberships" className="card p-6 hover:border-orange-500 cursor-pointer hover:shadow-lg hover:shadow-orange-500/20">
          <h3 className="text-white font-bold mb-2">Manage Members</h3>
          <p className="text-gray-400 text-sm mb-4">View and manage membership inquiries</p>
          <button className="text-orange-500 hover:text-orange-400 text-sm font-semibold">Go →</button>
        </a>

        <a href="/admin/contacts" className="card p-6 hover:border-orange-500 cursor-pointer hover:shadow-lg hover:shadow-orange-500/20">
          <h3 className="text-white font-bold mb-2">Contact Messages</h3>
          <p className="text-gray-400 text-sm mb-4">Reply to member inquiries</p>
          <button className="text-orange-500 hover:text-orange-400 text-sm font-semibold">Go →</button>
        </a>

        <a href="/admin/testimonials" className="card p-6 hover:border-orange-500 cursor-pointer hover:shadow-lg hover:shadow-orange-500/20">
          <h3 className="text-white font-bold mb-2">Testimonials</h3>
          <p className="text-gray-400 text-sm mb-4">Approve member testimonials</p>
          <button className="text-orange-500 hover:text-orange-400 text-sm font-semibold">Go →</button>
        </a>

        <a href="/admin/gallery" className="card p-6 hover:border-orange-500 cursor-pointer hover:shadow-lg hover:shadow-orange-500/20">
          <h3 className="text-white font-bold mb-2">Gallery</h3>
          <p className="text-gray-400 text-sm mb-4">Manage gallery images</p>
          <button className="text-orange-500 hover:text-orange-400 text-sm font-semibold">Go →</button>
        </a>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 card p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="text-gray-400 text-center py-8">
          <p>Activity log will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;