import React from 'react'
import DataTable from 'react-data-table-component';
import { TableLoader } from './template-blocks';

const SimpleTable = ({
    columns = null,
    rows = null,
    isLoading = false
}) => {
    return (
        <DataTable
            columns={columns}
            data={rows}
            progressPending={isLoading}
            progressComponent={<TableLoader />}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            responsive="true"
            pagination
            striped
        />
    )
}

export default SimpleTable;