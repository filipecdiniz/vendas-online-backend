import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager'

@Module({
  imports: [
    CacheModuleNest.register({
      ttl: 9000000,
      isGlobal: true
    })
  ],
  providers: [CacheService],
  exports: [CacheService, CacheModuleNest],
})
export class CacheModule { }
