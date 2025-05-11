import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data.post);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch')
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post) return <p className="text-center mt-10 text-red-500">Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">By {post.author?.username || 'Unknown'}</p>
      <div className="text-lg leading-relaxed whitespace-pre-line">{post.content}</div>
      {post.tags?.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold">Tags:</h4>
          <div className="flex gap-2 mt-1">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-sm">{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
