function compute_monthly(orders){
    let uniqueOrders = [];
    let orderIDs = [];
    let months = []
    for (let i = 0; i < orders.length; i++) {
        if(!orderIDs.includes(orders[i]['Order ID'])){
            let thisOrder = orders[i];
            orderIDs.push(thisOrder['Order ID'])
            thisOrder.dateMonth = parseInt(thisOrder['Order Time'].split(' ')[0].split('-')[1]);
            thisOrder.dateYear = parseInt(thisOrder['Order Time'].split(' ')[0].split('-')[0]);
            uniqueOrders.unshift(thisOrder);
        }
    }

    let rangeEnd = [uniqueOrders[uniqueOrders.length-1].dateYear, uniqueOrders[uniqueOrders.length-1].dateMonth]
    let rangeStart = [uniqueOrders[0].dateYear, uniqueOrders[0].dateMonth]

    let abort = false;
    for (let y = rangeStart[0]; y < rangeEnd[0]+1 && !abort; y++) {
        let firstMonth = 1
        if(y == rangeStart[0]){
            firstMonth = rangeStart[1]
        }
        for (let m = firstMonth; m < 12+1 && !abort; m++) {
            months.push([y,m])
            if(y == rangeEnd[0] && m == rangeEnd[1]){
                abort = true
            }
        }
    }
    
    const collection = months.map(x=>{
        let bill = 0;
        let count = 0;
        uniqueOrders.filter(y=> y.dateYear == x[0] && y.dateMonth == x[1]).map(z=>{
            bill += parseInt(z['Order Price']) || 0
            count += 1
        })
        return {
            "year": x[0],
            "month": x[1],
            "bill": bill,
            "count": count
        }
    })

    return collection
}

function compute_orderPrice(orders){
    let uniqueOrders = [];
    let orderIDs = [];
    for (let i = 0; i < orders.length; i++) {
        if(!orderIDs.includes(orders[i]['Order ID'])){
            let thisOrder = orders[i];
            orderIDs.push(thisOrder['Order ID'])
            thisOrder.dateSimple = thisOrder['Order Time'].split(' ')[0]
            uniqueOrders.unshift(thisOrder);
        }
    }
    const collection = uniqueOrders.map(x=>{
        return {
            "date": x.dateSimple,
            "price": x['Order Price']
        }
    })
    return collection
}

function compute_tableTopItems(orders,restaurants){
    let uniqueRestaurants = {}
    for (let i = 0; i < restaurants.length; i++) {
        uniqueRestaurants[restaurants[i]['Restaurant ID']] = restaurants[i]['Restaurant Name'].replace(/[^a-zA-Z0-9 ]/g, "")
        
    }

    let uniqueItems = {}
    for (let i = 0; i < orders.length; i++) {
        const thisItem = uniqueRestaurants[orders[i]['Restaurant ID']] + '_' + orders[i]['Item Name'].replace(/[^a-zA-Z0-9 ]/g, "")
        if (Object.keys(uniqueItems).includes(thisItem)) {
            uniqueItems[thisItem] += 1
        }
        else{
            uniqueItems[thisItem] = 1
        }
    }

    let top = Object.keys(uniqueItems).map(x=>{
        return {
            'restaurant': x.split("_")[0],
            'item': x.split("_")[1],
            'count': uniqueItems[x]
        }
    })
    top.sort((a,b)=>{
        if (a.count < b.count) {
            return 1;
        }
        if (a.count > b.count) {
            return -1;
        }
        return 0;
    })
    return top
}

function compute_tableTopRestaurants(orders,restaurants){
    let uniqueOrders = [];
    let orderIDs = [];
    for (let i = 0; i < orders.length; i++) {
        if(!orderIDs.includes(orders[i]['Order ID'])){
            let thisOrder = orders[i];
            orderIDs.push(thisOrder['Order ID'])
            thisOrder.dateSimple = thisOrder['Order Time'].split(' ')[0]
            uniqueOrders.unshift(thisOrder);
        }
    }

    let collection = []
    const uniqueRestaurantIDS = [...new Set(restaurants.map(x=>x['Restaurant ID']))];
    for (let i = 0; i < uniqueRestaurantIDS.length; i++) {
        const thisRestoID = uniqueRestaurantIDS[i]

        const name = restaurants.filter(x=> x['Restaurant ID'] == thisRestoID)[0]['Restaurant Name']
        const prices = uniqueOrders.filter(x=>x['Restaurant ID'] == thisRestoID).map(x=>parseInt(Math.round(x['Order Price'])*100))

        let maxPrice = 0;
        for (let y = 0; y < prices.length; y++) {
            if(prices[y] > maxPrice){
                maxPrice = prices[y]
            }
        }

        let total = 0;
        for (let y = 0; y < prices.length; y++) {
            total += prices[y]
        }

        const avg = Math.round(total/prices.length)

        collection.push({
            'name': name,
            'count': prices.length,
            'max': maxPrice/100,
            'avg': avg/100,
            'sum': total/100
        })

        collection.sort((a,b)=>{
            if(a.count < b.count){
                return 1
            }
            else if(a.count > b.count){
                return -1
            }
            else{
                return 0
            }
        })
    }

    return collection
}

function compute_tableTopOrders(orders,restaurants){
    let uniqueOrders = [];
    let orderIDs = [];
    for (let i = 0; i < orders.length; i++) {
        if(!orderIDs.includes(orders[i]['Order ID'])){
            let thisOrder = orders[i];
            orderIDs.push(thisOrder['Order ID'])
            thisOrder.dateSimple = thisOrder['Order Time'].split(' ')[0]
            uniqueOrders.unshift(thisOrder);
            thisOrder.priceParsed = Math.round(parseFloat(thisOrder['Order Price']*100))
        }
    }
    uniqueOrders.sort((a,b)=>{
        if(a.priceParsed < b.priceParsed){
            return 1
        }
        else if(a.priceParsed > b.priceParsed){
            return -1
        }
        else{
            return 0
        }
    })
    const collection = uniqueOrders.map(x=>{
        return {
            'restaurant': restaurants.filter(y=>y['Restaurant ID'] ==  x['Restaurant ID'])[0]['Restaurant Name'],
            'date': x['dateSimple'],
            'price': x['Order Price']
        }
    })
    console.log()
    return collection
}

function compute_totalSpent(orders){
    let uniqueOrders = [];
    let orderIDs = [];
    for (let i = 0; i < orders.length; i++) {
        if(!orderIDs.includes(orders[i]['Order ID'])){
            let thisOrder = orders[i];
            orderIDs.push(thisOrder['Order ID'])
            thisOrder.dateSimple = thisOrder['Order Time'].split(' ')[0]
            uniqueOrders.unshift(thisOrder);
            thisOrder.priceParsed = Math.round(parseFloat(thisOrder['Order Price']*100))
        }
    }

    let total = 0;
    for (let i = 0; i < uniqueOrders.length; i++) {
        total += uniqueOrders[i]['priceParsed']
    }

    return total/100
}

function compute_timesOrdered(orders){
    let uniqueOrders = [];
    let orderIDs = [];
    for (let i = 0; i < orders.length; i++) {
        if(!orderIDs.includes(orders[i]['Order ID'])){
            let thisOrder = orders[i];
            orderIDs.push(thisOrder['Order ID'])
            thisOrder.dateSimple = thisOrder['Order Time'].split(' ')[0]
            uniqueOrders.unshift(thisOrder);
            thisOrder.priceParsed = Math.round(parseFloat(thisOrder['Order Price']*100))
        }
    }

    return uniqueOrders.length
}
