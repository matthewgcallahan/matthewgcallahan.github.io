(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Your graphic code here!



$('.project-photos').slick({
    // variableWidth:true
    adaptiveHeight: true,
    nextArrow: $('.next-arrow'),
    prevArrow: $('.prev-button')
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gWW91ciBncmFwaGljIGNvZGUgaGVyZSFcblxuXG5cbiQoJy5wcm9qZWN0LXBob3RvcycpLnNsaWNrKHtcbiAgICAvLyB2YXJpYWJsZVdpZHRoOnRydWVcbiAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcbiAgICBuZXh0QXJyb3c6ICQoJy5uZXh0LWFycm93JyksXG4gICAgcHJldkFycm93OiAkKCcucHJldi1idXR0b24nKVxufSk7XG5cblxuXG4vLyB3YXBvV2F0Y2hlci5wYXJ0aWFsbHlFeGl0Vmlld3BvcnQoZnVuY3Rpb24oKSB7XG4vLyAgICAgJCgnI3dhc2hpbmd0b24tcG9zdCAucHVibGljYXRpb24taGVhZGxpbmUnKS5yZW1vdmVDbGFzcygnYWZmaXgnKTtcblxuLy8gICAgIGlmKHdhcG9XYXRjaGVyLmlzQWJvdmVWaWV3cG9ydCl7XG5cbi8vICAgICAgICAkKCcjd2FzaGluZ3Rvbi1wb3N0IC5wdWJsaWNhdGlvbi1oZWFkbGluZScpLnJlbW92ZUNsYXNzKCdhZmZpeCcpLmFkZENsYXNzKCdhYm92ZScpLmNzcygndG9wJywgJCgnI3dhc2hpbmd0b24tcG9zdCcpLm91dGVySGVpZ2h0KCkgLSAkKCB3aW5kb3cgKS5oZWlnaHQoKSAgKTtcblxuLy8gICAgIH1cbi8vIH0pO1xuXG4vLyB3YXBvV2F0Y2hlci5mdWxseUVudGVyVmlld3BvcnQoZnVuY3Rpb24oKSB7XG4vLyAgICAgJCgnI3dhc2hpbmd0b24tcG9zdCAucHVibGljYXRpb24taGVhZGxpbmUnKS5hZGRDbGFzcygnYWZmaXgnKS5yZW1vdmVDbGFzcygnYWJvdmUnKS5jc3MoJ3RvcCcsJycpO1xuLy8gfSk7XG5cblxuLy8gdmFyIHRidFdhdGNoZXIgPSBzY3JvbGxNb25pdG9yLmNyZWF0ZSggJCgnI3RhbXBhLWJheS10aW1lcycpLCB7dG9wOiAyMCwgYm90dG9tOiAtMjB9ICk7XG5cbi8vIHRidFdhdGNoZXIucGFydGlhbGx5RXhpdFZpZXdwb3J0KGZ1bmN0aW9uKCkge1xuLy8gICAgICQoJyN0YW1wYS1iYXktdGltZXMgLnB1YmxpY2F0aW9uLWhlYWRsaW5lJykucmVtb3ZlQ2xhc3MoJ2FmZml4Jyk7XG5cbi8vICAgICBpZih0YnRXYXRjaGVyLmlzQWJvdmVWaWV3cG9ydCl7XG5cbi8vICAgICAgICAkKCcjdGFtcGEtYmF5LXRpbWVzIC5wdWJsaWNhdGlvbi1oZWFkbGluZScpLnJlbW92ZUNsYXNzKCdhZmZpeCcpLmFkZENsYXNzKCdhYm92ZScpLmNzcygndG9wJywgJCgnI3RhbXBhLWJheS10aW1lcycpLm91dGVySGVpZ2h0KCkgLSAkKCB3aW5kb3cgKS5oZWlnaHQoKSApO1xuXG4vLyAgICAgfVxuLy8gfSk7XG5cbi8vIHRidFdhdGNoZXIuZnVsbHlFbnRlclZpZXdwb3J0KGZ1bmN0aW9uKCkge1xuLy8gICAgICQoJyN0YW1wYS1iYXktdGltZXMgLnB1YmxpY2F0aW9uLWhlYWRsaW5lJykuYWRkQ2xhc3MoJ2FmZml4JykucmVtb3ZlQ2xhc3MoJ2Fib3ZlJykuY3NzKCd0b3AnLCcnKTtcbi8vIH0pO1xuIl19
