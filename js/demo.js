
if (!localStorage.getItem('recipes')) {
    localStorage.setItem('recipes', JSON.stringify([]));
}


function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe-card', 'col-md-4');
        recipeElement.innerHTML = `
            <h5>${recipe.title}</h5>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <p><strong>Tags:</strong> ${recipe.tags}</p>
            <button class="btn btn-warning" onclick="editRecipe(${index})">Edit</button>
            <button class="btn btn-danger delete" onclick="deleteRecipe(${index})">Delete</button>
            <button class="btn btn-info mt-2" onclick="viewRecipe(${index})">View</button>
        `;
        recipeList.appendChild(recipeElement);
    });
}


function searchRecipes() {
    const query = document.getElementById('search').value.toLowerCase();
    const recipes = JSON.parse(localStorage.getItem('recipes'));

    const filteredRecipes = recipes.filter(recipe => {
        return recipe.title.toLowerCase().includes(query) ||
            recipe.ingredients.toLowerCase().includes(query) ||
            recipe.instructions.toLowerCase().includes(query) ||
            recipe.tags.toLowerCase().includes(query);
    });

    console.clear();
    console.log('Search Results:', filteredRecipes);
    console.table(filteredRecipes); 
    displayRecipes(filteredRecipes);
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>No recipes found matching your search.</p>';
    } else {
        recipes.forEach((recipe, index) => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe-card', 'col-md-4');
            recipeElement.innerHTML = `
                <h5>${recipe.title}</h5>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                <p><strong>Tags:</strong> ${recipe.tags}</p>
                <button class="btn btn-warning" onclick="editRecipe(${index})">Edit</button>
                <button class="btn btn-danger delete" onclick="deleteRecipe(${index})">Delete</button>
                <button class="btn btn-info mt-2" onclick="viewRecipe(${index})">View</button>
            `;
            recipeList.appendChild(recipeElement);
        });
    }
}


function viewRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const recipe = recipes[index];


    document.getElementById('view-recipe-title').textContent = recipe.title;
    document.getElementById('view-recipe-ingredients').textContent = recipe.ingredients;
    document.getElementById('view-recipe-instructions').textContent = recipe.instructions;
    document.getElementById('view-recipe-tags').textContent = recipe.tags;


    const modal = new bootstrap.Modal(document.getElementById('viewRecipeModal'));
    modal.show();
}


function saveRecipe(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const tags = document.getElementById('tags').value;

    const recipe = {
        title,
        ingredients,
        instructions,
        tags
    };

    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const modalTitle = document.getElementById('recipeModalLabel').textContent;

    if (modalTitle === 'Add New Recipe') {
        recipes.push(recipe);
    } else {

        const index = document.getElementById('recipeModal').dataset.index;
        recipes[index] = recipe;
    }

    localStorage.setItem('recipes', JSON.stringify(recipes));
    loadRecipes();
    clearForm();
    closeModal();
}


function editRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const recipe = recipes[index];

    document.getElementById('title').value = recipe.title;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('instructions').value = recipe.instructions;
    document.getElementById('tags').value = recipe.tags;


    document.getElementById('recipeModalLabel').textContent = 'Edit Recipe';
    document.querySelector('.btn-primary').textContent = 'Update Recipe';


    document.getElementById('recipeModal').dataset.index = index;


    const modal = new bootstrap.Modal(document.getElementById('recipeModal'));
    modal.show();
}


function deleteRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    loadRecipes();
}


function showAddForm() {

    clearForm();
    document.getElementById('recipeModalLabel').textContent = 'Add New Recipe';
    document.querySelector('.btn-primary').textContent = 'Save Recipe';

    const modal = new bootstrap.Modal(document.getElementById('recipeModal'));
    modal.show();
}


function clearForm() {
    document.getElementById('recipe-form').reset();
}


function closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('recipeModal'));
    modal.hide();
}

window.onload = loadRecipes;

document.getElementById('search').addEventListener('input', searchRecipes);
