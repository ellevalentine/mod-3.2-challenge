const beerURL = "http://localhost:3000/beers"
const selectedBeer = document.querySelector("#selected-beer")

function getBeers(){

    fetch(beerURL)
    .then( resp => resp.json())
    .then(beerData)


}

//display beer titles (left)

function beerData(beers){

    beerList = document.querySelector("#list-group")
    

    beers.forEach( function (beer){
        // debugger

        let beerLi = document.createElement("li")
        beerLi.className = "list-group-item"
        let beerBTN = document.createElement("button")
        beerBTN.innerHTML = `${beer.name}`
        beerBTN.id = `beer-${beer.id}`
        beerBTN.addEventListener("click", () => BeerSelected(beer))

        beerLi.append(beerBTN)
        
        
        beerList.append(beerLi)

    })


}


getBeers()


// Display beer infomation (right)

function BeerSelected(beer){

    selectedBeer.innerHTML=""

    //title

    let title = document.createElement("h3")
    title.innerHTML = `Beer Details:`

    selectedBeer.append(title)

    // line

    let line = document.createElement("hr")

    selectedBeer.append(line)


    //name

    let beerName = document.createElement("h1")
    beerName.style = "color:DodgerBlue;"
    beerName.innerHTML = `<u>${beer.name} </u>`

    selectedBeer.append(beerName)

    // image

    let beerImage = document.createElement("img")
    beerImage.src = `${beer.image_url}`

    selectedBeer.append(beerImage)


    //tagline

    let beerTagline = document.createElement("h2")
    beerTagline.innerHTML = `${beer.tagline} `

    selectedBeer.append(beerTagline)

    // Description

    let beerDescription = document.createElement("textarea")
    beerDescription.id = `des-${beer.id}`
    beerDescription.innerHTML = `${beer.description} `

    selectedBeer.append(beerDescription)

    // button 

    let editBeerBTN = document.createElement("button")
    editBeerBTN.id = "edit-beer"
    editBeerBTN.className = "btn btn-info"
    editBeerBTN.innerHTML = `Save`
    editBeerBTN.addEventListener('click', () => editBeer(beer))

    selectedBeer.append(editBeerBTN)

    //line2 

    let line2 = document.createElement("hr")

    selectedBeer.append(line2)

    //extra detail 

    let moreDetail = document.createElement("p")
    moreDetail.innerHTML = `<u>Extra Info</u>`

    selectedBeer.append(moreDetail)

    //first_brewed

    let first_brewed = document.createElement("p")
    first_brewed.innerHTML = `<strong>First Brewed:</strong> ${beer.first_brewed}`

    selectedBeer.append(first_brewed)

    //brewers_tips

    let brewers_tips = document.createElement("p")
    brewers_tips.innerHTML = `<strong>Brewers tips:</strong> ${beer.brewers_tips}`

    selectedBeer.append(brewers_tips)

    //food_pairing

    let food_pairing = document.createElement("p")
    food_pairing.innerHTML = `<strong>Food pairing:</strong> ${beer.food_pairing[0]},  ${beer.food_pairing[1]},  ${beer.food_pairing[2]}.`

    selectedBeer.append(food_pairing)

}

//update description in server

function editBeer(beer){


    let textAreaValue = document.querySelector(`#des-${beer.id}`).value
    beer.description = textAreaValue




    fetch(`http://localhost:3000/beers/${beer.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify(beer)
    })

    alert("Description updated.")

}


