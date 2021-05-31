import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../config/serviceAccount.json';

@Injectable()
export class FirestoreService {
  public db: firebase.firestore.Firestore;
  constructor(private readonly configService: ConfigService) {
    const {
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey,
    } = serviceAccount;
    const credential: ServiceAccount = { projectId, clientEmail, privateKey };
    this.db = firebase
      .initializeApp({
        credential: firebase.credential.cert(credential),
        databaseURL: configService.get('FIRESTORE_DB_URL'),
      })
      .firestore();
  }
}
