import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./DTOs/CreateUserDTO";
import { UserEntity } from "./Entities/user.entity";
import { hash } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export default class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const salt = 10
        const passwordHash = await hash(createUserDTO.password, salt)

        return this.userRepository.save({
            ...createUserDTO,
            typeUser: 1,
            password: passwordHash,
        })
    }

    async getAllUsers(){
        return this.userRepository.find();
    }
}