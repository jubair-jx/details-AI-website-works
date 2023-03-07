//get all data from API link using fetch

const getAllData = (limit) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())

    .then((data) => {
      showAllData(data.data.tools, limit);
    });
};

//show all data with card
const showAllData = (data, limit) => {
  //get id from HTML
  let mainContainer = document.getElementById("mainContainer");
  //main container card refresh
  mainContainer.innerHTML = "";

  if (limit) {
    data = data.slice(0, 6);
  } else {
    data = data;
  }
  //load Spinners
  toggleSpinner(false);

  //data loop
  data.forEach((element) => {
    //using object destrucring
    const { image, features, name, published_in, id } = element;

    //create a new tag
    let newTag = document.createElement("div");
    newTag.classList.add("col");
    newTag.innerHTML = `
        <div class="card">
        <div class ="px-2 py-2"><img src="${image}" class="card-img-top rounded-3" height ="200" width = "50"></div>
        <div class="card-body">
          <h4 class="card-title fw-bold">Features</h4>
        <ol>
              <li>${features[0]}</li>
              <li>${features[1]}</li>
              <li>${features[2]}</li>
        </ol>
        <hr>
      <div class= "d-flex justify-content-between">
             <div><h5 class ="fw-bold">${name}</h5>

             <div class = "d-flex gap-2 mt-2">
             <div><img src="img/Frame.png" alt=""></div>
             <div class = "">${published_in}</div>
             </div>
             </div>

            <div class = "mt-3">
            <img onclick = "fetchDetailsData('${id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"  style="background-color: #FEF7F7;" class = "px-2 rounded-circle py-2"  src="img/far'.png" alt="">
            </div>

        </div>

        `;
    mainContainer.appendChild(newTag);
  });
};

//spinners functions here
const toggleSpinner = (isLoading) => {
  let loadSpinners = document.getElementById("spinners");
  if (isLoading) {
    loadSpinners.classList.remove("d-none");
  } else {
    loadSpinners.classList.add("d-none");
  }
};

//Fetch Show Modal Details
const fetchDetailsData = (idData) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${idData}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showTheDataModal(data.data));
};

const showTheDataModal = (detail) => {
  //Show Details Object Destrucring
  const {
    description,
    input_output_examples,
    image_link,
    pricing,
    features,
    integrations,
    accuracy,
  } = detail;

  //declare new variable
  let integrationsListItems = "";
  integrations?.forEach((data) => {
    integrationsListItems += `<li>${data}</li>`;
  }),
    //select modal body
    (document.getElementById("modal-details").innerHTML = `
  <div class="row row-cols-1 row-cols-md-2 g-5 px-4 py-4">
  <div class="col">
  <div class="card" style="background-color: #EB57570D; border: 1px solid #EB5757; width: 370px;">
    <div class="card-body">
      <h5 class="card-title fw-bold">${description}</h5>
      <div class="d-flex container justify-content-center align-items-center mt-4 gap-2">

        <div><p class="text-success fw-bold bg-white px-2 py-2 text-center rounded-2" ">${
          pricing ? pricing[0].plan : "Free of Cost/"
        },<br> ${pricing ? pricing[0].price : "Basic"}</p></div>
     
        <div><p class="text-warning fw-bold bg-white px-2 py-2 text-center rounded-2" ">${
          pricing ? pricing[1].plan : "Free of Cost/"
        },<br> ${pricing ? pricing[1].price : "Pro"}</p></div>
        
        <div><p class="text-danger fw-bold bg-white px-2 py-2 text-center rounded-2" ">${
          pricing ? pricing[2].plan : "Free of Cost/"
        },<br> ${pricing ? pricing[2].price : "Enterprise"}</p></div>

      </div>
      <div class="d-flex justify-content-center align-items-center gap-2 mt-3">
        <div><h4 class="fw-bold">Features</h4>
            <ul style="font-size: 15px;">
            <li>${
              features ? features["1"].feature_name : "No Features Name"
            }</li>
            <li>${
              features ? features["2"].feature_name : "No Features Name"
            }</li>
            <li>${
              features ? features["3"].feature_name : "No Features Name"
            }</li>
            </ul>
        </div>
        <div><h4 class="fw-bold">Integrations</h4>
        
          <ul style="font-size: 15px;">
           ${
             integrations === null || integrations === undefined
               ? "Not Data Found"
               : integrationsListItems
           }
                        
          </ul>

        </div>



      </div>
      
    </div>
  </div>
</div>

<div class="col ">
<div class="card px-3 py-3">
<div class="positive-relative">
  <div>
    <img src="${image_link[0]}" class="card-img-top" alt="...">
   </div>

   <i style="display: ${accuracy.score === null ? "none" : "inline-block"} ">
   <span id="accuracy-btn" class="btn btn-danger rounded-2 px-2 py-1" style="position: absolute; right: 35px; top:30px;">
           ${accuracy.score === null ? "" : accuracy.score * 100 + "% accuracy"}

   </span>

</i>
   <!--  <div class="" style="position: absolute; top: 25px; left: 180px;">
    <button id="btn" class="btn btn-danger rounded-2  px-2 py-1"> ${
      accuracy.score === null ? "No" : accuracy.score * 100
    } % accuracy</button>
   </div> -->
</div>
  <div class="card-body mt-3 ">
    <h5 class="card-title text-center">${
      input_output_examples === null
        ? "Can you give any example?"
        : input_output_examples[0].input
    }</h5>
    <p class="card-text text-center">${
      input_output_examples === null
        ? "No! Not Yet! Take a break!!!"
        : input_output_examples[0].output
    }</p>
  </div>
</div>
</div>
    </div>

  
  `);
};

