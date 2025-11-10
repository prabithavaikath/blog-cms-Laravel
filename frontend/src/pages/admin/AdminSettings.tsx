import React, { useState, useEffect } from 'react';

interface SiteSettings {
  title: string;
  desc: string;
  comments: boolean;
}

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    title: 'Aurora Blog',
    desc: 'A rich Tailwind-powered blog.',
    comments: true
  });
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('siteSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    setSaveMessage('Saved');
    setTimeout(() => setSaveMessage(''), 1500);
  };

  const rotateKey = () => {
    // In a real app, this would call an API
    alert('Key rotation would happen via API call');
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Settings</h1>
      
      <div className="mt-4 grid lg:grid-cols-2 gap-6">
        <form className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <h2 className="font-semibold">Site</h2>
          
          <label className="block text-sm">
            Title
            <input 
              value={settings.title}
              onChange={(e) => setSettings({...settings, title: e.target.value})}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
              placeholder="Aurora Blog"
            />
          </label>
          
          <label className="block text-sm">
            Description
            <textarea 
              value={settings.desc}
              onChange={(e) => setSettings({...settings, desc: e.target.value})}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
              rows={3}
              placeholder="A rich Tailwind-powered blog."
            />
          </label>
          
          <label className="inline-flex items-center gap-2 text-sm">
            <input 
              type="checkbox" 
              checked={settings.comments}
              onChange={(e) => setSettings({...settings, comments: e.target.checked})}
              className="rounded border-slate-300" 
            /> 
            Allow comments
          </label>
          
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={saveSettings}
              className="rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 text-sm font-semibold"
            >
              Save
            </button>
            <span className="text-xs text-slate-500">{saveMessage}</span>
          </div>
        </form>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="font-semibold">API Keys</h2>
          <div className="mt-2 text-sm">
            Public key: <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800">pk_test_123</code>
          </div>
          <div className="mt-2 text-sm">
            Secret key: <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800">sk_live_xxx</code>
          </div>
          <button 
            onClick={rotateKey}
            className="mt-3 px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-800"
          >
            Rotate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;