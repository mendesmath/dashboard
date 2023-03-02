/*************************/
/* Configurações gerais */
/************************/
const font = new FontFace("Segoe UI", "url(../css/SEGOEUI.TTF)");

Chart.defaults.font.size = 10;
Chart.defaults.font.style = 'normal';
Chart.defaults.font.weight = 'bold';

const colorPalette = ['#485868', '#F3C766', '#F27360', '#9FC2BB', '#E8E8E8', '#485868', '#F3C766', '#F27360', '#9FC2BB', '#E8E8E8',
                      '#485868', '#F3C766', '#F27360', '#9FC2BB', '#E8E8E8', '#485868', '#F3C766', '#F27360', '#9FC2BB', '#E8E8E8'];
const colorVelocimento = ['#d51e22', '#eb601a', '#ebad15', '#b9cd15', '#6bb534'];
const pointStyles = ['rect','rectRot','circle','triangle','cross']
const borderRadiusTypes = ['bar'];
const ticksTypes = ['bar','line'];

/******************/
/* Funções gerais */
/******************/
function isNumber(str) 
{
  return !isNaN(parseFloat(str))
}

function removeAll()
{
  const principal = document.querySelector("#principal");
  const filhos = principal.children.length;

  for (let i = 0; i < filhos; i++)
  {
    const row = document.querySelector("#linha"+i);
    row.remove();
  }
}

function formatFloat(valor)
{
  if (!isNumber(valor))
    return valor;
  else
    return valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
}

/*********************************/
/* Carrega dados do arquivo JSON */
/*********************************/
async function fetchData(url) 
{
  //const url = 'https://mendesmath.github.io/dashboard/json/vendedor.json';
  //const url = '../json/vendedor.json';

  const response = await fetch(url);
  const datapoints = await response.json();

  return datapoints;
}

/*********************************************/
/* Criação da estrutura do HTML da dashboard */
/*********************************************/
async function criaDash(url) 
{
  removeAll();

  const jsonFile = fetchData(url);
  jsonFile.then(datapoints => 
    {
        for (let i = 0; i < datapoints.length; i++)
        {
            var row = 'linha' + i;
            novaLinha(row, datapoints[i].elements.length);   

            for (let x = 0; x < datapoints[i].elements.length; x++)
            {
                const elemento = datapoints[i].elements[x];

                if (elemento.type === 'table')
                {
                  const table = 'tabela' + x;
                  novaTabela(row, elemento);    
                  insereTabela(elemento);
                }
                else
                {
                  const card = 'grafico' + x;
                  novoCard(row, card, elemento.id);    
                  insereGrafico(elemento);
                }
            }
        }
    }
  );
}

/****************************************/
/* Insere nova linha no grid principal  */
/****************************************/
function novaLinha(id, elementsCount)
{
    var classRow;
    
    if (elementsCount == 1) 
      classRow = 'row-col-1'
    else if (elementsCount == 2) 
      classRow = 'row-col-2'
    else
      classRow = 'row-col-4'

    const newRow = document.createElement("div");  
    newRow.classList.add(classRow);   
    newRow.id = id;
    
    const containerPrincipal = document.getElementById("principal");  
    containerPrincipal.appendChild(newRow);
}

/******************************************************/
/* Insere novo card onde serão printados os gráficos  */
/******************************************************/
function novoCard(rowId, cardId, canvasId)
{
    const newCanvas = document.createElement("canvas");
    newCanvas.id = canvasId;
    newCanvas.height = 240;  

    const newCard = document.createElement("div");
    newCard.classList.add('card');
    newCard.id = cardId;
    newCard.appendChild(newCanvas);

    const row = document.getElementById(rowId);
    row.appendChild(newCard);
}

