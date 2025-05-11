import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data.posts))
      .catch(() => toast.error('Failed to load posts'));
  }, []);

  return (
    <div className="mt-4 px-4">
      <h2 className="text-2xl font-bold mb-4">All Blog Posts</h2>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {posts.map(post => (
          <div key={post._id} className="break-inside-avoid cursor-pointer" onClick={(e) => {
              e.preventDefault()
              navigate(`/${post._id}`)
            } } >
            <PostCard {...post}/>
          </div>
        ))}
      </div>
    </div>
  );

}
