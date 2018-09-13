(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const modal = document.getElementById('modal');

const activateModal = function(){
  modal.classList.add('active');
  modal.getElementsByTagName('img')[0].src = this.src
}



var slick = $('.project-photos').slick({
   // variableWidth:true
   
 lazyLoad: 'progressive',
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

var myLazyLoad = new LazyLoad({
  elements_selector: ".lazy"
});


modal.onclick = function(){
  modal.classList.remove('active');
}

const portfolioImages = document.getElementsByClassName('lazy'); 

for(i=0; i < portfolioImages.length; i++){
  portfolioImages[i].onclick = activateModal
}

// const slicks = document.getElementsByClassName('slick-slide'); 

// for(i=0; i < slicks.length; i++){
//   slicks[i].onclick = activateModal
// }


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJyk7XG5cbmNvbnN0IGFjdGl2YXRlTW9kYWwgPSBmdW5jdGlvbigpe1xuICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgbW9kYWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYyA9IHRoaXMuc3JjXG59XG5cblxuXG52YXIgc2xpY2sgPSAkKCcucHJvamVjdC1waG90b3MnKS5zbGljayh7XG4gICAvLyB2YXJpYWJsZVdpZHRoOnRydWVcbiAgIFxuIGxhenlMb2FkOiAncHJvZ3Jlc3NpdmUnLFxuICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcbiAgYXJyb3dzOiBmYWxzZVxuICBcbn0pO1xuXG5cbiQoJy5uZXh0LWFycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgaSA9ICQoJy5uZXh0LWFycm93JykuaW5kZXgoIHRoaXMgKVxuICAgIGNvbnNvbGUubG9nKGkpO1xuICAgIHNsaWNrLmVxKGkpLnNsaWNrKCdzbGlja05leHQnKTtcbn0pO1xuXG4kKCcuc2xpY2stcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGkgPSAkcHJldi5pbmRleCggdGhpcyApXG4gICAgc2xpY2suZXEoaSkuc2xpY2tQcmV2KCk7XG59KTtcblxudmFyIG15TGF6eUxvYWQgPSBuZXcgTGF6eUxvYWQoe1xuICBlbGVtZW50c19zZWxlY3RvcjogXCIubGF6eVwiXG59KTtcblxuXG5tb2RhbC5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG59XG5cbmNvbnN0IHBvcnRmb2xpb0ltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xhenknKTsgXG5cbmZvcihpPTA7IGkgPCBwb3J0Zm9saW9JbWFnZXMubGVuZ3RoOyBpKyspe1xuICBwb3J0Zm9saW9JbWFnZXNbaV0ub25jbGljayA9IGFjdGl2YXRlTW9kYWxcbn1cblxuLy8gY29uc3Qgc2xpY2tzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpY2stc2xpZGUnKTsgXG5cbi8vIGZvcihpPTA7IGkgPCBzbGlja3MubGVuZ3RoOyBpKyspe1xuLy8gICBzbGlja3NbaV0ub25jbGljayA9IGFjdGl2YXRlTW9kYWxcbi8vIH1cblxuIl19
