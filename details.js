
const host = "https://cs-steam-game-api.herokuapp.com";
const appid = window.location.href.split('?')[1];
let gameUrl = `${host}/single-game/${appid}`; 

const getSingleGame = async () => {
    try {

        console.log('get single game with below url');
        

        console.log(gameUrl);

        const res = await fetch(gameUrl);
        const data = await res.json();

        console.log("res",res);
        console.log("data",data);

        return data;

    } catch(err) {
        console.log("err",err);
    }
}

function createDetailsPage(game) {

    const x = document.createElement('div');
    x.setAttribute(`id`,`detailsDiv`)
    x.innerHTML = `
    <div id="detailName" class="detailInfo text-center">${game.name}</div>
    <img src="${game.header_image}">   
    <div class="detailInfo">${game.price} $</div>
    <div class="detailInfo">Genre: ${game.genres}</div>
    <div class="detailInfo">Tag: ${game.steamspy_tags}</div>
    <div class="detailInfo">Platform: ${game.platforms}</div>
    <div class="detailInfo text-center"> Developer:${game.developer}</div> 
    <div class="detailInfo">${game.description}</div>
`

    return x;

};

const renderDetailPage = async (game)=> {
    try {
        console.log(`current url is ${gameUrl}`)
        const detailsDiv = document.getElementById("detailsDiv");
        
        //Take out the game list div 
        
           
        detailsDiv.innerHTML = ""; 

                
        detailsDiv.appendChild( createDetailsPage(game) );
        

    }   catch (err) {
        console.log("err",err)
    }
};

const init = async() => {
    
    gameData = await getSingleGame();
    renderDetailPage(gameData.data);
};


init();

