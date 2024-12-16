
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

function setupMenu() {
  let navbar = document.querySelector('body > menu')
  let list = navbar.querySelector('ul')
  
  let padding = document.createElement('div')
  padding.classList.add('padding')
  navbar.after(padding)

  let sticky = navbar.offsetTop

  let stick = () => {
    if (window.scrollY >= sticky) {
      padding.style.height = navbar.offsetHeight + 'px'
      document.body.classList.add('sticky')
    } else {
      document.body.classList.remove('sticky');
    }
  }

  let scroll = () => {
    let s = list.scrollWidth > list.offsetWidth
    navbar.classList.toggle('scroll', s)
  }

  stick()
  scroll()

  document.addEventListener('scroll', stick)
  window.addEventListener('resize', scroll)

  let active = navbar.querySelector('.active')
  if (active) {
    active.parentNode.scrollIntoView(false)
  }
}

function cacheFetch(key, maxSeconds, url, opts) {
  let cached = localStorage.getItem(key)
  if (cached) {
    cached = JSON.parse(cached)

    let maxAge = Date.now() - maxSeconds * 1000

    if (cached.t < maxAge) {
      cached = null
      localStorage.removeItem(key)
    }
  }

  if (cached) {
    return Promise.resolve(cached.d)
  }

  return fetch(url, opts).
    then(res => res.json()).
    then(data => {
      localStorage.setItem(key, JSON.stringify({
        t: Date.now(),
        d: data,
      }))

      return data
    })
}

document.addEventListener('DOMContentLoaded', () => {
  setupMenu()

  {
    let es = document.querySelector('#eventoservo')
    if (es) {
      let tmp = es.querySelector('#tmp-row')
      let list = es.querySelector('.list')

      let body = JSON.stringify({
        'API_KEY': 'JAGBQOGQFM',
        'PageId': '1',
      })

      let lastMonth = -1

      let renderErr = (err) => {
        let p = document.createElement('p')
        p.textContent = err
        list.replaceChildren(p)
      }

      let render = (data) => {
        list.replaceChildren()

        for (let i of data.output.data) {
          let date = new Date(i.date)
          let month = date.getMonth()

          if (lastMonth != month) {
            lastMonth = month
            let h2 = document.createElement('h2')
            h2.textContent = months[month] + " " + date.getFullYear()
            list.append(h2)
          }

          let lin = tmp.content.cloneNode(true)
          lin.querySelector('.time').setAttribute("datetime", date.toISOString())
          lin.querySelector('.day').textContent = date.getDate()
          // lin.querySelector('.month').textContent = months[date.getMonth()]
          // lin.querySelector('.year').textContent = date.getYear()
          lin.querySelector('.title').textContent = i.title
          lin.querySelector('.place').textContent = i.location
          lin.querySelector('.link').href = 'https://eventaservo.org/e/' + i.eventaServoKey
          list.append(lin)
        }
      }

      cacheFetch('events', 300, 'https://ekilio.com/api/lek/ZC7QTQ4ZSG', {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        }, body
      }).
      then(data => {
        render(data)
      }).
      catch(e => {
        renderErr(e)
      })
    }
  }

  {
    let cf = document.querySelector('#formContactUs')
    if (cf) {
      let msgSuccess = cf.querySelector('.msg.success')
      let msgError = cf.querySelector('.msg.error')

      cf.addEventListener('submit', e => {
        e.preventDefault()

        for (let l of cf.querySelectorAll('.line')) {
          l.style.display = 'none'
        }

        msgSuccess.style.display = 'block'
      })
    }
  }

  {
    let form = document.querySelector('#formRegister')
    if (form) {
      let msgSuccess = form.querySelector('.msg.success')
      let msgError = form.querySelector('.msg.error')

      let body = JSON.stringify({
        API_KEY:	"SY9D2YRY0X",
        KeyList:	"HAX30TC7N2",
      })

      cacheFetch('memberships', 300, 'https://ekilio.com/api/lek/ZC7QTQ4ZSG', {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        }, body }).
      then(data => {
        let select = form.querySelector('#formRegister_MemberTypeId')
        let types = data.output['HAX30TC7N2']
        for (let i of types) {
          let option = document.createElement('option')
          option.textContent = i.name
          option.value = i.value
          select.append(option)
        }
      })

      form.addEventListener('submit', e => {
        e.preventDefault()

        for (let l of form.querySelectorAll('.line')) {
          l.style.display = 'none'
        }

        msgSuccess.style.display = 'block'
      })
    }
  }

  {
    let form = document.querySelector('#formZoom')
    if (form) {
      let msgSuccess = form.querySelector('.msg.success')
      let msgError = form.querySelector('.msg.error')

      form.addEventListener('submit', e => {
        e.preventDefault()

        let error = 1
        if (!error) {
          for (let l of form.querySelectorAll('.line')) {
            l.style.display = 'none'
          }
          form.reset()
          msgSuccess.style.display = 'block'
        } else {
          msgError.style.display = 'block'
        }
      })
    }
  }
})
