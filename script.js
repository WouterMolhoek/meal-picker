const mealDB_random = 'https://www.themealdb.com/api/json/v1/1/random.php';
const mealDB_search = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const title = document.getElementById('meal-title');
const instr = document.getElementById('meal-instr');
const ingr = document.getElementById('meal-ingr');
const catagory = document.getElementById('meal-cat');
const imgEl = document.getElementById('meal-img');
const videoEl = document.getElementById('meal-video');


const setupUI = (api) => {

  getData(api)
   .then((result) =>  {
     const {name,category,instructions,ingredients,img,video} = result;

     title.innerHTML = name;

     // Set page title to the recipy name
     document.title = 'Meal Picker : ' + name;
     instr.innerHTML = instructions;
     catagory.innerHTML = category;
     imgEl.src = img;
     videoEl.src = video;

     // Remove the listed items
     ingr.innerHTML = '';

     // Append the new items onto the ul element
     for (let z in ingredients) {
       const li = document.createElement('li');
       li.innerHTML = ingredients[z];
       ingr.appendChild(li);
     }
   })
    .catch(() => {
      const errMsg = document.getElementById('error-msg');

      errMsg.style.opacity = '0';
      errMsg.style.display = 'block';

      setTimeout(() => {
        errMsg.style.opacity = '1';
      }, 300);

      document.onclick = (e) => {
        if(e.target.id !== 'error-msg'){
          errMsg.style.display = 'none';
        }
      };
    })
}


async function getData(api) {

  const response = await fetch(api);
  const json = await response.json();
  const data = json.meals[0];

  const video = data.strYoutube.replace("watch?v=", "embed/");

  const ingredients = [];
  const array = Object.values(data);

  // Store all the ingredients in the ingredients array
  for (let i = 9; i < 29; i++) {
      if (array[i] === "") { break; }

      // Make the first letter a capatalized one
      ingredients.push(array[i].charAt(0).toUpperCase() + array[i].slice(1))
  }

  return {
    name: data.strMeal,
    category: data.strCategory,
    instructions: data.strInstructions,
    ingredients: ingredients,
    img: data.strMealThumb,
    video: video
  }
}

setupUI(mealDB_random);

// Buttons
const refreshBtn = document.getElementById('refresh-btn');
const searchBtn = document.getElementById('search-btn');

// Refresh the page
refreshBtn.addEventListener('click', () => {
  setupUI(mealDB_random);
});

// Search for specefic meal
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();

  // Get the searchbar input value
  const input = document.getElementById('meal-search').value;

  // When the input is empty , still fetch a random meal
  if (input.length == 0) {
    return setupUI(mealDB_random);
  }
  setupUI(mealDB_search + input);
});
