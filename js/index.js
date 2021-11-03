
// $('html, body').stop().animate({
//     scrollTop : 0
// }, 1000)

    var content = "Welcome to my Portfolio";
    var text = document.querySelector(".introText")
    let i = 0;

    function typing(){
        if ( i < content.length ){
            let txt = content.charAt(i);
            text.innerHTML += txt;
            i++;
        }
    }
    setInterval(typing, 100)

$(window).on('load', function(){
    var i = 0;
    var timer = setInterval(intro, 25)

    function intro(){
        i++
        if (i >= 100){
            clearInterval(timer)
            $('.introAni .bgcircle > div:nth-child(1)').hide()
            $('.introAni').css({
                backgroundColor:'#ffc400',
                opacity:0
            }).animate({
               opacity:0
            }, 600, function(){
                $(this).hide()
            })
        }
    }
})

$('.down').on('click',function(e){
    e.preventDefault()
    let dsct = $(window).scrollTop()
    var dnum = 0;
    $('section').each(function(a, b){ 
        if ( dsct === $(this).offset().top ) {
            dnum = a 
        } 
    })
    $('html, body').animate({
        scrollTop: $('section').eq(dnum + 1).offset().top
    },500)
})

$('#menu li').eq(0).addClass('on')
var cflag = false;


$('#menu li a').on('click focus', function(e){
    e.preventDefault()
    cflag = true;
    $(this).parent().addClass('on')
    $(this).parent().siblings().removeClass('on')
    var num = $(this).parent().index()
    if (num===0) {
        $('.skillContainer > div').removeClass('on')
    } else {
        $('.skillContainer > div').addClass('on')
    }
    
    var secDist = $('section').eq(num).offset().top
    $('html, body').stop().animate({
        scrollTop : secDist
    }, 1000, function(){
        cflag = false
    })
})

function count(jumsu, cname){
    let count = 0
    var stop = setInterval(function(){
        count++
        if ( count<=jumsu ) {
            $(cname).find('.myscore').text(count  +'%')
        } else {
            clearInterval(stop)
            return false
        }
    },10)
}

var sDist0 = $('#sect1').offset().top
var sDist1 = $('#sect2').offset().top
// 마지막 구간이 윈도우 높이보다 클 때
var lastSect = $('#sect3').offset().top
// 마지막 구간이 윈도우 높이보다  작을 때
// var lastSect = $('body').height() - $(window).height()

$(window).on('scroll', function(){
    // var wh = $(this).height()
    var sct = $(this).scrollTop()

    if ( sct < $('section').eq(2).offset().top ){
        $('.down').removeClass('on')
    } else {
        $('.down').addClass('on')
    } 

    if ( sct >= sDist0 && sct < sDist1 && !cflag) {
        $('#menu li').eq(0).addClass('on')
        $('#menu li').eq(0).siblings().removeClass('on')
        $('.skillContainer').removeClass('on')
        $('.bgcircle').removeClass('on1')
    } else if ( sct >= sDist1 && sct < lastSect && !cflag){
        $('#menu li').eq(1).addClass('on')
        $('#menu li').eq(1).siblings().removeClass('on')
        if (!$('.skillContainer').hasClass('on')){
            $('.skillContainer').addClass('on')
            count(90, '.html')
            count(85, '.css')
            count(70, '.javascript')
            count(80, '.jquery')
            count(30, '.react')
        }
        $('#sect3').removeClass('on')
        $('.bgcircle').addClass('on1')
        $('.bgcircle').removeClass('on2')
    } else if ( sct >= lastSect && !cflag){
        $('#menu li').eq(2).addClass('on')
        $('#menu li').eq(2).siblings().removeClass('on')
        $('#sect3').addClass('on')
        $('.bgcircle').removeClass('on1')
        $('.bgcircle').addClass('on2')
    }

    for (let i=0; i<4; i++){
        if ( sct >= wh*i && sct < wh*(i+1)) {
            $('#menu li').eq(i).addClass('on')
            $('#menu li').eq(i).siblings().removeClass('on')
     }
    }
}) 

$('html, body').on('mousewheel DOMMouseScroll', 'section', function(event, delta){
    if (delta>0){           // 마우스 휠을 위로 굴리면 양수(1)
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 600)
    } else if (delta<0){    // 마우스 휠을 아래로 굴리면 음수(-1)
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 600)
    }
})

$('.slideInner').slick({
    autoplay: true,
    dots: true,
    autoPlaySpeed: 6000,
    pauseOnHover: false,
    arrows: true,
    prevArrow:'<button><i class="fas fa-chevron-circle-left"></i></button>',
    nextArrow:'<button><i class="fas fa-chevron-circle-right"></i></button>'
})


