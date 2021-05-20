export const generateMapGrid = ( width, height) => {
    return new Array(width * height)
}

export const pointToGrid = (point, height) => {
    return point.x + height * (point.y);
}

export const gridToPoint = (grid, height) => {
    let pointX = Math.floor(grid % height)
    let pointY = Math.floor(grid / height)
    return { x: pointX, y: pointY }
}
