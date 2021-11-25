import { createContext, useState, useEffect, ReactNode, useContext } from 'react'
import { api} from '../services/api'

interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: string;
    createdAt: string;
    type: string;
}

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void;
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

interface TransactionProviderProps {
    children: ReactNode;
}

type TransactionInput =  Omit<Transaction, 'id' | 'createdAt'>

export function TransactionProvider({ children}: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction( data: TransactionInput) {

        const response = await api.post('/transactions', {...data, createdAt: new Date()});
        const { transaction} = response.data
        
        setTransactions([
            ...transactions,
            transaction
        ])
    }


    return (
        <TransactionContext.Provider value={{ transactions, createTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactions = () => useContext(TransactionContext)