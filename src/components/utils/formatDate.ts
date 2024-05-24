import dayjs from 'dayjs'

const FormatDate = (date: Date) => {
  return dayjs(date).format('DD/MM/YYYY')
}

export default FormatDate
