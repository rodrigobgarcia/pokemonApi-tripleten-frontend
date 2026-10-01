import { useState } from "react";
import Button from "../Button/Button";
import "./SearchForm.css";

export default function SearchForm({ initialValue = "", onSearch }) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(value.trim().toLowerCase());
  }

  return (
    <form className="search-form" name="search" onSubmit={handleSubmit}>
      <label className="search-form__label">
        Nome do Pokémon
        <input
          className="search-form__input"
          type="search"
          name="query"
          placeholder="Ex.: pikachu"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <Button type="submit">Pesquisar</Button>
    </form>
  );
}
