let song = new Array();
let begin = function($){
    $('#search').click(function(e){
        $('#song').addClass('play-off')
        $('#song').removeClass('play-on')
        $('#song').attr('src', '#');
        let name = $('#name').val();
        if(name !== null){
            let url = "https://itunes.apple.com/search?limit=10000&term=" + name;
            $("#interior").replaceWith('<div class="row" id="interior"></div>');
            $('#interior').append('<progress />')
            $.ajax({
                url : url,
                type : 'GET',
                data : 'term=' + name,
                dataType : 'JSON',
                success : function(results){updateview(results)}
             });
        }
    })
}

$(document).click(function(e){
    y = e.target.id
    console.log(y);
    if( y.split('&')[0] === "play"){
        song.forEach(son => {
            if(son.getId() === parseInt(y.split('&')[1])){
                $('#song').removeClass('play-off')
                $('#song').addClass('play-on')
                $('#song').attr('src', son.getMusic());
                setTimeout(function(){
                    $('#song')[0].play()
                  }, 2000)
            }
        })
    }  
})

let updateview = function(result){
    console.log(result)
    $("#interior").replaceWith('<div class="row" id="interior"></div>');
    let i = 0;
    let a = 0;
    if(result['results'].length === 0)$('#interior').append('<h2>No Track Found</h2>')
    result['results'].forEach(mus => {
        
        if(mus['wrapperType'] === "track" && mus['kind'] !== undefined ){
            if(mus['kind'] === "music-video")a++;
            let music = new Musique(i, mus['artworkUrl100'] ,mus['previewUrl'],  mus['collectionViewUrl'], mus['trackName'], mus['artistName']);
            song[i] = music;
            $('#interior').append('' 
            + '<div class="col-sm-3">' 
             + '<div align="center" class="card mb-4 shadow-sm">'
             + '<img src="' + music.getPhoto() + '" class="bestwidth card-img-top" alt="">'
             + ' <div class="card-body">'
             + '  <p class="card-text"> Artist\'s Name : ' + music.getName() + '</p>'
             + '  <p class="card-text"> Music\'s Name : ' + music.getTitle() + '</p>'
              + '  <div class="d-flex justify-content-between align-items-center">'
               +'   <div class="btn-group">'
               + '     <button type="button" id="play&' + i + '" class="btn btn-sm btn-outline-secondary">Play Preview</button>'
                + '    <button type="button" class="btn btn-sm btn-outline-secondary"><a href="' + music.getItune() + '">See On Itune</a></button>'
                + '  </div>'
               + ' </div>'
             +' </div>'
            + ' </div>'
          + ' </div>'
            + '')
            i++;
        }
        console.log("il y a : " + a + " videos");   
    });
}
begin(jQuery);