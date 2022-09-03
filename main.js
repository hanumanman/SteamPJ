

// __________________CAROUSEL____________________

const buttons = document.querySelectorAll("[data-carousel-btn]");

buttons.forEach(button => {
    button.addEventListener("click",() => {
        const offset = button.dataset.carouselBtn === "next" ? 1: -1;
        const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]");
        
        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;
        
        
        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
        
        const dots = button
        .closest("[data-carousel]")
        .querySelector("[data-dots]");
        
        const activeDot = dots.querySelector("[data-active]");
        dots.children[newIndex].dataset.active = true;
        delete activeDot.dataset.active;
        
        const details = button
        .closest("[data-carousel]")
        .querySelector("[data-detail]");
        
        const activeDetail = details.querySelector("[data-active]");
        details.children[newIndex].dataset.active = true;
        delete activeDetail.dataset.active;
    })
})


// ________________________API_________________

const host = "https://cs-steam-game-api.herokuapp.com";

let resultPage = 1;

let searchUrl =`${host}/games?`;



const resetUrl=() => {
    searchUrl =`${host}/games?`;
};

const getFeaturedGame = async () => {
    try {
        const url = `${host}/features`;

        console.log(url);

        const res = await fetch(url);
        const data = await res.json();
        
        console.log("data",data);
        return data;
    } catch(err) {
        console.log("err",err);
    }
}

const searchGames = async (url) => {
    try {
        console.log("search for games");
        console.log(url);

        const res = await fetch(url);
        const data = await res.json();


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

function createCarouselItems(game) {

    const x = document.createElement('li');
    x.classList.add('crs-slide');
    x.innerHTML = `
    <img class="mw-100"  src="${game.header_image}" alt="" href="#">
    `

    return x;

}

function createDots() {

    const x = document.createElement('div');
    x.classList.add('dot');

    return x;

}

function createGameDetails(game) {

    const x = document.createElement('div');
    x.classList.add('detail');
    x.innerHTML = `      
    <div class="d-flex justify-content-center p-2">${game.name}</div>
    <div class="d-flex justify-content-center px-2 text-uppercase" style="font-size:0.7em;">${game.genres}</div>
  `

    return x;

}

const renderGamesResults = async (games)=> {
    try {
        const searchResults = document.getElementById("searchResults");
        
        //Take out the game list div 
        const gamesList = searchResults.children[1];
           
        gamesList.innerHTML = ""; 

        games.forEach((game) => {         
            gamesList.appendChild( createGamesResult(game) );
        })

    }   catch (err) {
        console.log("err",err)
    }
}







const renderCarouselItems = async (games)=> {
    try {
        const carouselItems = document.getElementById("steam-carousel");
        
        //Take out the ul element
        const carouselGamesList = carouselItems.children[1];
           
        carouselGamesList.innerHTML = ""; 

        games.forEach((game) => {         
            carouselGamesList.appendChild( createCarouselItems(game) );
        })

        //give active state to the first game 

    

        carouselGamesList.children[0].dataset.active="true";

        //create dots
        carouselItems.children[4].innerHTML = "";
        games.forEach(() => {         
            carouselItems.children[4].appendChild( createDots() );
        })

        carouselItems.children[4].children[0].dataset.active="true";

        //create details div
        const detailsList = document.getElementById("crsGameDetails");
        detailsList.innerHTML = "";
        games.forEach((game) => {         
            detailsList.appendChild( createGameDetails(game) );
        })

        
        detailsList.children[0].dataset.active="true";

    }   catch (err) {
        console.log("err",err)
    }
}



const nextResults = document.getElementById("resultNextBtn");
nextResults.addEventListener("click", async()=>{
    resultPage +=1;
    console.log(resultPage);
    searchUrl += `&page=${resultPage}`
    const gamesData = await searchGames(searchUrl);
    renderGamesResults(gamesData.data);
    searchUrl = searchUrl.replace(`&page=${resultPage}`,``); //delete last page query, keeping search
    return searchUrl;
})

const prevResults = document.getElementById("resultPrevBtn");
prevResults.addEventListener("click", async()=>{
    if(resultPage >1) {
        resultPage -=1;
    console.log(resultPage);
    searchUrl += `&page=${resultPage}`
    const gamesData = await searchGames(searchUrl);
    renderGamesResults(gamesData.data); 
    searchUrl = searchUrl.replace(`&page=${resultPage}`,``);
    return searchUrl;
}   else return

})


document.getElementById("searchBtn").addEventListener("click", async () => {

    const q = document.getElementById("search").value;
    if(q.length) {
        resultPage = 1;
        resetUrl();
        searchUrl += `&q=${q}`
       
    } 
    
    
    const gamesData = await searchGames(searchUrl);
    renderGamesResults(gamesData.data);
    
    return searchUrl;
})

const init = async() => {

    const featuredData = await getFeaturedGame();
    const gamesData = await searchGames(searchUrl);



    renderCarouselItems(featuredData.data);  
    renderGamesResults(gamesData.data);
}

init();