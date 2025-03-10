import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipes-resolver.service';

const routes: Routes = [
    {
        path: "recipes",
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: "new", component: RecipeEditComponent },
          {
            path: ":id",
            component: RecipeDetailComponent,
            resolve: [RecipeResolverService],
          },
          {
            path: ":id/edit",
            component: RecipeEditComponent,
            resolve: [RecipeResolverService],
          },
        ],
      },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class RecipesRoutingMdule {}