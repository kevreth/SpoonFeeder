export class Progress {
  public static columns = [
    {
      name: 'name',
      label: 'Name',
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'count',
      label: 'Count',
      sortable: true,
      field: 'count',
      align: 'center',
    },
    {
      name: 'score',
      label: 'Score',
      sortable: true,
      field: 'score',
      align: 'left',
    },
  ];
  public static data =[];
}
