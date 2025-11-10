import React, { useState } from 'react';

const AdminMedia: React.FC = () => {
  const [media, setMedia] = useState([
    'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=800&auto=format&fit=crop'
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload to a server
    // For demo, we'll just create a local URL
    const url = URL.createObjectURL(file);
    setMedia(prev => [url, ...prev]);
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Media</h1>
      
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((src, index) => (
          <figure key={index} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <img className="w-full h-40 object-cover" src={src} alt={`Media ${index + 1}`} />
            <figcaption className="p-2 text-xs text-slate-500 truncate">
              {src.slice(8, 38)}…
            </figcaption>
          </figure>
        ))}
      </div>
      
      <div className="mt-4">
        <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileUpload}
            accept="image/*"
          />
          <span className="px-3 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
            Upload image
          </span>
        </label>
      </div>
    </div>
  );
};

export default AdminMedia;