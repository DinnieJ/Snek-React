import { DIRECTION } from "../constants/app.constant"

const initSnek = (headPosition = {x: 2, y: 0}, length = 3, direction = DIRECTION.RIGHT ) => {
    let snek = [];
    snek.push(headPosition)
    let headClone = {...headPosition}

    switch (direction) {
        case DIRECTION.RIGHT:
            for (let i = 0; i < length - 1; i++) {
                snek.unshift({x: --headClone.x, y: headClone.y })
            }
        break
        case DIRECTION.LEFT:
            for (let i = 0; i < length -1; i++) {
                snek.unshift({x: ++headClone.x, y: headClone.y})
            }
        break
        case DIRECTION.UP:
            for (let i = 0; i < length - 1; i++) {
                snek.unshift({x: headClone.x, y: ++headClone.y})
            }
        break
        case DIRECTION.DOWN:
            for (let i = 0; i < length - 1; i++) {
                snek.unshift({ x: headClone.x, y: --headClone.y })
            }
        break;
    }

    return snek;
}



export default initSnek;