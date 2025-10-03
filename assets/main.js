
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

  let msgWorking = form.querySelector('.msg.working')
  let msgSuccess = form.querySelector('.msg.success')
  let msgInvalid = form.querySelector('.msg.invalid')
  let msgError = form.querySelector('.msg.error')

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
    console.log('eraro', res)

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
