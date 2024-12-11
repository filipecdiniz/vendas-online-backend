import { StateEntity } from "../entities/state.entity";

export class ReturnStateDTO {
    name: string;

    constructor(state: StateEntity){
        this.name = state.name;
    }
}