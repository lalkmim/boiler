/* global $ */
$(document).ready(function() {

  // Variables
  var $codeSnippets = $('.code-example-body'),
      $nav = $('.navbar'),
      $body = $('body'),
      $window = $(window),
      $popoverLink = $('[data-popover]'),
      navOffsetTop = ($nav.offset() ? $nav.offset().top : 0),
      $document = $(document),
      entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '/': '&#x2F;'
      };

  function init() {
    $window.on('scroll', onScroll);
    $window.on('resize', resize);
    $popoverLink.on('click', openPopover);
    $document.on('click', closePopover);
    $('a[href^="#"]').on('click', smoothScroll);
    buildSnippets();
  }

  function smoothScroll(e) {
    e.preventDefault();
    $(document).off('scroll');
    var target = this.hash;
    //var menu = target;
    if(target) {
      var $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top-40
      }, 0, 'swing', function () {
          window.location.hash = target;
          $(document).on('scroll', onScroll);
      });
    }
  }

  function openPopover(e) {
    e.preventDefault();
    closePopover();
    var popover = $($(this).data('popover'));
    popover.toggleClass('open');
    e.stopImmediatePropagation();
  }

  function closePopover(e) {
    if($('.popover.open').length > 0) {
      $('.popover').removeClass('open');
    }
  }

  $('#button').click(function() {
    $('html, body').animate({
        scrollTop: $('#elementtoScrollToID').offset().top
    }, 2000);
  });

  function resize() {
    $body.removeClass('has-docked-nav');
    var mobileView = $('.navbar-menu').css('display') != 'none';
    
    if(mobileView) {
      $('.navbar').css('display', 'none');
      $('.navbar-list').addClass('twelve columns');
    } else {
      $('.navbar').css('display', 'block');
      $('.navbar-list').removeClass('twelve columns');
    }
    
    navOffsetTop = $nav.offset().top;
    onScroll();
  }

  function onScroll() {
    if(navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
      $body.addClass('has-docked-nav');
    }
    if(navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
      $body.removeClass('has-docked-nav');
    }
  }

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function buildSnippets() {
    $codeSnippets.each(function() {
      var newContent = escapeHtml($(this).html());
      $(this).html(newContent);
    });
  }

  init();
  
  $('.navbar-menu a').click(function(e) {
    $('.navbar').toggle();
  });
});