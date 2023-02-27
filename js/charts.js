Chart.defaults.font.family = 'Helvetica Neue';
Chart.defaults.font.size = 10;
Chart.defaults.font.style = 'normal';
Chart.defaults.font.weight = 'bold';

/*******************************/
/* GRÁFICO: PROJEÇÃO DE VENDAS */
/*******************************/
const ctx = document.getElementById('projecaoVendas');
      
new Chart(ctx, 
    {
        type: 'bar',
        data: 
        {
            labels: ['Vendas', 'Meta', 'Projecao'],
            datasets: [{
                label: 'Projecao de Vendas',
                data: [350000, 800000, 1000000],
                barPercentage: 0.6,
                backgroundColor: [
                    'rgba(72, 88, 104, 1)', 
                    'rgba(243, 199, 102, 1)',
                    'rgba(242, 115, 96, 1)',],
                borderColor: [
                    'rgba(72, 88, 104, 1)', 
                    'rgba(243, 199, 102, 1)',
                    'rgba(242, 115, 96, 1)',],                    
                borderRadius: 6,
                borderWidth: 1}]
        },
        options: 
        {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    align: 'center',
                    padding: 15,
                    display: true,
                    text: 'Projeção de Vendas',
                    font: {
                        size: 14,
                    }
                },                
                legend: {
                    display: false,    
                    }
                },


            scales: {                
                x: {
                    grid: {
                        display: false,},
                    border:{
                        color: 'rgba(0, 0, 0, 0.3)',}},
                y: {
                    grid:{
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawTicks: false,},
                    border: {
                        color: 'rgba(0, 0, 0, 0.3)',}}
                }
        }
    }
);

/*******************************/
/* GRÁFICO: PROJEÇÃO DE MARGEM */
/*******************************/
const ctx4 = document.getElementById('projecaoMargem');
const gaugeNeedle = {
    id: 'gaugeNeedle', 
    afterDatasetDraw(chart, args, options) 
    {
        const {ctx, config, data, chartArea: {top, bottom, left, right, width, heigth}} = chart;
        
        ctx.save();
        const needleValue = data.datasets[0].needleValue;
        const dataTotal = data.datasets[0].data.reduce((a,b) => a+b, 0);
        const angle = Math.PI + (1 / dataTotal * needleValue * Math.PI);

        const cx = width / 2;
        const cy = chart._metasets[0].data[0].y;

        // nedlee line
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -11);
        ctx.lineTo(chart._metasets[0].data[0].outerRadius -30, 0);
        ctx.lineTo(0, 11);
        ctx.fillStyle = '#4A4D4A';
        ctx.fill();
        ctx.restore();

        // nedlee dot
        ctx.beginPath();
        ctx.arc(cx, cy, 15, 0, 10);
        ctx.fillStyle = '#4A4D4A';
        ctx.fill();
        ctx.restore();
 
        // nedlee dot
        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, 10);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.restore();
    } 
}
      
new Chart(ctx4, 
    {
        type: 'doughnut',
        data: 
        {
            labels: ['Vendas', 'Meta', 'Projecao'],
            datasets: [{
                label: 'Projecao de Vendas',
                data: [20, 20, 20, 20, 20],
                backgroundColor: [
                    'rgba(213, 30, 34, 1)', 
                    'rgba(235, 96, 26, 1)',
                    'rgba(235, 173, 21, 1)',
                    'rgba(185, 205, 21, 1)',                                        
                    'rgba(107, 181, 52, 1)'],
                borderColor: [
                    'rgba(213, 30, 34, 1)', 
                    'rgba(235, 96, 26, 1)',
                    'rgba(235, 173, 21, 1)',
                    'rgba(185, 205, 21, 1)',                                        
                    'rgba(107, 181, 52, 1)'],     
                needleValue: 50,
                borderRadius: 0,
                borderWidth: 1,
                circumference: 180, 
                rotation: 270,
                cutout:'50%'}]
        },
        options: 
        {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            responsive: true,
            plugins: 
            {
                title: {
                    align: 'center',
                    padding: 15,
                    display: true,
                    text: 'Projeção de Margem',
                    font: {
                        size: 14,
                    }
                },                       
                legend: {
                    display: false,    
                    }
            },
        },  
        plugins:[gaugeNeedle],      
    }
);

/*******************************/
/* GRÁFICO: TOTAL DE VENDAS */
/*******************************/
const ctx2 = document.getElementById('totalVendas');

new Chart(ctx2, 
    {
        type: 'bar',
        data: 
        {
            labels: ['Nov/22', 'Dez/22', 'Jan/23', 'Fev/23'],
            datasets: [{
                label: 'Projecao de Vendas',
                data: [257400, 303000, 419000, 85000],
                barPercentage: 0.6,
                backgroundColor: [
                    'rgba(72, 88, 104, 1)', 
                    'rgba(243, 199, 102, 1)',
                    'rgba(242, 115, 96, 1)',
                    'rgba(159, 194, 187, 1)',],
                borderColor: [
                    'rgba(72, 88, 104, 1)', 
                    'rgba(243, 199, 102, 1)',
                    'rgba(242, 115, 96, 1)',
                    'rgba(159, 194, 187, 1)',],                    
                borderRadius: 6,
                borderWidth: 1}]
        },
        options: 
        {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    align: 'center',
                    padding: 15,
                    display: true,
                    text: 'Total de Vendas',
                    font: {
                        size: 14,
                    }
                },                       
                legend: {
                    display: false,    
                    }
                },


            scales: {                
                x: {
                    grid: {
                        display: false,},
                    border:{
                        color: 'rgba(0, 0, 0, 0.3)',}},
                y: {
                    grid:{
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawTicks: false,},
                    border: {
                        color: 'rgba(0, 0, 0, 0.3)',}}
                }
        }
    }
);

