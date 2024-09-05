import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.modele';
import { CreateUserDto } from './dto/create-user.dto'; 
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @ApiOperation({summary:'Создание пользователя'})
    @ApiResponse({status:200, type:User })
    @Post()
    create(@Body() userDto:CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary:'Получение пользователей'})
    @ApiResponse({status:200, type: [User] })
    @Get()
    getAll(){
            return this.userService.getAllUsers();
    }

    @ApiOperation({summary:'Обновление полей пользователя'})
    @ApiResponse({status:200, type:User })
    @Put('/:id')
    update(@Param('id') id : number, @Body() userDto:CreateUserDto){
        return this.userService.updateUser(id, userDto);
    }

    @ApiOperation({summary:'Удаления пользователя'})
    @ApiResponse({status:200, type:User })
    @Delete('/:id')
    delete(@Param('id') id : number){
        return this.userService.deleteUser(id);
    }

    @ApiOperation({summary: 'Сброс флага "hasProblems" на false и подсчет количества пользователей с этим флагом'})
    @ApiResponse({status:200, type:User })
    @Post('reset-problems')
    async resetProblemsFlag(): Promise<{ usersWithProblems: number }> {
      const usersWithProblems = await this.userService.resetProblemsFlagAndCount();
      return { usersWithProblems };
    }

}

