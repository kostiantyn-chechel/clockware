import { ISortDirection } from "../../../../interfaces";

function descendingComparator(a: any, b: any, orderBy: string) { // --- OK
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: ISortDirection, orderBy: string) {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy) // --- OK
        : (a: any, b: any) => -descendingComparator(a, b, orderBy); // --- OK
}

export function stableSort(array: any[], order: ISortDirection, orderBy: string): any[] { // --- OK
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}