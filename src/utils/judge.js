export function isPhone(match) {
  const phone = (/^(13[0-9]|15[0-9]|18[0-9]|17[0-9]|14[0-9])\d{8}$/.test(match));
  return phone;
}

export function isUserName(match) {
  const userName = (/^\w{6,20}$/.test(match));
  return userName;
}

export function isNum(match) {
  const num = (/^\d{4}$/.test(match));
  return num;
}

export function isPassword(match) {
  const password = (/^\w{6,20}$/.test(match));
  return password;
}

export function isEmail(match) {
  const email = (/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(match));
  return email;
}
