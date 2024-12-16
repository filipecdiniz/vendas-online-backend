import { ReturnUserDTO } from "src/user/DTOs/ReturnUserDTO.dto";

export class ReturnLoginDTO {
    user: ReturnUserDTO
    accessToken: string
}