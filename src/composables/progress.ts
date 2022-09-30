export class Progress {
  public static columns = [
    {
      name: 'label',
      label: 'Label',
      align: 'left',
      field: 'label',
      sortable: true,
    },
    {
      name: 'Description',
      label: 'Description',
      sortable: true,
      field: 'description',
      align: 'center',
    },
    {
      name: 'note',
      label: 'Note',
      sortable: true,
      field: 'note',
      align: 'left',
    },
  ];
  public static data = [
    {
      label: 'Node 1',
      description: 'Node 1 description data',
      note: 'Node 1 note',
      // id: 1,
      children: [
        {
          label: 'Node 1.1',
          description: 'Node 1.1 description',
          note: 'Node 1.1 note',
          // id: 2
        },
        {
          label: 'Node 1.2',
          description: 'Node 1.2 description',
          note: 'Node 1.2 note',
          // id: 3,
          children: [
            {
              label: 'Node 1.2.1',
              description: 'Node 1.2.1 description',
              note: 'Node 1.2.1 note',
              // id: 4
            },
            {
              label: 'Node 1.2.2',
              description: 'Node 1.2.2 description',
              note: 'Node 1.2.2 note',
              // id: 5
            },
          ],
        },
      ],
    },
    {
      label: 'Node 2',
      description: 'Node 2 description',
      note: 'Node 2 note',
      // id: 6,
      children: [
        {
          label: 'Node 2.1',
          description: 'Node 2.1 description',
          note: 'Node 2.1 note',
          // id: 7,
          children: [
            {
              label: 'Node 2.1.1',
              description: 'Node 2.1.1 description',
              note: 'Node 2.1.1 note',
              // id: 8
            },
            {
              label: 'Node 2.1.2',
              description: 'Node 2.1.2 description',
              note: 'Node 2.1.2 note',
              // id: 9
            },
          ],
        },
        {
          label: 'Node 2.2',
          description: 'Node 2.2 description',
          note: 'Node 2.2 note',
          // id: 10
        },
      ],
    },
  ]
}
