import React, { useState } from 'react';

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState(['Design', 'Tailwind', 'Performance']);

  const addCategory = () => {
    const name = prompt('Category name');
    if (!name) return;
    if (categories.includes(name)) {
      alert('Category exists');
      return;
    }
    setCategories([...categories, name]);
  };

  const renameCategory = (oldName: string) => {
    const newName = prompt('Rename category', oldName);
    if (!newName) return;
    setCategories(categories.map(cat => cat === oldName ? newName : cat));
  };

  const deleteCategory = (name: string) => {
    if (confirm(`Delete category "${name}"?`)) {
      setCategories(categories.filter(cat => cat !== name));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Categories</h1>
        <button 
          onClick={addCategory}
          className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-sm"
        >
          Add
        </button>
      </div>
      
      <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map(category => (
          <li 
            key={category}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between"
          >
            <div className="font-medium">{category}</div>
            <div className="flex gap-2">
              <button 
                onClick={() => renameCategory(category)}
                className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-xs"
              >
                Rename
              </button>
              <button 
                onClick={() => deleteCategory(category)}
                className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-xs"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategories;