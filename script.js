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

const AddEachCharechter = (charY, charX, image, name, eachArr, y, x) => {
    charY = Math.floor(Math.random() * y)
    charX  = Math.floor(Math.random() * x)
    if(rows[charY][charX].childNodes.length == 1) 
        return AddEachCharechter(charY, charX, image, name, eachArr, y, x)
    
    eachArr.push(charY, charX)
    PaintCharachters(charY, charX, image, name)
}

function CreateCharechters(num, image, arr, name, y, x){
    let charX, charY

    if(num > 1){
        for(let i = 0; i < num; i++){
            arr[i] = []
            image[i] = document.createElement("img")
            AddEachCharechter(charY, charX, image[i], name, arr[i], y, x)
        }
        return
    }
    else if(num == 1) AddEachCharechter(charY, charX, image, name, arr, y, x)
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
    CreateCharechters(1, rabbit, rabbCoords, "rabbit", tableHeight, tableWidth)
    CreateCharechters(1, finish, homeCoords, "finish", tableHeight, tableWidth)
    CreateCharechters(wallsQuantity, walls, wallCoords, "wall", tableHeight, tableWidth)
    CreateCharechters(wolvesQuantity, wolves, wolfCoords, "wolf", tableHeight, tableWidth)
}

StartGame(tableHeight, tableWidth, wolvesQuantity, wallsQuantity)
// startGame(10, 10, 20, 20)


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
    if(rabbCoords[index] == tableEdge) rabbCoords[index] = value
    else rabbCoords[index] += direction
    rows[rabbCoords[0]][rabbCoords[1]].appendChild(rabbit)
    if(!IsWon()) MoveWolf()
}

const CheckRabbitCollision = (coordY, coordX, edgeY, edgeX) => {
    const result = wallCoords.find(elem => (rabbCoords[0] == elem[0] + coordY && rabbCoords[1] == elem[1] + coordX) ||  
        (rabbCoords[0] == elem[0] + edgeY && rabbCoords[1] == elem[1] + edgeX)) 
    if(result) return true
}

const MoveWolf = () => {
    if(IsLost()) return
    FilterLegalMovesOnly()
    IsLost()
}

const IsWon = () => {
    if(rabbCoords[0] == homeCoords[0] && rabbCoords[1] == homeCoords[1]){ 
        tbl.remove()
        setTimeout(() => alert("YOU WON"), 1)
        return true
    }
}

const IsLost = () => {
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

    distance.forEach((elem, i) => { if(elem < distance[wolfMinDistanceIndex]) wolfMinDistanceIndex = i })

    wolfCoords[index][0] = wCoords[wolfMinDistanceIndex][0]
    wolfCoords[index][1] = wCoords[wolfMinDistanceIndex][1] 

    rows[wolfCoords[index][0]][wolfCoords[index][1]].appendChild(wolves[index])
}

const CheckWolfCollision = (wCoords, num) => {
    for(let j = 0; j < num; j++){
        if(num != wolfCoords.length) {
            wCoords.forEach((elem, i) => { if(elem[0] == wolfCoords[j][0] && elem[1] == wolfCoords[j][1]) wCoords.splice(i, 1) })
        }
        else break
    }
}

const CheckWolfAndWallColl = (arr, index) => {
    arr.filter((next, k) => {
        let hit = wallCoords.find(wall => (next[0] == wall[0] && next[1] == wall[1]) || 
            (next[0] < 0 || next[0] > rows.length - 1 || next[1] < 0 || next[1] > rows[0].length - 1))

        if(hit){
            arr.splice(k, 1)
            k -= index
            CheckWolfAndWallColl(arr, index)
        }
    })
}

const GetWolfAllMoves = coords => [[coords[0] + 1, coords[1]], [coords[0] - 1, coords[1]], [coords[0], coords[1] + 1], [coords[0], coords[1] - 1]]

const FilterLegalMovesOnly = () => {
    let allPossibleCoords
    let legalCoords
    let num = 0

    wolfCoords.forEach((wolf, i) => {
        allPossibleCoords = GetWolfAllMoves(wolf)
    
        CheckWolfAndWallColl(allPossibleCoords, 1)

        CheckWolfCollision(allPossibleCoords, num)
        
        num++
        
        legalCoords = allPossibleCoords

        if(legalCoords.length != 0){
            CalculateDistance(legalCoords, i)
        }
    })
}