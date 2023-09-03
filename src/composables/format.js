export const formatDate = (dateString) => {
  const date = new Date(dateString)
  let year = date.getFullYear()
  let month = date.getMonth() + 1 // 月份从0开始，所以要加1
  let day = date.getDate()

  if (month < 10) month = `0${month}`

  if (day < 10) day = `0${day}`

  return year + '.' + month + '.' + day
}

export const recoverDate = (formatDate) => {
  const parts = formatDate.split('.')
  const year = parseInt(parts[0])
  const month = parseInt(parts[1]) - 1 // 月份从0开始，所以要减1
  const day = parseInt(parts[2])
  return new Date(year, month, day)
}
