window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];

function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function () {
    return false;
  };
  image.oncontextmenu = function () {
    return false;
  };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 5000,
  }

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);

  // Loop on each carousel initialized
  for (var i = 0; i < carousels.length; i++) {
    // Add listener to  event
    carousels[i].on('before:show', state => {
      console.log(state);
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function (state) {
      console.log(state);
    });
  }

  /*var player = document.getElementById('interpolation-video');
  player.addEventListener('loadedmetadata', function() {
    $('#interpolation-slider').on('input', function(event) {
      console.log(this.value, player.duration);
      player.currentTime = player.duration / 100 * this.value;
    })
  }, false);*/
  preloadInterpolationImages();

  $('#interpolation-slider').on('input', function (event) {
    setInterpolationImage(this.value);
  });
  setInterpolationImage(0);
  $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

  bulmaSlider.attach();

  
    // Tab 切换逻辑
    const tabs = document.querySelectorAll('.tabs ul li');
    const sections = document.querySelectorAll('.carousel-wrapper');
    // ✅ 设置默认状态（以第一个 tab 为默认）
    const defaultTab = tabs[0];
    const defaultTarget = defaultTab.dataset.target;

    tabs.forEach(tab => tab.classList.remove('is-active'));
    defaultTab.classList.add('is-active');

    sections.forEach(section => {
      if (section.id === defaultTarget) {
        section.classList.remove('is-hidden');
      } else {
        section.classList.add('is-hidden');
      }
    });

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // 设置当前 tab 高亮
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
  
        // 显示对应轮播容器
        const targetId = tab.dataset.target;
        sections.forEach(sec => {
          if (sec.id === targetId) {
            sec.classList.remove('is-hidden');
          } else {
            sec.classList.add('is-hidden');
          }
        });
      });
    });

    // 根据屏幕宽度更改slidesToShow
    function getSlidesToShow() {
      const width = window.innerWidth;
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    }
    
    function initResponsiveCarousel() {
      const carousels = document.querySelectorAll('.carousel');
    
      carousels.forEach(el => {
        bulmaCarousel.attach(el, {
          slidesToShow: getSlidesToShow(),
          slidesToScroll: 1,
          autoplay: true,
          loop: true,
        });
      });
    }
    
    window.addEventListener('load', initResponsiveCarousel);
    window.addEventListener('resize', () => {
      // 手动销毁并重建所有轮播（bulma-carousel 没有自动响应）
      document.querySelectorAll('.carousel').forEach(el => {
        if (el.bulmaCarousel) {
          el.bulmaCarousel.destroy();
        }
      });
      initResponsiveCarousel();
    });

})