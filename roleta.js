// 1. Listas de Pokémon por raridade (IDs da 1ª Geração)
const comuns = [10, 13, 16, 19, 29, 32, 41, 129]; // Caterpie, Weedle, Pidgey, Rattata, Zubat, Magikarp...
const raros = [1, 4, 7, 25, 133, 143, 147, 149];  // Iniciais, Pikachu, Eevee, Snorlax, Dragonite...
const lendarios = [144, 145, 146, 150, 151];     // Articuno, Zapdos, Moltres, Mewtwo, Mew

// 2. Pega os elementos do HTML
const botaoSortear = document.getElementById('sortear-btn');
const areaResultado = document.getElementById('resultado-sorteio');

// 3. Função que roda ao clicar no botão (repare no 'async')
botaoSortear.addEventListener('click', async () => {
    
    // Texto temporário de carregamento
    areaResultado.innerHTML = "<p>Conectando com a PokéAPI... </p>";
    
    // --- LÓGICA DA RARIDADE ---
    const chance = Math.floor(Math.random() * 100) + 1;
    let listaEscolhida;
    let classeRaridade;
    let textoRaridade;

    if (chance <= 70) {
        listaEscolhida = comuns;
        classeRaridade = "card-comum";
        textoRaridade = "COMUM 🟢";
    } else if (chance <= 95) {
        listaEscolhida = raros;
        classeRaridade = "card-raro";
        textoRaridade = "RARO 🔵";
    } else {
        listaEscolhida = lendarios;
        classeRaridade = "card-lendario";
        textoRaridade = "LENDÁRIO 🌟";
    }

    // Escolhe um ID aleatório de dentro da lista sorteada
    const indiceAleatorio = Math.floor(Math.random() * listaEscolhida.length);
    const idSorteado = listaEscolhida[indiceAleatorio];

    // --- CONEXÃO COM A PokéAPI ---
    try {
        // Faz o pedido para a API usando o ID sorteado
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idSorteado}`);
        const pokemon = await resposta.json();

        // Extrai a foto oficial em alta definição
        const imagemUrl = pokemon.sprites.other['official-artwork'].front_default;
        
        // Pega o nome do tipo principal (ex: fire, water)
        const tipoPrincipal = pokemon.types[0].type.name;

        // Adiciona a classe de animação que criamos no CSS
        areaResultado.className = "tem-pokemon";

        // 4. Injeta a carta do Pokémon sorteado dentro do HTML
        areaResultado.innerHTML = `
            <div class="pokemon-card ${classeRaridade}">
                <span class="raridade-tag">${textoRaridade}</span>
                <div class="card-id">#${String(pokemon.id).padStart(3, '0')}</div>
                <img src="${imagemUrl}" alt="${pokemon.name}" class="card-img">
                <h3 class="card-name">${pokemon.name}</h3>
                <div class="card-types">
                    <span class="type-badge ${tipoPrincipal}">${tipoPrincipal}</span>
                </div>
            </div>
        `;

    } catch (erro) {
        areaResultado.innerHTML = "<p>Erro ao buscar Pokémon. Tente novamente! ❌</p>";
        console.error(erro);
    }
});