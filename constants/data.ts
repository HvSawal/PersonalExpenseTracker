import { CategoryType, ExpenseCategoriesType } from "@/types";
import * as Icons from 'phosphor-react-native';

export const expenseCategories: ExpenseCategoriesType = {
    groceries: {
        label: "Groceries",
        value: "groceries",
        icon: Icons.ShoppingCartIcon,
        bgColor: "#4B5563",
    },
    rent: {
        label: "Rent",
        value: "rent",
        icon: Icons.HouseIcon,
        bgColor: "#075985",
    },
    utilities: {
        label: "Utilities",
        value: "utilities",
        icon: Icons.LightbulbIcon,
        bgColor: "#CA8A04",
    },
    transportation: {
        label: "Transportation",
        value: "transportation",
        icon: Icons.CarIcon,
        bgColor: "#B45309",
    },
    entertainment: {
        label: "Entertainment",
        value: "entertainment",
        icon: Icons.FilmStripIcon,
        bgColor: "#0F766E",
    },
    dining: {
        label: "Dining",
        value: "dining",
        icon: Icons.ForkKnifeIcon,
        bgColor: "#BE185D",
    },
    health: {
        label: "Health",
        value: "health",
        icon: Icons.HeartbeatIcon,
        bgColor: "#E11D48",
    },
    insurance: {
        label: "Insurance",
        value: "insurance",
        icon: Icons.ShieldCheckIcon,
        bgColor: "#404040",
    },
    savings: {
        label: "Savings",
        value: "savings",
        icon: Icons.PiggyBankIcon,
        bgColor: "#065F46",
    },
    clothing: {
        label: "Clothing",
        value: "clothing",
        icon: Icons.TShirtIcon,
        bgColor: "#4B5563",
    },
    personal: {
        label: "Personal",
        value: "personal",
        icon: Icons.UserIcon,
        bgColor: "#a21caf",
    },
    others: {
        label: "Others",
        value: "others",
        icon: Icons.WrenchIcon,
        bgColor: "#A25252",
    },
};

export const incomeCategories: CategoryType = {
    label: "Income",
    value: "income",
    icon: Icons.MoneyIcon,
    bgColor: "#16a351",
};

export const transactionTypes = [
    { label: "Expense", value: "expense"},
    { label: "Income", value: "income"},
];