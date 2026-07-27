// ref : 37aa88161f
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // If already logged in, redirect to home
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to login');
      }
      
      // Save JWT token
      localStorage.setItem('token', data.token);
      router.push('/');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center">ยินดีต้อนรับกลับมา</h2>
          <p className="text-center mb-4 text-secondary">กรุณาเข้าสู่ระบบเพื่อจัดการคลังหนังสือของคุณ</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <label>ชื่อผู้ใช้ (Username)</label>
            <input 
              type="text" 
              placeholder="admin" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <label>รหัสผ่าน (Password)</label>
            <input 
              type="password" 
              placeholder="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" disabled={loading} className="mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {loading && <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>}
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>
          
          <p className="text-center mt-4 text-secondary tiny">
            คำใบ้: ใช้ <strong>admin / password</strong> เพื่อเข้าสู่ระบบ
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
