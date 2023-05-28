// the navlist js script
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');

};

// to let the screen scroll smoothly
const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});


sr.reveal('.hero-text', { delay: 200, origin: 'bottom' });
sr.reveal('.hero-img', { delay: 450, origin: 'bottom' });
sr.reveal('.about-text', { delay: 200, origin: 'bottom' });
sr.reveal('.about-img', { delay: 450, origin: 'bottom' });
sr.reveal('.resource-text', { delay: 200, origin: 'bottom' });
sr.reveal('.resource-img', { delay: 450, origin: 'bottom' });
sr.reveal('.icons', { delay: 500, origin: 'bottom' });
sr.reveal('.scroll-down', { delay: 500, origin: 'right' });

const unpack = (data, key) => data.map(row => row[key])
// Get all elements with animation effects
var chartsElements = document.querySelectorAll('.charts-img, .charts-text');

// detect screen scroll event
window.addEventListener('scroll', function () {
    // iterate through each element
    chartsElements.forEach(function (element) {
        // Check if the element is in the visible area of the screen
        if (isElementInViewport(element)) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });
});

// Check if the element is in the visible area of the screen
function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

//create chart by using the plotly
//create first group bar chart (the Tuna quantity and commodity value)
Plotly.d3.csv("csv/Tuna_value.csv", Tuna_data => {


    //unpack the Tuna data for first chart
    const Tuna_x = unpack(Tuna_data, 'Year')
    const Tuna_y1 = unpack(Tuna_data, 'production')
    const Tuna_y2 = unpack(Tuna_data, 'Export_Value')

    var trace1 = {
        x: Tuna_x,
        y: Tuna_y1,
        marker: {
            color: '#ff6d01',
        },
        type: 'bar',
        name: 'Production_Value',
    }

    var trace2 = {
        x: Tuna_x,
        y: Tuna_y2,
        marker: {
            color: '#46bdc6',
        },
        type: 'bar',
        name: 'Export_Value',
    }

    const Tuna_chart_layout = {
        font: {
            size: 14,
            family: "Bold Serif",
        },
        showlegend: true,
        hovermode: 'closest',
        legend: {
            x: 0.1,
            y: -0.2,
            orientation: 'h',
        },
        barmode: 'group',
        width: 600,  // setting the chart width and height
        height: 420
    }

    function updateChartSize() {
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (screenWidth > 1500) {
            Tuna_chart_layout.width = 600;
            Tuna_chart_layout.height = 420;
        }

        if (screenWidth < 1500 && screenWidth > 990) {
            Tuna_chart_layout.width = 550;
            Tuna_chart_layout.height = 370;
        }
        if (screenWidth < 990) {
            Tuna_chart_layout.width = 360;
            Tuna_chart_layout.height = 320;
        }

        // Plotly the first chart
        Plotly.react('Tuna_data', data, Tuna_chart_layout);
    }

    // Initial call to set the chart size on page load
    updateChartSize();

    // Call the updateChartSize function whenever the window is resized
    window.addEventListener('resize', updateChartSize);

    var data = [trace1, trace2];
    Plotly.newPlot('Tuna_data', data, Tuna_chart_layout);
})
Plotly.d3.csv("csv/production.csv", Sec_chart => {

    /*---------------------create second chart the  single bar chart ------------------*/
    const Sec_x = unpack(Sec_chart, 'Year')
    const Sec_y = unpack(Sec_chart, 'Tuna Volume')



    const Sec_chart_data = [{
        x: Sec_x,
        y: Sec_y,
        mode: 'bar',
        marker: {
            color: '#45818e',
        },
        type: 'bar',

    }]


    const Sec_chart_layout = {
        xaxis: {
            title: 'Year',
            tickangle: 60, //rotate the x-axis of the third graph
        },
        yaxis: {
            title: 'Tuna Production',
            range: [0, 20000],
        },
        font: {
            size: 10,
            family: "Bold Serif"
        },
        // showlegend: true,
        hovermode: 'closest',
        // legend: {
        //     x: 0.1,
        //     y: -0.5,
        //     orientation: 'h',
        // },
        width: 600,  // setting the chart width
        height: 420   // setting the chart height
    }

    //Update the chart with the new layout
    function updateChartSize1() {
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (screenWidth > 1500) {
            Sec_chart_layout.width = 600;
            Sec_chart_layout.height = 420;
        }

        if (screenWidth < 1500 && screenWidth > 990) {
            Sec_chart_layout.width = 550;
            Sec_chart_layout.height = 370;
        }
        if (screenWidth < 990) {
            Sec_chart_layout.width = 360;
            Sec_chart_layout.height = 320;
        }

        Plotly.react('Sec_chart', Sec_chart_data, Sec_chart_layout);
    }

    // Initial call to set the chart size on page load
    updateChartSize1();

    // Call the updateChartSize1 function whenever the window is resized
    window.addEventListener('resize', updateChartSize1);
    //Call the updateChartSize1 function whenever the window is resized
    Plotly.newPlot('Sec_chart', Sec_chart_data, Sec_chart_layout);
})

/*---------------------create third plotly pie chart------------------*/
var data = [{
    type: "pie",
    values: [297.5, 832.9, 583.4, 294.8, 113.2, 177.7, 265.8],
    labels: ["Tuna", "Salmons", "Prawns", "Rock lobster", "Abalone", "Scallops", "Oysters"],
    textinfo: "label+percent",
    insidetextorientation: "radial"
}]

var layout = {
    legend: {
        x: 1.0,
        y: -0.2,
        orientation: 'h',
    },
    height: 420,
    width: 500,
}

function updateChartSize2() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth > 1500) {
        layout.width = 500;
        layout.height = 420;
    }

    if (screenWidth < 1500 && screenWidth > 990) {
        layout.width = 480;
        layout.height = 400;
    }
    if (screenWidth < 990 && screenWidth > 500) {
        layout.width = 360;
        layout.height = 320;
    }
    if (screenWidth < 500) {
        layout.width = 300;
        layout.height = 260;
    }



    // Update the chart with the new layout
    Plotly.react('Pie_chart', data, layout);
}

// Initial call to set the chart size on page load
updateChartSize2();

// Call the updateChartSize2 function whenever the window is resized
window.addEventListener('resize', updateChartSize2);
Plotly.newPlot('Pie_chart', data, layout,)

// })
