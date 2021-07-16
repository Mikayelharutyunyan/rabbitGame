const rabbCoords = []
const homeCoords = []
const wolfCoords = []
const wallCoords = []
const allCoords = []
const all_blocks = []

var tableHeight = prompt("Input the table height")
var tableWidth = prompt("Input the table width")
var wolvesQuantity = prompt("Input the number of wolves")
var wallsQuantity = prompt("Input the number of walls")

var wolves = []
var rabbit = document.createElement("div")

var body = document.getElementsByTagName('body')[0]

document.write(body)

function createEmptyBoard(m, n){
    tbl = document.createElement('table')
    tbl.style.width = '50%'
    tbl.style.height = '50%'
    tbl.setAttribute('border', '1')
    tbdy = document.createElement('tbody')
    
    for (let i = 0; i < m; i++) {
        tr = document.createElement('tr')
        all_blocks[i] = tr
        all_blocks[i].length = n
        for (let j = 0; j < n; j++) {
            td = document.createElement('td')
            td.style.height = "40px"
            td.style.width = "40px"
            tr.appendChild(td)
            all_blocks[i][j] = td
            allCoords.push([i, j])
        }
        tbdy.appendChild(tr)
    }
    tbl.appendChild(tbdy)
    body.appendChild(tbl)
    rows = document.getElementsByTagName('tbody')[0].rows
}

function createWolves(wolvesQuantity){
    for(let i = 0; i < wolvesQuantity; i++){
        var randWolves = Math.floor(Math.random() * allCoords.length)
        var randWolvesY = allCoords[randWolves][0]
        var randWolvesX = allCoords[randWolves][1]
        wolfCoords.push([randWolvesY, randWolvesX])
        allCoords.splice(randWolves, 1)
        wolves[i] = document.createElement("div")
        PaintCharachters(randWolvesY, randWolvesX, wolves[i], "🐺")
    }
}

function createWalls(wallsQuantity){
    for(let i = 0; i < wallsQuantity; i++){
        var randWalls = Math.floor(Math.random() * allCoords.length)
        var randWallsY = allCoords[randWalls][0]
        var randWallsX = allCoords[randWalls][1]
        wallCoords.push([randWallsY, randWallsX])
        rows[randWallsY][randWallsX].style.backgroundColor = "black"
        allCoords.splice(randWalls, 1)
    }
}

function createRabbit(arr){
    var randRab = Math.floor(Math.random() * allCoords.length)
    var rabY = allCoords[randRab][0]
    var rabX = allCoords[randRab][1]
    arr.push(rabY, rabX)
    PaintCharachters(rabY, rabX, rabbit, "🐇")
    allCoords.splice(randRab, 1)
}

function createHome(arr){
    var randHome = Math.floor(Math.random() * allCoords.length)
    var homeY = allCoords[randHome][0]
    var homeX = allCoords[randHome][1]
    arr.push(homeY, homeX)
    rows[homeY][homeX].style.backgroundColor = "blue"
    allCoords.splice(randHome, 1)
}

const PaintCharachters = (y, x, element, emoji) => {
    element.appendChild(document.createTextNode(emoji))
    rows[y][x].appendChild(element)
}

const checkWrongValues = (tableHeight, tableWidth, wolvesQuantity, wallsQuantity) => {
    if(parseInt(tableHeight) * parseInt(tableWidth) < parseInt(wolvesQuantity) + parseInt(wallsQuantity) + 2){
        alert("The numbers you inputed do not correspond to the game values")
        tbl.remove()
        return
    }
}


function startGame(tableHeight, tableWidth, wolvesQuantity, wallsQuantity) {
    checkWrongValues(tableHeight, tableWidth, wolvesQuantity, wallsQuantity);
    createEmptyBoard(tableHeight, tableWidth)
    createWolves(wolvesQuantity)
    createWalls(wallsQuantity)
    createRabbit(rabbCoords)
    createHome(homeCoords)
}

startGame(tableHeight, tableWidth, wolvesQuantity, wallsQuantity)


window.addEventListener("keyup", event => moveRabbit(event.key))

