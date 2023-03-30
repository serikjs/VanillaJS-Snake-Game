let scores = 0

/**
 * Обновление очков игры
 * @param {*} amound - количество к добавлению
 */
export function update(amound) {
	scores += amound
	draw()
}
/**
 * Отрисовка очков игры
 */
export function draw() {
	const scoresBoard = document.getElementById('scores')
	scoresBoard.innerHTML = scores
}

/**
 * Получение очков игры
 * @returns число очков
 */
export function get() {
	return scores
}
