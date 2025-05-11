
export default function PostCard({ title, content, tags, author }) {
  return (
    <div className="bg-white border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{content.slice(0, 100)}...</p>
      <div className="text-sm text-gray-500 mt-2">Tags: {tags.join(', ')}</div>
      <div className="text-xs text-gray-400 mt-1">By: {author?.username || "Unknown"}</div>
    </div>
  );
}
