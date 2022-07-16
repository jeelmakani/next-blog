import { format as dateFnsFormat, toDate, formatDistance } from 'date-fns'

const DATE_FORMAT = process.env.NEXT_DATE_FORMAT || "d.MM.yyyy" 

export  const formatDate = (date:Date | number | string, format = DATE_FORMAT) => {
  let d
  if (typeof date === "string") d = toDate(new Date(date))
  else d = toDate(date)


  const distance = formatDistance(d, Date.now())

  const num = parseInt(formatDistance(d, Date.now()) , 10)
  if (num >= 30) return dateFnsFormat(d, format);
  else return `${distance} ago`
}

