import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BasketState } from './basket/basket.state';
import { BasketService } from './services';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [NgxsModule.forRoot([BasketState], { developmentMode: !environment.production })],
  providers: [BasketService]
})
export class CoreModule {}
