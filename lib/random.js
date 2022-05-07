const randArr = [
  'Раз',
  'Два',
  'Три'
]

exports.getRandom = () => {
  const idx = Math.floor(Math.random() * randArr.length)
  return randArr[idx]
}
