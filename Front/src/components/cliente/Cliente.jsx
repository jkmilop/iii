import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },

  {
    field: 'cedula',
    headerName: 'Cedula',
    type: 'number',
    width: 90,
  },
  {
    field: 'telefono',
    headerName: 'Telefono',
    type: 'number',
    width: 90,
  },

];


export default function Cliente() {
  const [rows, setRows] = useState([]);
  const fetchClientes = async () => {
    await axios
      .get("http://localhost:3000/cliente")
      .then((res) => setRows(res.data.clientes));
  };

  useEffect(() => {
    fetchClientes();
  }, []);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}