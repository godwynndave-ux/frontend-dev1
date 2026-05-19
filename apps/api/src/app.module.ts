import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscoveryModule } from './modules/discovery/discovery.module';
import { RealtimeGateway } from './modules/realtime/realtime.gateway';
import { MatchService } from './modules/match/match.service';

@Module({
  imports: [DiscoveryModule],
  controllers: [AppController],
  providers: [AppService, RealtimeGateway, MatchService],
})
export class AppModule {}
