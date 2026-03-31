import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Reply, Trash2, Mail } from 'lucide-react';
import api from '../../services/api';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchContacts(token);
  }, [navigate]);

  const fetchContacts = async (token) => {
    try {
      const response = await api.get('/contact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) return;

    try {
      const token = localStorage.getItem('adminToken');
      await api.put(`/contact/${selectedContact._id}`, 
        { status: 'replied', reply: replyMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContacts(prev => prev.map(c => c._id === selectedContact._id ? { ...c, status: 'replied', reply: replyMessage } : c));
      setSelectedContact(null);
      setReplyMessage('');
    } catch (error) {
      alert('Error sending reply');
    }
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this contact?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await api.delete(`/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(prev => prev.filter(c => c._id !== id));
    } catch (error) {
      alert('Error deleting contact');
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

      <h1 className="text-3xl font-bold text-white mb-8">Contact Messages</h1>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contacts List */}
          <div className="lg:col-span-2">
            <div className="card">
              {contacts.length === 0 ? (
                <p className="p-6 text-gray-400 text-center">No messages</p>
              ) : (
                <div className="space-y-0">
                  {contacts.map(contact => (
                    <div
                      key={contact._id}
                      onClick={() => setSelectedContact(contact)}
                      className="p-4 border-b border-slate-700 hover:bg-slate-800 cursor-pointer transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold">{contact.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          contact.status === 'replied' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'
                        }`}>
                          {contact.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">{contact.email}</p>
                      <p className="text-gray-300 line-clamp-2">{contact.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Detail View */}
          <div className="lg:col-span-1">
            {selectedContact ? (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-white mb-4">{selectedContact.name}</h2>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{selectedContact.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Subject</p>
                    <p className="text-white">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Message</p>
                    <p className="text-gray-300 mt-2">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-4">
                  <textarea
                    placeholder="Write your reply..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
                    rows="4"
                  />
                  <button
                    onClick={handleReply}
                    className="btn-primary w-full py-2 flex items-center justify-center space-x-2"
                  >
                    <Reply size={18} />
                    <span>Send Reply</span>
                  </button>
                  <button
                    onClick={() => deleteContact(selectedContact._id)}
                    className="w-full mt-2 p-2 bg-red-900 hover:bg-red-800 text-red-300 rounded font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-6 text-center text-gray-400">
                <Mail size={48} className="mx-auto mb-4 opacity-50" />
                <p>Select a message to reply</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContacts;