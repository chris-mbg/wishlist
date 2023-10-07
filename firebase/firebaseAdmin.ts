import * as firebaseAdmin from "firebase-admin"
import serviceAccount from "../secret-admin.json"

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: "https://wishlist-5f6b1.firebase.io",
  })
}

export { firebaseAdmin }
// import { initializeApp, apps, credential } from "firebase-admin"
// import serviceAccount from "../secret-admin.json"

// let firebase_admin =
//   apps.length === 0
//     ? initializeApp({
//         credential: credential.cert({
//           privateKey: serviceAccount.private_key,
//           clientEmail: serviceAccount.client_email,
//           projectId: serviceAccount.project_id,
//         }),
//         databaseURL: "https://wishlist-5f6b1.firebase.io",
//       })
//     : apps[0]

// export default firebase_admin
