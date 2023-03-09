import { UserAccountType } from "./../types/AccountsType";
import { NormalTansactionType } from "../types/TransactionType";

const Calculation = {
    getValuesForType(
        type: "expense" | "income",
        transactions: NormalTansactionType[],
        done?: boolean | undefined,
    ) {
        let transactionsExpense = [] as NormalTansactionType[];
        if (done) {
            transactionsExpense = transactions.filter(
                (item) => item.type === type && item.done === done,
            );
        } else {
            transactionsExpense = transactions.filter(
                (item) => item.type === type,
            );
        }

        const valueExpense = transactionsExpense.reduce(
            (previousValue: number, currentValue) =>
                previousValue + currentValue.value,
            0,
        );
        return valueExpense;
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
};

export default Calculation;
