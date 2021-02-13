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

    // Con la función pronta, ya podemos capturar el evento
    document.addEventListener('keyup', control)

    // Obstáculos
    function generateObstable() {
        // Posición izquiera del nuevo obstáculo
        let obstacleLeft = 500
        // Altura será variable y al azar
        let randomHeight = Math.random() * 120
        let obstacleBottom = randomHeight
        // 
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

        // Movimientos de los obstáculos
        function moveObstacle() {
            // Obstáculos 2 pixels para izquierda
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            // Quando los obstáculos lleguen al límite izquierdo
            if (obstacleLeft === 0) {
                clearInterval(obstacleTimerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            // Si el pájaro choca contra el obstáculo inferior
            // O contra el obstáculo superior
            // o contra el piso
            if (
                 (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220) &&
                 (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 211) ||
                 birdBottom === 0
               ) {
                // Acabó el juego
                gameOver()
                clearInterval(obstacleTimerId)
            }
        }
        // Obstáculos se mueven a cada 20 ms
        obstacleTimerId = setInterval(moveObstacle,20)
        // Mientras el juego no termina, creamos nuevos obstáculos a cada 3 segundos
        if (!isGameOver) setTimeout(generateObstable,3000)
    }
    // Generamos el obstáculo inicial, depois de 5 segundos suspenso
    if (!isGameOver) setTimeout(generateObstable,5000)

    // Para finalizar el juego
    function gameOver() {
        if (isGameOver) return
        clearInterval(gameTimerId)
        console.log('Game over!')
        document.removeEventListener('keyup',control)
        isGameOver = true
    }
    
})