getAllData(6);

//show all card function when click see more button
let showAll = document.getElementById("show-all");
const showAllcard = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())

    .then((data) => {
      if (data.length > 6) {
        showAllData(data.data.tools.slice(0, 6));
        showAll.classList.remove("d-none");
      } else {
        showAllData(
          data.data.tools.sort(
            (a, b) => new Date(a.published_in) - new Date(b.published_in)
          )
        );
        showAll.classList.add("d-none");
      }
    });
};

//select sort button
document
  .getElementById("sort-date")
  .addEventListener("click", async function () {
    let mainContainer = document.getElementById("mainContainer");

    mainContainer.innerHTML = "";

    //load Spinners
    toggleSpinner(false);

    const res = await fetch(
      "https://openapi.programming-hero.com/api/ai/tools"
    );
    const data = await res.json();

    data.data.tools
      .slice(0, 6)
      .sort((a, b) => new Date(a.published_in) - new Date(b.published_in))
      .forEach((element) => {
        //using object destrucring
        const { image, features, name, published_in, id } = element;

        //create a new tag
        let newTag = document.createElement("div");
        newTag.classList.add("col");
        newTag.innerHTML = `
        <div class="card">
        <div class ="px-2 py-2"><img src="${image}" class="card-img-top rounded-3" height ="200" width = "50"></div>
        <div class="card-body">
          <h4 class="card-title fw-bold">Features</h4>
        <ol>
              <li>${features[0]}</li>
              <li>${features[1]}</li>
              <li>${features[2]}</li>
        </ol>
        <hr>
      <div class= "d-flex justify-content-between">
             <div><h5 class ="fw-bold">${name}</h5>

             <div class = "d-flex gap-2 mt-2">
             <div><img src="img/Frame.png" alt=""></div>
             <div class = "">${published_in}</div>
             </div>
             </div>

            <div class = "mt-3">
            <img onclick = "fetchDetailsData('${id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"  style="background-color: #FEF7F7;" class = "px-2 rounded-circle py-2"  src="img/far'.png" alt="">
            </div>

        </div>

        `;
        mainContainer.appendChild(newTag);
      });
  });
