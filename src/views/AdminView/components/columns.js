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
export const OrdersColumn = [
  {
    title: "Check raqami",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Mijoz ID",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Telefon raqami",
    dataIndex: "phone",
    key: "phone",
  },

  {
    title: "Izoh",
    dataIndex: "comment",
    key: "comment",
  },
  {
    title: "Buyurtma vaqti",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Umumiy narxi",
    key: "totla",
    dataIndex: "total",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "type",
  },
];

export const HandleColor = (value) => {
  if (value == "NEW") return "blue";
  if (value == "DELIVERING") return "orange";
  if (value == "DELIVERED") return "green";
  if (value == "CANCELED") return "red";
  if (value == "RETURNED") return "pink";
  if (value == "IN_PROCESS") return "cyan";
  return "green";
};
