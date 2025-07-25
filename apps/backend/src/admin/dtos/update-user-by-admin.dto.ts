import { IUpdateByAdmin } from '@web-ecom/shared-types/admin/interfaces.cjs';
import { UserRole } from '@web-ecom/shared-types/auth/enums.cjs';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserByAdminDto implements IUpdateByAdmin {
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
