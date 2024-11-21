import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    // Aqui eu estou injetando meu CacheManager.
    // Eu inseri o CACHE_MANAGER no inject pois esse é o token, vindo do @nestjs/cache-manager.
    // Acredito que o cache-manager usa esse token para gerenciar o cache, passando ele pro cacheManager.
    // Passei o tipo Cache, vindo de cache-manager para o cacheManager.
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    // Isso é uma função genérica, vai receber uma key e uma função.
    //Essa key será usada para buscar o cache no "banco" do cacheManager
    
    async getCache<T>(key: string, fetchData: () => Promise<T>): Promise<T>{
        const cache: T = await this.cacheManager.get(key);

        if(cache){
            return cache;
        }

        const newCache: T = await fetchData();

        await this.cacheManager.set(key, newCache)

        return newCache
    }
}
