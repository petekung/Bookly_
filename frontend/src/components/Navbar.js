// ref : 37aa88161f
'use client';

export default function Navbar({ onOpenAddModal, onLogout }) {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span className="navbar-logo">📚</span>
          <h2 className="navbar-title">Bookly</h2>
        </div>
        <div className="navbar-actions">
          {onOpenAddModal && (
            <button onClick={onOpenAddModal} className="btn-add-book">
              + เพิ่มหนังสือ
            </button>
          )}
          {onLogout && (
            <button onClick={onLogout} className="ghost">
              ออกจากระบบ
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
