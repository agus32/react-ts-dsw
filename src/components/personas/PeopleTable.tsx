import React, {useState, useCallback, useMemo, useEffect} from 'react';
import DataTable,{TableColumn}  from 'react-data-table-component';
import {Form, InputGroup, Button} from 'react-bootstrap';
import { DeletePerson, GetPeople} from '../ApiHandler';
import {Person} from '../../types';


  
  interface FilterComponentProps {
    filterText: string;
    onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
  }
  
  const FilterComponent: React.FC<FilterComponentProps> = ({ filterText, onFilter, onClear }) => (
    <InputGroup>
      <Form.Control
        id="search"
        type="text"
        placeholder="Buscar por nombre..."
        value={filterText}
        onChange={onFilter}
      />
      <Button variant="outline-secondary" onClick={onClear}>
        x
      </Button>
    </InputGroup>
  );
  
   
  const columns: TableColumn<Person>[] = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: false,
    },
    {
      name: 'DNI',
      selector: row => row.dni,
      sortable: true,
    },
  ];

  interface PeopleTableProps {
    type: string;
  }

  
  
  export const PeopleTable: React.FC<PeopleTableProps> = ({type}) => {
    const [people, setPeople] = useState<Person[]>([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [selectedRows, setSelectedRows] = useState<Person[]>([]);
    const [toggleCleared, setToggleCleared] = useState(false);

    const fetchPeople = async () => {
      const data = await GetPeople(type);
      setPeople(data);
    }

    useEffect(() => {fetchPeople()},[]);

  
    const handleRowSelected = useCallback((state: { selectedRows: React.SetStateAction<Person[]>; }) => {
      setSelectedRows(state.selectedRows);
    }, []);
  
    const filteredItems = useMemo(
      () =>
      people.filter((item) =>
          item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase())
        ),
      [people, filterText]
    );
  
    const contextActions = useMemo(() => {
      const handleDelete = () => {
        if (window.confirm(`Estás seguro que quieres borrar:\r ${selectedRows.map((r) => r.nombre)}?`)) {
          setToggleCleared(!toggleCleared);
          setPeople(people.filter((r) => !selectedRows.includes(r)));
          selectedRows.forEach((r) => DeletePerson(r.id));
        }
      };
  
      return (
        <Button key="delete" onClick={handleDelete} variant="danger">
          Delete
        </Button>
      );
    }, [people, selectedRows, toggleCleared, setPeople]);
  
    const subHeaderComponentMemo = useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText('');
        }
      };
  
      return (
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      );
    }, [filterText, resetPaginationToggle]);
  
    return (
      <div className="container mt-3">
        <DataTable
          title={type}
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          selectableRows
          persistTableHead
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </div>
    );
  };
  