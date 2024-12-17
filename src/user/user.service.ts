import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./DTOs/CreateUserDTO.dto";
import { UserEntity } from "./Entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hash } from "bcrypt";
import { UserType } from "./enum/user-type.enum";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const salt = 10
        const passwordHash = await hash(createUserDTO.password, salt)

        return this.userRepository.save({
            ...createUserDTO,
            typeUser: UserType.User,
            password: passwordHash,
        })
    }

    async getAllUsers() {
        return this.userRepository.find();
    }

    async findUserById(userId: number): Promise<UserEntity> {

        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
        if (!user) {
            throw new NotFoundException(`User ID: ${userId} not found!`)
        }

        return user
    }

    async findUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                addresses: {
                    city: {
                        state: true
                    }
                }
            }
        })
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { email }
        })

        if(!user) throw new HttpException(`Email ${email} not found!`, 400)

        return user
    }
}