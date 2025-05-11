import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [errors, setErrors] = useState({});
  const [posts, setPosts] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  const validate = (field, value) => {
    const newErrors = { ...errors };
    if (field === 'title') {
      if (!value.trim()) newErrors.title = 'Title is required';
      else delete newErrors.title;
    }
    if (field === 'content') {
      if (!value.trim()) newErrors.content = 'Content is required';
      else delete newErrors.content;
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validate(name, value);
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPosts(res.data.posts);
      console.log(res.data.posts)
    } catch (err) {
      toast.error('Failed to fetch posts')
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || Object.keys(errors).length > 0) return;
    try {
      await axios.post(
        'http://localhost:5000/api/posts',
        {
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setForm({ title: '', content: '', tags: '' });
      fetchPosts();
    } catch (err) {
      toast.error('Failed to create post')
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      toast.error('Delete failed')
    }
  };

  const openEditModal = (post) => {
    setEditPost(post);
    setForm({
      title: post.title,
      content: post.content,
      tags: post.tags?.join(', ') || '',
    });
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!form.title.trim() || !form.content.trim() || Object.keys(errors).length > 0) return;
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${editPost._id}`,
        {
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditModalOpen(false);
      setEditPost(null);
      setForm({ title: '', content: '', tags: '' });
      fetchPosts();
    } catch (err) {
      toast.error('Failed to update post')
    }
  };

  return (
    <div className="mt-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>

      {/* Create Post Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.content ? 'border-red-500' : ''}`}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          disabled={!form.title.trim() || !form.content.trim() || Object.keys(errors).length > 0}
        >
          Create Post
        </button>
      </form>

      {/* List of Posts */}
      <div className="space-y-2">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-700">{post.content.slice(0, 50)}...</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <button onClick={(e) => {
                e.preventDefault()
                navigate(`/${post._id}`)
              }}>
                Show
              </button>
              <button
                onClick={() => openEditModal(post)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-2xl relative">
            <h3 className="text-2xl font-bold mb-4">Edit Post</h3>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded mb-2"
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              rows={6}
              className="w-full border p-2 rounded mb-2 resize-none"
            />
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setForm({ title: '', content: '', tags: '' });
                  setEditModalOpen(false);
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
