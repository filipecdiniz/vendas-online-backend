import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';

@Module({
    controllers: [StateController],
    providers: [StateService],
    imports: [TypeOrmModule.forFeature([StateEntity])]
})
export class StateModule { }
