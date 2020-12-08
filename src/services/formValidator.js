export function validateRequired(value) {
  return Boolean(value)
}

export function validateEmail(email) {
  return Boolean(typeof email === 'string' && email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
}

export function validatePhone(phone) {
  return Boolean(typeof phone === 'string' && phone.match(/\d{4,}\d+/))
}

export function validatePassword(password) {
  return Boolean(typeof password === 'string' && password.match(/(?=.*[A-Z])(?=.*\d).{8,}/))
}
