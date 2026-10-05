export function getErrorMessage(err) {
    if (err.status === 404) {
        return "Pokemon não encontrado"
    }

    if(!err.status) {
        return "Sem conexão com a PokeAPI"
    }

    return "Algo deu errado. Tente novamente."
}