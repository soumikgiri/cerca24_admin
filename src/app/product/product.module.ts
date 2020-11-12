import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'angular-sortablejs';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ProductRoutingModule } from './product.routing';
import { MediaModule } from '../media/media.module';

import { ProductListingComponent } from './product/listing.component';
import { ProductUpdateComponent } from './product/update.component';
import { ProductCreateComponent } from './product/create.component';
import { ReviewsComponent } from './reviews/listing.component';
import { ProductCategoriesComponent, ProductCategoryCreateComponent, ProductCategoryUpdateComponent } from './category/category.component';
import { OptionsComponent, OptionCreateComponent, OptionUpdateComponent } from './options/options.component';
import { VariantUpdateModalComponent, ProductVariantsComponent } from './variants/product-variants.component';


import { ProductCategoryService } from './services/category.service';
import { OptionService } from './services/option.service';
import { ProductService } from './services/product.service';
import { ProductVariantService } from './services/variant.service';
import { ReviewService } from './services/review.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    //our custom module
    ProductRoutingModule,
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MediaModule
  ],
  declarations: [
    ProductCategoriesComponent,
    ProductCategoryCreateComponent,
    ProductCategoryUpdateComponent,
    OptionsComponent,
    OptionCreateComponent,
    OptionUpdateComponent,
    ProductListingComponent,
    ProductUpdateComponent,
    ProductCreateComponent,
    VariantUpdateModalComponent,
    ProductVariantsComponent,
    ReviewsComponent
  ],
  providers: [
    ProductCategoryService,
    OptionService,
    ProductService,
    ProductVariantService,
    ReviewService
  ],
  exports: [],
  entryComponents: [
    VariantUpdateModalComponent
  ]
})
export class ProductModule { }
