
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
const ERROR = false
const URL = 'https://ekilio.com/api/lek/ZC7QTQ4ZSG'

const KEYS = {
  'kontakt': '376JVOVI07',
  'aniĝ': 'ZKTDHI0F16',
  'zum': 'SSJ29OOHSG',
  'event': 'JAGBQOGQFM',
  'anspec': 'HAX30TC7N2',
}

const TESTKEYS = {
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

  const slide = (x) => {
    list.scrollBy({behavior: 'smooth', left: x*(list.offsetWidth/3*2)})
  }

  let left = navbar.querySelector('.left')
  left.addEventListener('click', e => {
    slide(-1)
  })

  let right = navbar.querySelector('.right')
  right.addEventListener('click', e => {
    slide(+1)
  })
}

async function cacheFetch(key, maxSeconds, url, opts) {
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

  const res = await fetch(url, opts)
  const data = await res.json()

  localStorage.setItem(key, JSON.stringify({
    t: Date.now(),
    d: data,
  }))

  return data
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

  let msgs = {
    working: form.querySelector('.msg.working'),
    success: form.querySelector('.msg.success'),
    invalid: form.querySelector('.msg.invalid'),
    error: form.querySelector('.msg.error'),
  }

  let showMessage = (which) => {
    for (let k in msgs) {
      if (which == k) {
        msgs[k].style.display = 'block'
      } else {
        msgs[k].style.display = 'none'
      }
    }
  }

  form.querySelector('[data-post-name=Age]').value = -45

  let submit = async data => {
    var res = null

    try {
      res = await fetch(opts.url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    } catch (e) {
      opts.onError('e'+e)
      return
    }

    if (!res.ok) {
      opts.onError(`eraro de HTTP: ${httpStatus}`)
      return
    }

    const json = await res.json()

    let jsonStatus = json.status
    if (jsonStatus == 'OK') {
      opts.onOK()
    } else if (jsonStatus == 'REDIRECT') {
      opts.onRedirect(json.output.redirectLink)
    } else if (jsonStatus == 'ERROR') {
      opts.onError(json.output)
    } else {
      opts.onError('malbona respondo')
    }
  }

  let fakeSubmit = async data => {
    await new Promise(res => setTimeout(res, 3000))
    if (ERROR) {
      opts.onError('testing error')
    } else { 
      opts.onOK()
    }
  }

  opts.url = opts.url || URL

  opts.onInvalid = opts.onInvalid || (() => {
    showMessage('invalid')
  })

  opts.onValid = opts.onValid || (() => {
    showMessage()
  })

  opts.onSubmit = opts.onSubmit || (async data => {
    showMessage('working')

    form.setAttribute('inert', 'inert')

    if (!TESTING) {
      await submit(data)
    } else {
      await fakeSubmit(data)
    }
  
    form.removeAttribute('inert')
  })

  opts.onOK = opts.onOK || (() => {
    showMessage('success')
    form.reset()
  })

  opts.onRedirect = opts.onRedirect || (url => {
    document.location.href = url
  })

  opts.onError = opts.onError || (res => {
    console.log('eraro', res)
    showMessage('error')
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
      // const listID ='HAX30TC7N2'

      // let body = JSON.stringify({
      //   API_KEY:	KEYS['anspec'],
      //   KeyList:	listID,
      // })

      // cacheFetch('memberships', 300, URL, {
      //   method: 'POST', headers: {
      //     'Content-Type': 'application/json',
      //   }, body }).
      // then(data => {
      //   let select = form.querySelector('#formRegister_MemberTypeId')
      //   let types = data.output[listID]
      //   for (let i of types) {
      //     let option = document.createElement('option')
      //     option.textContent = i.name
      //     option.value = i.value
      //     select.append(option)
      //   }
      // })

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
