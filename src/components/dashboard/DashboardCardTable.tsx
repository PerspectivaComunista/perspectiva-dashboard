'use client';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/table';

export default function DashboardCardTable({
	columns,
	rows,
}: {
	columns: {
		key: string;
		label: string;
	}[];
	rows: any[];
}) {
	const windowSize = useWindowSize();
	return (
		<Table removeWrapper aria-label="Small table made to fit inside the dashboard widgets." className="mt-4 p-0">
			<TableHeader columns={columns.slice(0, windowSize.width && windowSize.width > 680 ? columns.length : 1)}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody emptyContent={'Nu există date de afișat.'} items={rows}>
				{(item) => (
					<TableRow
						key={item.key}
						className={rows.indexOf(item) == rows.length - 1 ? '' : 'border-b-1 border-gray-200'}>
						{(columnKey) => <TableCell className="align-top">{getKeyValue(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
