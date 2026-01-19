$(document).ready(function(){
    $('.bxslider').bxSlider({
        pager: false,
        
    });
    console.log(1)
});


$(document).ready(function(){
    $('.bxslider_team').bxSlider({
        controls: false,
        
    });
    console.log(1)
});


$(document).ready(function(){
    $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 200,
        itemMargin: 25,
        touch: true 
    });
});


$(document).ready(function(){
    $('.accordion').accordion({
        defaultOpen: ''
    });
});

$(function(){
    let filterlist = {
        init: function(){
            $('.workportfolio').mixitup({
                targetSelector: '.portfolio',
                filterSelector: '.filter',
                effects: ['fade'],
                easing: 'snap'
            });
        },
    };
    filterlist.init();
});


$(document).ready(function($){
$(".primary-nav-trigger").on("click", function(){
    $(".menu-icon").toggleClass("is-clicked");
    $(".primary-nav").toggleClass("is-visible");
    $("body").toggleClass("overflow-hidden");
});
});

$(".primary-nav").on("click", "a", function (event) {
    event.preventDefault();
    let id = $(this).attr("href"),
        top = $(id).offset().top;
    $("body,html").animate({scrollTop: top}, 1000);
    $(".menu-icon").toggleClass("is-clicked");
    $(".primary-nav").toggleClass("is-visible");
    $("body").toggleClass("overflow-hidden");
});

let headerHeight = $(".topheader").height();
$(window).on("scroll", { previousTop: 0 },
function(){
    let currentTop = $(window).scrollTop();
    if(currentTop < this.previousTop){
        if( !(currentTop > 0) && $(".topheader").hasClass("is-fixed")){
            $(".topheader").removeClass("is-fixed");
        }
    }else{
        if(currentTop > headerHeight && !$(".topheader").hasClass("is-fixed")){
            $(".topheader").addClass("is-fixed");
        }
    }
    this.previousTop = currentTop;
});



$(document).ready(function(){
    $(".submit").on("click", function(){
        if($("#name").val() != "" && $("#email").val() != ""){
            fetch("../send.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: $("#send_form").serialize(),
            }).then((responce) => responce.json()).then((data) => {
                if (data.status === "ok") {
                    $("#send_form").addClass("send_succsess");
                    setTimeout(() => $("#send_form").removeClass("send_succsess"), 4000);
                }
                if (data.status === "error") {
                    $("#send_form").addClass("send_fail");
                    setTimeout(() => $("#send_form").removeClass("send_fail"), 4000);
            }
        });
        }else{
            alert("Заполните обязательные поля!");
        }
    });
    });