/**************************************************/
/* Insere nova estrutura para criação de tabelas  */
/**************************************************/
function novaTabela(rowId, elemento)
{
  const caption = document.createElement("caption");
  const texto = document.createTextNode(elemento.title);
  caption.appendChild(texto);

  const thead = document.createElement("thead");
  thead.id = 'thead_' + elemento.id;
  
  const tbody = document.createElement("tbody");
  tbody.id = 'tbody_' + elemento.id;

  const table = document.createElement("table");
  table.classList.add('table-borderless');
  table.classList.add('caption-top');
  table.appendChild(caption);
  table.appendChild(thead);
  table.appendChild(tbody);

  if (elemento.hasOwnProperty("totalize"))
  {
    const tfoot = document.createElement("tfoot");
    tfoot.id = 'tfoot_' + elemento.id;    
    table.appendChild(tfoot);    
  }  

  const div = document.createElement("div");
  div.classList.add('table-responsive');
  div.appendChild(table);

  const row = document.getElementById(rowId);
  row.appendChild(div);  
}

/**********************/
/* Criação da tabela  */
/**********************/
function insereTabela(elemento)
{
  // Insere cabeçalho das colunas
  const thead = document.getElementById('thead_' + elemento.id);
  const tr = document.createElement('tr');
  thead.appendChild(tr);

  for (let i = 0; i < elemento.labels.length; i++)
  {
    var th = document.createElement('th');
    var texto = document.createTextNode(elemento.labels[i]);

    if (i == 0) 
      th.classList.add('text-start');

    th.appendChild(texto);
    tr.appendChild(th);
  }

  // Insere valores
  const tbody = document.getElementById('tbody_' + elemento.id);

  for (let i = 0; i < elemento.datasets.data.length; i++)
  {
    const trb = document.createElement('tr');
    tbody.appendChild(trb);

    for (let valor of elemento.datasets.data[i])
    {
      var td = document.createElement('td');
      var div = document.createElement('div');

      if (!isNumber(valor))
      {
        var texto = document.createTextNode(valor);
        div.classList.add('text-start');
      }
      else
        var texto = document.createTextNode(valor.toLocaleString('pt-br', {minimumFractionDigits: 2}));

      div.classList.add('container-table-value');
      div.appendChild(texto);
      td.appendChild(div);
      trb.appendChild(td);
    } 
  } 

  // Insere totalização, caso exista
  if (elemento.hasOwnProperty("totalize"))
  {
    const tfoot = document.getElementById('tfoot_' + elemento.id);
    const trf = document.createElement('tr');
    tfoot.appendChild(trf);
  
    for (let i = 0; i < elemento.totalize.length; i++)
    {
      var thf = document.createElement('th');
      var textof = document.createTextNode(formatFloat(elemento.totalize[i]));
  
      thf.appendChild(textof);
      trf.appendChild(thf);
    }    
  }
}

/************************/
/* Criação dos Gráficos */
/************************/
function insereGrafico(elemento)
{
  if (elemento.type == 'velocimetro')
    insereVelocimetro(elemento)
  else
    insereGraficoDefault(elemento);
}

function insereGraficoDefault(elemento)
{
  const card = document.getElementById(elemento.id);
  const data = getData(elemento);
  const options = getOptions(elemento);
      
  new Chart(card, 
  {
    type: elemento.type,
    data: data,
    options: options,
  });
}

function insereVelocimetro(elemento)
{
  const card = document.getElementById(elemento.id);
  const ponteiro = getNeedle();
  const options = getOptions(elemento.title);
        
  new Chart(card, 
  {
    type: 'doughnut',
    data: 
    {
        labels: elemento.labels,
        datasets: 
        [{
            data: [20,20,20,20,20],
            backgroundColor: colorVelocimento,
            borderColor: colorVelocimento,     
            needleValue: elemento.datasets[0].data[1],
            borderRadius: 0,
            borderWidth: 1,
            circumference: 180, 
            rotation: 270,
            cutout:'50%'
        }]
    },    
    options: 
    {
        maintainAspectRatio: false,
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
          },
          tooltip:{
            enabled: false,
          }
        },
        layout: {
          padding: {bottom: 15}
        },
        scales : {
          x: 
          {
            grid:{color: 'rgba(0, 0, 0, 0.1)', drawTicks: false},
            border: {color: 'rgba(0, 0, 0, 0.3)'},
            ticks:{display:false},
          },
          y: 
          {
            grid:{color: 'rgba(0, 0, 0, 0.1)', drawTicks: false},
            border: {color: 'rgba(0, 0, 0, 0.3)'},
            ticks:{display:false},
          }
        }
    },  
    plugins: [ponteiro]
  });
}

