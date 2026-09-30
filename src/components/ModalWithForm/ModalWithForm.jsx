import { useEffect, useId, useState } from "react";
import Button from "../Button/Button";
import "./ModalWithForm.css";

export default function ModalWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  submitText,
  children,
}) {
  const titleId = useId();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = String(formData.get("name") || "").trim();

    if (value.length < 2) {
      setError("Use pelo menos 2 caracteres.");
      return;
    }

    setError("");
    onSubmit(value);
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
          {title}
        </h2>
        <form className="modal__form" name={name} onSubmit={handleSubmit} noValidate>
          <label className="modal__label">
            Nome do time
            <input
              className="modal__input"
              name="name"
              type="text"
              placeholder="Ex.: Time inicial"
              minLength="2"
              required
              autoFocus
            />
          </label>
          {error ? <span className="modal__error">{error}</span> : null}
          {children}
          <Button type="submit">{submitText}</Button>
        </form>
      </div>
    </div>
  );
}
