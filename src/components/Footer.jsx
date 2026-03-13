//import { siteConfig } from "../config/site";

export default function Footer() {
  return (
    <footer className="bg-[#3E4A3C] text-white p-4 text-center">

      <p>
        © {new Date().getFullYear()} Arielle Confeitaria Artesanal
      </p>

      <p className="text-sm mt-2">
        Produzido por{" "}
        <a
          href="https://instagram.com/prospytech"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-pink-300"
        >
          ProspyTech
        </a>
      </p>

    </footer>
  );
}