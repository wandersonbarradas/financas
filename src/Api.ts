import {
    NormalTansactionType,
    TransferTansactionType,
} from "./types/TransactionType";
import { AccountType, UserAccountType } from "./types/AccountsType";
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
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { DataType, CategoryType, SubCategories } from "./types/UserType";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Api = {
    getLogin: async (persistent: boolean, showLoader: () => void) => {
        const auth = getAuth();
        let user: DataType | null = null;
        let transactions:
            | NormalTansactionType[]
            | TransferTansactionType[]
            | null = null;
        let categories: CategoryType[] | null = null;
        let subcategories: SubCategories[] | null = null;
        try {
            const provider = new GoogleAuthProvider();
            await setPersistence(
                auth,
                persistent
                    ? browserLocalPersistence
                    : browserSessionPersistence,
            );
            const result = await signInWithPopup(auth, provider);
            showLoader();
            const dateUser = result.user;
            const userExists = await Api.checkUser(dateUser.uid);
            if (userExists) {
                user = userExists;
            } else {
                const newUser = await Api.createUser(dateUser);
                if (newUser) {
                    user = newUser;
                }
            }
            const transactionsResult = (await Api.getUserDocument(
                result.user.uid,
                "transactions",
            )) as {
                transactions: NormalTansactionType[] | TransferTansactionType[];
            };
            if (transactionsResult.transactions) {
                transactions = transactionsResult.transactions;
            }
            const categoriesResult = (await Api.getUserDocument(
                result.user.uid,
                "categories",
            )) as {
                categories: CategoryType[];
            };
            if (categoriesResult.categories) {
                categories = categoriesResult.categories;
            }
            const subcategoriesResult = (await Api.getUserDocument(
                result.user.uid,
                "subcategories",
            )) as {
                subcategories: SubCategories[];
            };
            if (subcategoriesResult.subcategories) {
                subcategories = subcategoriesResult.subcategories;
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
        return { user, transactions, categories, subcategories };
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
        await setDoc(doc(db, user.uid, "accounts"), {
            accounts: [],
        });
        await setDoc(doc(db, user.uid, "transactions"), {
            transactions: [],
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

    getUserDocument: async (id: string, document: string) => {
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

    removeCategory: async (id: string, category: CategoryType) => {
        const categoriesRef = doc(db, id, "categories");
        await updateDoc(categoriesRef, {
            categories: arrayRemove(category),
        });
    },

    setSubCategory: async (id: string, subcategory: SubCategories) => {
        const subcategoriesRef = doc(db, id, "subcategories");
        await updateDoc(subcategoriesRef, {
            subcategories: arrayUnion(subcategory),
        });
    },

    removeSubCategory: async (id: string, subcategory: SubCategories) => {
        const subcategoriesRef = doc(db, id, "subcategories");
        await updateDoc(subcategoriesRef, {
            subcategories: arrayRemove(subcategory),
        });
    },

    setUserAccount: async (id: string, account: UserAccountType) => {
        const userAccountRef = doc(db, id, "accounts");
        await updateDoc(userAccountRef, {
            accounts: arrayUnion(account),
        });
    },

    removeUserAccount: async (id: string, account: UserAccountType) => {
        const userAccountRef = doc(db, id, "accounts");
        await updateDoc(userAccountRef, {
            accounts: arrayRemove(account),
        });
    },

    setTransaction: async (
        id: string,
        transaction: NormalTansactionType | TransferTansactionType,
    ) => {
        const userAccountRef = doc(db, id, "transactions");
        await updateDoc(userAccountRef, {
            transactions: arrayUnion(transaction),
        });
    },

    removeTransaction: async (
        id: string,
        transaction: NormalTansactionType | TransferTansactionType,
    ) => {
        const userAccountRef = doc(db, id, "transactions");
        await updateDoc(userAccountRef, {
            transactions: arrayRemove(transaction),
        });
    },

    getAccountsPublic: async () => {
        const ref = doc(db, "public", "accounts");
        if (ref.id) {
            const res = await getDoc(ref);
            const dados = res.data() as { accounts: AccountType[] };
            return dados.accounts;
        } else {
            return undefined;
        }
    },
};

export default Api;
