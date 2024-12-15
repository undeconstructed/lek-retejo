
const months = [
  "januaro",
  "februaro",
  "marto",
  "aprilo",
  "majo",
  "junio",
  "julio",
  "aŭgusto",
  "septembro",
  "oktobro",
  "novembro",
  "decembro",
]

function stickyMenu() {
  let navbar = document.querySelector('body > menu')
  let padding = document.createElement('div')
  padding.classList.add('padding')
  navbar.after(padding)
  let sticky = navbar.offsetTop
  document.addEventListener('scroll', () => {
    if (window.scrollY >= sticky) {
      padding.style.height = navbar.offsetHeight + 'px'
      document.body.classList.add('sticky')
    } else {
      document.body.classList.remove('sticky');
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  stickyMenu()

  let es = document.querySelector('#eventoservo')
  if (es) {
    let body = JSON.stringify({
      'API_KEY': 'JAGBQOGQFM',
      'PageId': '1',
    })

    let link = (text, url) => {
      let e = document.createElement('a')
      e.href = 'https://eventaservo.org/e/' + url
      e.textContent = text
      return e
    }

    let lastMonth = -1

    let render = (data) => {
      let tmp = es.querySelector('#tmp-row')
      let tab = es.querySelector('table > tbody')

      for (let i of data.output.data) {
        let date = new Date(i.date)
        let month = date.getMonth()

        if (lastMonth != month) {
          lastMonth = month
          let h2 = document.createElement('h2')
          h2.textContent = months[month]
          es.append(h2)
        }

        let lin = tmp.content.cloneNode(true)
        lin.querySelector('.time').textContent = i.date
        lin.querySelector('.title').textContent = i.title
        lin.querySelector('.place').textContent = i.location
        lin.querySelector('.text').append(link('pliaj detaloj', i.eventaServoKey))
        es.append(lin)
      }
    }

    let cached = localStorage.getItem("events")
    if (cached) {
      cached = JSON.parse(cached)

      let maxAge = Date.now() - 1000*1000 // 1000 seconds

      if (cached.t < maxAge) {
        cached = null
        localStorage.removeItem("events")
      }
    }

    if (cached) {
      render(cached.d)
    } else {
      let url = 'https://ekilio.com/api/lek/ZC7QTQ4ZSG'
      fetch(url, {method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body}).
        then(res => res.json()).
        then(data => {
          localStorage.setItem("events", JSON.stringify({
            t: Date.now(),
            d: data,
          }))
          render(data)
        }).
        catch(e => console.log(e))
    }
  }
})
