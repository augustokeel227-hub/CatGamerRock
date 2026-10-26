import { Cat, Gamepad2, Heart, LogIn, Search } from "lucide-react";

// Encabezado reutilizable con navegación y acceso a búsqueda.
export default function Header({ page, setPage, search, setSearch, favoritesCount }) {
  const links = [
    { id: "home", label: "Inicio" },
    { id: "catalog", label: "Videojuegos" },
    { id: "favorites", label: "Favoritos" }
  ];

  return (
    <header className="site-header">
      <button className="brand" onClick={() => setPage("home")} aria-label="Ir al inicio">
        <span className="brand-mark"><Cat size={25} /></span>
        <span>CatGamer<span className="brand-accent">Rock</span><small>JUEGA A TU RITMO</small></span>
      </button>

      <nav className="main-nav" aria-label="Navegación principal">
        {links.map((link) => (
          <button key={link.id} className={page === link.id ? "nav-link active" : "nav-link"}
            onClick={() => setPage(link.id)}>
            {link.label}
            {link.id === "favorites" && favoritesCount > 0 && <span className="nav-count">{favoritesCount}</span>}
          </button>
        ))}
      </nav>

      <label className="search-box">
        <Search size={17} />
        <input value={search} onChange={(event) => setSearch(event.target.value)}
          onFocus={() => setPage("catalog")} placeholder="Buscar videojuegos..." aria-label="Buscar videojuegos" />
      </label>

      <button className="login-shortcut" onClick={() => setPage("login")}><LogIn size={17} /> Entrar</button>
    </header>
  );
}