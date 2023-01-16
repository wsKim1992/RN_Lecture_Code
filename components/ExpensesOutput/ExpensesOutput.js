import { GlobalStyles } from "@constant/styles";
import { View, StyleSheet } from "react-native";

import ExpensesList from "./ExpenseList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2021-12-19"),
    },
    {
        id: "e12",
        description: "A pair of shoes",
        amount: 29.99,
        date: new Date("2021-01-05"),
    },
    {
        id: "e3",
        description: "banana",
        amount: 5.99,
        date: new Date("2021-03-12"),
    },
    {
        id: "e4",
        description: "A book",
        amount: 13.99,
        date: new Date("2021-11-12"),
    },
    {
        id: "e5",
        description: "sushi",
        amount: 54.01,
        date: new Date("2021-10-05"),
    },
    {
        id: "e6",
        description: "kim bob",
        amount: 104.01,
        date: new Date("2021-10-05"),
    },
    {
        id: "e7",
        description: "porn",
        amount: 154.31,
        date: new Date("2021-11-05"),
    },
    {
        id: "e8",
        description: "gay porn",
        amount: 154.31,
        date: new Date("2023-01-05"),
    },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpensesList expenses={expenses} />
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
});
