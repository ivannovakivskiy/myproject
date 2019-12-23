    $(document).ready( function(){
        var
        id_song, Song, i, volume=1, mute=false,
        songs = [
            muz_one = [0, 'DR.NITAS - Freedom', 'audio/Freedom.mp3','162.528', 'веселі', '2019'],
            muz_two = [1, 'Ваня Новаківський - Love is...', 'audio/Love is....mp3', '184.6628', 'веселі', '2018'],
            muz_three = [2, 'Ваня Новаківський - Love dance', 'audio/Love dance.mp3', '138.504425', 'веселі', '2019'],
            muz_four = [3,  'Ваня Новаківський - Дощ', 'audio/Дощ.mp3', '179.352', 'сумні', '2019'],
            muz_five = [4, 'Ваня Новаківський - Відчуваю симпатію', 'audio/Відчуваю симпатію.mp3', '210.524025', 'лірика', '2018'],
            muz_six = [5, 'Ваня Новаківський - De ea', 'audio/De ea.mp3', '232.67585', 'лірика', '2019'],
            muz_seven = [6, 'Ваня Новаківський - Новорічна', 'audio/Новорічна.mp3', '195.7387', 'веселі', '2018'],
            muz_eight = [7, 'Ваня Новаківський - Згадав', 'audio/Згадав.mp3', '218.234545', 'сумні', '2019']
        ];

        for(i=0; i<songs.length; i++) {
            $('.wrp').append('<div class="song" id="'+songs[i][0]+'"><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="download"></div><div class="duration_song">'+parseInt(songs[i][3]/60)+':'+parseInt(songs[i][3]%60)+'</div></div>');
            }

        function playNewSong(id) {
            var
            curtime, cur =-100;
            $('.player .nameSong').text(songs[id][1]);
            $('.play-pause').attr('id', id);
            id_song = id;
            Song = new Audio(songs[id][2]);
            $('.play-pause').css({'background-position':'right'});
            Song.play();
            Song.volume=volume;
            Song.addEventListener('timeupdate', function() {
                curtime=Song.currentTime;
                cur = -((songs[id_song][3] - curtime)*100)/songs[id_song][3];
                $('.time').text(parseInt(curtime/60)+':'+parseInt(curtime%60));
                $('.progress').css({'left':cur+'%'});
            })
            Song.addEventListener('progress', function() {
                var
                load=Song.buffered.end(0);
                load = -((songs[id_song][3]-load)*100)/songs[id_song][3];
                $('.load').css({'left':load+'%'}, 100);
            })
        }
        function playPauseSong(id) {
        if ( Song ) {
            if ( id == id_song ) {
                if ( Song.paused ) {
                    Song.play();
                    $('.play-pause').css({'background-position':'right'});
                    Song.volume=volume;
                }
                else {
                    Song.pause();
                    $('.play-pause').css({'background-position':'left'});
                }
            }
            else {
                Song.pause();
                $('.play-pause_song').css({'background-position':'left'});
                playNewSong(id);
            }
        }
        else {
            playNewSong(id);
        }
        }

        $('.song, .play-pause').on('click', function(){
        var
        id = $(this).attr('id');
        playPauseSong(id);
        id++;
        $('.sledbtn#sled').attr('data-id', id);
        id--;id--;
        $('.sledbtn#pred').attr('data-id', id);
        });

        $('.sledbtn').on('click', function(){
        var
        id = $(this).attr('data-id');
        if (id != -1){
            playPauseSong(id);
            id++;
            $('.sledbtn#sled').attr('data-id', id);
            id--;id--;
            $('.sledbtn#pred').attr('data-id', id);
        }
        });

            $('.mute').on('click', function(){
            if (Song){
                if (mute == false){
                    mute = true;
                    $('.mute').css({'color':'#C0392B'});
                    $('.volume').val(0);
                }
                else {
                    mute = false;
                    $('.mute').css({'color':'#121315'});
                    $('.volume').val(100);
                }
                Song.muted = mute;
            }
        });

        $('.volume').on('change', function(){ 
            var 
            val = $(this).val();
            if (Song){
                volume = val/100; 
                Song.volume = volume; 
                if (val == 0){ 
                    mute = true;
                    $('.mute').css({'color':'#C0392B'}); 
                } 
                else if (val > 0){ 
                    mute = false;
                    $('.mute').css({'color':'#121315'}); 
                } 
            } 
        });

                $('.range').on('mouseenter', function(){
                if (Song) {
                    var
                    id = $('.play-pause').attr('id'),
                    offset = $(this).offset(),
                    dur = songs[id][3],
                    w = $(this).width();
                    $('.setTime').show();
                    $('.range').on('mousemove', function(e){
                        var
                        x = e.pageX - offset.left,
                        xproc = (x*100)/w,
                        sec = (xproc*dur)/100;
                        $('.setTime').css({'left':x-10});
                        $('.setTime').text(parseInt(sec/60)+':'+parseInt(sec%60));
                        $('.range').on('click', function(){
                            xproc = xproc-100;
                            $('.progress').css({'left':xproc+'%'});
                            Song.currentTime = sec;
                        });
                    });
                }
            });
        $('.range').on('mouseout', function(){
            $('.setTime').hide();
        });

        $('.2019').on('click', function(){
             $('.wrp').empty();
            for(i=0;i<songs.length;i++){
                if(songs[i][5]=="2019"){
                $('.wrp').append('<div class="song" id="'+songs[i][0]+'"><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="download"></div><div class="duration_song">'+parseInt(songs[i][3]/60)+':'+parseInt(songs[i][3]%60)+'</div></div>');
                 }else{
                    
                 }
            }
        })
        $('.2018').on('click', function(){
             $('.wrp').empty();
            for(i=0;i<songs.length;i++){
                if(songs[i][5]=="2018"){
                $('.wrp').append('<div class="song" id="'+songs[i][0]+'"><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="download"></div><div class="duration_song">'+parseInt(songs[i][3]/60)+':'+parseInt(songs[i][3]%60)+'</div></div>');
                 }else{
                    
                 }
            }
        })
        $('.2017').on('click', function(){
             $('.wrp').empty();
            for(i=0;i<songs.length;i++){
                if(songs[i][5]=="2017"){
                $('.wrp').append('<div class="song" id="'+songs[i][0]+'"><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="download"></div><div class="duration_song">'+parseInt(songs[i][3]/60)+':'+parseInt(songs[i][3]%60)+'</div></div>');
                 }else{
                    
                 }
            }
        })

                $('.lirika').on('click', function(){
             $('.wrp').empty();
            for(i=0;i<songs.length;i++){
                if(songs[i][4]=="лірика"){
                $('.wrp').append('<div class="song" id="'+songs[i][0]+'"><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="download"></div><div class="duration_song">'+parseInt(songs[i][3]/60)+':'+parseInt(songs[i][3]%60)+'</div></div>');
                 }else{
                    
                 }
            }
        })

        $('.social').on('click', function(){
             $('.wrp').empty();
            for(i=0;i<songs.length;i++){
                if(songs[i][4]=="соціальне"){
                $('.wrp').append('<div class="song" id="'+songs[i][0]+'"><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="download"></div><div class="duration_song">'+parseInt(songs[i][3]/60)+':'+parseInt(songs[i][3]%60)+'</div></div>');
                 }else{
                    
                 }
            }
        })

         $('.veseli').on('click', function(){
             $('.wrp').empty();
            for(i=0;i<songs.length;i++){
                if(songs[i][4]=="веселі"){
                $('.wrp').append('<div class="song" id="'+songs[i][0]+'"><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="download"></div><div class="duration_song">'+parseInt(songs[i][3]/60)+':'+parseInt(songs[i][3]%60)+'</div></div>');
                 }else{
                    
                 }
            }
        })

         $('.sumni').on('click', function(){
             $('.wrp').empty();
            for(i=0;i<songs.length;i++){
                if(songs[i][4]=="сумні"){
                $('.wrp').append('<div class="song" id="'+songs[i][0]+'"><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="download"></div><div class="duration_song">'+parseInt(songs[i][3]/60)+':'+parseInt(songs[i][3]%60)+'</div></div>');
                 }else{
                    
                 }
            }
        })

         const SearchInput = document.getElementById('mySearch');

        SearchInput.addEventListener('keyup', ()=>{
            const filter = SearchInput.value.toUpperCase(); 
      $('.wrp').empty();
            for(i=0; i<songs.length; i++) {
                const a = songs[i][1];
                if(a.toUpperCase().indexOf(filter)> -1){
                    $('.wrp').append('<div class="song" id="'+songs[i][0]+'"><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="download"></div><div class="duration_song">'+parseInt(songs[i][3]/60)+':'+parseInt(songs[i][3]%60)+'</div></div>');

                }else{
                    
                }
            }
        })

        //A function to return a random number between a min and a max value
function randomNumber(min, max) {
  number =  Math.floor((Math.random()*(max-min))+ min);
  return number;
}

//Initialise starting values
var purple, blue, cyan, green, yellow, orange, red;
purple = 50;
blue = 140;
cyan = 100;
green = 140;
yellow = 100;

//To start with the equalizer is paused
var playing=false;

// A Function to change the height of a column more or less randomly
function changeHeight(column, height) {
  height-=randomNumber(-20,20);
  if (height>160) height=160;
  if (height<5) height=5;
  column.style.height=height + "px";  
  return height;
}


//A Function that will be run every 50ms to animate the equalizer
function animate() {
   
    purple = changeHeight(document.getElementById("purple"),purple);    
    blue = changeHeight(document.getElementById("blue"),blue); 
    cyan = changeHeight(document.getElementById("cyan"),cyan); 
    green = changeHeight(document.getElementById("green"),green); 
    yellow = changeHeight(document.getElementById("yellow"),yellow);  
    
    //Repeat this function every 50 ms
    setTimeout(animate, 50);
  
}

//A Function to play or pause the animation
function play() {
  if (playing) {
    playing=false;
  } else {
    playing=true;
    animate();
  }
}
$('.play-pause').on('click', function(){
    play();
})
});
