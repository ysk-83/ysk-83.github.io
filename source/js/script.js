// ===============определение устройства с кот.открыта страница=================================
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};
if (isMobile.any()) {
    document.body.classList.add('__touch');
} else {
    document.body.classList.add('__pc');
}
//==============================================================================================

//==========функция прописывает картинке подключенной через тэг img, свойство background========

async function ibg() {
    const images = document.querySelectorAll(".ibg");//получаем доступ к классу ibg
    if (images.length > 0) {//если кол-во изображений больше 0,
        await Promise.all(
            await Object.keys(images).map(async (i) => {  //возвр.массив с изображениями
                if (images[i].querySelector('img')) {   //для каждого элемента массива(изобр.)запускаем функцию,которая присв. свойство background
                    images[i].style.backgroundImage = `url(${images[i].querySelector('img').getAttribute('src')})`;
                }
            })
        )
    }
}

//запуск функци и вывод в консоль результата работы скрипта
ibg().then(() => {
    console.log('images BG added correctly');
}).catch(err => {
    console.log('Error: ', err);
    throw err;
});
//====================================================================================

// ==========================добавляем класс активности бургер меню и body====================
let burger = document.querySelector('.burger');
let menu = document.querySelector('.menu__body');
let body = document.querySelector('body');
if(burger) {
    burger.addEventListener('click', (e) => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('lock');
    });
}
// ====================================================================================


// =======================плавная прокрутка к нужному разделу==================================
const menuLinks = document.querySelectorAll('.menu__link span[data-goto]');
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', (e) => {
            const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

            if(menu.classList.contains('active')) {
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('lock');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
        });
    });
}
// =============================================================================================
//======================================fixed header============================================
// при скролле окна более 0px присваиваем класс header__sticky(в стилях верстаем вид хэдэра)
window.addEventListener('scroll', function(){
    const header = document.querySelector('.header');
    header.classList.toggle("header__sticky", window.scrollY > 300);
  });
//   ===========================================================================================
// ========================================back-to-top-button===================================
// const backBtn = document.querySelector('.back-to-top-button');
// window.addEventListener('scroll', function() {
//     if(window.scrollY > 300) {
//         backBtn.classList.add('show');
//     } else {
//         backBtn.classList.remove('show');
//     }
// });
// backBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//     });
// });
//==============================================================================================

// ====================================слайдер=========================================
// const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     // direction: 'vertical',
//     // loop: true,

//     // If we need pagination
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     autoHeight: true,

//     // Navigation arrows
//     // navigation: {
//     //   nextEl: '.swiper-button-next',
//     //   prevEl: '.swiper-button-prev',
//     // },

//     // And if we need scrollbar
//     // scrollbar: {
//     //   el: '.swiper-scrollbar',
//     // },
// });
//=============================================================================================
// ==============================tabs==========================================================
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    /* ================Tabs================ */
    const tabsParent = document.querySelector(tabsParentSelector);
    const tabsChild = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);

    // скрываем все табы.Каждый таб-это элемент массива tabsContent,перебирая массив у каждого таба удаляем класс который отвечает за его показ и добавляем класс удаляющий его,также удаляем класс активности у списка вкладок tabsChild
    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.classList.remove('show');
            tab.classList.add('hide');
        });
        tabsChild.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }

    // функция отвечающая за показ таба.По умолчанию будет показан элемент массива i(в аргументе функции i = 0),ему будет присвоен класс show,удален класс hide,также элементу списка добавлен класс активности
    function showTabContent(i = 2) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show');
        tabsChild[i].classList.add(activeClass);
    }

    // назначаем обработчик событий с делегированием(потому-что не известно сколько табов будет окончательно или они потом будут добавлятся)
    tabsParent.addEventListener('click', e => {
        //так как в функцию tabs() в качестве аргументов передаются селекторы querySelector(с точками),а в classList  без точек то чтобы селекторы нормально работали-берем селектор-аргумент и вырезаем у него точку вначале(tabsSelector.slice(1))
        if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
            tabsChild.forEach((item, i) => {
                if (item == e.target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Скрываем все табы на странице и сразу же показываем первый таб по-умолчанию
    hideTabContent();
    showTabContent();
    /* ============================================= */
}

tabs('.tab__navitem', '.tab__item', '.nav-newsmedia', 'active');
// ============================================================================================