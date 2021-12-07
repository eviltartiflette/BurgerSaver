function graphMonthlyCount(monthly){
    const labels = monthly.map(x=>{
        return `${x.year} - ${x.month}`
    })
        const data = {
        labels: labels,
        datasets: [{
            label: 'Monthly orders count',
            backgroundColor: 'rgb(13, 110, 253)',
            borderColor: 'rgb(255, 99, 132)',
            data: monthly.map(x=>x.count),
        }]
        };

        const config = {
        type: 'bar',
        data: data,
        options: {
            plugins:{
                legend:{
                    display: false
                }
            }
        }
        };

        const myChart = new Chart(
        document.getElementById('monthlyCountChart'),
        config
        );
    
}

function graphMonthlyBill(monthly){
    const labels = monthly.map(x=>{
        return `${x.year} - ${x.month}`
    })
        const data = {
        labels: labels,
        datasets: [{
            label: 'Monthly billed',
            backgroundColor: 'rgb(13, 110, 253)',
            borderColor: 'rgb(255, 99, 132)',
            data: monthly.map(x=>x.bill),
        }]
        };

        const config = {
        type: 'bar',
        data: data,
        options: {
            plugins:{
                legend:{
                    display: false
                }
            }
        }
        };

        const myChart = new Chart(
        document.getElementById('monthlyBillChart'),
        config
        );
    
}

function graphOrdersPrice(ordersPrice){
    const labels = ordersPrice.map(x=> x.date)
        const data = {
        labels: labels,
        datasets: [{
            label: 'Order price',
            backgroundColor: 'rgb(13, 110, 253)',
            borderColor: 'rgb(255, 99, 132)',
            data: ordersPrice.map(x=>x.price),
        }]
        };

        const config = {
        type: 'bar',
        data: data,
        options: {
            plugins:{
                legend:{
                    display: false
                }
            }
        }
        };

        const myChart = new Chart(
        document.getElementById('ordersPrice'),
        config
        );
}

function tableTopItems(topItems){
    let table = document.getElementById('tableTopItems')
    let tableLength = 10
    if (topItems.length < 11) {
        tableLength = topItems.length
    }

    for (let i = 0; i < tableLength; i++) {
        let row = document.createElement('tr')

        let indexTag = document.createElement("th")
        let indexText = document.createTextNode(i+1)
        indexTag.appendChild(indexText)
        row.appendChild(indexTag)

        let itemTag = document.createElement("td")
        let itemText = document.createTextNode(topItems[i].item)
        itemTag.appendChild(itemText)
        row.appendChild(itemTag)

        let restoTag = document.createElement("td")
        let restoText = document.createTextNode(topItems[i].restaurant)
        restoTag.appendChild(restoText)
        row.appendChild(restoTag)

        let countTag = document.createElement("td")
        let countText = document.createTextNode(topItems[i].count)
        countTag.appendChild(countText)
        row.appendChild(countTag)

        table.appendChild(row)
    }

}

function tableTopRestaurants(topRestaurants){
    let table = document.getElementById('tableTopRestaurants')
    let tableLength = 10
    if (topRestaurants.length < 11) {
        tableLength = topRestaurants.length
    }

    for (let i = 0; i < tableLength; i++) {
        let row = document.createElement('tr')

        let indexTag = document.createElement("th")
        let indexText = document.createTextNode(i+1)
        indexTag.appendChild(indexText)
        row.appendChild(indexTag)

        let restoTag = document.createElement("td")
        let restoText = document.createTextNode(topRestaurants[i].name)
        restoTag.appendChild(restoText)
        row.appendChild(restoTag)

        let maxTag = document.createElement("td")
        let MaxText = document.createTextNode(topRestaurants[i].max)
        maxTag.appendChild(MaxText)
        row.appendChild(maxTag)

        let avgTag = document.createElement("td")
        let avgText = document.createTextNode(topRestaurants[i].avg)
        avgTag.appendChild(avgText)
        row.appendChild(avgTag)

        let totalTag = document.createElement("td")
        let totalText = document.createTextNode(topRestaurants[i].sum)
        totalTag.appendChild(totalText)
        row.appendChild(totalTag)

        let countTag = document.createElement("td")
        let countText = document.createTextNode(topRestaurants[i].count)
        countTag.appendChild(countText)
        row.appendChild(countTag)

        table.appendChild(row)

        console.log()
    }

}
