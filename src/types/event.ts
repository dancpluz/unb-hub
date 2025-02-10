export interface Disciplina {
  id?: number;
  nome: string;
  codigo: string;
  professor: string;
  horarios: string; // JSON: { dia: "ter", inicio: "08:00", fim: "10:00" }[]
}

export type EventModalProps = {
  visible: boolean;
  onClose: () => void;
  event?: EventT;
  onSave: () => void;
};