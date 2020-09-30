const url = "https://localhost:5001/api/beanvariety/";
const url2 = "https://localhost:5001/api/coffee/";

const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    // getAllBeanVarieties()
    //     .then(beanVarieties => {
    //         console.log(beanVarieties);
    //     })
    // getAllBeanVarieties()
    //     .then(beanVarieties => beanVarieties.forEach(bean =>
    //         beanConverter(bean)));
    showBeans();


    getAllCoffees()
        .then(coffees => {
            console.log(coffees);
        })
});

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

function getAllCoffees() {
    return fetch(url2).then(resp => resp.json());
}

function beanConverter(beanObj) {
    const beanHTML =
        `<section class="beans">
        <div>
             <h3>${beanObj.name}</h3>
             <p>Region: ${beanObj.region}</p>
             <p>Notes: ${beanObj.notes}</p>
             </div>
    </section>`
    return beanHTML
};

function showBeans() {
    getAllBeanVarieties()
        .then(beanVarieties => {
            for (let bean of beanVarieties) {
                let html = beanConverter(bean);
                document.querySelector(".beans").innerHTML += html;
            }
        })
}


