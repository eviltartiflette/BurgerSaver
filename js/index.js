let userData={
    "orders": null,
    "restaurants": null
}

function handleOrderSheetButton(){
    orderSheetFileSelect.click()
}

function handleRestaurantSheetButton(){
    restaurantSheetFileSelect.click()
}


function handleOrderSheetUpload(event){
    orderSheetUploadButton.disabled = true
    let reader = new FileReader();
    reader.readAsText(event.target.files[0], "UTF-8");
    reader.onload = function (fevt) {
        try {
            const parsed = $.csv.toObjects(fevt.target.result)
            if(validateOrders(parsed)){
                userData.orders = parsed
                modalError("")
                refreshProcessButton()
            }
            else{
                throw new Error("Error while parsing orders")
            }

        } catch (error) {
            orderSheetUploadButton.disabled = false
            modalError("Error while reading file: "+error)
        }
    }
    reader.onerror = function (fevt) {
        orderSheetUploadButton.disabled = false
        modalError("Error while reading file: "+fevt)
    }
}

function handleRestaurantSheetUpload(event){
    restaurantSheetUploadButton.disabled = true
    let reader = new FileReader();
    reader.readAsText(event.target.files[0], "UTF-8");
    reader.onload = function (fevt) {
        try {
            const parsed = $.csv.toObjects(fevt.target.result)
            if(validateRestaurants(parsed)){
                userData.restaurants = parsed
                modalError("")
                refreshProcessButton()
            }
            else{
                throw new Error("Error while parsing restaurants")
            }

        } catch (error) {
            restaurantSheetUploadButton.disabled = false
            modalError("Error while reading file: "+error)
        }
    }
    reader.onerror = function (fevt) {
        restaurantSheetUploadButton.disabled = false
        modalError("Error while reading file: "+fevt)
    }
}


function modalError(txt){
    const selector = document.getElementById('modalError')
    selector.innerText = txt
}

function validateOrders(orders){
    try {
        const fields = ['Currency','Customizations','Item Name','Item Price','Order ID','Order Price','Order Status','Order Time','Restaurant ID','Special Instructions','Territory']
        for (let i = 0; i < fields.length; i++) {
            if(!Object.keys(orders[0]).includes(fields[i])){
                return false
            }
        }
    } catch (error) {
        return false
    }
    return true
}

function validateRestaurants(restaurants){
    try {
        const fields = ['City','Restaurant ID','Restaurant Name','Order Time']
        for (let i = 0; i < fields.length; i++) {
            if(!Object.keys(restaurants[0]).includes(fields[i])){
                return false
            }
        }
    } catch (error) {
        return false
    }
    return true
}

function refreshProcessButton(){
    if(userData.restaurants !== null && userData.orders !== null){
        processButton.disabled = false
    }
}

function handleProcessButton(){
    const monthly = compute_monthly(userData.orders)
    const ordersPrice = compute_orderPrice(userData.orders)
    const topItems = compute_tableTopItems(userData.orders, userData.restaurants)
    const topRestaurants = compute_tableTopRestaurants(userData.orders, userData.restaurants)
    const topOrders = compute_tableTopOrders(userData.orders, userData.restaurants)
    const totalSpent = compute_totalSpent(userData.orders)
    const timesOrdered = compute_timesOrdered(userData.orders)

    const view = document.getElementById('view')
    view.style.display = 'initial'

    graphOrdersPrice(ordersPrice)
    graphMonthlyCount(monthly)
    graphMonthlyBill(monthly)
    tableTopItems(topItems)
    tableTopRestaurants(topRestaurants)
    tableTopOrders(topOrders)
    cardTotalSpent(totalSpent)
    cardOdersCount(timesOrdered)
    
    initModal.toggle()

}

function init(){
    processButton.disabled = true
    initModal.toggle()
}

const orderSheetUploadButton = document.getElementById('orderSheetUploadButton')
const restaurantSheetUploadButton = document.getElementById('restaurantSheetUploadButton')

const orderSheetFileSelect = document.getElementById('orderSheetFile')
const restaurantSheetFileSelect = document.getElementById('restaurantSheetFile')

const processButton = document.getElementById('processButton')

const initModal = new bootstrap.Modal(document.getElementById('initModal'), {keyboard: false})

orderSheetUploadButton.addEventListener('click', handleOrderSheetButton)
orderSheetFileSelect.addEventListener('change', handleOrderSheetUpload)

restaurantSheetUploadButton.addEventListener('click', handleRestaurantSheetButton)
restaurantSheetFileSelect.addEventListener('change', handleRestaurantSheetUpload)

processButton.addEventListener('click', handleProcessButton)

$(document).ready(function () {
    init()
});
