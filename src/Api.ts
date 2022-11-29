import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    User,
    onAuthStateChanged,
    browserLocalPersistence,
    browserSessionPersistence,
    setPersistence,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { UserType } from "./types/UserType";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Api = {
    getLogin: async (persistent: boolean) => {
        const auth = getAuth();
        let user: UserType | null = null;
        try {
            const provider = new GoogleAuthProvider();
            await setPersistence(
                auth,
                persistent
                    ? browserLocalPersistence
                    : browserSessionPersistence,
            );
            const result = await signInWithPopup(auth, provider);
            const dateUser = result.user;
            const userExists = await Api.checkUser(dateUser.uid);
            if (userExists) {
                user = userExists;
                console.log("Tem cadastro");
            } else {
                const newUser = await Api.createUser(dateUser);
                if (newUser) {
                    user = newUser;
                }
            }
        } catch (error: any) {
            const errorCode = error.code;
            console.log(
                "🚀 ~ file: Api.ts ~ line 49 ~ getLogin: ~ errorCode",
                errorCode,
            );
            const errorMessage = error.message;
            console.log(
                "🚀 ~ file: Api.ts ~ line 51 ~ getLogin: ~ errorMessage",
                errorMessage,
            );
            const email = error.customData.email;
            console.log(
                "🚀 ~ file: Api.ts ~ line 53 ~ getLogin: ~ email",
                email,
            );
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(
                "🚀 ~ file: Api.ts ~ line 55 ~ getLogin: ~ credential",
                credential,
            );
        }
        return user;
    },

    createUser: async (user: User) => {
        await setDoc(
            doc(db, "users", user.uid),
            {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            },
            { merge: true },
        );
        const newUser = await Api.checkUser(user.uid);
        return newUser;
    },

    checkUser: async (id?: string) => {
        if (id) {
            const ref = doc(db, "users", id);
            const res = await getDoc(ref);
            const dados = res.data() as UserType;
            return dados;
        } else {
            return undefined;
        }
    },

    getToken: (setNewUser: (value: UserType | null) => void) => {
        const auth = getAuth();
        auth.languageCode = "it";
        onAuthStateChanged(auth, async (currentUser) => {
            const result = await Api.checkUser(currentUser?.uid);
            if (result) {
                setNewUser(result);
            } else {
                setNewUser(null);
            }
        });
    },

    signOut: () => {
        const auth = getAuth();
        auth.signOut();
    },
};

export default Api;
