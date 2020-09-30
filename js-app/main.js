const url = "https://localhost:5001/api/beanvariety/";
const url2 = "https://localhost:5001/api/coffee/";

const showBeansButton = document.querySelector("#run-button");
showBeansButton.addEventListener("click", () => {
    showBeans();
});

const showBeanFormButton = document.querySelector("#add-button");
showBeanFormButton.addEventListener("click", () => {
    showBeanForm();
});


//////////  BEAN WORLD   ////////////////

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
};

function addNewBean(newBean) {
    return fetch(`${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBean)
    })
};

const createBean = (name, region, notes) => {
    const bean = {
        "name": name,
        "region": region,
        "notes": notes
    }
    return bean;
};

function beanConverter(beanObj) {

    if (beanObj.notes == null) {
        beanObj.notes = "No notes on record.";
    }
    const beanHTML =
        `<section class="beanVariety">
        <div>
             <h3>${beanObj.name}</h3>
             <p>Region: ${beanObj.region}</p>
             <p>Notes: ${beanObj.notes}</p>
             </div>
    </section>`
    return beanHTML;
};

function showBeans() {
    document.querySelector(".beans").innerHTML = "";
    document.querySelector(".beans").innerHTML += `<h1>Bean Varieties</h1>`;
    getAllBeanVarieties()
        .then(beanVarieties => {
            for (let bean of beanVarieties) {
                let html = beanConverter(bean);
                document.querySelector(".beans").innerHTML += html;
            }
        })
}

function showBeanForm() {
    document.querySelector(".beans").innerHTML = "";
    document.querySelector(".beans").innerHTML += `
        <h1>Add New Bean</h1>
        <div class="beanForm">
            <form action="">
            <fieldset>
                <label for="name">Name of Bean</label><br>
                <input id="name" type="input" name="name">
            </fieldset>
            <fieldset>
                <label for="region">Beangion</label><br>
                <input id="region" type="input" name="region">
            </fieldset>
            <fieldset>
                <label for="notes">Notes</label><br>
                <input id="notes" type="input" name="notes">
            </fieldset>
            </form>
            <input id="submit" type="submit" value="Add New Bean!">
        </div>
        `;

    document.querySelector("#submit").addEventListener("click", clickEvent => {
        const beanNameInput = document.querySelector("#name").value;
        const beanRegionInput = document.querySelector("#region").value;
        const beanNotesInput = document.querySelector("#notes").value;
        let newBean = createBean(beanNameInput, beanRegionInput, beanNotesInput)
        if (newBean.notes == "") {
            newBean.notes = null;
        }
        addNewBean(newBean)
            .then(() => {
                return showBeans();
            })
    })
};


//////////  COFFEE WORLD   ////////////////
function getAllCoffees() {
    return fetch(url2).then(resp => resp.json());
}
// getAllCoffees()
//     .then(coffees => {
//         console.log(coffees);
//     })