'use strict'

var gCurrNum
var gNums
var gSize = 4
var gIntervalId
var gElTimer = document.querySelector('.game-timer')

function onInit() {
    const elWinnerDiv = document.querySelector('.winner')
    elWinnerDiv.style.display = 'none'
    clearInterval(gIntervalId)
    gCurrNum = 1
    gNums = getGameNums(gSize)
    renderTable()

}

function renderTable() {
    var strHTML = ''
    for (var i = 0; i < gSize; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gSize; j++) {
            const currNum = drawNum(gNums)
            strHTML += `<td onclick="cellClicked(${currNum},this)" class="cell">${currNum}</td>`
        }
        strHTML += '</tr>'
    }
    const elGameTable = document.querySelector('.table-container')
    elGameTable.innerHTML = strHTML

}

function cellClicked(clickedNum, elCell) {
    if (clickedNum !== gCurrNum) return
    if (clickedNum === 1) startTimer()
    elCell.style.backgroundColor = 'pink'
    gCurrNum++


    if (gCurrNum === (gSize ** 2 + 1)) {
        gameOver()
    }

}

function startTimer() {
    var startTime = Date.now()
    gIntervalId = setInterval(() => {
        var timePassed = Date.now() - startTime + 0
        var milliseconds = parseInt((timePassed % 1000) / 1)
        var seconds = parseInt((timePassed / 1000) % 60)
        var minutes = parseInt((timePassed / (1000 * 60)) % 60)
        seconds = (seconds <= 9) ? ('0' + seconds) : seconds
        minutes = (minutes <= 9) ? ('0' + minutes) : minutes
        gElTimer.innerText = `Stopwatch: ${minutes}:${seconds}:${milliseconds}`
    }, 10)
}

function gameOver() {
    const elWinnerDiv = document.querySelector('.winner')
    elWinnerDiv.style.display = 'block'
    clearInterval(gIntervalId)
}

function changeGameLevel(size) {
    gSize = size
    onInit()
}

function getGameNums(size) {
    var gameNums = []
    size = size ** 2
    for (var i = 1; i <= size; i++) {
        gameNums.push(i)
    }
    return gameNums
}

function drawNum(nums) {
    const randomIdx = getRandomInt(0, nums.length)
    return nums.splice(randomIdx, 1)[0]
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}



