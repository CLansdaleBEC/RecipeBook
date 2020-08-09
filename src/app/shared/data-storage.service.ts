import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put("https://recipebook-a74a8.firebaseio.com/recipes.json", recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    // take operatore only takes one user and then unsubscribes
    // because we don't want an ongoing subscription

    // exhaustMap waits for first observable to complete, then gives us
    // the user and then relaces it with the inner observable
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          "https://recipebook-a74a8.firebaseio.com/recipes.json",
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
