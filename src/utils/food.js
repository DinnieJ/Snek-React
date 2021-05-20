import { gridToPoint } from "./grid"

export const generateMeatPosition = (width, height) => {
    let min = 1
    let max = width * height - 1
    let grid = Math.floor(Math.random() * (max - min + 1) + min)
    let point = gridToPoint(grid, height)
    
    return point
}