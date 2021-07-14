import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { api } from "../../services/api";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";
import { FormEvent, useState } from "react";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [type, setType] = useState("");
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      value,
      title,
      category,
      type,
    };

    api.post("/transactions", data);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          onChange={(event) => setTitle(event.target.value)}
        ></input>

        <input
          placeholder="Valor"
          type="number"
          onChange={(event) => setValue(Number(event.target.value))}
        ></input>

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          onChange={(event) => setCategory(event.target.value)}
        ></input>

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
