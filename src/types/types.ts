export type TCellId = string;
export type TPopulation = Map<TCellId, ICell>;
export interface ICell {
  id: TCellId;
  isAlive: boolean;
}
export interface ICellBlockProps {
  isAlive: boolean;
}
