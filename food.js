import { expandSnake, onSnake } from './snake.js'
import { randomGridPosition } from './grid.js'
import { update as updateScores } from './scores.js'

const EXPANSIONS_RATES = {
	apple: 1,
	orange: 2,
	ananas: 10,
}

let food = { x: 5, y: 3, type: 'apple' }

/**
 * Обновление еды
 */
export function update() {
	if (onSnake(food)) {
		expandSnake(1)
		updateScores(EXPANSIONS_RATES[food.type])
		food = getRandomFood()
	} else {
	}
}

/**
 * Отрисовка еды
 * @param {*} gameBoard - обьект игровой доски
 */
export function draw(gameBoard) {
	const foodElement = document.createElement('div')
	foodElement.style.gridRowStart = food.y
	foodElement.style.gridColumnStart = food.x
	foodElement.classList.add('food')
	foodElement.classList.add(food.type)
	gameBoard.appendChild(foodElement)
}

/**
 * Получение нового обьекта случайной еды
 * @returns - обьекта food
 */
function getRandomFood() {
	return { ...getRandomFoodPosition(), ...getRandomFoodType() }
}

/**
 * Получение позиции для новой еды
 * @returns - обьект с координатами
 */
function getRandomFoodPosition() {
	let newFoodPosition
	while (newFoodPosition == null || onSnake(newFoodPosition)) {
		newFoodPosition = randomGridPosition()
	}
	return newFoodPosition
}
/**
 * Получение типа новой еды
 * @returns - обьект
 */
function getRandomFoodType() {
	let randomKey = Math.floor(
		Math.random() * Object.keys(EXPANSIONS_RATES).length
	)

	return {
		type: Object.keys(EXPANSIONS_RATES)[randomKey],
	}
}
