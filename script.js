/* ------API Link------*/
const lyricSuggest = 'https://api.lyrics.ovh/v1/'
const songSuggest = 'https://api.lyrics.ovh/suggest/'



/*------search button------*/
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click",function(){
    document.getElementById("showItems").innerHTML = "";
    document.getElementById("showLyrics").innerHTML = "";
    const songName = document.getElementById("songTitle").value;
    
    fetch(`${songSuggest}${songName}`)
  .then(response => response.json())
  .then(data => {
        
       const searchResultData = data.data;
            for(var i = 0; i< searchResultData.length; i++){
                if(i>9){
                    break;
                }
                else{
                    createDiv(searchResultData[i].title, searchResultData[i].artist.name, searchResultData[i].album.title, searchResultData[i].artist.picture);
                }
        
    }
        
})
})


/*------Suggested Song each section------*/
const showItems = document.getElementById("showItems");
function createDiv(title, artistName, albumTitle, artistPicture){
    showItems.innerHTML += `
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-5">
                        <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">Artist: <span>${artistName}</span></p>
                        <p class="author lead">Album: <span>${albumTitle}</span></p>
                    </div>
                    <div class="col-md-4">
                        <h4 style="text-align: center;">${artistName}</h4>
                        <img src="${artistPicture}" style="height: 120px; display:block; margin: auto">
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" onclick="getLyric('${artistName}', '${title}')">Get Lyrics</button>
                    </div>
                    
                </div>
`
}




/*-----Lyric suggestion-----*/
function getLyric(artistName, songTitle){
    var songTitleForLyrics = songTitle;
    fetch(`${lyricSuggest}${artistName}/${songTitle}`)
  .then(response => response.json())
  .then(data => {
        showSongLyrics(data.lyrics, songTitleForLyrics);
        
    })
}

/*------Suggested lyrics on the bottom section------*/
const showLyrics = document.getElementById("showLyrics");
function showSongLyrics(lyrics, title){
    showLyrics.innerHTML = `
            <div class="single-lyrics text-center">
                <button class="btn go-back">&lsaquo;</button>
                <h1 class="text-success mb-4">${title}</h1>
                <pre class="lyric text-white">
                    ${lyrics}
                </pre>
            </div>


`
}
