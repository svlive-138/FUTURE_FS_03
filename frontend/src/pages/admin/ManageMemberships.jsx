import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2, Edit2, X } from 'lucide-react';
import api from '../../services/api';

const ManageMemberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [editForm, setEditForm] = useState({
    status: '',
    paymentStatus: 'pending',
    paymentMethod: 'cash',
    paymentDate: '',
    notes: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchMemberships(token);
  }, [navigate]);

  const fetchMemberships = async (token) => {
    try {
      const response = await api.get('/membership', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMemberships(response.data);
    } catch (error) {
      console.error('Error fetching memberships:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (membership) => {
    setSelectedMembership(membership);
    setEditForm({
      status: membership.status || 'pending',
      paymentStatus: membership.paymentStatus || 'pending',
      paymentMethod: membership.paymentMethod || 'cash',
      paymentDate: membership.paymentDate ? membership.paymentDate.split('T')[0] : '',
      notes: membership.notes || '',
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await api.put(`/membership/${selectedMembership._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMemberships(prev => prev.map(m => 
        m._id === selectedMembership._id ? { ...m, ...editForm } : m
      ));
      setShowEditModal(false);
      alert('Membership updated successfully!');
    } catch (error) {
      alert('Error updating membership');
      console.error(error);
    }
  };

  const deleteMembership = async (id) => {
    if (!confirm('Are you sure you want to delete this membership?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await api.delete(`/membership/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMemberships(prev => prev.filter(m => m._id !== id));
    } catch (error) {
      alert('Error deleting membership');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await api.put(`/membership/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMemberships(prev => prev.map(m => m._id === id ? { ...m, status: newStatus } : m));
    } catch (error) {
      alert('Error updating membership');
    }
  };

  const filteredMemberships = filter === 'all' 
    ? memberships 
    : memberships.filter(m => m.status === filter);

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-4"
        >
          <ChevronLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold text-white mb-8">Manage Memberships</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'confirmed', 'expired'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition ${
              filter === status
                ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Memberships Table */}
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : filteredMemberships.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No memberships found</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-4 text-white font-bold">Name</th>
                <th className="text-left p-4 text-white font-bold">Email</th>
                <th className="text-left p-4 text-white font-bold">Plan</th>
                <th className="text-left p-4 text-white font-bold">Status</th>
                <th className="text-left p-4 text-white font-bold">Date</th>
                <th className="text-left p-4 text-white font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMemberships.map(membership => (
                <tr key={membership._id} className="border-b border-slate-800 hover:bg-slate-900">
                  <td className="p-4 text-white">{membership.name}</td>
                  <td className="p-4 text-gray-300">{membership.email}</td>
                  <td className="p-4 text-gray-300 capitalize">{membership.plan}</td>
                  <td className="p-4">
                    <select
                      value={membership.status}
                      onChange={(e) => updateStatus(membership._id, e.target.value)}
                      className="px-3 py-1 rounded bg-slate-700 text-white text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="expired">Expired</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-300 text-sm">
                    {new Date(membership.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => openEditModal(membership)}
                      className="p-2 hover:bg-slate-700 rounded"
                      title="Edit and confirm payment"
                    >
                      <Edit2 size={16} className="text-orange-500" />
                    </button>
                    <button
                      onClick={() => deleteMembership(membership._id)}
                      className="p-2 hover:bg-red-900 rounded"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedMembership && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-lg max-w-2xl w-full p-8 border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Membership</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Member Info */}
            <div className="bg-slate-800 p-4 rounded-lg mb-6">
              <p className="text-white font-semibold mb-2">{selectedMembership.name}</p>
              <p className="text-gray-400 text-sm">📧 {selectedMembership.email}</p>
              <p className="text-gray-400 text-sm">📱 {selectedMembership.phone}</p>
              <p className="text-gray-400 text-sm">💳 Plan: {selectedMembership.plan.toUpperCase()}</p>
            </div>

            {/* Payment Status Section */}
            <div className="mb-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
              <h3 className="text-white font-bold mb-4">💰 Payment Confirmation</h3>
              
              <div className="space-y-4">
                {/* Payment Status */}
                <div>
                  <label className="block text-white font-semibold mb-2">Payment Status</label>
                  <select
                    value={editForm.paymentStatus}
                    onChange={(e) => setEditForm({ ...editForm, paymentStatus: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="pending">❌ Pending (Not Paid)</option>
                    <option value="paid">✅ Paid</option>
                    <option value="partial">⚠️ Partial Payment</option>
                    <option value="refunded">↩️ Refunded</option>
                  </select>
                </div>

                {/* Payment Method */}
                {editForm.paymentStatus === 'paid' && (
                  <>
                    <div>
                      <label className="block text-white font-semibold mb-2">Payment Method</label>
                      <select
                        value={editForm.paymentMethod}
                        onChange={(e) => setEditForm({ ...editForm, paymentMethod: e.target.value })}
                        className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="cash">💵 Cash</option>
                        <option value="online">🌐 Online Transfer</option>
                        <option value="card">💳 Card Payment</option>
                        <option value="upi">📱 UPI</option>
                        <option value="check">📄 Check</option>
                      </select>
                    </div>

                    {/* Payment Date */}
                    <div>
                      <label className="block text-white font-semibold mb-2">Payment Date</label>
                      <input
                        type="date"
                        value={editForm.paymentDate}
                        onChange={(e) => setEditForm({ ...editForm, paymentDate: e.target.value })}
                        className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Membership Status */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Membership Status</label>
              <select
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              >
                <option value="pending">⏳ Pending</option>
                <option value="confirmed">✅ Confirmed</option>
                <option value="expired">⏰ Expired</option>
                <option value="canceled">❌ Canceled</option>
              </select>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Notes (Optional)</label>
              <textarea
                value={editForm.notes}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                placeholder="Add any additional notes about this membership..."
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 h-20"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMemberships;