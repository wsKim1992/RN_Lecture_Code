import Button from "@components/UI/Buttons";
import IconButton from "@components/UI/IconButton";
import { GlobalStyles } from "@constant/styles";
import { ExpensesContext } from "@store/expense-context";
import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";

const ManageExpenses = ({ route, navigation }) => {
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId, {
                description: "Test",
                amount: 19.09,
                date: new Date("2022-05-19"),
            });
        } else {
            expenseCtx.addExpense({
                description: "Test",
                amount: 19.09,
                date: new Date("2022-05-19"),
            });
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button
                    style={styles.button}
                    mode="flat"
                    onPress={cancelHandler}
                >
                    Cancel
                </Button>
                <Button style={styles.button} onPress={confirmHandler}>
                    {isEditing ? "Update" : "Add"}
                </Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
};

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
});
