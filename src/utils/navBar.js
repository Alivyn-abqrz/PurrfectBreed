const navBar = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');
const closebtn = document.querySelector('#btn-close')

menuToggle.addEventListener('click', () => {
    sidebar.style.display = 'block';
});
closebtn.addEventListener('click',() =>{
  sidebar.style.display ='none'
} )
  })
}
export default navBar;