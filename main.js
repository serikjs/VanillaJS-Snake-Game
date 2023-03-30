'use strict'

import {
	update as updateSnake,
	draw as drawSnake,
	SNAKE_SPEED,
	getSnakeHead,
	snakeIntersrction,
} from './snake.js'

import { update as updateFood, draw as drawFood } from './food.js'
import { createGrid, outsideGrid } from './grid.js'
import { get as getScores } from './scores.js'
const gameBoard = document.getElementById('gameBoard')
let lastRenderTime = 0
let gameOver = false

createGrid(gameBoard)

/**
 * Основная функция игры
 * @param {*} currentTime - время обновления
 */
function main(currentTime) {
	if (gameOver) {
		if (confirm(`You lost. Your scores ${getScores()}. Press OK to restart`)) {
			window.location = '/'
		}
		return
	}

	window.requestAnimationFrame(main) //цикличность обновления (постоянно обновлять main)
	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 //частота обновления игры

	if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

	lastRenderTime = currentTime

	update()
	draw()
}
window.requestAnimationFrame(main)

/**
 * Обновление игрового поля
 */
function update() {
	updateSnake()
	updateFood()
	checkDeath()
}
/**
 * Отрисовка игрового поля
 */
function draw() {
	gameBoard.innerHTML = ''
	drawSnake(gameBoard)
	drawFood(gameBoard)
}

function checkDeath() {
	gameOver = outsideGrid(getSnakeHead()) || snakeIntersrction()
}
