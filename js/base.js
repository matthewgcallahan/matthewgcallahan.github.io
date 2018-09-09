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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gWW91ciBncmFwaGljIGNvZGUgaGVyZSFcblxuXG5cblxuXG5cbiQoZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gdmFyICRuZXh0ID0gJGFycm93cy5jaGlsZHJlbihcIi5uZXh0LWFycm93XCIpOyAgICBcbiAgICAvLyB2YXIgJHByZXYgPSAkYXJyb3dzLmNoaWxkcmVuKFwiLnByZXYtYXJyb3dcIik7XG5cbiAgICB2YXIgc2xpY2sgPSAkKCcucHJvamVjdC1waG90b3MnKS5zbGljayh7XG4gICAgICAgLy8gdmFyaWFibGVXaWR0aDp0cnVlXG4gICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICBcbiAgIH0pO1xuXG5cbiAgICAkKCcubmV4dC1hcnJvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBpID0gJCgnLm5leHQtYXJyb3cnKS5pbmRleCggdGhpcyApXG4gICAgICAgIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICBzbGljay5lcShpKS5zbGljaygnc2xpY2tOZXh0Jyk7XG4gICAgfSk7XG5cbiAgICAkKCcuc2xpY2stcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBpID0gJHByZXYuaW5kZXgoIHRoaXMgKVxuICAgICAgICBzbGljay5lcShpKS5zbGlja1ByZXYoKTtcbiAgICB9KTtcblxufSk7XG5cblxuLy8gd2Fwb1dhdGNoZXIucGFydGlhbGx5RXhpdFZpZXdwb3J0KGZ1bmN0aW9uKCkge1xuLy8gICAgICQoJyN3YXNoaW5ndG9uLXBvc3QgLnB1YmxpY2F0aW9uLWhlYWRsaW5lJykucmVtb3ZlQ2xhc3MoJ2FmZml4Jyk7XG5cbi8vICAgICBpZih3YXBvV2F0Y2hlci5pc0Fib3ZlVmlld3BvcnQpe1xuXG4vLyAgICAgICAgJCgnI3dhc2hpbmd0b24tcG9zdCAucHVibGljYXRpb24taGVhZGxpbmUnKS5yZW1vdmVDbGFzcygnYWZmaXgnKS5hZGRDbGFzcygnYWJvdmUnKS5jc3MoJ3RvcCcsICQoJyN3YXNoaW5ndG9uLXBvc3QnKS5vdXRlckhlaWdodCgpIC0gJCggd2luZG93ICkuaGVpZ2h0KCkgICk7XG5cbi8vICAgICB9XG4vLyB9KTtcblxuLy8gd2Fwb1dhdGNoZXIuZnVsbHlFbnRlclZpZXdwb3J0KGZ1bmN0aW9uKCkge1xuLy8gICAgICQoJyN3YXNoaW5ndG9uLXBvc3QgLnB1YmxpY2F0aW9uLWhlYWRsaW5lJykuYWRkQ2xhc3MoJ2FmZml4JykucmVtb3ZlQ2xhc3MoJ2Fib3ZlJykuY3NzKCd0b3AnLCcnKTtcbi8vIH0pO1xuXG5cbi8vIHZhciB0YnRXYXRjaGVyID0gc2Nyb2xsTW9uaXRvci5jcmVhdGUoICQoJyN0YW1wYS1iYXktdGltZXMnKSwge3RvcDogMjAsIGJvdHRvbTogLTIwfSApO1xuXG4vLyB0YnRXYXRjaGVyLnBhcnRpYWxseUV4aXRWaWV3cG9ydChmdW5jdGlvbigpIHtcbi8vICAgICAkKCcjdGFtcGEtYmF5LXRpbWVzIC5wdWJsaWNhdGlvbi1oZWFkbGluZScpLnJlbW92ZUNsYXNzKCdhZmZpeCcpO1xuXG4vLyAgICAgaWYodGJ0V2F0Y2hlci5pc0Fib3ZlVmlld3BvcnQpe1xuXG4vLyAgICAgICAgJCgnI3RhbXBhLWJheS10aW1lcyAucHVibGljYXRpb24taGVhZGxpbmUnKS5yZW1vdmVDbGFzcygnYWZmaXgnKS5hZGRDbGFzcygnYWJvdmUnKS5jc3MoJ3RvcCcsICQoJyN0YW1wYS1iYXktdGltZXMnKS5vdXRlckhlaWdodCgpIC0gJCggd2luZG93ICkuaGVpZ2h0KCkgKTtcblxuLy8gICAgIH1cbi8vIH0pO1xuXG4vLyB0YnRXYXRjaGVyLmZ1bGx5RW50ZXJWaWV3cG9ydChmdW5jdGlvbigpIHtcbi8vICAgICAkKCcjdGFtcGEtYmF5LXRpbWVzIC5wdWJsaWNhdGlvbi1oZWFkbGluZScpLmFkZENsYXNzKCdhZmZpeCcpLnJlbW92ZUNsYXNzKCdhYm92ZScpLmNzcygndG9wJywnJyk7XG4vLyB9KTtcbiJdfQ==
