$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 600,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/ico/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/ico/chevron-right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
      });
    //валидация форм через jquery
$('#consultation-form').validate({
    rules: {
        name: {
            required: true,
            minlength: 2
        },
        phone:{
            required: true
        },
        email:{
            required: true,
            email: true
        },
    },
    messages: {
        name: "Введите ваше имя",
        phone: "Оставьте ваш номер телефона",
        email: {
          required: "Нам необходима ваша почта для связи",
          email: "Почта должна быть в формате name@domain.com"
        }
      }
});

$('form').submit(function (e) {
        e.preventDefault();
        console.log('работает!');
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
    $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
    }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
    }) 
    return false;
})
//Прокрутка и pageup
$(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
})

});

new WOW().init();
//управление видимостью блоков в карточках товаров
  const triggerLinks = document.querySelectorAll('.catalog-item__link');
  triggerLinks.forEach(link => {
      link.addEventListener('click', (e)=> {
          e.preventDefault();
          link.parentNode.classList.remove('catalog-item__content_active')
          link.parentNode.nextElementSibling.classList.add('catalog-item__list_active')
          console.dir(link.nextElementSibling);
          console.log(link.parentNode);
  })
});
const triggerBacks = document.querySelectorAll('.catalog-item__back');
  triggerBacks.forEach(link => {
      link.addEventListener('click', (e)=> {
          e.preventDefault();
          link.parentNode.classList.remove('catalog-item__list_active')
          link.parentNode.previousElementSibling.classList.add('catalog-item__content_active')
  })
});

//управление видимостью в ТАБАХ каталога
const tabsTrigger = document.querySelectorAll('.catalog__tabs li');
const tabsBlock = document.querySelectorAll('.catalog__content');
console.log(tabsBlock);
tabsTrigger.forEach((trigger, id) => {
    trigger.addEventListener('click', (e)=> {
        e.preventDefault();
        tabsTrigger.forEach(tab => tab.classList.remove('catalog__tab_active'));
        trigger.classList.add('catalog__tab_active');
        tabsBlock.forEach(tab => tab.classList.remove('catalog__content_active'))
        tabsBlock[id].classList.add('catalog__content_active')
    })
})

//управление модальными окнами на Jquery
    $('[data-modal="consultation"]').on('click', ()=> {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', () => {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    })

    $('.button_mini').each(function (i) {
        $(this).on('click', ()=>{
            console.log(`Clicked ${i}`);
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });




     