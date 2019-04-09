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
   .then(({name,category,instructions,ingredients,img,video}) =>  {

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
    .catch(console.error)
}


async function getData(api) {

  title.innerHTML = 'loading...';

  const response = await fetch(api);
  const json = await response.json();
  const data = json.meals[0];

  const video = data.strYoutube.replace("watch?v=", "embed/");

  const ingredients = [];
  const array = Object.values(data);

  // Store all the ingredients in the ingredients array
  for (let i = 9; i < 29; i++) {
      if (array[i] === "") { break; }
      ingredients.push(array[i])
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
  const input = document.getElementById('meal-search').value;
  setupUI(mealDB_search + input);
});
