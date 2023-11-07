export const passwordRules = (password) => {
  if (!password) return '密碼 為必填'
  const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/
  return regex.test(password) ? true : '密碼 6 位數以上，須包含至少一個數字和一個英文字母'
}

