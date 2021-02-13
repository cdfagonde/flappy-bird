document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame,20)

    function control(e) {
        if (e.keyCode === 32 || e.keyCode === 38) {   // Saltareos con la barra de espacio o flecha para arriba
            jump()
        }
    }

    function jump() {
        if (birdBottom <= 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        // console.log(birdBottom)
    }
    document.addEventListener('keyup', control)

    function generateObstable() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 120
        let obstacleBottom = randomHeight
        let obstacleTimerId 
        const gap = 450

        // Criamos obstáculos
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')

        // 
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)

        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = (obstacleBottom + gap) + 'px'

        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === 0) {
                clearInterval(obstacleTimerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                 // (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220) &&
                 // (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 211) ||
                 birdBottom === 0
               ) {
                // console.log(birdBottom)
                // console.log(obstacleBottom + gap - 211)

                gameOver()
                clearInterval(obstacleTimerId)
            }
        }
        obstacleTimerId = setInterval(moveObstacle,20)
        if (!isGameOver) setTimeout(generateObstable,2000)
    }
    if (!isGameOver) generateObstable()

    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        console.log('Game over!')
        document.removeEventListener('keyup',control)
    }
    
})

