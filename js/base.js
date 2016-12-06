(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Your graphic code here!






$(function () {

    // var $next = $arrows.children(".next-arrow");    
    // var $prev = $arrows.children(".prev-arrow");

    var slick = $('.project-photos').slick({
       // variableWidth:true
       adaptiveHeight: true,
      arrows: false
   });


    $('.next-arrow').on('click', function (e) {
        var i = $('.next-arrow').index( this )
        console.log(i);
        slick.eq(i).slick('slickNext');
    });

    $('.slick-prev').on('click', function (e) {
        var i = $prev.index( this )
        slick.eq(i).slickPrev();
    });

});


// wapoWatcher.partiallyExitViewport(function() {
//     $('#washington-post .publication-headline').removeClass('affix');

//     if(wapoWatcher.isAboveViewport){

//        $('#washington-post .publication-headline').removeClass('affix').addClass('above').css('top', $('#washington-post').outerHeight() - $( window ).height()  );

//     }
// });

// wapoWatcher.fullyEnterViewport(function() {
//     $('#washington-post .publication-headline').addClass('affix').removeClass('above').css('top','');
// });


// var tbtWatcher = scrollMonitor.create( $('#tampa-bay-times'), {top: 20, bottom: -20} );

// tbtWatcher.partiallyExitViewport(function() {
//     $('#tampa-bay-times .publication-headline').removeClass('affix');

//     if(tbtWatcher.isAboveViewport){

//        $('#tampa-bay-times .publication-headline').removeClass('affix').addClass('above').css('top', $('#tampa-bay-times').outerHeight() - $( window ).height() );

//     }
// });

// tbtWatcher.fullyEnterViewport(function() {
//     $('#tampa-bay-times .publication-headline').addClass('affix').removeClass('above').css('top','');
// });

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIFlvdXIgZ3JhcGhpYyBjb2RlIGhlcmUhXG5cblxuXG5cblxuXG4kKGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIHZhciAkbmV4dCA9ICRhcnJvd3MuY2hpbGRyZW4oXCIubmV4dC1hcnJvd1wiKTsgICAgXG4gICAgLy8gdmFyICRwcmV2ID0gJGFycm93cy5jaGlsZHJlbihcIi5wcmV2LWFycm93XCIpO1xuXG4gICAgdmFyIHNsaWNrID0gJCgnLnByb2plY3QtcGhvdG9zJykuc2xpY2soe1xuICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6dHJ1ZVxuICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxuICAgICAgYXJyb3dzOiBmYWxzZVxuICAgfSk7XG5cblxuICAgICQoJy5uZXh0LWFycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGkgPSAkKCcubmV4dC1hcnJvdycpLmluZGV4KCB0aGlzIClcbiAgICAgICAgY29uc29sZS5sb2coaSk7XG4gICAgICAgIHNsaWNrLmVxKGkpLnNsaWNrKCdzbGlja05leHQnKTtcbiAgICB9KTtcblxuICAgICQoJy5zbGljay1wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGkgPSAkcHJldi5pbmRleCggdGhpcyApXG4gICAgICAgIHNsaWNrLmVxKGkpLnNsaWNrUHJldigpO1xuICAgIH0pO1xuXG59KTtcblxuXG4vLyB3YXBvV2F0Y2hlci5wYXJ0aWFsbHlFeGl0Vmlld3BvcnQoZnVuY3Rpb24oKSB7XG4vLyAgICAgJCgnI3dhc2hpbmd0b24tcG9zdCAucHVibGljYXRpb24taGVhZGxpbmUnKS5yZW1vdmVDbGFzcygnYWZmaXgnKTtcblxuLy8gICAgIGlmKHdhcG9XYXRjaGVyLmlzQWJvdmVWaWV3cG9ydCl7XG5cbi8vICAgICAgICAkKCcjd2FzaGluZ3Rvbi1wb3N0IC5wdWJsaWNhdGlvbi1oZWFkbGluZScpLnJlbW92ZUNsYXNzKCdhZmZpeCcpLmFkZENsYXNzKCdhYm92ZScpLmNzcygndG9wJywgJCgnI3dhc2hpbmd0b24tcG9zdCcpLm91dGVySGVpZ2h0KCkgLSAkKCB3aW5kb3cgKS5oZWlnaHQoKSAgKTtcblxuLy8gICAgIH1cbi8vIH0pO1xuXG4vLyB3YXBvV2F0Y2hlci5mdWxseUVudGVyVmlld3BvcnQoZnVuY3Rpb24oKSB7XG4vLyAgICAgJCgnI3dhc2hpbmd0b24tcG9zdCAucHVibGljYXRpb24taGVhZGxpbmUnKS5hZGRDbGFzcygnYWZmaXgnKS5yZW1vdmVDbGFzcygnYWJvdmUnKS5jc3MoJ3RvcCcsJycpO1xuLy8gfSk7XG5cblxuLy8gdmFyIHRidFdhdGNoZXIgPSBzY3JvbGxNb25pdG9yLmNyZWF0ZSggJCgnI3RhbXBhLWJheS10aW1lcycpLCB7dG9wOiAyMCwgYm90dG9tOiAtMjB9ICk7XG5cbi8vIHRidFdhdGNoZXIucGFydGlhbGx5RXhpdFZpZXdwb3J0KGZ1bmN0aW9uKCkge1xuLy8gICAgICQoJyN0YW1wYS1iYXktdGltZXMgLnB1YmxpY2F0aW9uLWhlYWRsaW5lJykucmVtb3ZlQ2xhc3MoJ2FmZml4Jyk7XG5cbi8vICAgICBpZih0YnRXYXRjaGVyLmlzQWJvdmVWaWV3cG9ydCl7XG5cbi8vICAgICAgICAkKCcjdGFtcGEtYmF5LXRpbWVzIC5wdWJsaWNhdGlvbi1oZWFkbGluZScpLnJlbW92ZUNsYXNzKCdhZmZpeCcpLmFkZENsYXNzKCdhYm92ZScpLmNzcygndG9wJywgJCgnI3RhbXBhLWJheS10aW1lcycpLm91dGVySGVpZ2h0KCkgLSAkKCB3aW5kb3cgKS5oZWlnaHQoKSApO1xuXG4vLyAgICAgfVxuLy8gfSk7XG5cbi8vIHRidFdhdGNoZXIuZnVsbHlFbnRlclZpZXdwb3J0KGZ1bmN0aW9uKCkge1xuLy8gICAgICQoJyN0YW1wYS1iYXktdGltZXMgLnB1YmxpY2F0aW9uLWhlYWRsaW5lJykuYWRkQ2xhc3MoJ2FmZml4JykucmVtb3ZlQ2xhc3MoJ2Fib3ZlJykuY3NzKCd0b3AnLCcnKTtcbi8vIH0pO1xuIl19
