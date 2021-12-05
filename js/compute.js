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
