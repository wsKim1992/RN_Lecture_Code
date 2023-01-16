import ExpensesOutput from "@components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "@store/expense-context";
import { getDateMinusDays } from "@util/date";
import { useContext } from "react";

const RecentExpenses = () => {
    const expenseCtx = useContext(ExpensesContext);

    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo && expense.date <= today;
    });
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 Days"
        />
    );
};

export default RecentExpenses;
