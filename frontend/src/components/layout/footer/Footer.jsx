export default function Footer() {
  return (
    <footer className="bg-footer text-surface mt-xl px-lg py-md">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-md">
        
        {/* LEFT: BRAND */}
        <div className="text-sm font-medium tracking-wide">
          MyStore © {new Date().getFullYear()}
        </div>

        {/* CENTER: LINKS (placeholder structure for later) */}
        <div className="flex gap-md text-sm text-surface/80">
          <a className="hover:text-surface cursor-pointer">About</a>
          <a className="hover:text-surface cursor-pointer">Support</a>
          <a className="hover:text-surface cursor-pointer">Privacy</a>
        </div>

        {/* RIGHT: OPTIONAL INFO */}
        <div className="text-xs text-surface/70">
          Built with React + Tailwind
        </div>

      </div>
    </footer>
  );
}