import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2021-12-19"),
    },
    {
        id: "e2",
        description: "A pair of shoes",
        amount: 29.99,
        date: new Date("2023-01-05"),
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
        date: new Date("2023-01-05"),
    },
    {
        id: "e7",
        description: "porn",
        amount: 154.31,
        date: new Date("2023-01-10"),
    },
    {
        id: "e8",
        description: "gay porn",
        amount: 154.31,
        date: new Date("2023-01-11"),
    },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
    console.log(action.type);
    switch (action.type) {
        case "ADD":
            const id = `${new Date().toString()} ${Math.random().toString()}`;
            return [{ ...action.payload, id }, ...state];
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [espensesState, dispatch] = useReducer(
        expensesReducer,
        DUMMY_EXPENSES
    );

    function addExpense(expenseData) {
        dispatch({ type: "ADD", payload: expenseData });
    }

    function deleteExpense(id) {
        console.log(id);
        dispatch({ type: "DELETE", payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
    }

    const value = {
        expenses: espensesState,
        addExpense,
        deleteExpense,
        updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;
