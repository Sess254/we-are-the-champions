import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-478ef-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsments")

const inputFieldEl = document.getElementById("input-field")
const publishButtonEl = document.getElementById("publish-button")

// publish button event listener
publishButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(endorsementInDB, inputValue)

})