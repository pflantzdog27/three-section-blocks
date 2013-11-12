(function($){})(window.jQuery);
$(document).ready(function (){
    var mainPageSection = $('.explore-section');
    $('.explore-section:odd').addClass('odd');
    mainPageSection.each(function() {
        $('<div></div>').attr('class','section-loading').appendTo(this);
    })

});

    function sectionChunk(element,pathTrain,content,callbackFunction){
    var fnSettings;
    fnSettings = {
        catcher: element,
        path: pathTrain,
        contentBlock: content,
        callback : function() {
            if(!callbackFunction) {
                return false;
            } else {
                 callbackFunction.call();
            }
        }
    };
    loadRequest( fnSettings );
}
function loadRequest( settings ) {
    $(settings.catcher).load( settings.path+settings.contentBlock, settings.callback);
}
function fastFacts(){
    var numItems = $('.fast-fact-item').length;
    var index = Math.floor(Math.random() * numItems);
    var selected = $('.fast-fact-item:eq('+index+')');
    selected.addClass('display-fact');
    finishLoad('.section-loading');
}

function stackedBlocks() {
    $('<div></div>').attr('id','large-display-block').appendTo('#architecture-section');
    $('<div></div>').addClass('clearfix clear').appendTo('#architecture-section');
    $('.architecture-item').wrapAll('<div id="stacked-carousel"></div>');
    $('#stacked-carousel > div').eq(0).addClass('active-item');
    $('.architecture-item').each(function(){
        $(this).clone().appendTo('#large-display-block').addClass('larger');
    });
    $('#stacked-carousel .item-content').each(function() {
        string = $(this).text();
        var length = string.length;
        if(length > 150) {
           var sliced = string.substring(0, string.indexOf(" ", 150));
           $(this).text(sliced+'...');
        } else {
            $(this).text(string);
        }
    });

    $('#large-display-block > div').eq(0).css('display','block');
    $('#stacked-carousel > div').click(function() {
        $('#stacked-carousel > div').removeClass('active-item');
        $(this).addClass('active-item')
        $('#large-display-block > div').fadeOut(500);
        var eqPosition = $(this).index();
        $('#large-display-block > div').eq(eqPosition).fadeIn(500);
        clearInterval(autoRotate);
    });
    finishLoad('.section-loading');
    rotation();
    manualRotation();
}

function finishLoad(element){
    $(element).fadeOut(500,function(){
        $(this).remove();
    })
}

function rotation() {
    var check = 1;
   autoRotate = setInterval(function() {
       var count = $('#stacked-carousel > div').length;
       if (check < count){
           var current = $('.active-item').next('div');
           var eqPosition = $('.active-item').index();
           $('#stacked-carousel > div').removeClass('active-item');
           $('#large-display-block > div').fadeOut(1);
           $('#large-display-block > div').eq(eqPosition+1).fadeIn(500);
           current.addClass('active-item');
           ++check
       } else {
           clearInterval(autoRotate);
       }
    },5000)
}

function manualRotation () {
    $('#large-display-block, .carousel-nav').hover(function(){
        $('.carousel-nav').stop().fadeIn(300);
    },function(){
        $('.carousel-nav').stop().fadeOut(300);
    });

    $('.carousel-nav').click(function() {
        var items = $('#stacked-carousel > div').length;
        var eqPosition = $('.active-item').index();
        if($(this).hasClass('next')){
            var direction = $('.active-item').next('div');
            $('#stacked-carousel > div').removeClass('active-item');
            $('#large-display-block > div').fadeOut(1);
            $('#large-display-block > div').eq(eqPosition+1).fadeIn(500);
                if(eqPosition >= 2) {
                    $('#stacked-carousel > div').eq(eqPosition-2).slideUp(100);
                }
            direction.addClass('active-item');
            removeControl(0,'.prev',eqPosition);
            removeControl(items-2,'.next',eqPosition);
        } else {
            var direction = $('.active-item').prev('div');
            $('#stacked-carousel > div').removeClass('active-item');
            $('#large-display-block > div').fadeOut(1);
            $('#large-display-block > div').eq(eqPosition-1).fadeIn(500);
                if(eqPosition <= 1) {
                    $('#stacked-carousel > div').eq(eqPosition-1).slideDown(100);
                }
            direction.addClass('active-item');
            removeControl(1,'.prev',eqPosition);
            removeControl(items,'.next',eqPosition);
        }
        console.log(eqPosition)
        console.log(items-2)

        clearInterval(autoRotate);
    })
}

function removeControl(arg, element, eqPosition){
    if(eqPosition == arg) {
        $(element).css('visibility','hidden');
    } else {
        $(element).css('visibility','visible');
    }
}




