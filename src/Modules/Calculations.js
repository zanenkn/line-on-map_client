const getCoords = (degree) => {
  let x
  let y
  x = parseFloat((Math.cos((degree) * Math.PI/180) * 20).toFixed(5))
  y = parseFloat((Math.sin((degree) * Math.PI/180) * 20).toFixed(5))
  return {x, y}
}

const getPath = (coords) => {
  let path = 'M 200, 200'
  coords.forEach(pair => {
    path = path + ` l ${pair.x}, ${pair.y}`
  })
  return path
}

export { getCoords, getPath }