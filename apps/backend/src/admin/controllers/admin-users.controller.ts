import { AdminUserViewDto } from '@/admin/dtos/admin-user-view.dto';
import { AdminUserQueryDto } from '@/admin/dtos/admin-user-query.dto';
import { AdminUsersService } from '@/admin/services/admin-users.service';
import { Body, Controller, Get, Inject, Param, Put, Query } from '@nestjs/common';

import { AdminViewDetailDto } from '@/admin/dtos/admin-view-detail.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { AuthType } from '@/auth/enums/auth-type.enum';
import { UserRole } from '@web-ecom/shared-types/auth/enums.cjs';
import { UpdateUserByAdminDto } from '@/admin/dtos/update-user-by-admin.dto';
import { PaginatedResponse } from '@/products/interfaces/paginated-response.interface';

@Controller('api/admin/users')
@Auth(AuthType.Bearer, UserRole.ADMIN)
export class AdminUsersController {
  constructor(
    @Inject(AdminUsersService)
    private readonly adminUsersService: AdminUsersService,
  ) {}

  @Get()
  async getUsers(@Query() query: AdminUserQueryDto): Promise<PaginatedResponse<AdminUserViewDto>> {
    return this.adminUsersService.findAll(query);
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<AdminViewDetailDto> {
    return this.adminUsersService.findOne(userId);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserByAdminDto,
  ): Promise<AdminViewDetailDto> {
    return this.adminUsersService.update(userId, updateUserDto);
  }
}
