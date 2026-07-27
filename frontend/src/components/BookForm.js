// ref : 37aa88161f
'use client';
import { useState, useRef } from 'react';

export default function BookForm({ onBookAdded, onError }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const titleInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author) return;
    
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, author, category })
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          if (onError) onError('Session expired. Please login again.');
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }
        throw new Error('Failed to add book');
      }
      
      const newBook = await res.json();
      onBookAdded(newBook);
      
      setTitle('');
      setAuthor('');
      setCategory('');
      
      titleInputRef.current?.focus();
    } catch (err) {
      if (onError) onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '16px' }}>เพิ่มหนังสือใหม่</h3>
      <form onSubmit={handleSubmit}>
        <label>ชื่อหนังสือ (Title)</label>
        <input 
          type="text" 
          placeholder="ชื่อหนังสือ . . . " 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          ref={titleInputRef}
          required 
        />
        <label>ผู้แต่ง (Author)</label>
        <input 
          type="text" 
          placeholder="ผู้แต่ง . . . " 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          required 
        />
        <label>หมวดหมู่ (Category)</label>
        <input 
          type="text" 
          placeholder="หมวดหมู่ . . . " 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
        />
        <button type="submit" disabled={loading} className="mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          {loading && <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>}
          {loading ? 'กำลังเพิ่ม...' : 'เพิ่มหนังสือ'}
        </button>
      </form>
    </div>
  );
}
