
// -----------------TOGGLE MENU------------------- //

var menuOpen = false;

function toggleMenu() {
  var menu = document.getElementById('menu');
  var icon = document.getElementById('iconImage');

  if (!menuOpen) {
    menu.classList.add('menu-open');
    icon.src = 'img/navbar-close.png';
    menuOpen = true;
  } else {
    menu.classList.remove('menu-open');
    icon.src = 'img/navbar-burger.png';
    menuOpen = false;
  }
}


/*==================== TOGGLE TABS ====================*/
let tabsPortfolio = document.querySelectorAll('.tabs__toggle'),
    contents = document.querySelectorAll('.tabs__content');

    tabsPortfolio.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        contents.forEach((content) => {
            content.classList.remove('is-active');
        });
        tabsPortfolio.forEach((tab) => {
            tab.classList.remove('is-active');
        });
        contents[index].classList.add('is-active');
        tabsPortfolio[index].classList.add('is-active');
    });
});




// Récupérer les éléments nécessaires
//var form = document.getElementById('myForm');
//var messageInput = document.getElementById('messageInput');
//var modal = document.getElementById('myModal');
//var modalText = document.getElementById('modalText');
//var closeBtn = document.getElementsByClassName('close')[0];

// Afficher la pop-up de validation
//form.addEventListener('submit', function(e) {
  //e.preventDefault(); // Empêcher la soumission du formulaire

  //if (messageInput.value !== '') {
    //modalText.innerHTML = 'Message envoyé : ' + messageInput.value;
    //modal.style.display = 'block';
    //messageInput.value = '';
  //}
//});

// Fermer la pop-up
//closeBtn.addEventListener('click', function() {
  //modal.style.display = 'none';
//});