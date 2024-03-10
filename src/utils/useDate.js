export const formatDate = (dateString) => {
  const date = new Date(dateString)
  let year = date.getFullYear()
  // months start from 0
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month < 10) month = `0${month}`

  if (day < 10) day = `0${day}`

  return year + '-' + month + '-' + day
}

export const recoverDate = (formatDate) => {
  const parts = formatDate.split('/')
  const year = parseInt(parts[0])
  // months start from 0
  const month = parseInt(parts[1]) - 1
  const day = parseInt(parts[2])
  return new Date(year, month, day)
}

export const getZeroBaseOrder = (num) => {
  return num < 10 ? `0${num}` : `${num}`
}

const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}

export const useDateFromUnix = (timestamp) => {
  const date = new Date(timestamp * 1000).toLocaleDateString('en-US', options)
  return {
    fullDate: `${date.slice(-4)}/${date.slice(0, 2)}/${date.slice(3, 5)}`,
    year: date.slice(-4),
    month: date.slice(0, 2),
    day: date.slice(3, 5),
    localDate: date // 06/20/2023
  }
}

export const useUnixFromDate = (dateString) => {
  const [year, month, day] = dateString.split(/-|\//)
  const date = new Date(year, month - 1, day)
  return date.getTime() / 1000
}

export const usePeriod = (startTime, endTime) => {
  return `${useDateFromUnix(startTime).fullDate} - ${useDateFromUnix(endTime).fullDate}`
}
