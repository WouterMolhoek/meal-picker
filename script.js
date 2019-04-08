const mealDB = 'https://www.themealdb.com/api/json/v1/1/random.php';

const title = document.getElementById('meal-title');
const instr = document.getElementById('meal-instr');
const catagory = document.getElementById('meal-cat');
const img = document.getElementById('meal-img');
const video = document.getElementById('meal-video');

const setupUI = () => {

  getData()
   .then(results => {
     title.innerHTML = results.name;
     instr.innerHTML = results.instructions;
     catagory.innerHTML = results.category;
     img.src = results.img;
     video.src = results.video;
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
    img: data.strMealThumb,
    video:data.strYoutube.replace("watch?v=", "embed/")
  }
}

setupUI();
