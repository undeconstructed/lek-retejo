
function stickyMenu() {
  let navbar = document.querySelector('body > menu')
  let padding = document.createElement('div')
  padding.classList.add('padding')
  navbar.after(padding)
  let sticky = navbar.offsetTop
  document.addEventListener('scroll', () => {
    if (window.pageYOffset >= sticky) {
      padding.style.height = navbar.offsetHeight + 'px'
      document.body.classList.add('sticky')
    } else {
      document.body.classList.remove('sticky');
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  stickyMenu()
})
