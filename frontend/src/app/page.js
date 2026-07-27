// ref : 37aa88161f
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookForm from '@/components/BookForm';
import BookList from '@/components/BookList';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const router = useRouter();

  useEffect(() => {
    // Auth Guard
    const token = localStorage.getItem('token');
    if (!token) {
      showToast('กรุณาเข้าสู่ระบบก่อนใช้งาน', 'error');
      setTimeout(() => router.push('/login'), 1000);
      return;
    }

    // Fetch initial data
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/books');
        if (!res.ok) throw new Error('Failed to fetch books');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [router]);

  const handleBookAdded = (newBook) => {
    setBooks(prev => [newBook, ...prev]);
    setIsAddModalOpen(false);
    showToast('เพิ่มหนังสือเรียบร้อยแล้ว', 'success');
  };

  const handleRequestDelete = (id) => {
    setBookToDelete(id);
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      setIsDeleting(true);
      await handleDeleteBook(bookToDelete);
      setIsDeleting(false);
      setBookToDelete(null);
    }
  };

  const handleDeleteBook = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          showToast('Session expired. Please login again.', 'error');
          localStorage.removeItem('token');
          setTimeout(() => router.push('/login'), 1500);
          return;
        }
        throw new Error('Failed to delete book');
      }
      
      setBooks(prev => prev.filter(b => b.id !== id));
      showToast('ลบหนังสือเรียบร้อยแล้ว', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '16px' }}>
        <div className="spinner"></div>
        <h2 className="animate-fade-in text-secondary" style={{ margin: 0 }}>กำลังโหลดข้อมูล...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} onLogout={handleLogout} />
      
      <main className="container">
        <BookList books={books} onDeleteBook={handleRequestDelete} />
        
        {isAddModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="card animate-fade-in" style={{ width: '90%', maxWidth: '480px', backgroundColor: '#FFFFFF', border: '1px solid var(--sage)', position: 'relative' }}>
              <button onClick={() => setIsAddModalOpen(false)} className="ghost" style={{ position: 'absolute', top: '16px', right: '16px', width: 'auto', padding: '4px 8px', fontSize: '18px' }}>✕</button>
              <BookForm onBookAdded={handleBookAdded} onError={(msg) => showToast(msg, 'error')} />
            </div>
          </div>
        )}
        
        {toast && (
          <div className={`toast ${toast.type} animate-slide-down`}>
            {toast.message}
          </div>
        )}

        {bookToDelete && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="card text-center animate-fade-in" style={{ width: '90%', maxWidth: '400px', backgroundColor: '#FFFFFF', border: '1px solid var(--sage)' }}>
              <h3 style={{ marginBottom: '12px' }}>คุณแน่ใจหรือไม่?</h3>
              <p className="text-secondary" style={{ marginBottom: '24px' }}>คุณต้องการลบหนังสือเล่มนี้จริงๆ ใช่ไหม? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
              <div className="flex gap-2" style={{ justifyContent: 'center' }}>
                <button className="ghost" onClick={() => setBookToDelete(null)} disabled={isDeleting}>ยกเลิก</button>
                <button className="danger" onClick={confirmDelete} disabled={isDeleting} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  {isDeleting && <span className="spinner" style={{ width: '14px', height: '14px', borderWidth: '2px' }}></span>}
                  {isDeleting ? 'กำลังลบ...' : 'ใช่, ลบเลย'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
