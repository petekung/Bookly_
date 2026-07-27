// ref : 37aa88161f
export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Bookly — Personal Book Library with JWT Authentication</p>
        <p className="tiny text-secondary mt-1">Built with Next.js, Express & Supabase • ZenGrid Design System</p>
      </div>
    </footer>
  );
}
