import React from 'react';

export default function Footer({ data }) {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center text-gray-400">
        <p>© 2025 {data.name}. Crafted with passion and code.</p>
      </div>
    </footer>
  );
}
