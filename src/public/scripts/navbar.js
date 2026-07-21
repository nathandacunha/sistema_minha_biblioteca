const btnMenu = document.getElementById('btnMenu');
const menuLinks = document.getElementById('menuLinks');

btnMenu.addEventListener('click', () => {
    menuLinks.classList.toggle('aberto');

    const icon = btnMenu.querySelector('i');

    // verifica o estado do menu
    if(menuLinks.classList.contains('aberto')) {
        icon.classList.remove('bi-list');
        icon.classList.add('bi-x-lg');
    } else {
        icon.classList.remove('bi-x-lg');
        icon.classList.add('bi-list');
    }
});