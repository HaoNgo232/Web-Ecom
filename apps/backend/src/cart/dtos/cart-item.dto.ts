import { IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ICartItem } from '@web-ecom/shared-types';
import { ProductBriefDto } from '@/orders/dtos/product-brief.dto';

export class CartItemDto implements ICartItem {
  @IsUUID()
  id: string;

  @ValidateNested()
  @Type(() => ProductBriefDto)
  product: ProductBriefDto;

  @IsNumber()
  quantity: number;

  @IsNumber()
  priceAtAddition: number;
}
