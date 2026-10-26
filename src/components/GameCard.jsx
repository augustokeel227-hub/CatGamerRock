import { Heart, ArrowUpRight, Gamepad2 } from "lucide-react";

// Tarjeta reutilizable para mostrar un videojuego en el catálogo.
export default function GameCard({ game, isFavorite, onToggleFavorite, onDetails }) {
  return (
    <article className="game-card">
      <div className={`game-art art-${game.tone}`}>
        <span className="art-label">{game.art}</span>
        <span className="art-platform"><Gamepad2 size={14} /> {game.platform}</span>
        <button className={isFavorite ? "favorite-button selected" : "favorite-button"}
          onClick={() => onToggleFavorite(game.id)}
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}>
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="game-card-body">
        <div className="card-topline"><span className="pill">{game.category}</span><span className="badge-text">{game.badge}</span></div>
        <h3>{game.title}</h3>
        <p>{game.description}</p>
        <div className="card-bottom">
          <strong>${game.price.toLocaleString("es-CO")} <small>COP</small></strong>
          <button className="icon-action" onClick={() => onDetails(game)} aria-label={`Ver detalles de ${game.title}`}>
            <ArrowUpRight size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}