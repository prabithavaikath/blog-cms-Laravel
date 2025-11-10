import React from 'react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Posts', value: '42', id: 'statPosts' },
    { label: 'Drafts', value: '7', id: 'statDrafts' },
    { label: 'Subscribers', value: '1,284', id: 'statSubs' },
    { label: 'Bounce Rate', value: '37%', id: 'statBounce' },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold">Dashboard</h1>
      
      <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
          >
            <div className="text-sm text-slate-500">{stat.label}</div>
            <div className="mt-2 text-2xl font-extrabold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Traffic (fake demo)</div>
            <div className="font-semibold">Last 7 days</div>
          </div>
          <button className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-800">
            Export CSV
          </button>
        </div>
        <div className="mt-4 h-32 rounded-lg bg-gradient-to-r from-brand-100/60 to-accent-100/60 dark:from-brand-900/20 dark:to-accent-900/20"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;