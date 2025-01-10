const navBar = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const btnClose = document.getElementById('btn-close');

    menuToggle.addEventListener('click', () => {
      sidebar.classList.add('active');
    });

    btnClose.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });

    // Close sidebar on clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');

      }
    });
  })
}
export default navBar;