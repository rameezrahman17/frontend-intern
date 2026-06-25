'use client';

import { useState, useEffect } from 'react';
import { LogOut, Gift, User, RefreshCw } from 'lucide-react';

interface Submission {
  submission_id: string;
  recipient_name: string;
  gift_choice: string;
  submitted_at: string;
}

const giftMap: Record<string, { emoji: string; label: string }> = {
  flower_bouquet:   { emoji: '💐', label: 'Flower Bouquet' },
  movie:            { emoji: '🤔', label: 'Sochne De' },
  chocolate_hamper: { emoji: '🍫', label: 'Chocolate Hamper' },
  snacks_hamper:    { emoji: '🍿', label: 'Snacks Hamper' },
  teri_marzi:       { emoji: '🌟', label: 'Teri Marzi' },
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('birthday_admin_token');
    if (token) { setAuthed(true); load(token); }
  }, []);

  const load = async (token: string) => {
    setFetching(true);
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setSubmissions(data.submissions || []);
    } catch (e) { console.error(e); }
    finally { setFetching(false); }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('birthday_admin_token', data.token);
        setAuthed(true);
        load(data.token);
      } else {
        setError(data.message || 'Wrong password');
      }
    } catch { setError('Something went wrong'); }
    finally { setLoading(false); }
  };

  const logout = () => {
    localStorage.removeItem('birthday_admin_token');
    setAuthed(false);
    setSubmissions([]);
  };

  const fmt = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch { return iso; }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCE2EA]">
        <form onSubmit={login} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm">
          <h1 className="text-2xl font-bold text-[#7A1B3A] mb-2 text-center">Admin 🔐</h1>
          <p className="text-sm text-[#7A1B3A]/60 text-center mb-6">Birthday submissions viewer</p>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full border border-[#FBD3DE] rounded-xl px-4 py-3 mb-4 text-[#7A1B3A] focus:outline-none focus:border-[#F36C8E] transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F36C8E] hover:bg-[#e0567a] text-white rounded-xl py-3 font-semibold transition-colors disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('birthday_admin_token') || '' : '';

  return (
    <div className="min-h-screen bg-[#FCE2EA] p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#7A1B3A]">Birthday Submissions 🎂</h1>
            <p className="text-sm text-[#7A1B3A]/60 mt-0.5">{submissions.length} response{submissions.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => load(token)}
              disabled={fetching}
              className="p-2.5 rounded-xl bg-white border border-[#FBD3DE] text-[#F36C8E] hover:bg-[#FBD3DE]/30 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw size={16} className={fetching ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#FBD3DE] text-[#7A1B3A]/70 hover:text-red-500 hover:border-red-200 transition-colors text-sm font-medium"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        {/* Submissions */}
        {fetching ? (
          <div className="text-center py-16 text-[#7A1B3A]/50">Loading...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-16 text-[#7A1B3A]/50 bg-white rounded-3xl">
            <p className="text-4xl mb-3">🎀</p>
            <p className="font-medium">No submissions yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub, i) => {
              const gift = giftMap[sub.gift_choice] ?? { emoji: '🎁', label: sub.gift_choice };
              return (
                <div key={sub.submission_id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#FBD3DE]/60 flex items-center gap-4">
                  {/* Index */}
                  <div className="w-8 h-8 rounded-full bg-[#FBD3DE]/60 flex items-center justify-center text-sm font-bold text-[#F36C8E] shrink-0">
                    {i + 1}
                  </div>

                  {/* Name */}
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <User size={14} className="text-[#F36C8E] shrink-0" />
                    <span className="font-semibold text-[#7A1B3A] text-sm">{sub.recipient_name}</span>
                  </div>

                  {/* Gift */}
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-2xl">{gift.emoji}</span>
                    <span className="font-bold text-[#7A1B3A]">{gift.label}</span>
                  </div>

                  {/* Time */}
                  <div className="text-xs text-[#7A1B3A]/50 text-right shrink-0">
                    {fmt(sub.submitted_at)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
