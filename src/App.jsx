import { useMemo, useState } from "react";
import { ArrowRight, Flame, Gamepad2, ShieldCheck, Sparkles, User, LockKeyhole, Mail, CheckCircle2 } from "lucide-react";
import Header from "./components/Header.jsx";
import GameCard from "./components/GameCard.jsx";
import Footer from "./components/Footer.jsx";
import { games, categories } from "./data/games.js";

export default function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [favorites, setFavorites] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");

  // useMemo evita filtrar la lista en cada render cuando no cambian los criterios.
  const visibleGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "Todos" || game.category === category;
      const matchesFavorites = page !== "favorites" || favorites.includes(game.id);
      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [search, category, page, favorites]);

  // Actualiza la lista de favoritos sin mutar el estado original.
  function toggleFavorite(gameId) {
    setFavorites((current) =>
      current.includes(gameId) ? current.filter((id) => id !== gameId) : [...current, gameId]
    );
  }

  function openDetails(game) {
    setSelectedGame(game);
    setPage("details");
  }

  return (
    <div className="app-shell">
      <Header page={page} setPage={setPage} search={search} setSearch={setSearch} favoritesCount={favorites.length} />

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow"><Sparkles size={15} /> TU REFUGIO GAMER</div>
                <h1>Sube el volumen.<br /><span>Entra al juego.</span></h1>
                <p>Videojuegos para explorar, competir y perder la noción del tiempo. Todo con actitud rockera y compañía felina.</p>
                <div className="hero-actions">
                  <button className="button-primary" onClick={() => setPage("catalog")}>Explorar catálogo <ArrowRight size={18} /></button>
                  <span className="hero-note"><ShieldCheck size={17} /> Una experiencia hecha para gamers</span>
                </div>
                <div className="hero-stats">
                  <div><strong>06</strong><span>Juegos destacados</span></div>
                  <div><strong>03</strong><span>Pasiones: jugar, rock, gatos</span></div>
                  <div><strong>∞</strong><span>Aventuras por vivir</span></div>
                </div>
              </div>
              <div className="hero-visual" aria-label="Ilustración gráfica de un gato gamer">
                <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
                <div className="hero-glow"></div>
                <div className="cat-console">
                  <div className="cat-ears"><i></i><i></i></div>
                  <div className="cat-face"><span className="eye left-eye"></span><span className="eye right-eye"></span><span className="nose"></span><span className="mouth"></span><span className="whisker whisker-left"></span><span className="whisker whisker-right"></span></div>
                  <div className="headphones"></div>
                </div>
                <div className="floating-tag tag-game"><Gamepad2 size={18} /> GAME ON</div>
                <div className="floating-tag tag-rock"><Flame size={18} /> ROCK MODE</div>
                <span className="visual-star star-a">✦</span><span className="visual-star star-b">✧</span>
              </div>
            </section>

            <section className="benefits">
              <div><Gamepad2 /><span><strong>Selección gamer</strong><small>Juegos para todos los estilos</small></span></div>
              <div><Flame /><span><strong>Actitud rock</strong><small>Una identidad fuera de lo común</small></span></div>
              <div><Sparkles /><span><strong>Universo felino</strong><small>Diseño con personalidad</small></span></div>
            </section>

            <section className="section-block">
              <div className="section-heading"><div><span className="eyebrow">SELECCIÓN DE LA CASA</span><h2>Juegos destacados</h2></div><button className="text-link" onClick={() => setPage("catalog")}>Ver catálogo <ArrowRight size={16} /></button></div>
              <div className="games-grid">{games.slice(0, 3).map((game) => <GameCard key={game.id} game={game} isFavorite={favorites.includes(game.id)} onToggleFavorite={toggleFavorite} onDetails={openDetails} />)}</div>
            </section>
          </>
        )}

        {(page === "catalog" || page === "favorites") && (
          <section className="section-block page-content">
            <div className="section-heading"><div><span className="eyebrow">{page === "favorites" ? "TU COLECCIÓN" : "ENCUENTRA TU PRÓXIMA AVENTURA"}</span><h1>{page === "favorites" ? "Tus favoritos" : "Catálogo de videojuegos"}</h1><p className="section-subtitle">Explora títulos, filtra por género y guarda los que te llamen la atención.</p></div></div>
            <div className="filter-row" aria-label="Filtrar por categoría">
              {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "filter-chip active" : "filter-chip"}>{item}</button>)}
            </div>
            {visibleGames.length ? <div className="games-grid">{visibleGames.map((game) => <GameCard key={game.id} game={game} isFavorite={favorites.includes(game.id)} onToggleFavorite={toggleFavorite} onDetails={openDetails} />)}</div> : <div className="empty-state"><Gamepad2 size={34} /><h3>No encontramos juegos</h3><p>Prueba con otra búsqueda o categoría.</p><button className="button-primary" onClick={() => {setSearch(""); setCategory("Todos"); setPage("catalog");}}>Limpiar filtros</button></div>}
          </section>
        )}

        {page === "details" && selectedGame && (
          <section className="detail-page page-content">
            <button className="text-link back-link" onClick={() => setPage("catalog")}>← Volver al catálogo</button>
            <div className="detail-layout">
              <div className={`detail-art game-art art-${selectedGame.tone}`}><span className="art-label">{selectedGame.art}</span><span className="art-platform"><Gamepad2 size={15} /> {selectedGame.platform}</span></div>
              <div className="detail-copy"><span className="pill">{selectedGame.category}</span><h1>{selectedGame.title}</h1><p>{selectedGame.description}</p><p className="detail-note">Este módulo es una demostración académica de una ficha de producto. La compra no está conectada a una pasarela de pago.</p><strong className="detail-price">${selectedGame.price.toLocaleString("es-CO")} COP</strong><div className="hero-actions"><button className="button-primary" onClick={() => toggleFavorite(selectedGame.id)}>{favorites.includes(selectedGame.id) ? "Quitar de favoritos" : "Guardar en favoritos"}</button><button className="button-secondary" onClick={() => setPage("catalog")}>Seguir explorando</button></div></div>
            </div>
          </section>
        )}

        {page === "login" && (
          <section className="login-page page-content">
            <div className="login-card"><div className="login-icon"><User size={26} /></div><span className="eyebrow">BIENVENIDO DE VUELTA</span><h1>Entra al universo gamer</h1><p>Formulario demostrativo para la interfaz de inicio de sesión.</p>
              <form onSubmit={(event) => {event.preventDefault(); setLoginMessage("Formulario de demostración enviado. No se validaron credenciales reales.");}}>
                <label><span>Correo electrónico</span><div className="input-wrap"><Mail size={17} /><input type="email" placeholder="jugador@correo.com" required /></div></label>
                <label><span>Contraseña</span><div className="input-wrap"><LockKeyhole size={17} /><input type="password" placeholder="Ingresa una contraseña" required minLength={4} /></div></label>
                <button className="button-primary full-width" type="submit">Iniciar sesión <ArrowRight size={17} /></button>
              </form>
              {loginMessage && <p className="form-message"><CheckCircle2 size={17} />{loginMessage}</p>}
              <small className="demo-disclaimer">No uses una contraseña real. Esta pantalla no envía ni almacena tus datos.</small>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}