const moveRabbit = (key) => {
    if(key === "ArrowUp"){
        if(checkRabbitCollision(1, 0, -(all_blocks.length - 1), 0)){}
        else makeRabbitMove(0, -1, 0, all_blocks.length - 1)
    }

    else if(key === "ArrowDown"){
        if(checkRabbitCollision(-1, 0, all_blocks.length - 1, 0)){}
        else makeRabbitMove(0, 1, all_blocks.length - 1, 0)
    }

    else if(key === "ArrowRight"){
        if(checkRabbitCollision(0, -1, 0, all_blocks[0].length - 1)){}
        else makeRabbitMove(1, 1, all_blocks[0].length - 1, 0)
    }

    else if(key === "ArrowLeft"){
        if(checkRabbitCollision(0, 1, 0, -(all_blocks[0].length - 1))){}
        else makeRabbitMove(1, -1, 0, all_blocks[0].length - 1)
    }


}

const makeRabbitMove = (rabbitCoordIndex, direction, tableEdge, value) => {
    if(rabbCoords[rabbitCoordIndex] == tableEdge) rabbCoords[rabbitCoordIndex] = value
    else rabbCoords[rabbitCoordIndex] += direction
    rows[rabbCoords[0]][rabbCoords[1]].appendChild(rabbit)
    isWon()
    moveWolf()
}

const moveWolf = () => {
    isLost();
    filterLegalMovesOnly();
    isLost();
}

const checkRabbitCollision = (coordY, coordX, edgeY, edgeX) => {
    for(let i = 0; i < wallCoords.length; i++){
        if((rabbCoords[0] == wallCoords[i][0] + coordY && rabbCoords[1] == wallCoords[i][1] + coordX) ||  
        (rabbCoords[0] == wallCoords[i][0] + edgeY && rabbCoords[1] == wallCoords[i][1] + edgeX)) return true
    }

    return false
}

const isWon = () => {
    if(rabbCoords[0] == homeCoords[0] && rabbCoords[1] == homeCoords[1]){ 
        tbl.remove()
        setTimeout(() => alert("YOU WON"), 1)
    }
}

const isLost = () => {
    wolfCoords.forEach(coords => {
        if((rabbCoords[0] == coords[0] && rabbCoords[1] == coords[1])){ 
            tbl.remove()
            setTimeout(() => alert("YOU LOST"), 1)
        }
    });
}

const CalculateDistnace = (wCoords, index) => {
    var distance = []

    for(let i = 0; i < wCoords.length; i++){
        distance.push(Math.sqrt(Math.pow(wCoords[i][0] - rabbCoords[0], 2) + Math.pow(wCoords[i][1] - rabbCoords[1], 2)))
    }

    var wolfMinDistanceIndex = distance.indexOf(Math.min(...distance))

    wolfCoords[index][0] = wCoords[wolfMinDistanceIndex][0]
    wolfCoords[index][1] = wCoords[wolfMinDistanceIndex][1] 

    rows[wolfCoords[index][0]][wolfCoords[index][1]].appendChild(wolves[index])
}

const checkWolfCollision = (wCoords, num) => {
    for(let j = 0; j < num; j++){
        for(let k = 0; k < wCoords.length; k++){
            if(num != wolfCoords.length) {
                if(wCoords[k][0] == wolfCoords[j][0] && wCoords[k][1] == wolfCoords[j][1]){
                    wCoords.splice(k, 1)
                }
            }
            else break
        }
    }
}

const getWolfAllMoves = (coords) => {
    return [[coords[0] + 1, coords[1]], [coords[0] - 1, coords[1]], [coords[0], coords[1] + 1], [coords[0], coords[1] - 1]]
}

const filterLegalMovesOnly = () => {
    var allPossibleCoords = []
    var legalCoords
    var num = 0

    for(let i = 0; i < wolfCoords.length; i++){
        allPossibleCoords.push(getWolfAllMoves(wolfCoords[i]))
    
        for(let k = 0; k < allPossibleCoords[i].length; k++){
            for(let j = 0; j < wallCoords.length; j++){
                if((allPossibleCoords[i][k][0] == wallCoords[j][0] && allPossibleCoords[i][k][1] == wallCoords[j][1]) || 
                allPossibleCoords[i][k][0] < 0 || allPossibleCoords[i][k][0] > all_blocks.length - 1 || allPossibleCoords[i][k][1] < 0 || allPossibleCoords[i][k][1] > all_blocks[0].length - 1){
                    allPossibleCoords[i].splice(k, 1)
                    k -= 1
                    break
                }
            }
        }

        checkWolfCollision(allPossibleCoords[i], num)

        num++

        legalCoords = allPossibleCoords[i]

        if(legalCoords.length != 0){
            CalculateDistnace(legalCoords, i)
        }
    }
}
