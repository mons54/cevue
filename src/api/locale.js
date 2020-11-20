const languages = [
  {
    name: "English",
    code: 'en',
  },
  {
    name: "简体中文",
    code: 'zh',
  },
  {
    name: "Español",
    code: 'es',
  },
  {
    name: "Français",
    code: 'fr',
  },
]

function hasLocale(code) {
  return languages.find(language => language.code === code)
}

let locale = process.env.VUE_APP_LOCALE || 'en'

if (typeof location.pathname === 'string') {
  const match = location.pathname.match(/^\/([a-z]+)(\/.*)?$/i)
  if (!match) {
    if (localStorage.locale && hasLocale(localStorage.getItem('locale')))
      locale = localStorage.getItem('locale')
    location.href = `/${locale}`
  } else if (hasLocale(match[1])) {
    locale = match[1]
    localStorage.setItem('locale', locale)
  }
}

const fallbackLocale = process.env.VUE_APP_FALLBACK_LOCALE || 'en'

export {
  fallbackLocale,
  languages,
  locale,
}
