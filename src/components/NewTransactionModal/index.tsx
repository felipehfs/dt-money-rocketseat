import { FormEvent, useState } from 'react'
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox, } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { api } from '../../services/api';

interface TransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function TransactionModal({
    isOpen, 
    onRequestClose
}: TransactionModalProps) {
    const [title, setTitle] =useState('')
    const [category, setCategory] = useState('')
    const [value, setValue] = useState('')

    const [type, setType] = useState('deposit')

    function handleCreateNewTransaction(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data ={
            title,
            category,
            type,
            value
        }

        api.post('/transactions', data)
    }


    return (
        <Modal 
            onRequestClose={onRequestClose}
            isOpen={isOpen}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
            >
            <button 
                type="button" 
                onClick={onRequestClose} 
                className="react-modal-close">
                <img src={closeImg} alt="Fechar botão"/>
            </button>
          <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>
            <input 
                placeholder="Título"
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <input 
                type="number"
                placeholder="Valor"
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            <TransactionTypeContainer>
                <RadioBox
                    type="button"
                    activeColor="green"
                    isActive={type === 'deposit'}
                    onClick={() => setType('deposit')}
                >
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>
                <RadioBox
                    type="button"
                    activeColor="red"
                    isActive={type === 'withdraw'}
                    onClick={() => setType('withdraw')}
                >
                    <img src={outcomeImg} alt="Saída" />
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeContainer>
            <input 
                placeholder="Categoria"
                value={category}
                onChange={event => setCategory(event.target.value)}
            />
            <button type="submit">Cadastrar</button>
          </Container>
        </Modal>
    )
}