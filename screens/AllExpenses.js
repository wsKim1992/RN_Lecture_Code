import ExpensesOutput from "@components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "@store/expense-context";
import { useContext } from "react";

const AllExpenses = () => {
	const expensesCtx = useContext(ExpensesContext);
	return (
		<ExpensesOutput
			expenses={expensesCtx.expenses}
			expensesPeriod="Total"
		/>
	);
};

export default AllExpenses;
