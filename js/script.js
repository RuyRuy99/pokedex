//Variáveis globais que vão conversar com o HTML
const poke_name = document.querySelector('.poke_name');
const poke_number = document.querySelector('.poke_number');
const poke_img = document.querySelector('.poke_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //Usa entre aspas para poder usar variável passada por parâmetro
    //Isso é uma promisse
    //Await só vai executr o resto do código quando tiver uma resposta da API
    //Só pode usar await em funções assincronas

    //extraindo os dados do .json
    //Também é assincorno
    //console.log(APIResponse)
    if (APIResponse.status == 200){
        const dados = await APIResponse.json()
        //console.log(dados)
        return dados;
    }
    
}

const renderPokemon = async (pokemon) => {

    poke_name.innerHTML = 'Loading...';
    poke_number.innerHTML = '';

    const dados = await fetchPokemon(pokemon)

    if (dados){
        //console.log(dados.name);
        poke_name.innerHTML = dados.name;
        poke_number.innerHTML = dados.id
        poke_img.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']//pode usar "." ou "[]"
        input.value = '';
        searchPokemon = dados.id//para ele não perder a referência do último pokemon
    }
    else{
        poke_img.style.display = 'none'
        poke_name.innerHTML = "Not Found";
        poke_number = '';

    }
}



form.addEventListener('submit',(event) => {
//quando o formulário for enviado ele vai executar uma função
//arrow function
    event.preventDefault();
    //console.log(input.value)
    renderPokemon(input.value.toLowerCase());//lowrcase poderia ficar aqui ou na linha 11
});

buttonPrev.addEventListener('click',() => {
    //alert('prev clicked')
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click',() => {
    //alert('Next clicked')
    searchPokemon += 1
    renderPokemon(searchPokemon)

});








renderPokemon(searchPokemon);//começar com o primeiro pokemon
//não posso chamar searchpokemon porque é um número