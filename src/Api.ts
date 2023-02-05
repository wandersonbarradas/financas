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
    doc,
    getDoc,
    getFirestore,
    setDoc,
    collection,
    query,
    getDocs,
    deleteDoc,
} from "firebase/firestore";
import { DataType, CategoryType, SubCategories } from "./types/UserType";

export type AllDataType = {
    transactions?: NormalTansactionType[] | TransferTansactionType[];
    categories?: CategoryType[];
    subcategories?: SubCategories[];
    accounts?: UserAccountType[];
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Api = {
    getLogin: async (persistent: boolean, showLoader: () => void) => {
        const auth = getAuth();
        let data: DataType | null = null;
        let allData: AllDataType = {};
        try {
            const provider = new GoogleAuthProvider();
            await setPersistence(
                auth,
                persistent
                    ? browserLocalPersistence
                    : browserSessionPersistence,
            );
            const resultAuth = await signInWithPopup(auth, provider);
            showLoader();
            const dataUser = resultAuth.user;
            const userExists = await Api.checkUser(dataUser.uid);
            if (userExists) {
                data = userExists;
            } else {
                const newUser = await Api.createUser(dataUser);
                if (newUser) {
                    data = newUser;
                }
            }
            allData = await Api.fetchAllData(dataUser.uid);
        } catch (error: any) {
            const errorCode = error.code;
            console.log(
                "🚀 ~ file: Api.ts:102 ~ getLogin: ~ errorCode",
                errorCode,
            );
            const errorMessage = error.message;
            console.log(
                "🚀 ~ file: Api.ts:107 ~ getLogin: ~ errorMessage",
                errorMessage,
            );
            const email = error.customData.email;
            console.log("🚀 ~ file: Api.ts:106 ~ getLogin: ~ email", email);
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(
                "🚀 ~ file: Api.ts:108 ~ getLogin: ~ credential",
                credential,
            );
        }
        return { data, ...allData };
    },

    createUser: async (user: User) => {
        const ref = doc(db, "users", user.uid, "private", "data");
        await setDoc(
            ref,
            {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                id: user.uid,
            },
            { merge: true },
        );
        const newUser = await Api.checkUser(user.uid);
        return newUser;
    },

    checkUser: async (id?: string) => {
        if (id === undefined) {
            return;
        }
        const ref = doc(db, "users", id, "private", "data");
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

    getUserDocument: async (id: string | undefined, document: string) => {
        if (!id) {
            return;
        }
        let result: any = [];
        const userRef = doc(db, "users", id);
        const documentRef = collection(userRef, document);
        try {
            const q = query(documentRef);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                result.push(doc.data());
            });
        } catch (error: any) {
            console.log(error.message);
        }
        return result ? result : null;
    },

    setCategory: async (id: string, category: CategoryType) => {
        const categoriesRef = doc(
            db,
            "users",
            id,
            "categories",
            `category-${category.id}`,
        );
        await setDoc(categoriesRef, category, { merge: true });
    },

    removeCategory: async (id: string, category: CategoryType) => {
        try {
            const categoriesRef = doc(
                db,
                "users",
                id,
                "categories",
                `category-${category.id}`,
            );
            await deleteDoc(categoriesRef);
        } catch (error: any) {
            return Promise.reject(new Error(error.message));
        }
    },

    setSubCategory: async (id: string, subcategory: SubCategories) => {
        const subcategoriesRef = doc(
            db,
            "users",
            id,
            "subcategories",
            `subcategorie-${subcategory.id}`,
        );
        await setDoc(subcategoriesRef, subcategory, { merge: true });
    },

    removeSubCategory: async (id: string, subcategory: SubCategories) => {
        const subcategoriesRef = doc(
            db,
            "users",
            id,
            "subcategories",
            `subcategorie-${subcategory.id}`,
        );
        await deleteDoc(subcategoriesRef);
    },

    setUserAccount: async (id: string, account: UserAccountType) => {
        const userAccountRef = doc(
            db,
            "users",
            id,
            "accounts",
            `account-${account.id}`,
        );
        await setDoc(userAccountRef, account, { merge: true });
    },

    removeUserAccount: async (id: string, account: UserAccountType) => {
        const userAccountRef = doc(
            db,
            "users",
            id,
            "accounts",
            `account-${account.id}`,
        );
        await deleteDoc(userAccountRef);
    },

    setTransaction: async (
        id: string,
        transaction: NormalTansactionType | TransferTansactionType,
    ) => {
        const transactionsRef = doc(
            db,
            "users",
            id,
            "transactions",
            `transaction-${transaction.id}`,
        );
        await setDoc(transactionsRef, transaction, { merge: true });
    },

    removeTransaction: async (
        id: string,
        transaction: NormalTansactionType | TransferTansactionType,
    ) => {
        const transactionsRef = doc(
            db,
            "users",
            id,
            "transactions",
            `transaction-${transaction.id}`,
        );
        await deleteDoc(transactionsRef);
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

    fetchAllData: async (id: string) => {
        const result: AllDataType = {};
        const transactionsResult = (await Api.getUserDocument(
            id,
            "transactions",
        )) as NormalTansactionType[] | TransferTansactionType[];
        if (transactionsResult) {
            result.transactions = transactionsResult;
        }
        const categoriesResult = (await Api.getUserDocument(
            id,
            "categories",
        )) as CategoryType[];
        if (categoriesResult) {
            result.categories = categoriesResult;
        }
        const subcategoriesResult = (await Api.getUserDocument(
            id,
            "subcategories",
        )) as SubCategories[];
        if (subcategoriesResult) {
            result.subcategories = subcategoriesResult;
        }
        const accountsResult = (await Api.getUserDocument(
            id,
            "accounts",
        )) as UserAccountType[];
        if (accountsResult) {
            result.accounts = accountsResult;
        }
        return result;
    },
};

export default Api;
