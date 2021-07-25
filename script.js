const rabbCoords = []
const homeCoords = []
const wolfCoords = []
const wallCoords = []
const rows = []

// const tableHeight = prompt("Input the table height")
// const tableWidth = prompt("Input the table width")
// const wolvesQuantity = prompt("Input the number of wolves")
// const wallsQuantity = prompt("Input the number of walls")

let wolves = [], walls = []
let rabbit = document.createElement("img"), finish = document.createElement("img")

const body = document.getElementsByTagName('body')[0]

function createEmptyBoard(m, n){
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

const AddEachCharechter = (charY, charX, image, name, eachArr, tableHeight, tableWidth) => {
    charY = Math.floor(Math.random() * tableHeight)
    charX  = Math.floor(Math.random() * tableWidth)
    if(rows[charY][charX].childNodes.length == 1) 
        return AddEachCharechter(charY, charX, image, name, eachArr, tableHeight, tableWidth)
    
    eachArr.push(charY, charX)
    PaintCharachters(charY, charX, image, name)
}

function createCharechters(num, image, arr, name, tableHeight, tableWidth){
    let charX, charY

    if(num > 1){
        for(let i = 0; i < num; i++){
            arr[i] = []
            image[i] = document.createElement("img")
            AddEachCharechter(charY, charX, image[i], name, arr[i], tableHeight, tableWidth)
        }
        return
    }
    else if(num == 1) AddEachCharechter(charY, charX, image, name, arr, tableHeight, tableWidth)
}

const PaintCharachters = (y, x, image, name) => {
    image.src = `./images/${name}.png`
    image.setAttribute("height", "30px")
    image.setAttribute("width", "30px")
    image.classList.add(`${name}`)
    rows[y][x].appendChild(image)
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
    createCharechters(1, rabbit, rabbCoords, "rabbit", tableHeight, tableWidth)
    createCharechters(1, finish, homeCoords, "finish", tableHeight, tableWidth)
    createCharechters(wallsQuantity, walls, wallCoords, "wall", tableHeight, tableWidth)
    createCharechters(wolvesQuantity, wolves, wolfCoords, "wolf", tableHeight, tableWidth)
}

// startGame(tableHeight, tableWidth, wolvesQuantity, wallsQuantity)
startGame(10, 10, 15, 10)


window.addEventListener("keyup", event => moveRabbit(event.key))

const moveRabbit = (key) => {
    if(key === "ArrowUp"){
        if(checkRabbitCollision(1, 0, -(rows.length - 1), 0)){}
        else makeRabbitMove(0, -1, 0, rows.length - 1)
    }

    else if(key === "ArrowDown"){
        if(checkRabbitCollision(-1, 0, rows.length - 1, 0)){}
        else makeRabbitMove(0, 1, rows.length - 1, 0)
    }

    else if(key === "ArrowRight"){
        if(checkRabbitCollision(0, -1, 0, rows[0].length - 1)){}
        else makeRabbitMove(1, 1, rows[0].length - 1, 0)
    }

    else if(key === "ArrowLeft"){
        if(checkRabbitCollision(0, 1, 0, -(rows[0].length - 1))){}
        else makeRabbitMove(1, -1, 0, rows[0].length - 1)
    }


}

const makeRabbitMove = (index, direction, tableEdge, value) => {
    if(rabbCoords[index] == tableEdge) rabbCoords[index] = value
    else rabbCoords[index] += direction
    rows[rabbCoords[0]][rabbCoords[1]].appendChild(rabbit)
    if(!isWon()) moveWolf()
}

const moveWolf = () => {
    isLost();
    filterLegalMovesOnly();
    isLost();
}

const checkRabbitCollision = (coordY, coordX, edgeY, edgeX) => {
    const result = wallCoords.find(elem => (rabbCoords[0] == elem[0] + coordY && rabbCoords[1] == elem[1] + coordX) ||  
        (rabbCoords[0] == elem[0] + edgeY && rabbCoords[1] == elem[1] + edgeX)) 
    if(result) return true
}

const moveWolf = () => {
    if(isLost()) return
    filterLegalMovesOnly()
    isLost()
}

const isWon = () => {
    if(rabbCoords[0] == homeCoords[0] && rabbCoords[1] == homeCoords[1]){ 
        tbl.remove()
        setTimeout(() => alert("YOU WON"), 1)
        return true
    }
}

const isLost = () => {
    const result = wolfCoords.find(coords => (rabbCoords[0] == coords[0] && rabbCoords[1] == coords[1]))
    if(result){ 
        tbl.remove()
        setTimeout(() => alert("YOU LOST"), 1)
        return true
    }
}

const CalculateDistance = (wCoords, index) => {
    const distance = []

    wCoords.map(item => distance.push(Math.sqrt(Math.pow(item[0] - rabbCoords[0], 2) + Math.pow(item[1] - rabbCoords[1], 2))))

    // let wolfMinDistanceIndex = distance.indexOf(Math.min(...distance))
    // const wolfMinDistanceIndex = distance.reduce((lowest, next, index) => {
    //     return next < distance[lowest] ? index : lowest }, 0)
    let wolfMinDistanceIndex = 0
    // for(let i = 1; i < distance.length; i++){
    //     if(distance[i] < distance[wolfMinDistanceIndex]) wolfMinDistanceIndex = i
    // }

    distance.forEach((elem, i) => { if(elem < distance[wolfMinDistanceIndex]) wolfMinDistanceIndex = i })

    wolfCoords[index][0] = wCoords[wolfMinDistanceIndex][0]
    wolfCoords[index][1] = wCoords[wolfMinDistanceIndex][1] 

    rows[wolfCoords[index][0]][wolfCoords[index][1]].appendChild(wolves[index])
}

const checkWolfCollision = (wCoords, num) => {
    for(let j = 0; j < num; j++){
        if(num != wolfCoords.length) {
            wCoords.forEach((elem, i) => { if(elem[0] == wolfCoords[j][0] && elem[1] == wolfCoords[j][1]) wCoords.splice(i, 1) })
        }
        else break
    }
}

<<<<<<< HEAD

const getWolfAllMoves = coords => [[coords[0] + 1, coords[1]], [coords[0] - 1, coords[1]], [coords[0], coords[1] + 1], [coords[0], coords[1] - 1]]
=======
const getWolfAllMoves = (coords) => {
    return [[coords[0] + 1, coords[1]], [coords[0] - 1, coords[1]], [coords[0], coords[1] + 1], [coords[0], coords[1] - 1]]
}
>>>>>>> origin

const filterLegalMovesOnly = () => {
    let allPossibleCoords
    let legalCoords
    let num = 0

    for(let i = 0; i < wolfCoords.length; i++){
        allPossibleCoords = getWolfAllMoves(wolfCoords[i])
    
        for(let k = 0; k < allPossibleCoords.length; k++){
            for(let j = 0; j < wallCoords.length; j++){
                if((allPossibleCoords[k][0] == wallCoords[j][0] && allPossibleCoords[k][1] == wallCoords[j][1]) || 
                allPossibleCoords[k][0] < 0 || allPossibleCoords[k][0] > rows.length - 1 || allPossibleCoords[k][1] < 0 || allPossibleCoords[k][1] > rows[0].length - 1){
                    allPossibleCoords.splice(k, 1)
                    k -= 1
                    break
                }
            }
        }

        checkWolfCollision(allPossibleCoords, num)
        
        num++
        
        legalCoords = allPossibleCoords

        if(legalCoords.length != 0){
            CalculateDistance(legalCoords, i)
        }
    }
}
