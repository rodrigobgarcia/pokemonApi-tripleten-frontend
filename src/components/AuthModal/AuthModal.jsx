import { useEffect, useId, useState } from "react";
import Button from "../Button/Button";
import "../ModalWithForm/ModalWithForm.css";

export default function AuthModal({ mode, onClose, onSubmit }) {
  const titleId = useId();
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const isSignup = mode === "signup";

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (isSignup && name.length < 2) {
      setError("O nome precisa de pelo menos 2 caracteres.");
      return;
    }

    if (password.length < 6) {
      setError("A senha precisa de pelo menos 6 caracteres.");
      return;
    }

    setError("");
    setIsSending(true);
    onSubmit({ name, email, password }).catch((err) => {
      setError(err.message || "Não foi possível entrar.");
      setIsSending(false);
    });
  }

  return (
    <div
      className="modal modal_opened"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          className="modal__close"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        />
        <h2 className="modal__title" id={titleId}>
          {isSignup ? "Criar conta" : "Entrar"}
        </h2>
        <form className="modal__form" name={mode} onSubmit={handleSubmit} noValidate>
          {isSignup ? (
            <label className="modal__label">
              Nome
              <input
                className="modal__input"
                name="name"
                type="text"
                minLength="2"
                maxLength="30"
                required
                autoFocus
              />
            </label>
          ) : null}
          <label className="modal__label">
            E-mail
            <input
              className="modal__input"
              name="email"
              type="email"
              required
              autoFocus={!isSignup}
            />
          </label>
          <label className="modal__label">
            Senha
            <input
              className="modal__input"
              name="password"
              type="password"
              minLength="6"
              required
            />
          </label>
          {error ? <span className="modal__error">{error}</span> : null}
          <Button type="submit" disabled={isSending}>
            {isSending ? "Enviando..." : isSignup ? "Cadastrar" : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
