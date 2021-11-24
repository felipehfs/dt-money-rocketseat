import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyles } from "./global";
import { createServer, Model } from "miragejs"
import Modal from 'react-modal';
import { useState } from "react";
import { TransactionModal } from "./components/NewTransactionModal";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de desenvolvimento',
          type: 'deposit',
          category: 'Dev',
          amount: 6000.00,
          createdAt: new Date('2021-02-12 10:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 200.00,
          createdAt: new Date('2021-02-8 10:00:00'),
        },
      ]
    })
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data)
    })
  }
})

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <GlobalStyles />
      <TransactionModal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal} />
    </>
  );
}

