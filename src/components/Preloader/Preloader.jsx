import "./Preloader.css";

export default function Preloader() {
  return (
    <div className="preloader" role="status">
      <div className="preloader__spinner" />
      <p className="preloader__text">Carregando...</p>
    </div>
  );
}
