import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as serviceAccount from "./serviceAccount.json";
import {ServiceAccount} from "firebase-admin";
import * as config from "./config.json";

const app = express();
app.use(cors({origin: true}));

const {
  project_id: projectId,
  client_email: clientEmail,
  private_key: privateKey,
} = serviceAccount;
const credential: ServiceAccount = {projectId, clientEmail, privateKey};
const db = admin
    .initializeApp({
      credential: admin.credential.cert(credential),
      databaseURL: config.firestore_url})
    .firestore();

app.get("/", async (req, res) => {
  const allBooks: any = [];
  const snapshot = await db.collection("books").get();
  snapshot.forEach((doc: any) => {
    allBooks.push(doc.data());
  });

  return res.json({data: allBooks});
});

app.get("/:id", async (req, res) => {
  const {id} = req.params;
  const ref = db.collection("books").doc(id);
  const doc = await ref.get();

  return res.json({data: doc});
});

app.post("/", async (req, res) => {
  const {
    title,
    description,
    authors,
    favourite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;
  const resource = await db.collection("books").add({
    title,
    description,
    authors,
    favourite,
    fileCover,
    fileName,
    fileBook,
  });

  const ref = db.collection("books").doc(resource.id);
  const doc = await ref.get();

  return res.json({data: doc});
});

app.put("/:id", async (req, res) => {
  const {id} = req.params;
  const {
    title,
    description,
    authors,
    favourite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;

  const ref = db.collection("books").doc(id);
  await ref.update({
    title,
    description,
    authors,
    favourite,
    fileCover,
    fileName,
    fileBook,
  });
  const data = (await ref.get()).data();

  return res.json({data});
});

app.delete("/:id", async (req, res) => {
  const {id} = req.params;
  const ref = db.collection("books").doc(id);
  return (await ref.delete()) ? true : false;
});

exports.widgets = functions.https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
