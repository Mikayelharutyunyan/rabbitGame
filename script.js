function createGame(){

var tableHeight = prompt("Please enter the quantity of blocks on Y axis");
var tableWidth = prompt("Please enter the quantity of blocks on X axis");
var wallsQuantity = prompt("Please enter the quantity of walls");
var wolvesQuantity = prompt("Please enter the quantity of wolves");
var coords = [];
var playerCoords = [];
var wallCoords = [];
var wolves = [];
var wolfCoords = [];
var wolfCoordsMatch = [];
var arno;
var wolfPrevCoords = [];
var wolfRandNumberX;
var wolfRandNumberY;
var playerX;
var playerY;
var wolfBeforeCollision = [];
var removedBlocks = [];
var noDubsBlocks = [];
var finishBlock;
var finishRandNumberX;
var finishRandNumberY;
var map = [];

if(parseInt(tableHeight) > 0 && parseInt(tableWidth) > 0 && parseInt(wallsQuantity) > 0 && parseInt(wolvesQuantity)){}
else{
    alert("Input proper values")
    createGame();
}

document.write(document.getElementsByTagName('body')[0]);

var body = document.getElementsByTagName('body')[0];

function tableCreate() {
    tbl = document.createElement('table');
    tbl.style.width = '30%';
    tbl.style.height = '30%';
    tbl.setAttribute('border', '1');
    tbdy = document.createElement('tbody');

    var classCountX = 0;
    var classCountY = 0;

    var count = 0;

    for (let i = 0; i < tableHeight; i++) {
        classCountX = 0;
        tr = document.createElement('tr');
        map[i] = tr;
        for (let j = 0; j < tableWidth; j++) {
            td = document.createElement('td');
            coords[count] = []
            coords[count].push(classCountY, classCountX);
            td.classList.add("block" + (classCountY + "" + (classCountX++)));
            map[i][j] = td;
            tr.appendChild(td)
            count++;
        }
        classCountY++;
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
}
tableCreate();

for(let i = 0; i < tableHeight; i++){
    for(let j = 0; j < tableWidth; j++){
        document.getElementsByTagName("tbody")[0].rows[i][j].style.height = "40px";
    }
}

var rows = document.getElementsByTagName("tbody")[0].rows;

function createCharachters(){
    var count = 0;
    var blocks = [];
    var randBlock;
    var blockRandNumberX;
    var blockRandNumberY;
    var blX;
    var blY;

    var restartButton = document.createElement("button");
    var buttonText = document.createTextNode("Restart");
    restartButton.appendChild(buttonText);
    restartButton.classList.add("RButton");
    body.appendChild(restartButton);
    restartButton.onclick = function(){
        location.reload();
    }

    var finishRandNumber =  Math.floor(Math.random() * coords.length);
    finishRandNumberX = coords[finishRandNumber][1];
    finishRandNumberY = coords[finishRandNumber][0];
    coords.splice(finishRandNumber, 1)

    finishBlock = document.getElementsByClassName("block" + finishRandNumberY + "" + finishRandNumberX);
    finishBlock[0].style.backgroundColor = "blue";

    rabDiv = document.createElement("div");
    var rabbit = document.createTextNode("🐇");
    rabDiv.style.marginBottom = "8px";
    rabDiv.classList.add("rd");
    rabDiv.appendChild(rabbit);

    var playerRandNumber = Math.floor(Math.random() * coords.length);
    playerX = coords[playerRandNumber][1];
    playerY = coords[playerRandNumber][0];

    coords.splice(playerRandNumber, 1);
    
    rows[playerY][playerX].appendChild(rabDiv);

    for(let i = 0; i < wallsQuantity; i++){
        var blockRandNumber = Math.floor(Math.random() * coords.length);
        blockRandNumberX = coords[blockRandNumber][1];
        blockRandNumberY = coords[blockRandNumber][0];
        coords.splice(blockRandNumber, 1);
        blX = blockRandNumberX;
        blY = blockRandNumberY;

        blockRandNumberY -= 1;
        blockRandNumberX -= 1;
        var arr1 = [blockRandNumberY, blockRandNumberX];
        blockRandNumberY += 2;
        blockRandNumberX += 2;
        var arr2 = [blockRandNumberY, blockRandNumberX];
        blockRandNumberY -= 2;
        var arr3 = [blockRandNumberY, blockRandNumberX];
        blockRandNumberY += 2;
        blockRandNumberX -= 2;
        var arr4 = [blockRandNumberY, blockRandNumberX];
        removedBlocks.push(arr1, arr2, arr3, arr4)
        for(let j = 0; j < 4; j++)
        {
            if(removedBlocks[count][0] < 0 || removedBlocks[count][0] > tableHeight - 1 || removedBlocks[count][1] < 0 || removedBlocks[count][1] > tableWidth - 1)
            {
                removedBlocks.splice(count, 1);
                count--;
            }
            count++;
        }
        let stringArray = removedBlocks.map(JSON.stringify);
        let uniqueStringArray = new Set(stringArray);
        noDubsBlocks = Array.from(uniqueStringArray, JSON.parse);

        for(let i = 0; i < noDubsBlocks.length; i++){
            for(let j = 0; j < coords.length; j++){
                if(noDubsBlocks[i][0] == coords[j][0] && noDubsBlocks[i][1] == coords[j][1])
                {
                    coords.splice(j, 1);
                }
            }
        }

        

        blockRandNumberY = blY;
        blockRandNumberX = blX;
        randBlock = document.getElementsByClassName("block" + blockRandNumberY + "" + blockRandNumberX)
        wallCoords[i] = [];
        wallCoords[i].push(blockRandNumberY, blockRandNumberX);
        randBlock[0].style.backgroundColor = 'black';
    }

    for(let i = 0; i < wolvesQuantity; i++){
        wolfCoords[i] = []

        var classNum = i + 1;
        wolves[i] = document.createElement("div");
        var wolfText = document.createElement("p");
        var wolfEmoji = document.createTextNode("🐺");
        wolfText.appendChild(wolfEmoji);
        wolves[i].classList.add("wolf" + classNum);
        wolves[i].appendChild(wolfText);
        wolves[i].style.width = "0px";
        wolves[i].style.height = "0px";
        wolves[i].style.marginBottom = "10px";

        var wolfRandNumber = Math.floor(Math.random() * coords.length);
        wolfRandNumberX = coords[wolfRandNumber][1];
        wolfRandNumberY = coords[wolfRandNumber][0];
        wolfCoords[i].push(wolfRandNumberY, wolfRandNumberX);
        rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        coords.splice(wolfRandNumber, 1);
        // rand = document.getElementsByClassName("block" + blockRandNumberY + "" + blockRandNumberX) 
        // blocks.push(randBlock);
        // wallCoords[i] = [];
        // wallCoords[i].push(blockRandNumberY, blockRandNumberX);
        // blocks[i][0].style.backgroundColor = 'black';
    }
}

createCharachters();

function moveCharachters(){

    window.addEventListener("keyup", (event) => {
        // switch(event.key){
        //     case 'Enter': rows[playerY][playerX].appendChild(rabDiv);
        //     case 'ArrowUp': rows[playerY][1].appendChild(rabDiv);
        // }
        if(event.key === "ArrowUp")
        {
            if(playerY < 1) rows[playerY += tableHeight - 1][playerX].appendChild(rabDiv); 
            else rows[--playerY][playerX].appendChild(rabDiv);
            for (let i = 0; i < wallCoords.length; i++) {
                if(playerY == wallCoords[i][0] && playerX == wallCoords[i][1])
                {
                    if(wallCoords[i][0] == tableHeight - 1)
                    {
                        playerY = 0;
                        rows[playerY][playerX].appendChild(rabDiv);    
                    }
                    else{
                        rows[++playerY][playerX].appendChild(rabDiv);
                    }
                    for(let j = 0; j < wolves.length; j++){
                        if(wolfCoords[j][0] < playerY){
                            rows[--wolfCoords[j][0]][wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][0] > playerY)
                        {
                            rows[++wolfCoords[j][0]][wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][0] == playerY && wolfCoords[j][1] > playerX)
                        {
                            rows[wolfCoords[j][0]][++wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][0] == playerY && wolfCoords[j][1] < playerX)
                        {
                            rows[wolfCoords[j][0]][--wolfCoords[j][1]];
                        }
                    }
                }
            }

            coordsCheckY();
                       
        }
        else if(event.key === "ArrowLeft")
        {
            if(playerX < 1) rows[playerY][playerX += tableWidth - 1].appendChild(rabDiv);
            else rows[playerY][--playerX].appendChild(rabDiv);
            for (let i = 0; i < wallCoords.length; i++) {
                if(playerY == wallCoords[i][0] && playerX == wallCoords[i][1])
                {
                    if(wallCoords[i][1] == tableWidth - 1)
                    {
                        playerX = 0;
                        rows[playerY][playerX].appendChild(rabDiv);    
                    }
                    else{
                        rows[playerY][++playerX].appendChild(rabDiv);
                    }
                    for(let j = 0; j < wolves.length; j++){
                        if(wolfCoords[j][1] < playerX){
                            rows[wolfCoords[j][0]][--wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][1] > playerX)
                        {
                            rows[wolfCoords[j][0]][++wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][1] == playerX && wolfCoords[j][0] > playerY)
                        {
                            rows[++wolfCoords[j][0]][wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][1] == playerX && wolfCoords[j][0] < playerY)
                        {
                            rows[--wolfCoords[j][0]][wolfCoords[j][1]];
                        }
                    }
                }
            }

            coordsCheckX();                       
        }
        else if(event.key === "ArrowRight")
        {
            if(playerX > tableWidth - 2) rows[playerY][playerX -= tableWidth - 1].appendChild(rabDiv);
            else rows[playerY][++playerX].appendChild(rabDiv);
            for (let i = 0; i < wallCoords.length; i++) {
                if(playerY == wallCoords[i][0] && playerX == wallCoords[i][1])
                {
                    if(wallCoords[i][1] == 0)
                    {
                        playerX = tableWidth - 1;
                        rows[playerY][playerX].appendChild(rabDiv);    
                    }
                    else{
                        rows[playerY][--playerX].appendChild(rabDiv);
                    }
                    for(let j = 0; j < wolves.length; j++){
                        if(wolfCoords[j][1] < playerX){
                            rows[wolfCoords[j][0]][--wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][1] > playerX)
                        {
                            rows[wolfCoords[j][0]][++wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][1] == playerX && wolfCoords[j][0] > playerY)
                        {
                            rows[++wolfCoords[j][0]][wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][1] == playerX && wolfCoords[j][0] < playerY)
                        {
                            rows[--wolfCoords[j][0]][wolfCoords[j][1]];
                        }
                    }
                }
            }

            coordsCheckX();
        }

        else if(event.key === "ArrowDown")
        {
            if(playerY > tableHeight - 2) rows[playerY -= tableHeight - 1][playerX].appendChild(rabDiv); 
            else rows[++playerY][playerX].appendChild(rabDiv);

            for (let i = 0; i < wallCoords.length; i++) {
                if(playerY == wallCoords[i][0] && playerX == wallCoords[i][1])
                {
                    if(wallCoords[i][0] == 0)
                    {
                        playerY = tableHeight - 1;
                        rows[playerY][playerX].appendChild(rabDiv);    
                    }
                    else{
                        rows[--playerY][playerX].appendChild(rabDiv);
                    }
                    for(let j = 0; j < wolves.length; j++){
                        if(wolfCoords[j][0] < playerY){
                            rows[--wolfCoords[j][0]][wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][0] > playerY)
                        {
                            rows[++wolfCoords[j][0]][wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][0] == playerY && wolfCoords[j][1] > playerX)
                        {
                            rows[wolfCoords[j][0]][++wolfCoords[j][1]];
                        }
                        else if(wolfCoords[j][0] == playerY && wolfCoords[j][1] < playerX)
                        {
                            rows[wolfCoords[j][0]][--wolfCoords[j][1]];
                        }
                    }
                }
                
                // for(let j = 0; j < wolves.length; j++){
                //     if(wolfCoords[j][0] == wallCoords[i][0] && wolfCoords[j][1] == wallCoords[i][1])
                //     {       
                //         wolfBeforeCollision[j] = [];
                //         wolfBeforeCollision[j].push(wolfCoords[j][0], wolfCoords[j][1]);
                //         console.log(wolfBeforeCollision[j][0]);
                //         console.log(wolfBeforeCollision[j][1]);
                //         wolfCoords[j][0] -= 1;                
                //         rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                //         console.log(wolfCoords[j][0]);
                //         console.log(wolfCoords[j][1]);
                //     }
                // }
            }

            coordsCheckY();
        }
    })
}

function coordsCheckX(){
    let count = 0;
    let count1 = 0;

    for(let i = 0; i < wolves.length; i++){
        wolfPrevCoords[i] = [];
        wolfPrevCoords[i].push(wolfCoords[i][0], wolfCoords[i][1]);
        if(playerX > wolfCoords[i][1]){
            wolfCoords[i][1] += 1;
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        else if(playerX < wolfCoords[i][1]){
            wolfCoords[i][1] -= 1;
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        else if(playerY == wolfCoords[i][0] && playerX == ++wolfCoords[i][1]){
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        else if(playerY == wolfCoords[i][0] && playerX == --wolfCoords[i][1]){
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        else if(playerX == wolfCoords[i][1] && playerY > wolfCoords[i][0]){
            wolfCoords[i][0] += 1;
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        else{
            wolfCoords[i][0] -= 1;
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        if(playerY == wolfCoords[i][0] && playerX == wolfCoords[i][1]){
            tbl.remove();
            alert("YOU LOST");
            count1++;
            break;
        }
    }

    if(playerX == finishRandNumberX && playerY == finishRandNumberY){
        if(count1 == 1){}
        else{
            rows[finishRandNumberY][finishRandNumberX].appendChild(rabDiv)
            tbl.remove();
            setTimeout(function(){ alert("YOU WON"); }, 30);
        }
    }



    ///////////////////////////////////////////////////////////////////////////

    // for(let i = 0; i < wolves.length; i++){
    //     for(let j = 1; j < wolves.length - count; j++){
    //         // console.log(wolfCoords[i][0] + "  " + wolfCoords[i][1])
    //         // console.log(wolfCoords[j][0] + "  " + wolfCoords[j][1])
    //         console.log(wolfCoords);
    //         if(wolfCoords[i][0] == wolfCoords[j][0] && wolfCoords[i][1] == wolfCoords[j][1]){
    //             wolfCoords[j][0] = wolfPrevCoords[j][0]; 
    //             wolfCoords[j][1] = wolfPrevCoords[j][1];
    //             rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[i]);
    //         }
    //     }
    //     count++;
    // }

    ///////////////////////////////////////////////////////////////////////////

    // var hashes = {};

    // for (var i=0; i < wolves.length; i++) {
    //     var hash = JSON.stringify(wolfCoords[i]); // or .toString(), or whatever
    //     if (hash in hashes) {
    //         // console.log(hashes)
    //         wolfCoords[i][0] = wolfPrevCoords[i][0];
    //         wolfCoords[i][1] = wolfPrevCoords[i][1];
    //         console.log(wolfPrevCoords[i] + "    " + wolfCoords[i])
    //         console.log(hash)
    //         rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
    //     }
    //     else{
            
    //         hashes[hash] = true;
    //     }
    //     //console.log(hashes)
    // }
    // console.log(uniques)

    


    for(let i = 0; i < wallCoords.length; i++) {
        for(let j = 0; j < wolves.length; j++){
            if(tableWidth == 1 || tableHeight == 1){
                if(wolfCoords[j][0] == wallCoords[i][0] && wolfCoords[j][1] == wallCoords[i][1]){
                    wolfCoords[j][0] = wolfPrevCoords[j][0];
                    wolfCoords[j][1] = wolfPrevCoords[j][1];
                    rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                }
            }

            else{
                if((wolfCoords[j][0] == wallCoords[i][0] && wolfCoords[j][1] == wallCoords[i][1] && wolfCoords[j][0] > playerY))
                {
                    if((wolfPrevCoords[j][0] == wallCoords[i][0] + 1)){
                        if(finishRandNumberX >= wolfCoords[j][1]){
                            wolfCoords[j][1] = wolfPrevCoords[j][1] + 1;
                            wolfCoords[j][0] = wolfPrevCoords[j][0];
                            rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                        }

                        else{
                            wolfCoords[j][1] = wolfPrevCoords[j][1] - 1;
                            wolfCoords[j][0] = wolfPrevCoords[j][0];
                            rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                        }
                    }

                    else{
                        wolfCoords[j][1] = wolfPrevCoords[j][1];
                        wolfCoords[j][0] = wolfPrevCoords[j][0] - 1;
                        rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                    }
                }
                
                else if((wolfCoords[j][0] == wallCoords[i][0] && wolfCoords[j][1] == wallCoords[i][1] && wolfCoords[j][0] < playerY))
                {
                    if(wolfPrevCoords[j][0] == wallCoords[i][0] - 1){
                        if(finishRandNumberX >= wolfCoords[j][1]){
                            wolfCoords[j][1] = wolfPrevCoords[j][1] + 1;
                            wolfCoords[j][0] = wolfPrevCoords[j][0];
                            rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                        }

                        else{
                            wolfCoords[j][1] = wolfPrevCoords[j][1] - 1;
                            wolfCoords[j][0] = wolfPrevCoords[j][0];
                            rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                        }
                    }

                    else{
                        wolfCoords[j][1] = wolfPrevCoords[j][1];
                        wolfCoords[j][0] = wolfPrevCoords[j][0] + 1;
                        rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                    }
                }

                else if((wolfCoords[j][0] == wallCoords[i][0] && wolfCoords[j][1] == wallCoords[i][1] && wolfCoords[j][0] == playerY))
                {
                    if(finishRandNumberY >= wolfCoords[j][0])
                    {
                        wolfCoords[j][0] = wolfPrevCoords[j][0] + 1;
                        wolfCoords[j][1] = wolfPrevCoords[j][1];
                        rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                    }
                    else{
                        wolfCoords[j][0] = wolfPrevCoords[j][0] - 1;
                        wolfCoords[j][1] = wolfPrevCoords[j][1];
                        rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                    }
                }
            }
        }
    }

    wolfCoordsMatch = wolfCoords.slice() 

    for (var i=0; i < wolfCoordsMatch.length; i++) {
        count = 0;
        for(var j = 0; j < wolfCoordsMatch.length; j++){
            if(wolfCoordsMatch[i][0] != wolfCoordsMatch[j][0] || wolfCoordsMatch[i][1] != wolfCoordsMatch[j][1]){
                count++;
            }
    
            if(count == wolfCoordsMatch.length - 1){
                wolfCoordsMatch.splice(i, 1)
            }
        }
    }
    
    for(let i = 0; i < wolfCoordsMatch.length; i++){
        for(let j = 0; j < wolfCoordsMatch.length; j++){
            if(j == i){}
            
            else{
                if(wolfCoordsMatch[i][0] == wolfCoordsMatch[j][0] && wolfCoordsMatch[i][1] == wolfCoordsMatch[j][1]){
                        wolfCoords[j][0] = wolfPrevCoords[j][0];
                        wolfCoords[j][1] = wolfPrevCoords[j][1];
                        rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                
                }
            }
        }
    }

    // console.log(wolfCoordsMatch)
}

function coordsCheckY(){
    let count = 0;
    let count1 = 0;
    
    for(let i = 0; i < wolves.length; i++){
        wolfPrevCoords[i] = [];
        wolfPrevCoords[i].push(wolfCoords[i][0], wolfCoords[i][1]);
        if(playerY > wolfCoords[i][0]){
            wolfCoords[i][0] += 1;
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        else if(playerY < wolfCoords[i][0]){
            wolfCoords[i][0] -= 1;
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        else if(playerX == wolfCoords[i][1] && playerY == ++wolfCoords[i][0]){
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        else if(playerX == wolfCoords[i][1] && playerY == --wolfCoords[i][0]){
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        else if(playerY == wolfCoords[i][0] && playerX > wolfCoords[i][1]){
            wolfCoords[i][1] += 1;
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        else{
            wolfCoords[i][1] -= 1;
            rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
        }

        if(playerY == wolfCoords[i][0] && playerX == wolfCoords[i][1]){
            tbl.remove();
            alert("YOU LOST");
            count1++;
            break;
        }
    }

    if(playerX == finishRandNumberX && playerY == finishRandNumberY){
        if(count1 == 1){}
        else{
            rows[finishRandNumberY][finishRandNumberX].appendChild(rabDiv)
            tbl.remove();
            setTimeout(function(){ alert("YOU WON"); }, 30);
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////

    // for(let i = 0; i < wolves.length; i++){
    //     for(let j = 1; j < wolves.length; j++){
    //         // console.log(wolfCoords[i][0] + "  " + wolfCoords[i][1])
    //         // console.log(wolfCoords[j][0] + "  " + wolfCoords[j][1])
    //         if(wolfCoords[i][0] == wolfCoords[j][0] && wolfCoords[i][1] == wolfCoords[j][1]){
    //             console.log("True")
    //             wolfCoords[j][0] = wolfPrevCoords[j][0]; 
    //             wolfCoords[j][1] = wolfPrevCoords[j][1];
    //             rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[i]);
    //         }
    //     }
    // }

    ///////////////////////////////////////////////////////////////////////////////////////////

    // var hashes = {};

    // for (var i=0; i < wolves.length; i++) {
    //     var hash = JSON.stringify(wolfCoords[i]); // or .toString(), or whatever
    //     if (hash in hashes) {
    //         // console.log(hashes)
    //         if(wolfCoords[i][0])
    //         wolfCoords[i][0] = wolfPrevCoords[i][0];
    //         wolfCoords[i][1] = wolfPrevCoords[i][1];
    //         console.log(wolfPrevCoords[i] + "    " + wolfCoords[i])
    //         console.log(hash)
    //         rows[wolfCoords[i][0]][wolfCoords[i][1]].appendChild(wolves[i]);
    //     }
    //     else{
            
    //         hashes[hash] = true;
    //     }
    //     //console.log(hashes)
    // }

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    for(let i = 0; i < wallCoords.length; i++) {
        for(let j = 0; j < wolves.length; j++){
            if(tableWidth == 1 || tableHeight == 1){
                if(wolfCoords[j][0] == wallCoords[i][0] && wolfCoords[j][1] == wallCoords[i][1]){
                    wolfCoords[j][0] = wolfPrevCoords[j][0];
                    wolfCoords[j][1] = wolfPrevCoords[j][1]
                    rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                }
            }

            else{
                if((wolfCoords[j][0] == wallCoords[i][0] && wolfCoords[j][1] == wallCoords[i][1] && wolfCoords[j][1] > playerX))
                {
                    if(((wolfPrevCoords[j][1] == wallCoords[i][1] + 1))){
                        
                        if(finishRandNumberY >= wolfCoords[j][0]){
                            wolfCoords[j][0] = wolfPrevCoords[j][0] + 1;
                            wolfCoords[j][1] = wolfPrevCoords[j][1];
                            rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                        }

                        else{
                            wolfCoords[j][0] = wolfPrevCoords[j][0] - 1;
                            wolfCoords[j][1] = wolfPrevCoords[j][1];
                            rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                        }
                    
                    }

                    else{
                        wolfCoords[j][0] = wolfPrevCoords[j][0];
                        wolfCoords[j][1] = wolfPrevCoords[j][1] - 1;
                        rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                    }
                }
                
                else if((wolfCoords[j][0] == wallCoords[i][0] && wolfCoords[j][1] == wallCoords[i][1] && wolfCoords[j][1] < playerX))
                {
                    if(((wolfPrevCoords[j][1] == wallCoords[i][1] - 1))){
                        if(finishRandNumberY >= wolfCoords[j][0]){
                            wolfCoords[j][0] = wolfPrevCoords[j][0] + 1;
                            wolfCoords[j][1] = wolfPrevCoords[j][1];
                            rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                        }

                        else{
                            wolfCoords[j][0] = wolfPrevCoords[j][0] - 1;
                            wolfCoords[j][1] = wolfPrevCoords[j][1];
                            rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                        }
                    }

                    else{
                        wolfCoords[j][0] = wolfPrevCoords[j][0];
                        wolfCoords[j][1] = wolfPrevCoords[j][1] + 1;
                        rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                    }
                }

                else if((wolfCoords[j][0] == wallCoords[i][0] && wolfCoords[j][1] == wallCoords[i][1] && wolfCoords[j][1] == playerX))
                {
                    if(finishRandNumberX >= wolfCoords[j][1])
                    {
                        wolfCoords[j][0] = wolfPrevCoords[j][0];
                        wolfCoords[j][1] = wolfPrevCoords[j][1] + 1;
                        rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                    }
                    else{
                        wolfCoords[j][0] = wolfPrevCoords[j][0];
                        wolfCoords[j][1] = wolfPrevCoords[j][1] - 1;
                        rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                    }
                }
            }

            // else if(wolfCoords[j][0] == wallCoords[i][0] && wolfCoords[j][1] == wallCoords[i][1] && wallCoords[i][0] == playerY)
            // {
            //     if(wolfCoords[j][0] >= (tableHeight - 1) / 2)
            //     {
            //         console.log("ASDASDaaaaaaaaaaaaaaaa")
            //         wolfCoords[j][0] = wolfPrevCoords[j][0];
            //         wolfCoords[j][1] = wolfPrevCoords[j][1] + 1;
            //         rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
            //     }
            //     else{
            //         wolfCoords[j][0] = wolfPrevCoords[j][0];
            //         wolfCoords[j][1] = wolfPrevCoords[j][1] - 1;
            //         rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
            //     }
            // }

            // console.log(wallCoords[i][0] + " " + playerY)
        }
    }

    wolfCoordsMatch = wolfCoords.slice()

    for (var i=0; i < wolfCoordsMatch.length; i++) {
        count = 0;
        for(var j = 0; j < wolfCoordsMatch.length; j++){
            if(wolfCoordsMatch[i][0] != wolfCoordsMatch[j][0] || wolfCoordsMatch[i][1] != wolfCoordsMatch[j][1]){
                count++;
            }
    
            if(count == wolfCoordsMatch.length - 1){
                wolfCoordsMatch.splice(i, 1)
            }
        }
    }
    
    for(let i = 0; i < wolfCoordsMatch.length; i++){
        for(let j = 0; j < wolfCoordsMatch.length; j++){
            if(j == i){}

            else{
                if(wolfCoordsMatch[i][0] == wolfCoordsMatch[j][0] && wolfCoordsMatch[i][1] == wolfCoordsMatch[j][1]){
                    console.log(wolfCoordsMatch)
                    wolfCoords[j][0] = wolfPrevCoords[j][0];
                    wolfCoords[j][1] = wolfPrevCoords[j][1];
                    rows[wolfCoords[j][0]][wolfCoords[j][1]].appendChild(wolves[j]);
                }
            }
        }
    }
}
moveCharachters();
}

createGame();


////////////////////////////////////////////////////////////////////////////////////////////////

// var myWolves = [[6, 7], [1, 2], [6, 7], [7, 8], [1, 2], [1, 2], [7, 7], [1, 2], [1, 2], [5, 8], [1, 2]];
// var myArrays = myWolves.slice();
//     hashes = {};

//     var count;
// for (var i=0; i < myArrays.length; i++) {
//     count = 0;
//     for(var j = i; j < myArrays.length; j++){
//         console.log(j)
//         if(i == j){console.log()}
//         else{
//             if(myWolves[i] == myWolves[j]){
//                 console.log("YES BABYYY")
//             }
//         }
//     }
// }

// console.log(myArrays)
