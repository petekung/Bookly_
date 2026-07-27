// ref : 37aa88161f
'use client';
import { useState, useMemo } from 'react';

export default function BookList({ books, onDeleteBook }) {
  const [searchQuery, setSearchQuery] = useState('');

  // useMemo ค้นหาและกรองรายการหนังสือตามคำค้นหา เพื่อ Performance
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    const query = searchQuery.toLowerCase();
    return books.filter(book => 
      (book.title && book.title.toLowerCase().includes(query)) || 
      (book.author && book.author.toLowerCase().includes(query)) ||
      (book.category && book.category.toLowerCase().includes(query))
    );
  }, [books, searchQuery]);

  // useMemo คำนวณจำนวนหนังสือทั้งหมด
  const totalBooks = useMemo(() => books.length, [books]);

  return (
    <div>
       <div className="mb-4">
        <input 
          type="text" 
          placeholder="🔍 ค้นหาหนังสือ (ชื่อหนังสือ, ผู้แต่ง, หมวดหมู่)..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: 0 }}
        />
      </div>
      
    <div className="card animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex justify-between align-center mb-4">
        <h3>คลังหนังสือของฉัน</h3>
        <span className="text-secondary tiny" style={{ background: 'var(--surface-sunken)', padding: '4px 12px', borderRadius: 'var(--radius-sm)' }}>
          ทั้งหมด: {totalBooks} เล่ม
        </span>
      </div>

   
      {filteredBooks.length === 0 ? (
        <p className="text-center text-secondary" style={{ padding: '24px 0' }}>
          {searchQuery ? 'ไม่พบหนังสือที่ตรงกับการค้นหา' : 'ยังไม่มีหนังสือในคลัง'}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredBooks.map(book => (
            <div key={book.id} className="list-item">
              <div>
                <strong style={{ display: 'block', fontWeight: 500, marginBottom: '4px' }}>{book.title}</strong>
                <span className="text-secondary small">{book.author} {book.category ? `• ${book.category}` : ''}</span>
              </div>
              <button className="danger" onClick={() => onDeleteBook(book.id)}>ลบ</button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
