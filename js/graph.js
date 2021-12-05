function graphMonthlyCount(monthly){
    const labels = monthly.map(x=>{
        return `${x.year} - ${x.month}`
    })
        const data = {
        labels: labels,
        datasets: [{
            label: 'Monthly orders count',
            backgroundColor: 'rgb(255, 99, 132)',
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
            backgroundColor: 'rgb(255, 99, 132)',
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
