$(document).ready(function() {
    const categoriesUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('c');
    const mealId = urlParams.get('id');

    // Function to fetch categories and display them
    function fetchCategories() {
        axios.get(categoriesUrl)
            .then(response => {
                const categories = response.data.categories;
                categories.forEach(category => {
                    $('#category-list').append(`
                        <div class="col-md-4">
                            <div class="card">
                                <img src="${category.strCategoryThumb}" class="card-img-top" alt="${category.strCategory}">
                                <div class="card-body">
                                    <h5 class="card-title">${category.strCategory}</h5>
                                    <a href="category.html?c=${category.strCategory}" class="btn btn-primary">View Meals</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            })
            .catch(error => console.error('Error fetching categories:', error));
    }

    // Function to fetch meals based on category and display them
    function fetchMealsByCategory() {
        const mealsUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
        $('#category-title').text(categoryName);

        axios.get(mealsUrl)
            .then(response => {
                const meals = response.data.meals;
                meals.forEach(meal => {
                    $('#meal-list').append(`
                        <div class="col-md-4">
                            <div class="card">
                                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                    <a href="meal.html?id=${meal.idMeal}" class="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            })
            .catch(error => console.error('Error fetching meals:', error));
    }

    // Function to fetch meal details (optional)
    function fetchMealDetails() {
        const mealDetailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

        axios.get(mealDetailsUrl)
            .then(response => {
                const meal = response.data.meals[0];
                $('#meal-image').attr('src', meal.strMealThumb);
                $('#meal-title').text(meal.strMeal);
                $('#meal-description').text(meal.strInstructions);
                $('#meal-recipe').html(meal.strInstructions); // Assuming you want to display the recipe
                $('#meal-video').attr('src', meal.strYoutube.replace("watch?v=", "embed/")); // Embed YouTube video
            })
            .catch(error => console.error('Error fetching meal details:', error));
    }

    // Determine which function to call based on the URL
    if (window.location.pathname.endsWith('index.html')) {
        fetchCategories();
    } else if (window.location.pathname.endsWith('category.html') && categoryName) {
        fetchMealsByCategory();
    } else if (window.location.pathname.endsWith('meal.html') && mealId) {
        fetchMealDetails();
    }
});