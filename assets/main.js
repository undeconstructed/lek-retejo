
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

const TESTING = false
const URL = 'https://ekilio.com/api/lek/ZC7QTQ4ZSG'
const KEYS = {
  'kontakt': '486JROVIAY',
  'aniĝ': 'CHTDHI0F25',
  'zum': '2S7DJM36WO',
  'event': 'JAGBQOGQFM',
  'anspec': 'SY9D2YRY0X',
}

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

function setupForm(form, opts) {
  opts = opts || {}

  if (!opts.key) {
    opts.key = form.getAttribute('data-post-api-key')
    if (!opts.key) {
      return
    }
  }

  // ni faros per skripto
  form.setAttribute('novalidate', true)

  let msgWorking = form.querySelector('.msg.working')
  let msgSuccess = form.querySelector('.msg.success')
  let msgInvalid = form.querySelector('.msg.invalid')
  let msgError = form.querySelector('.msg.error')

  form.querySelector('[data-post-name=Age]').value = -45

  let submit = data => {
    return fetch(opts.url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).
      then(res => res.json()).
      then(res => {
        // console.log('res', res)
        let status = res.status
        if (status == 'OK') {
          opts.onOK()
        } else if (status == 'REDIRECT') {
          opts.onRedirect(res.output.redirectLink)
        } else if (status == 'ERROR') {
          opts.onError(res.output)
        } else {
          opts.onError('malbona respondo')
        }
      })
  }

  let fakeSubmit = data => {
    window.setTimeout(() => {
      opts.onOK()
    }, 1000)
  }

  opts.url = opts.url || URL

  opts.onInvalid = opts.onInvalid || (() => {
    if (msgInvalid) {
      msgInvalid.style.display = 'block'
    }
  })

  opts.onValid = opts.onValid || (() => {
    if (msgInvalid) {
      msgInvalid.style.display = 'none'
    }
  })

  opts.onSubmit = opts.onSubmit || (data => {
    // for (let l of form.querySelectorAll('.line')) {
    //   l.style.display = 'none'
    // }

    if (!TESTING) {
      submit(data)
    } else {
      fakeSubmit(data)
    }
  
    if (msgWorking) {
      msgWorking.style.display = 'block'
    }
  })

  opts.onOK = opts.onOK || (() => {
    if (msgWorking) {
      msgWorking.style.display = 'none'
    }
    msgError.style.display = 'none'
    msgSuccess.style.display = 'block'
    form.reset()
  })

  opts.onRedirect = opts.onRedirect || (url => {
    document.location.href = url
  })

  opts.onError = opts.onError || (res => {
    if (msgWorking) {
      msgWorking.style.display = 'none'
    }

    // for (let l of form.querySelectorAll('.line')) {
    //   l.style.display = 'block'
    // }
  
    msgError.style.display = 'block'
  })

  for (let f of form.querySelectorAll('input, textarea')) {
    f.addEventListener('input', e => {
      f.setCustomValidity('')
      if (!f.validity.valid) {
        f.setCustomValidity('Bezonata')
      }
    })
  }

  form.addEventListener('submit', e => {
    e.preventDefault()

    if (!form.checkValidity()) {
      opts.onInvalid()
      return
    }

    let data = {
      'API_KEY': opts.key,
    }

    for (let f of form.querySelectorAll('input, textarea, select')) {
      if (!f.validity.valid) {
        opts.onInvalid()
        return
      } else {
        opts.onValid()
      }

      let [k, v] = [f.getAttribute('data-post-name'), f.value]
      if (k) {
        data[k] = v
      }
    }

    // console.log(data)
    opts.onValid()
    opts.onSubmit(data)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  setupMenu()

  {
    let ca = document.querySelector('.calendar')
    if (ca) {
      let tmpCal = ca.querySelector('#tmp-calendar').content
      let tmpEve = ca.querySelector('#tmp-event').content
      let cal = tmpCal.cloneNode(true)

      let lastMonth = -1

      for (let i of events) {
        let date = new Date(i.date)
        let month = date.getMonth()

        if (lastMonth != month) {
          lastMonth = month
          let h2 = document.createElement('h2')
          h2.textContent = months[month] + " " + date.getFullYear()
          cal.append(h2)
        }

        let lin = tmpEve.cloneNode(true)
        lin.querySelector('.time').setAttribute("datetime", date.toISOString())
        lin.querySelector('.day').textContent = date.getDate()
        // lin.querySelector('.month').textContent = months[date.getMonth()]
        // lin.querySelector('.year').textContent = date.getYear()
        lin.querySelector('.title').textContent = i.title
        lin.querySelector('.place').textContent = i.place
        lin.querySelector('.text').innerHTML = i.text
        lin.querySelector('.link').href = i.url
        cal.append(lin)
      }

      ca.append(cal)
    }
  }

  {
    let es = document.querySelector('#eventoservo')
    if (es) {
      let tmp = es.querySelector('#tmp-row').content
      let list = es.querySelector('.list')

      let body = JSON.stringify({
        'API_KEY': KEYS['event'],
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

          let lin = tmp.cloneNode(true)
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

      cacheFetch('events', 300, URL, {
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
    let form = document.querySelector('#formContactUs')
    if (form) {
      setupForm(form, {
        key: KEYS['kontakt'],
      })
    }
  }

  {
    let form = document.querySelector('#formRegister')
    if (form) {
      const listID ='HAX30TC7N2'

      let body = JSON.stringify({
        API_KEY:	KEYS['anspec'],
        KeyList:	listID,
      })

      cacheFetch('memberships', 300, URL, {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        }, body }).
      then(data => {
        let select = form.querySelector('#formRegister_MemberTypeId')
        let types = data.output[listID]
        for (let i of types) {
          let option = document.createElement('option')
          option.textContent = i.name
          option.value = i.value
          select.append(option)
        }
      })

      setupForm(form, {
        key: KEYS['aniĝ'],
      })
    }
  }

  {
    let form = document.querySelector('#formZoom')
    if (form) {
      setupForm(form, {
        key: KEYS['zum'],
      })
    }
  }
})
