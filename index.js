import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-478ef-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("input-field")
const publishButtonEl = document.getElementById("publish-button")
const endorsementEl = document.getElementById("endorsement-el")

// publish button event listener
publishButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(endorsementInDB, inputValue)
    clearInputField()
})

// function that fetches data from the database
onValue(endorsementInDB, function(snapshot) {
     if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearEndorsementList()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]

            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendToendorsementList(currentItem)
        }
    
    } else {
        endorsementEl.innerHTML = `No Endorsements at the Moment....`
    }
})


// function that clears the input field
function clearInputField() {
    inputFieldEl.value = ""
}

// funtion that appends new endorsements to the endorsements list
function appendToendorsementList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    // function deletes endorsements from te database
    newEl.addEventListener("dblclick", function() {
        let exactLocationInDB = ref(database, `endorsements/${itemID}`)
        remove(exactLocationInDB)

    })

    endorsementEl.append(newEl)
}

//function that clears the endoserments
function clearEndorsementList() {
    endorsementEl.innerHTML = ""
}