import ExpenseItem from "./ExpenseItem";

import { FlatList } from "react-native";

function renderExpenseItem(itemData) {
	return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }) => {
	return (
		<FlatList
			data={expenses}
			renderItem={renderExpenseItem}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default ExpensesList;
