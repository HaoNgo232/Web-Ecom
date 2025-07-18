import { CartItemDto } from '@/cart/dtos/cart-item.dto';
import { ICart } from '@web-ecom/shared-types/cart/interfaces.cjs';
import { IsArray, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CartDto implements ICart {
  @IsUUID()
  id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];

  @IsNumber()
  totalItems: number;

  @IsNumber()
  totalPrice: number;
}
