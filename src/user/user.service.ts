import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.modele';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}
    async createUser(dto:CreateUserDto): Promise<User>{
        const user = this.userRepository.create(dto);
        return await this.userRepository.save(user);
      }
    

    async getAllUsers() : Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async updateUser(id: number, dto:CreateUserDto) : Promise<User>{
        const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                throw new NotFoundException('Пользователь не найден');
            }
            await this.userRepository.update(id, dto);
            return await this.userRepository.findOneBy({ id });
    }
    
    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        await this.userRepository.delete(id);
    }

    async resetProblemsFlagAndCount(): Promise<number> {
        const usersWithProblems = await this.userRepository.count({where: { hasProblems: true }});
        await this.userRepository.update({ hasProblems: true }, { hasProblems: false });    
        return usersWithProblems;
    }
}
