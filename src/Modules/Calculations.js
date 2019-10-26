const getCoords = (degree) => {
  let x
  let y
  x = parseFloat((Math.cos((degree) * Math.PI/180) * 20).toFixed(5))
  y = parseFloat((Math.sin((degree) * Math.PI/180) * 20).toFixed(5))
  return {x, y}
}

export { getCoords }