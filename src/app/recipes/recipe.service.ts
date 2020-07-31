import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
        'Spaghetti and Meatball',
        'This is spaget',
        'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg',
        [
            new Ingredient('Ground Beef', 1),
            new Ingredient('Angel Hair Pasta', 1)
        ]),
    new Recipe(
        'Combo Pizza',
        'Fresh out the oven',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrCNPZowhDOdiJtoXdCoHOFVWKCn3yX9zQ_A&usqp=CAU',
        [
            new Ingredient('Dough', 3),
            new Ingredient('Mozzarella', 1)
        ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
