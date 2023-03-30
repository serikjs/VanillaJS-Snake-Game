const GRID_SIZE = 21
export function randomGridPosition() {
	return {
		x: Math.floor(Math.random() * GRID_SIZE) + 1,
		y: Math.floor(Math.random() * GRID_SIZE) + 1,
	}
}

export function outsideGrid(headPosition) {
	return (
		headPosition.x < 1 ||
		headPosition.x > GRID_SIZE ||
		headPosition.y < 1 ||
		headPosition.y > GRID_SIZE
	)
}

export function createGrid(board) {
	board.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`
	board.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`
}
