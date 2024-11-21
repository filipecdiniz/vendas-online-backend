import { Injectable } from "@nestjs/common";
import { CityEntity } from "./entities/city.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CacheService } from "src/cache/cache.service";

@Injectable()
export class CityService {
    constructor(
        //Estou injetando meu repositório de cityRepository, do tipo Repository.
        @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>,

        private readonly cacheService: CacheService
    ) { }

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        return this.cacheService.getCache<CityEntity[]>(`city_${stateId}`, () =>
            this.cityRepository.find({
                where: {
                    stateId
                }
            })
        )
    }
}