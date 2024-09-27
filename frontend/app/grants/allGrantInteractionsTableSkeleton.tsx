import { Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { CSSProperties } from "react";

const AllGrantInteractionsTableSkeleton = ({ rows }: { rows: number }) => {

    const cellStyle: CSSProperties = {
        width: '100%',
        height: '20px',
        borderRadius: '8px',
    };

    return (
        <Table aria-label="Loading skeleton for table" style={{ height: 'auto', minWidth: '100%' }}>
            <TableHeader>
                <TableColumn>
                    Foundation name
                </TableColumn>
                <TableColumn>
                    Grant name
                </TableColumn>
                <TableColumn>
                    Average amount
                </TableColumn>
                <TableColumn>
                    Status
                </TableColumn>
                <TableColumn>
                    Deadline
                </TableColumn>
                <TableColumn>
                    Post Date
                </TableColumn>
            </TableHeader>
            <TableBody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                        <TableCell>
                            <Skeleton style={cellStyle} />
                        </TableCell>
                        <TableCell>
                            <Skeleton style={cellStyle} />
                        </TableCell>
                        <TableCell>
                            <Skeleton style={cellStyle} />
                        </TableCell>
                        <TableCell>
                            <Skeleton style={cellStyle} />
                        </TableCell>
                        <TableCell>
                            <Skeleton style={cellStyle} />
                        </TableCell>
                        <TableCell>
                            <Skeleton style={cellStyle} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default AllGrantInteractionsTableSkeleton;
