"use strict";

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector(".js-new-form");
const listElement = document.querySelector(".js-list");
const searchButton = document.querySelector(".js-button-search");
const buttonAdd = document.querySelector(".js-btn-add");
const buttonCancelForm = document.querySelector(".js-btn-cancel");
const inputDesc = document.querySelector(".js-input-desc");
const inputPhoto = document.querySelector(".js-input-photo");
const inputName = document.querySelector(".js-input-name");
const inputRace = document.querySelector(".js-input-race");
const linkNewFormElememt = document.querySelector(".js-button-new-form");
const labelMesageError = document.querySelector(".js-label-error");
const input_search_desc = document.querySelector(".js_in_search_desc");
const GITHUB_USER = "gemamesasv";
const SERVER_URL = `https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`;

//Objetos con cada gatito
const kittenData_1 = {
  image: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
  name: "Anastacio",
  desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
  race: "British Shorthair",
};
const kittenData_2 = {
  image:
    "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
  name: "Fiona",
  desc: "Juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
  race: "British Shorthair",
};
const kittenData_3 = {
  image:
    "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
  name: "Cielo",
  desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
  race: "British Shorthair",
};



let kittenDataList = [];
// const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];

localStorage.setItem('kittenList',JSON.stringify(kittenDataList));
// EJERCICIO 1 LECCION 2.12
const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));
if (kittenListStored !==null){
  kittenDataList = kittenListStored
  
} 
//renderKittenList(kittenDataList)
else{// Ejercicio 1 lección 2.11


  fetch(SERVER_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", },
  }).then((response) => response.json())
  .then((kittenInfo)=> {console.log(kittenInfo);
    kittenDataList = kittenInfo.results.map ((list)=>{
      const newKittenDataList = {
        name:list.name,
        desc: list.desc,
        race:list.race,
        image:list.url,
      };
      return newKittenDataList;
    });
    console.log(kittenDataList);
    renderKittenList(kittenDataList);
  });
  

}




//Funciones
function renderKitten(kittenData) {
  const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
  return kitten;
}

function renderKittenList(kittenDataList) {
  listElement.innerHTML = "";
  for (const kittenItem of kittenDataList) {
    listElement.innerHTML += renderKitten(kittenItem);
  }
}







//Mostrar/ocultar el formulario
function showNewCatForm() {
  newFormElement.classList.remove("collapsed");
}
function hideNewCatForm() {
  newFormElement.classList.add("collapsed");
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  if (newFormElement.classList.contains("collapsed")) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}
//Adicionar nuevo gatito

// Ejercicio 1 lección 2.9

//Función para limpiar inputs
function cleanInputs() {
  inputDesc.value = "";
  inputPhoto.value = "";
  inputName.value = "";
  inputRace.value = "";
}

function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  const valueRace = inputRace.value;
  if (valueDesc === "" || valuePhoto === "" || valueName === "") {
    labelMesageError.innerHTML = "Debe rellenar todos los valores";
  } else {
    if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
      labelMesageError.innerHTML = "";

      //Ejercicio 1 lección 2.9
      const newKittenDataObject = {
        desc: valueDesc,
        image: valuePhoto,
        name: valueName,
        race: valueRace,
      };
      kittenDataList.push(newKittenDataObject);
      cleanInputs();
      labelMesageError.innerHTML = "Mola! Un nuevo gatito en Adalab!";
      renderKittenList(kittenDataList);
    }
  }
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
  event.preventDefault();
  newFormElement.classList.add("collapsed");
  cleanInputs();
}

//ejercicio 1 lección 2.10
//Filtrar por descripción

//function filterKitten(ev) {
//Modifica el código:
//Haz un filter sobre el listado de gatitos
//Vuelve a pintar el listado de gatitos filtrados en el HTML.
//}

function filterKitten(event) {
  event.preventDefault();
  const descFilter = kittenDataList.filter((description) =>
    description.desc
      .toLowerCase()
      .includes(input_search_desc.value.toLowerCase())
  );
  console.log(descFilter);
  //no sabemos por qué no se pinta en el html, con la forma antigua
  //  listElement.innerHTML = renderKitten(descFilter);
  renderKittenList(descFilter);

  //forma de antes

  // const descrSearchText = input_search_desc.value;
  // listElement.innerHTML = "";
  // for (const kittenItem of kittenDataList) {
  //   if (kittenItem.desc.includes(descrSearchText)) {
  //     listElement.innerHTML += renderKitten(kittenItem);
  //   }
  // }
}

//Mostrar el listado de gatitos en ell HTML
renderKittenList(kittenDataList);




//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);