/***************************************************************/
/* Funções de configuração da aparência e dos dados do gráfico */
/***************************************************************/
function getColors(qtdeCores) 
{
  const cores = [];

  for (let i = 0; i < qtdeCores; i++)
    cores.push(colorPalette[i]);

  return cores;
}

function getData(elemento)
{
  const colors = getColors(elemento.datasets[0].data.length);
  const labels = elemento.labels;  
  
  const datasets = [];
  for (let i = 0; i < elemento.datasets.length; i++)
  {
    var cores = [];
    if ((elemento.type === "line") || ((elemento.type === "bar") && (elemento.datasets.length > 1)))
      cores = colors[i];
    else 
      cores = colors;

    datasets.push
    ({
      label: elemento.datasets[i].label,
      data: elemento.datasets[i].data,
      barPercentage: 0.8,
      borderRadius: getBorderRadius(elemento),
      borderWidth: 2,
      backgroundColor: cores,
      borderColor: cores,    
      
      pointBackgroundColor: '#ffffff',
      pointHoverBackgroundColor: '#ffffff',
      pointBorderWidth: 3,
      pointStyle: pointStyles[i],
      pointRadius: 5,
      pointHoverRadius:8,
      pointHoverBorderWidth: 3,           
    });
  }

  const data = 
  {
    labels: labels,
    datasets: datasets
  };  

  return data;
}

function getBorderRadius(elemento)
{
  if (borderRadiusTypes.indexOf(elemento.type) > -1) 
    return 6;
  else 
    return 0;
}

function getOptionPlugins(elemento)
{
  var displayLegend = true;
  if ((elemento.type === 'bar') && (elemento.datasets.length < 2))
    displayLegend = false;
  
  const objTitle = 
  {
    align: 'center',
    padding: 15,
    display: true,
    text: elemento.title,
    font: {size: 14}
  };   

  const plugins = 
  {
    title: objTitle,  
    legend: {
      display: displayLegend,
      position: 'right', 
      align: 'center',
      labels: {
        usePointStyle: usePointStyle(elemento),
        padding: 12,
        boxWidth: 10,
      }   
    }
  }    

  return plugins;
}

function getScales(elemento)
{
  const scales =
  {
    x: 
    {
      grid: {color: 'rgba(0, 0, 0, 0.1)', drawTicks: false},
      border: {color: 'rgba(0, 0, 0, 0.3)'},
      ticks: {display: showTicks(elemento)},
    },
    y: 
    {
      grid: {color: 'rgba(0, 0, 0, 0.1)', drawTicks: false},
      border: {color: 'rgba(0, 0, 0, 0.3)'},
      ticks: {display: showTicks(elemento)},
    }
  }
  
  return scales;  
}

function showTicks(elemento)
{
  return  ticksTypes.indexOf(elemento.type) > -1;
}

function getOptions(elemento)
{
  const options = 
  {
    maintainAspectRatio: false,
    responsive: true,
    plugins: getOptionPlugins(elemento),
    scales: getScales(elemento)
  }  

  return options;
}

function usePointStyle(elemento)
{
  return elemento.type === 'line';
}

function getNeedle()
{
  const gaugeNeedle = 
  {
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
  return gaugeNeedle
}
