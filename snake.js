import { getInputDirection } from './input.js'


export const SNAKE_SPEED = 4 //перемещений змеи в секунду

const snakeBody = [{ x: 11, y: 11 }]
let newSegments = 0

/**
 * Обновление змеи
 */
export function update() {
	addSegments()
	const inputDirection = getInputDirection()
	for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = { ...snakeBody[i] }
	}

	snakeBody[0].x += inputDirection.x
	snakeBody[0].y += inputDirection.y
}

/**
 * Отрисовка змеи
 * @param {*} gameBoard - обьект игровой доски
 */
export function draw(gameBoard) {
	snakeBody.forEach(segment => {
		const snakeBodyElement = document.createElement('div')
		snakeBodyElement.style.gridRowStart = segment.y
		snakeBodyElement.style.gridColumnStart = segment.x
		snakeBodyElement.classList.add('snake')
		gameBoard.appendChild(snakeBodyElement)
	})
}

export function getSnakeHead() {
	return snakeBody[0]
}

export function snakeIntersrction() {
	return onSnake(snakeBody[0], { ignoreHead: true })
}

/**
 * Увеличение очков
 * @param {*} amound - количество очков
 */
export function expandSnake(amound) {
	newSegments += amound
}
/**
 *  Проверка нахождения змеи на еду
 * @param {*} position - позиция еды
 * @returns
 */
export function onSnake(position, { ignoreHead = false } = {}) {
	return snakeBody.some((segment, index) => {
		if (ignoreHead && index === 0) {
			return false
		}
		return equalPositions(segment, position)
	})
	// return equalPositions(snakeBody[0], position)
}

/**
 * Соотвецтвует ли позиция змеи позиции еды
 * @param {*} snakePos - позиция елемента тела змеи
 * @param {*} foodPos - позиция еды
 * @returns - true or false
 */
function equalPositions(snakePos, foodPos) {
	return snakePos.x === foodPos.x && snakePos.y === foodPos.y
}

function addSegments() {
	for (let i = 0; i < newSegments; i++) {
		snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
	}
	newSegments = 0
}
