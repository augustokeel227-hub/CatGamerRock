import { Cat } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Cat size={22} />
        <strong>CatGamerRock</strong>
      </div>

      <p>Videojuegos, gatos y rock en un solo lugar.</p>
      <span>Proyecto formativo · SENA · 2026</span>
    </footer>
  );
}