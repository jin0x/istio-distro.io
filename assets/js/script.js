// Preloader js
function preloader() {
  $('.preloader').delay(100).fadeOut(10);
}
$(preloader);
$(document).on('turbolinks:load', preloader);

(function ($) {
  'use strict';

  // navfixed
  $(window).scroll(function () {
    if ($('.navigation').offset().top > 50) {
      $('.navigation').addClass('nav-bg');
    } else {
      $('.navigation').removeClass('nav-bg');
    }
  });

  // Get Parameters from some url
  var getUrlParameter = function getUrlParameter(sPageURL) {
    var url = sPageURL.split('?');
    var obj = {};
    if (url.length == 2) {
      var sURLVariables = url[1].split('&'),
        sParameterName,
        i;
      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        obj[sParameterName[0]] = sParameterName[1];
      }
      return obj;
    } else {
      return undefined;
    }
  };

  // Execute actions on images generated from Markdown pages
  var images = $('.content img').not('.inline');
  // Wrap image inside a featherlight (to get a full size view in a popup)
  images.wrap(function () {
    var image = $(this);
    if (!image.parent('a').length) {
      return "<a href='" + image[0].src + "' data-featherlight='image'></a>";
    }
  });

  // Change styles, depending on parameters set to the image
  images.each(function (index) {
    var image = $(this);
    var o = getUrlParameter(image[0].src);
    if (typeof o !== 'undefined') {
      var h = o['height'];
      var w = o['width'];
      var c = o['classes'];
      image.css('width', function () {
        if (typeof w !== 'undefined') {
          return w;
        } else {
          return 'auto';
        }
      });
      image.css('height', function () {
        if (typeof h !== 'undefined') {
          return h;
        } else {
          return 'auto';
        }
      });
      if (typeof c !== 'undefined') {
        var classes = c.split(',');
        for (i = 0; i < classes.length; i++) {
          image.addClass(classes[i]);
        }
      }
    }
  });

  // tab
  $('.tab-content')
    .find('.tab-pane')
    .each(function (idx, item) {
      var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
        title = $(this).attr('title');
      navTabs.append(
        '<li class="nav-item"><a class="nav-link" href="#">' +
          title +
          '</a></li>'
      );
    });

  $('.code-tabs ul.nav-tabs').each(function () {
    $(this).find('li:first').addClass('active');
  });

  $('.code-tabs .tab-content').each(function () {
    $(this).find('div:first').addClass('active');
  });

  $('.nav-tabs a').click(function (e) {
    e.preventDefault();
    var tab = $(this).parent(),
      tabIndex = tab.index(),
      tabPanel = $(this).closest('.code-tabs'),
      tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
    tabPanel.find('.active').removeClass('active');
    tab.addClass('active');
    tabPane.addClass('active');
  });

  // Add "copy to clipboard" buttons to the language classes
  $('pre code.language-sh')
    .parent()
    .append('<span class="copy-to-clipboard">copy</span>');

  $('pre code.language-yaml')
    .parent()
    .append('<span class="copy-to-clipboard">copy</span>');

  $('pre code.language-go')
    .parent()
    .append('<span class="copy-to-clipboard">copy</span>');

  // sets button to "copied" after clicked
  $('.copy-to-clipboard').click(function () {
    $(this).html('copied');
  });

  // match height
  $(function () {
    $('.match-height').matchHeight({
      byRow: true,
      property: 'height',
      target: null,
      remove: false,
    });
  });

  // search
  $('#search-by').keyup(function () {
    if (this.value) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  // featherlight
  $(function () {
    $('a[rel="lightbox"]').featherlight({
      root: 'body.content',
    });
  });

  // Accordions
  $('.collapse')
    .on('shown.bs.collapse', function () {
      $(this)
        .parent()
        .find('.ti-plus')
        .removeClass('ti-plus')
        .addClass('ti-minus');
    })
    .on('hidden.bs.collapse', function () {
      $(this)
        .parent()
        .find('.ti-minus')
        .removeClass('ti-minus')
        .addClass('ti-plus');
    });

  // var checkUser = localStorage.getItem('User');
  // var pathname = window.location.pathname;
  // if (checkUser == null) {
  //   if (pathname !== '/login/') {
  //     location = '/login/';
  //   }
  // }
})(jQuery);

function expandDictionary() {
  let moreText = document.getElementById('more');
  let btnIcon = document.getElementById('expandBtnIcon');

  if (moreText.style.display === 'inline') {
    moreText.style.display = 'none';
  } else {
    moreText.style.display = 'inline';
  }

  btnIcon.classList.toggle('ti-angle-down');
  btnIcon.classList.toggle('ti-angle-up');
}

// actual logic to push code to clipboard.
new ClipboardJS('.copy-to-clipboard', {
  target: function (trigger) {
    return trigger.previousElementSibling;
  },
});

function dropdownFunction() {
  document.getElementById('mobileDropdownMenu').classList.toggle('show');
}

window.onclick = function (event) {
  if (!event.target.matches('.nav-dropdown')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
