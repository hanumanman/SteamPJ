const host = "https://cs-steam-game-api.herokuapp.com";
let queries = window.location.href.split('?')[1];
let resultPage = 1;
let url = `${host}/games?genres=${queries}`;


const getGenres = async () => {
    try {
        const url = `${host}/genres?limit=9999`;

        console.log(url);

        const res = await fetch(url);
        const data = await res.json();
        
        console.log("data",data);
        return data;
    } catch(err) {
        console.log("err",err);
    }
}


const sortGames = async (url) => {
    try {
        
        
        console.log(url);
        
        const res = await fetch(url);
        const data = await res.json();
        
        console.log("data",data);
        return data;
    } catch(err) {
        console.log("err",err);
    }
}

function createGamesResult(game) {
    
    const x = document.createElement('div');
    x.classList.add('game-item', 'd-flex', 'w-100', 'align-items-center');
    x.innerHTML = `<a href="gameDetails.html?${game.appid}"  >
    <img src="${game.header_image}" alt=""></a>
    
    <div class="item-detail d-flex justify-content-between w-100">
    <a href="gameDetails.html?${game.appid}" class="game-link px-2" >${game.name}</a>
    <div class="price px-2"> ${game.price} $ </div>
    </div>`
    
    return x;
}

function createGenres(genre) {
    
    const x = document.createElement('li');
    
    x.innerHTML = `<a href="genres.html?${genre.name}">${genre.name}</a>`
    
    return x;
}

const renderGamesResults = async (games)=> {
    try {
        const genresGames = document.getElementById("genresList");
        
        //Take out the game list div 
        const gamesList = genresGames.children[0];
        
        gamesList.innerHTML = ""; 
        
        games.forEach((game) => {         
            gamesList.appendChild( createGamesResult(game) );
        })
        
    }   catch (err) {
        console.log("err",err)
    }
}

const renderGenres = async (genres)=> {
    try {
        const genresList = document.getElementsByClassName("sidebar");
        
        genresList[0].innerHTML = ""; 
        
        genres.forEach((genre) => {         
            genresList[0].appendChild(createGenres(genre));
        })
        
    }   catch (err) {
        console.log("err",err)
    }
}

const nextResults = document.getElementById("resultNextBtn");
nextResults.addEventListener("click", async()=>{
    resultPage +=1;
    console.log(resultPage);
    
    queries += `&page=${resultPage}`;
    console.log(`now queries is ${queries}`);

    url = `${host}/games?genres=${queries}`;
    console.log(`now url is ${url}`);
    const gamesData = await sortGames(url);
    renderGamesResults(gamesData.data);

    queries = queries.replace(`&page=${resultPage}`,``); //delete last page query, keeping search
    return ;
})

const prevResults = document.getElementById("resultPrevBtn");
prevResults.addEventListener("click", async()=>{
    if(resultPage >1) {
        resultPage -=1;
    console.log(resultPage);
console.log(resultPage);
    
    queries += `&page=${resultPage}`;
    console.log(`now queries is ${queries}`);

    url = `${host}/games?genres=${queries}`;
    console.log(`now url is ${url}`);
    const gamesData = await sortGames(url);
    renderGamesResults(gamesData.data);

    queries = queries.replace(`&page=${resultPage}`,``); //delete last page query, keeping search
    return ;
}   else return

})


const init = async() => {
    
    const gamesData = await sortGames(url);
    const genres = await getGenres();
    
    renderGamesResults(gamesData.data);
    renderGenres(genres.data);
}

init();