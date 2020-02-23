import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { BasketState } from './basket/basket.state';
import { WishListState } from './wish-list/wish-list.state';

import { BasketService, WishListService } from './services';

import { environment } from 'src/environments/environment';

@NgModule({
  imports: [NgxsModule.forRoot([BasketState, WishListState], { developmentMode: !environment.production })],
  providers: [BasketService, WishListService]
})
export class CoreModule {}
