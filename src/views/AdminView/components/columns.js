export const ProductsColumn = (funcEdit, funcDelete) => [
  {
    title: "Rasm",
    dataIndex: "imgUrl",
    key: "imgUrl",
  },
  {
    name: "Nomi",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Tavsifi",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Narxi",
    key: "price",
    dataIndex: "price",
  },
  {
    title: "Turi",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Yaratilgan sanasi",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amallar",
    key: "action",
    edit: {
      title: "Tahrirlash",
      function: funcEdit,
    },
    delete: {
      title: "O'chirish",
      function: funcDelete,
    },
  },
];
export const column = [
  {
    title: "Rasm",
    dataIndex: "imgUrl",
    key: "imgUrl",
  },
  {
    name: "Nomi",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Tavsifi",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Narxi",
    key: "price",
    dataIndex: "price",
  },
  {
    title: "Turi",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Yaratilgan sanasi",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amallar",
    key: "action",
    edit: {
      title: "Tahrirlash",
      function: () => {
        console.log("edit");
      },
    },
    delete: {
      title: "O'chirish",
      function: () => {
        console.log("delete");
      },
    },
  },
];
