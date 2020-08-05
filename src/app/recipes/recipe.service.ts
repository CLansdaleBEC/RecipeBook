import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //       'Spaghetti and Meatball',
  //       'This is spaget',
  //       'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg',
  //       [
  //           new Ingredient('Ground Beef', 1),
  //           new Ingredient('Angel Hair Pasta', 1)
  //       ]),
  //   new Recipe(
  //       'Combo Pizza',
  //       'Fresh out the oven',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrCNPZowhDOdiJtoXdCoHOFVWKCn3yX9zQ_A&usqp=CAU',
  //       [
  //           new Ingredient('Dough', 3),
  //           new Ingredient('Mozzarella', 1)
  //       ])
  // ];

  private recipes: Recipe[] = [];

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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