/*******************************************/
/* GRÁFICO: PEDIDOS DE VENDA NÃO FATURADOS */
/*******************************************/
const ctx3 = document.getElementById('pedidosNaoFaturados');
      
new Chart(ctx3, 
    {
        type: 'bar',
        data: 
        {
            labels: ['Mês Ant.', 'Dez/22', 'Jan/23', 'Fev/23'],
            datasets: [{
                label: 'Projecao de Vendas',
                data: [16000, 10000, 12500, 8500],
                barPercentage: 0.6,
                backgroundColor: [
                    'rgba(72, 88, 104, 1)', 
                    'rgba(243, 199, 102, 1)',
                    'rgba(242, 115, 96, 1)',
                    'rgba(159, 194, 187, 1)',],
                borderColor: [
                    'rgba(72, 88, 104, 1)', 
                    'rgba(243, 199, 102, 1)',
                    'rgba(242, 115, 96, 1)',
                    'rgba(159, 194, 187, 1)',],                    
                borderRadius: 6,
                borderWidth: 1}]
        },
        options: 
        {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    align: 'center',
                    padding: 15,
                    display: true,
                    text: 'Pedidos de Venda Não Faturados',
                    font: {
                        size: 14,
                    }
                },                       
                legend: {
                    display: false,    
                    }
                },
        
                scales: {                
                    x: {
                        grid: {
                            display: false,},
                        border:{
                            color: 'rgba(0, 0, 0, 0.3)',}},
                    y: {
                        grid:{
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawTicks: false,},
                        border: {
                            color: 'rgba(0, 0, 0, 0.3)',}}
                    }
        }
    }
);

/*************************************/
/* GRÁFICO: VENDAS X METAS (DIÁRIAS) */
/*************************************/
const ctx5 = document.getElementById('vendasXMetas');

const data = {
    labels: ['01/02','02/02','03/02','04/02','05/02','06/02','07/02','08/02','09/02','10/02','11/02','12/02','13/02','14/02','15/02','16/02','17/02','18/02','19/02','20/02','21/02','22/02','23/02','24/02','25/02','26/02','27/02','28/02'],
    datasets: [
      {
        label: 'Vendas',
        data: [10000,45000,60000,29000,10000,23000,10000,34000,56000,22000,55000,10000,45000,60000,29000,10000,23000,10000,34000,56000,22000,55000,1000,8000,4000,10000,29000,99000],
        borderWidth: 2,
        borderColor: 'rgba(72, 88, 104, 1)',
        pointBackgroundColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointBorderWidth: 3,
        pointStyle: 'rect',
        pointRadius: 5,
        pointHoverRadius:8,
        pointHoverBorderWidth: 3,
      },
      {
        label: 'Metas',
        data: [25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000],
        borderWidth: 2,
        borderColor: 'rgba(243, 199, 102, 1)',
        pointBackgroundColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointBorderWidth: 3,
        pointStyle: 'rectRot',
        pointRadius: 5,   
        pointHoverRadius:8,  
        pointHoverBorderWidth: 3,   
      }
    ]
  };
      
new Chart(ctx5, 
    {
        type: 'line',
        data: data,
        options: 
        {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    align: 'center',
                    padding: 15,
                    display: true,
                    text: 'Vendas x Metas (Diárias)',
                    font: {
                        size: 14,
                    }
                },                 
                legend: {
                    display: true,
                    position: 'right', 
                    align: 'center',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        }   
                    }
                },


            scales: {                
                x: {
                    grid:{
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawTicks: false,},
                    border:{
                        color: 'rgba(0, 0, 0, 0.3)',}},
                y: {
                    grid:{
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawTicks: false,},
                    border: {
                        color: 'rgba(0, 0, 0, 0.3)',}}
                }
        }
    }
)

/********************************/
/* GRÁFICO: FORMAS DE PAGAMENTO */
/********************************/
const ctx6 = document.getElementById('formasPagamento');
      
new Chart(ctx6, 
    {
        type: 'pie',
        data: 
        {
            labels: ['Dinheiro (Pix, cash, moedas, notas)', 'Cartão de Crédito', 'Cheque', 'Vale', 'Faturado'],
            datasets: [{
                label: 'Formas de Pagamento',
                data: [25000, 25000, 25000, 25000, 25000],
                backgroundColor: [ 
                    'rgba(243, 199, 102, 1)',
                    'rgba(159, 194, 187, 1)',
                    'rgba(232, 232, 232, 1)',
                    'rgba(242, 115, 96, 1)',
                    'rgba(72, 88, 104, 1)',],
                borderColor: [
                    'rgba(243, 199, 102, 1)',
                    'rgba(159, 194, 187, 1)',
                    'rgba(232, 232, 232, 1)',
                    'rgba(242, 115, 96, 1)',
                    'rgba(72, 88, 104, 1)',],           
                borderRadius: 0,
                borderWidth: 1}]
        },
        options: 
        {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    align: 'center',
                    padding: 15,
                    display: true,
                    text: 'Vendas x Metas (Diárias)',
                    font: {
                        size: 14,
                    }
                },  
                legend: {
                    display: true,
                    position: 'bottom', 
                    align: 'center',
                    labels: {
                        boxWidth: 30,
                        padding: 15,
                        font: {
                            size: 11
                        }
                        }   
                    }
                }
        }
    }
);
