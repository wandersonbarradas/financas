import { UserAccountType } from "./../types/AccountsType";
import { NormalTansactionType } from "../types/TransactionType";

const Calculation = {
    getValuesForType(
        type: "expense" | "income",
        transactions: NormalTansactionType[],
        done?: boolean | undefined,
    ) {
        let transactionsExpense = [] as NormalTansactionType[];
        if (done !== undefined) {
            transactionsExpense = transactions.filter(
                (item) => item.type === type && item.done === done,
            );
        } else {
            transactionsExpense = transactions.filter(
                (item) => item.type === type,
            );
        }
        const valueType = transactionsExpense.reduce(
            (previousValue: number, currentValue) =>
                previousValue + currentValue.value,
            0,
        );
        return valueType;
    },
    getMonthlySummary(transactions: NormalTansactionType[]) {
        const valueExpense = this.getValuesForType("expense", transactions);
        const valueIncome = this.getValuesForType("income", transactions);
        const valueExpensePending = this.getValuesForType(
            "expense",
            transactions,
            false,
        );
        const balance = valueIncome - valueExpense;
        return {
            valueExpense,
            valueIncome,
            valueExpensePending,
            balance,
        };
    },
    getCurrentBalance(
        transactions: NormalTansactionType[],
        accounts?: UserAccountType[],
    ) {
        const allTheExpenses = Calculation.getValuesForType(
            "expense",
            transactions,
            true,
        );
        const allTheIncome = Calculation.getValuesForType(
            "income",
            transactions,
            true,
        );
        const initialValueBanks = accounts?.reduce(
            (previousValue: number, currentValue) =>
                previousValue + currentValue.initialValue,
            0,
        );
        return allTheIncome - allTheExpenses + (initialValueBanks ?? 0);
    },
    getValuesForFilters(transactions: NormalTansactionType[], done: boolean) {
        let values = 0;
        values = transactions
            .filter((item) => item.done === done)
            .reduce(
                (previousValue: number, currentValue) =>
                    previousValue + currentValue.value,
                0,
            );
        return values;
    },
};

export default Calculation;
