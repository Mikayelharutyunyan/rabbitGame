const rabbCoords = []
const homeCoords = []
const wolfCoords = []
const wallCoords = []
const rows = []

const tableHeight = prompt("Input the table height")
const tableWidth = prompt("Input the table width")
const wolvesQuantity = prompt("Input the number of wolves")
const wallsQuantity = prompt("Input the number of walls")

let wolves = [], walls = []
let rabbit = document.createElement("img"), finish = document.createElement("img")

const body = document.getElementsByTagName('body')[0]

function CreateEmptyBoard(m, n){
    tbl = document.createElement('table')
    tbl.setAttribute('border', '1')
    tbdy = document.createElement('tbody')
    
    for (let i = 0; i < m; i++) {
        tr = document.createElement('tr')
        rows[i] = tr
        rows[i].length = n
        for (let j = 0; j < n; j++) {
            td = document.createElement('td')
            td.style.height = "40px"
            td.style.width = "40px"
            tr.appendChild(td)
            rows[i][j] = td
        }
        tbdy.appendChild(tr)
    }
    tbl.appendChild(tbdy)
    body.appendChild(tbl)
}

const AddEachCharechter = (image, name, arr) => {
    let charY = Math.floor(Math.random() * tableHeight)
    let charX = Math.floor(Math.random() * tableWidth)
    if(rows[charY][charX].childNodes.length === 1) {
        return AddEachCharechter(image, name, arr)
    }
    arr.push(charY, charX)
    PaintCharachters(charY, charX, image, name)
}

function CreateCharechters(num, image, name, arr){
    if(num >= 1 && image.length !== undefined){
        for(let i = 0; i < num; i++){
            arr[i] = []
            image[i] = document.createElement("img")
            AddEachCharechter(image[i], name, arr[i])
        }
        return
    }
    else if(num == 1) {
        AddEachCharechter(image, name, arr)
    }
}

const PaintCharachters = (y, x, image, name) => {
    image.src = `./images/${name}.png`
    image.setAttribute("height", "30px")
    image.setAttribute("width", "30px")
    image.classList.add(`${name}`)
    rows[y][x].appendChild(image)
}

const CheckWrongValues = (tableHeight, tableWidth, wolvesQuantity, wallsQuantity) => {
    if(parseInt(tableHeight) * parseInt(tableWidth) < parseInt(wolvesQuantity) + parseInt(wallsQuantity) + 2){
        alert("The numbers you inputed do not correspond to the game values")
        tbl.remove()
        return
    }
}

function StartGame(tableHeight, tableWidth, wolvesQuantity, wallsQuantity) {
    if(CheckWrongValues(tableHeight, tableWidth, wolvesQuantity, wallsQuantity)) return
    CreateEmptyBoard(tableHeight, tableWidth)
    CreateCharechters(1, rabbit, "rabbit", rabbCoords)
    CreateCharechters(1, finish, "finish", homeCoords)
    CreateCharechters(wallsQuantity, walls, "wall", wallCoords)
    CreateCharechters(wolvesQuantity, wolves, "wolf", wolfCoords)
}

StartGame(tableHeight, tableWidth, wolvesQuantity, wallsQuantity)

window.addEventListener("keyup", event => MoveRabbit(event.key))

const MoveRabbit = (key) => {
    if(key === "ArrowUp"){
        if(CheckRabbitCollision(1, 0, -(rows.length - 1), 0)){}
        else MakeRabbitMove(0, -1, 0, rows.length - 1)
    }

    else if(key === "ArrowDown"){
        if(CheckRabbitCollision(-1, 0, rows.length - 1, 0)){}
        else MakeRabbitMove(0, 1, rows.length - 1, 0)
    }

    else if(key === "ArrowRight"){
        if(CheckRabbitCollision(0, -1, 0, rows[0].length - 1)){}
        else MakeRabbitMove(1, 1, rows[0].length - 1, 0)
    }

    else if(key === "ArrowLeft"){
        if(CheckRabbitCollision(0, 1, 0, -(rows[0].length - 1))){}
        else MakeRabbitMove(1, -1, 0, rows[0].length - 1)
    }
}

