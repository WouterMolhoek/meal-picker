const mealDB = 'https://www.themealdb.com/api/json/v1/1/random.php';

const title = document.getElementById('meal-title');
const instr = document.getElementById('meal-instr');
const ingr = document.getElementById('meal-ingr');
const catagory = document.getElementById('meal-cat');
const imgEl = document.getElementById('meal-img');
const videoEl = document.getElementById('meal-video');


const setupUI = () => {

  getData()
   .then(({name,category,instructions,img,video}) =>  {
     title.innerHTML = name;
     document.title = 'Meal Picker : ' + name;
     instr.innerHTML = instructions;
     catagory.innerHTML = category;
     imgEl.src = img;
     videoEl.src = video;
   })
    .catch(console.error)
}


async function getData() {

  title.innerHTML = 'loading...';

  const response = await fetch(mealDB);
  const json = await response.json();
  const data = json.meals[0];


  return {
    name: data.strMeal,
    category: data.strCategory,
    instructions: data.strInstructions,
    ingredients: '',
    img: data.strMealThumb,
    video: data.strYoutube.replace("watch?v=", "embed/")
  }
}

setupUI();

// Buttons
const refreshBtn = document.getElementById('refresh-btn');
const searchBtn = document.getElementById('search-btn');

// Refresh the page
refreshBtn.addEventListener('click', setupUI);
