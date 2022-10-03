export const ROW = '<tr><td>%Q%</td><td>%N%.</td><td>%A%</td><td>%C%</td></tr>';
export class Evaluation {
  constructor(
    public responses: number,
    public correct: number,
    public text: string
  ) {}
}
