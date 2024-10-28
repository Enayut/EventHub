import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/table';

const rows = [
  {
    key: '1',
    transactionId: 'TXN123456',
    date: '2024-10-15 14:30',
    event: 'Coldplay',
    transactionType: 'Purchase',
    amount: '$120',
    status: 'Completed',
  },
  {
    key: '2',
    transactionId: 'TXN123457',
    date: '2024-10-16 10:15',
    event: 'Ed Sheeran',
    transactionType: 'Purchase',
    amount: '$95',
    status: 'Completed',
  },
  {
    key: '3',
    transactionId: 'TXN123458',
    date: '2024-10-17 18:45',
    event: 'Taylor Swift',
    transactionType: 'Purchase',
    amount: '$150',
    status: 'Completed',
  },
  {
    key: '4',
    transactionId: 'TXN123459',
    date: '2024-10-18 12:00',
    event: 'The Weeknd',
    transactionType: 'Purchase',
    amount: '$110',
    status: 'Completed',
  },
  {
    key: '5',
    transactionId: 'TXN123460',
    date: '2024-10-19 09:30',
    event: 'Billie Eilish',
    transactionType: 'Purchase',
    amount: '$130',
    status: 'Pending',
  },
  {
    key: '6',
    transactionId: 'TXN123461',
    date: '2024-10-19 15:00',
    event: 'Adele',
    transactionType: 'Purchase',
    amount: '$200',
    status: 'Completed',
  },
];

const columns = [
  {
    key: 'transactionId',
    label: 'TRANSACTION ID',
  },
  {
    key: 'date',
    label: 'DATE & TIME',
  },
  {
    key: 'event',
    label: 'EVENT',
  },
  {
    key: 'transactionType',
    label: 'TRANSACTION TYPE',
  },
  {
    key: 'amount',
    label: 'AMOUNT',
  },
  {
    key: 'status',
    label: 'STATUS',
  },
];

const TransactionTable = () => {
  return (
    <Table
      topContent="Your Transactions"
      topContentPlacement="inside"
      isStriped
      aria-label="Example table with dynamic content"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
