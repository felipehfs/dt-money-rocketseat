import { Container } from "./styles";
import IncomeImg from "../../assets/income.svg"
import OutcomeImg from "../../assets/outcome.svg"
import TotalImg from "../../assets/total.svg"
import { useTransactions } from "../../hooks/useTransactions";

new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
})

export function Summary() {
    const { transactions } = useTransactions();

    const summary = transactions.reduce((accum, transaction) => {
        if (transaction.type === 'deposit') {
            accum.deposit += transaction.amount
            accum.total += transaction.amount
        } else if (transaction.type === 'withdraw'){
            accum.withdraws += transaction.amount
            accum.total -= transaction.amount;
        }

        return accum
    }, {
        total: 0,
        deposit: 0,
        withdraws:0, 
    }); 

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeImg} alt="income" />
                </header>
                <strong>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
                    .format(summary.deposit)}</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={OutcomeImg} alt="outcome" />
                </header>
                <strong>-{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL"})
                    .format(summary.withdraws)}</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={TotalImg} alt="total" />
                </header>
                <strong>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL"})
                    .format(summary.total)}</strong>
            </div>
        </Container>
    )
}