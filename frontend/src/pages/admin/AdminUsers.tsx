import React, { useState } from 'react';

interface User {
  name: string;
  role: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { name: 'Alex Winters', role: 'Admin' },
    { name: 'Mira Rao', role: 'Editor' },
    { name: 'Noah Singh', role: 'Author' }
  ]);

  const inviteUser = () => {
    const name = prompt('Invite name');
    if (!name) return;
    setUsers([...users, { name, role: 'Author' }]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Users</h1>
        <button 
          onClick={inviteUser}
          className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-sm"
        >
          Invite
        </button>
      </div>
      
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user, index) => (
          <div 
            key={index}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-3"
          >
            <img 
              className="w-10 h-10 rounded-full" 
              src={`https://i.pravatar.cc/80?u=${encodeURIComponent(user.name)}`}
              alt={user.name}
            />
            <div className="text-sm">
              <div className="font-semibold">{user.name}</div>
              <div className="text-slate-500">{user.role}</div>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-xs">
                Role
              </button>
              <button className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-xs">
                Disable
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;