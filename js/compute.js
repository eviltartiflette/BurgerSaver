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
