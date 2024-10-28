import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, getKeyValue} from "@nextui-org/table";

const rows = [
    {
      key: "1",
      event: "Coldplay",
      status: "Registered",
    },
    {
        key: "2",
        event: "Ed Sheeran",
        status: "Registered"
      },
      {
        key: "3",
        event: "Taylor Swift",
        status: "Registered"
      },
      {
        key: "4",
        event: "The Weeknd",
        status: "Registered"
      },
      {
        key: "5",
        event: "Billie Eilish",
        status: "Registered"
      },
      {
        key: "6",
        event: "Adele",
        status: "Registered"
      }
      
  ];
  
  const columns = [
    {
      key: "event",
      label: "EVENT",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

const EventsTable = () => {
    return (
        <Table topContent="Your Events" topContentPlacement="inside" isStriped aria-label="Example table with dynamic content" className="text-text">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
}

export default EventsTable;