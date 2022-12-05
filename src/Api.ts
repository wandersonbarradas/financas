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
import {
    arrayRemove,
    arrayUnion,
    collection,
    collectionGroup,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import {
    UserType,
    DataType,
    CategoryType,
    SubCategories,
} from "./types/UserType";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Api = {
    getLogin: async (persistent: boolean) => {
        const auth = getAuth();
        let user: DataType | null = null;
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
            doc(db, user.uid, "data"),
            {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                id: user.uid,
            },
            { merge: true },
        );
        await setDoc(doc(db, user.uid, "categories"), {
            categories: [],
        });
        await setDoc(doc(db, user.uid, "subcategories"), {
            subcategories: [],
        });
        const newUser = await Api.checkUser(user.uid);
        return newUser;
    },

    checkUser: async (id?: string) => {
        if (id === undefined) {
            return;
        }
        const ref = doc(db, id, "data");
        if (ref.id) {
            const res = await getDoc(ref);
            const dados = res.data() as DataType;
            return dados;
        } else {
            return undefined;
        }
    },

    getToken: (setNewUser: (value: DataType | null) => void) => {
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

    getCategory: async (id: string, document: string) => {
        let result: any;
        const docRef = doc(db, id, document);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                result = docSnap.data();
            }
        } catch (error: any) {
            console.log(error.message);
        }
        return result;
    },

    setCategory: async (id: string, category: CategoryType) => {
        const categoriesRef = doc(db, id, "categories");
        await updateDoc(categoriesRef, {
            categories: arrayUnion(category),
        });
    },

    setSubCategory: async (id: string, subcategory: SubCategories) => {
        const subcategoriesRef = doc(db, id, "subcategories");
        await updateDoc(subcategoriesRef, {
            subcategories: arrayUnion(subcategory),
        });
    },

    removeCategory: async (id: string, category: CategoryType) => {
        const categoriesRef = doc(db, id, "categories");
        await updateDoc(categoriesRef, {
            categories: arrayRemove(category),
        });
        console.log("removido");
    },

    removeSubCategory: async (id: string, subcategory: SubCategories) => {
        const subcategoriesRef = doc(db, id, "subcategories");
        await updateDoc(subcategoriesRef, {
            subcategories: arrayRemove(subcategory),
        });
        console.log("removido");
    },
};

export default Api;