const MakeRabbitMove = (index, direction, tableEdge, value) => {
    if(rabbCoords[index] == tableEdge){
        rabbCoords[index] = value
    } else{
        rabbCoords[index] += direction
    }

    rows[rabbCoords[0]][rabbCoords[1]].appendChild(rabbit)

    if(!IsWon()){
        MoveWolves()
    }
}

const CheckRabbitCollision = (coordY, coordX, edgeY, edgeX) => {
    const result = wallCoords.find(elem => (rabbCoords[0] == elem[0] + coordY && rabbCoords[1] == elem[1] + coordX) ||  
        (rabbCoords[0] == elem[0] + edgeY && rabbCoords[1] == elem[1] + edgeX)) 
    if(result){
        return true
    }
}

const MoveWolves = () => {
    for(let i = 0; i < wolfCoords.length; i++){
        if(IsLost(wolfCoords[i])) return 
        MoveWolf(wolfCoords[i], i)
        if(IsLost(wolfCoords[i])) return 
    }
}

const IsWon = () => {
    if(rabbCoords[0] == homeCoords[0] && rabbCoords[1] == homeCoords[1]){ 
        tbl.remove()
        setTimeout(() => alert("YOU WON"), 1)
        return true
    }
}

const IsLost = (wolf, legalCoords) => {
    const currentCoordCheck = rabbCoords[0] == wolf[0] && rabbCoords[1] == wolf[1]
    // const nextCoordCheck = rabbCoords[0] == legalCoords[i][0] && rabbCoords[1] == legalCoords[i][1]
    if(currentCoordCheck){ 
        tbl.remove()
        setTimeout(() => alert("YOU LOST"), 1)
        return true
    }
}

const GetShortestDistance = (wCoords, index) => {
    const distance = []

    wCoords.map(item => distance.push(Math.sqrt(Math.pow(item[0] - rabbCoords[0], 2) + Math.pow(item[1] - rabbCoords[1], 2))))

    let wolfMinDistanceIndex = 0

    distance.forEach((elem, i) => {
        if(elem < distance[wolfMinDistanceIndex]) {
            wolfMinDistanceIndex = i 
        }
    })

    wolfCoords[index] = wCoords[wolfMinDistanceIndex]

    return wolfCoords[index]
}

const WolvesCollision = (allPossibleCoords, i) => {
    for(let j = 0; j < i; j++){
        if(i != wolfCoords.length) {
            allPossibleCoords = allPossibleCoords.filter(elem => !(elem[0] == wolfCoords[j][0] && elem[1] == wolfCoords[j][1]))
        }
        else break
    }

    return allPossibleCoords
}

<<<<<<< HEAD
const WolfAndWallColl = (allPossibleCoords) => {
    allPossibleCoords = allPossibleCoords.filter(next => 
        wallCoords.find(wall => next[0] == wall[0] && next[1] == wall[1] || 
            next[0] < 0 || next[0] > rows.length - 1 || next[1] < 0 || next[1] > rows[0].length - 1) === undefined)
=======
const CheckWolfAndWallColl = (arr, index) => {
    arr.filter((next, k) => {
        let hit = wallCoords.find(wall => (next[0] == wall[0] && next[1] == wall[1]) || 
            (next[0] < 0 || next[0] > rows.length - 1 || next[1] < 0 || next[1] > rows[0].length - 1))
>>>>>>> 7243f6eb024e763d500de89de37d2f01fd621ba0

    return allPossibleCoords
}

const GetWolfAllMoves = coords => [[coords[0] + 1, coords[1]], [coords[0] - 1, coords[1]], [coords[0], coords[1] + 1], [coords[0], coords[1] - 1]]

const GetLegalMoves = (allPossibleCoords, i) => {
    allPossibleCoords = WolfAndWallColl(allPossibleCoords)
    allPossibleCoords = WolvesCollision(allPossibleCoords, i)

    return allPossibleCoords
}

const MoveWolf = (wolf, i) => {
    let legalCoords = GetLegalMoves(GetWolfAllMoves(wolf), i)

<<<<<<< HEAD
    if(legalCoords.length != 0){
        let shortest = GetShortestDistance(legalCoords, i)
        rows[shortest[0]][shortest[1]].appendChild(wolves[i])
    }
}
=======
        if(legalCoords.length != 0){
            CalculateDistance(legalCoords, i)
        }
    })
}
>>>>>>> 7243f6eb024e763d500de89de37d2f01fd621ba0
