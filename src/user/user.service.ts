import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { User } from './user.modele';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private dataSource: DataSource
    ){}

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(dto);
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Ошибка при создании пользователя');
        }
    }

    async getAllUsers(page = 1, limit = 100): Promise<User[]> {
        const offset = (page - 1) * limit;
        try {
            const [users] = await this.userRepository.findAndCount({
                skip: offset,
                take: limit,
            });
            return users;
        } catch (error) {
            throw new InternalServerErrorException('Ошибка при получении пользователей');
        }
    }

    async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
       
        return await this.dataSource.transaction(async (manager: EntityManager) => {
            try {
                await manager.update(User, id, dto);
                return await manager.findOneBy(User, { id });
            } catch (error) {
                throw new InternalServerErrorException('Ошибка при обновлении пользователя');
            }
        });
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        return await this.dataSource.transaction(async (manager: EntityManager) => {
            try {

                console.log(`Удаление пользователя с id ${id}`);
                
                await manager.delete(User, id);
            } catch (error) {
                throw new InternalServerErrorException('Ошибка при удалении пользователя');
            }
        });
    }

    async resetProblemsFlagAndCount(batchSize = 1000): Promise<number> {
        let totalCount = 0;
        let usersWithProblemsCount = 0;

        do {
            const usersWithProblems = await this.userRepository.find({
                where: { hasProblems: true },
                take: batchSize,
            });
            usersWithProblemsCount = usersWithProblems.length;

            if (usersWithProblemsCount > 0) {
                totalCount += usersWithProblemsCount;

                await this.userRepository.update(
                    { hasProblems: true },
                    { hasProblems: false }
                );
            }
        } while (usersWithProblemsCount === batchSize);

        return totalCount;
    }
}
