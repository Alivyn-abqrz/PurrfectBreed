const sideBar = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-btn');
    const menuLinks = document.querySelector('.navbar-links');
    menuToggle.addEventListener('click', () => {
      menuLinks.style.display = 'flex'
      menuToggle.style.display = 'none'
    })
    closeMenu.addEventListener('click', () =>{
      menuLinks.style.display = 'none'
      menuToggle.style.display = 'block'
    })
  })
}
export default sideBar;