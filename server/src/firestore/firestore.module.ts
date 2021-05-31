import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirestoreService } from './firestore.service';

@Module({
  providers: [FirestoreService, ConfigService],
  exports: [FirestoreService],
})
export class FirestoreModule {}
