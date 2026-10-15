# PokéTimes

Front-end do projeto final do bootcamp TripleTen. O PokéTimes consulta a [PokéAPI](https://pokeapi.co/) para montar a Pokédex e a ficha de cada Pokémon, e guarda times de até seis membros. Sem login, os times ficam no `localStorage`. Com uma conta, eles passam a ser salvos na API própria.

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Página inicial com busca |
| `/pokedex` | Lista paginada vinda da PokéAPI |
| `/pokemon/:name` | Ficha do Pokémon, com opção de incluir em um time |
| `/times` | Times locais ou da conta autenticada |
| `/sobre` | Informações do autor |

Rotas inexistentes caem na página de não encontrado.

## Tecnologias

- **React 19** para a interface e o estado da aplicação
- **React Router 7** para as rotas do lado do cliente
- **Vite 8** para o servidor de desenvolvimento e o build
- **JavaScript** (ES modules) e **CSS** por componente
- **Oxlint** para lint
- **PokéAPI** (`https://pokeapi.co/api/v2`) para nomes, imagens, tipos, status e habilidades
- **API própria** (padrão `http://localhost:3000`) para cadastro, login e times

A API de autenticação usa JWT. O token fica em `localStorage` na chave `poketimes-token`. A URL da API pode ser alterada com a variável `VITE_API_URL`.

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

Outros scripts:

```bash
npm run build
npm run preview
npm run lint
```
Deploy link: https://pokemon-api-tripleten-frontend.vercel.app/