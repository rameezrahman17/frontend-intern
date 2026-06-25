'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash, LogOut, RefreshCw, Calendar, Clock, Gift, User, Smartphone } from 'lucide-react';

interface Submission {
  submission_id: string;
  recipient_name: string;
  sender_message: string | null;
  wants_gift: boolean;
  gift_choice: string;
  treat_date: string;
  treat_time: string;
  submitted_at: string;
  user_agent: string | null;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('birthday_admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchSubmissions(token);
    }
  }, []);

  const fetchSubmissions = async (token: string) => {
    setFetching(true);
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('birthday_admin_token', data.token);
        setIsAuthenticated(true);
        fetchSubmissions(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (e) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('birthday_admin_token');
    setIsAuthenticated(false);
    setSubmissions([]);
  };

  const getGiftEmoji = (gift: string) => {
    const map: Record<string, string> = { flower_bouquet: '💐', drive: '🚗', movie: '🎬', chocolate_hamper: '🍫', snacks_hamper: '🍿' };
    return map[gift] || '🎁';
  };

  const getGiftLabel = (gift: string) => {
    const map: Record<string, string> = { flower_bouquet: 'Flower Bouquet', drive: 'A Drive', movie: 'A Movie', chocolate_hamper: 'Chocolate Hamper', snacks_hamper: 'Snacks Hamper' };
    return map[gift] || gift;
  };

  const formatFriendlyDate = (dateStr: string) => dateStr;
  const formatFriendlyTime = (timeStr: string) => timeStr;
  const parseDevice = (ua: string | null) => ua || 'Unknown Device';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-card">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-heading mb-6">Admin Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded p-2 mb-4" placeholder="Password" required />
          <button type="submit" disabled={loading} className="w-full bg-accent text-white rounded p-2 font-semibold hover:bg-accent-hover transition-colors">{loading ? 'Loading...' : 'Login'}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-card p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-heading">Submissions</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold"><LogOut size={18} /> Logout</button>
        </div>
        
        {fetching ? <p>Loading submissions...</p> : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-4">Recipient</th>
                  <th className="px-6 py-4">Gift</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((sub) => (
                  <tr key={sub.submission_id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-medium">
                        <User className="w-4 h-4 text-accent/70" />
                        {sub.recipient_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getGiftEmoji(sub.gift_choice)}</span>
                        <span className="font-medium text-heading/85">{getGiftLabel(sub.gift_choice)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 font-semibold">
                        <Calendar className="w-4 h-4 text-accent/70" />
                        {formatFriendlyDate(sub.treat_date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 font-semibold">
                        <Clock className="w-4 h-4 text-accent/70" />
                        {formatFriendlyTime(sub.treat_time)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-heading/60 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-heading/40" />
                        {parseDevice(sub.user_agent)}
                      </div>
                    </td>
                  </tr>
                ))}
                {submissions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No submissions yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
