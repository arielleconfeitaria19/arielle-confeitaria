export default function Footer() {
  return (
    <footer className="bg-[#3E4A3C] text-white py-6 text-center">

      <p>
        © {new Date().getFullYear()} Arielle Confeitaria Artesanal
      </p>

      <div className="mt-3">
        <a
          href="https://instagram.com/prospytech"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 px-4 py-1 rounded-full text-sm transition"
        >
          Produzido por ProspyTech
        </a>
      </div>

    </footer>
  );
}