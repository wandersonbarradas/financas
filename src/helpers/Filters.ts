import { CategoryType, SubCategories } from "./../types/UserType";
import { UserAccountType } from "./../types/AccountsType";
import { FilterItem } from "../pages/transactions/transactions";
import { NormalTansactionType } from "./../types/TransactionType";

export const Filters = (
    transactions: NormalTansactionType[],
    filters: FilterItem[],
) => {
    let filtered = [...transactions]; // criar uma cópia do array original
    filters.forEach((filter) => {
        switch (filter.type) {
            case "category":
                const cat = filter.parameters as CategoryType;
                filtered = filtered.filter(
                    (item) => item.category?.id === cat.id,
                );
                break;
            case "subcategory":
                const subcat = filter.parameters as SubCategories;
                filtered = filtered.filter(
                    (item) => item.subcategory?.id === subcat.id,
                );
                break;
            case "account":
                const account = filter.parameters as UserAccountType;
                filtered = filtered.filter(
                    (item) => item.account?.id === account.id,
                );
                break;
            default:
                break;
        }
    });
    return filtered;
};

// export const Filters = (
//     transactions: NormalTansactionType[],
//     filters: FilterItem[],
// ) => {
//     let filtered = transactions;
//     //Filtros de categoria
//     const filtersForCategory = filters.filter((i) => i.type === "category");
//     if (filtersForCategory.length > 0) {
//         filtered = filterItems(filtersForCategory, filtered);
//     }
//     //Filtros de subcategoria
//     const filtersForSubCategory = filters.filter(
//         (i) => i.type === "subcategory",
//     );
//     if (filtersForSubCategory.length > 0) {
//         filtered = filterItems(filtersForSubCategory, filtered);
//     }
//     // //Filtros de contas
//     const filtersForAccount = filters.filter((i) => i.type === "account");
//     if (filtersForAccount.length > 0) {
//         filtered = filterItems(filtersForAccount, filtered);
//     }
//     // filters.forEach((item) => {
//     //     switch (item.type) {
//     //         case "account":
//     //             const account = item.parameters as UserAccountType;
//     //             filtered = filtered.filter((t) => t.account.id === account.id);
//     //             break;
//     //         case "category":
//     //             const category = item.parameters as CategoryType;
//     //             filtered = filtered.filter(
//     //                 (t) => t.category.id === category.id,
//     //             );
//     //             break;
//     //         case "subcategory":
//     //             const subcategory = item.parameters as SubCategories;
//     //             filtered = filtered.filter(
//     //                 (t) => t.subcategory?.id === subcategory.id,
//     //             );
//     //             break;
//     //     }
//     // });
//     return filtered;
// };

// const filterItems = (
//     filtros: FilterItem[],
//     transactions: NormalTansactionType[],
// ) => {
//     const filteredItems: NormalTansactionType[] = [];
//     filtros.forEach((filter) => {
//         transactions
//             .filter((item) => {
//                 switch (filter.type) {
//                     case "category":
//                         const cat = filter.parameters as CategoryType;
//                         return item.category?.id === cat.id;
//                     case "subcategory":
//                         const subcat = filter.parameters as SubCategories;
//                         return item.subcategory?.id === subcat.id;
//                     case "account":
//                         const account = filter.parameters as UserAccountType;
//                         return item.account?.id === account.id;
//                     default:
//                         return item;
//                 }
//             })
//             .forEach((i) => {
//                 const verif = filteredItems.includes(i);
//                 if (!verif) {
//                     filteredItems.push(i);
//                 }
//             });
//     });
//     return filteredItems;
// };
