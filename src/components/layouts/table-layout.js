import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { TableLoader, TableWithNoData } from "../snippets/template-blocks";
import SimpleTable from "../snippets/simple-table";

const TableLayout = ({
  buttonaLable = "",
  pending = true,
  setPending = function o() { },
  defaultSortColumn = "id",
  _tblColumns = [],
  _rowData = [],
  // tableCustomStyles = {},
  _totalRows,
  paginationServer = true,
  isFilter = false,
  title = null,
  isShowAddButton = true,
  showPagination = {},
  handleNew = function o() { },
  setSortDirection = function o() { },
  setSortColumn = function o() { },
  setPageSize = function o() { },
  setPage = function o() { },
  setSearchTerm = function o() { },
  pageSize,
  pagination = true,
  selectableRows = false,
  setSelectedRows = false,
  expandableRowsComponent,
  expandableRows = false,
  selectedData = [],
  _isExpandable = true,
  setselectedData = function o() { },
  handleBulkDelete = function o() { },
  setIsSearchTriggered = function o() { },
  lableForDelete = "",
  isCSVShowAddButton = false,
  csvheaders = [],
  csvData,
  csvFileName = "",
  paginationResetDefaultPage = false,
  firsttabledata,
  secondtabledata,
  bgClass,
  buttonClass,
}) => {
  const { t } = useTranslation();
  // const [tableColumns, setTableColumns] = useState(_tblColumns);
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  // Handle page change
  const handlePageChange = async (newPage) => {
    const adjustedPage = newPage !== 0 ? newPage - 1 : newPage;
    setIsSearchTriggered(true);
    setPage(adjustedPage);
    setCurrentPage(newPage); // Update the current page
  };

  // Handle rows per page change
  const handlePerRowsChange = async (newPerPage, newPage) => {
    setPageSize(newPerPage);
    handlePageChange(newPage);
  };

  // Handle sorting changes
  const handleSort = async (column, sortDirection) => {
    setSortColumn(column.code ? column.code : "id");
    setSortDirection(sortDirection);
    handlePageChange(1); // Go to the first page when sorting
  };

  // Handle row selection changes
  const handleSelectionChange = ({ selectedRows }) => {
    if (setSelectedRows) {
      setselectedData([...selectedRows]);
      setSelectedRows(selectedRows);
    }
  };

  const paginationComponentOptions = {
    rowsPerPageText: t("Rows per page"),
    rangeSeparatorText: t("of"),
  };
  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#1B2128",
        fontSize: "14px",
        // overflowX: "auto",
      },
    },
    rows: {
      style: {
        color: "#1B2128",
        fontSize: "14px",
        // overflowX: "auto",
      },
    },
  };
  return (
    <>
      {_rowData && (
        <div className="row">
          <div className="col-12 Table_content">
            {_isExpandable ? (
              <DataTable
                selectableRows={selectableRows}
                columns={_tblColumns}
                data={_rowData}
                className="dataTableStyle"
                responsive={true}
                customStyles={tableCustomStyles}
                direction="auto"
                paginationServer={paginationServer}
                paginationTotalRows={_totalRows}
                pagination={pagination}
                onSort={handleSort}
                paginationPerPage={pageSize}
                onSelectedRowsChange={handleSelectionChange}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                expandableRows={expandableRows}
                expandableRowsComponent={expandableRowsComponent}
                defaultSortAsc={false}
                subHeader={selectedData?.length !== 0}
                persistTableHead
                sortServer={true}
                paginationResetDefaultPage={paginationResetDefaultPage}
                paginationComponentOptions={paginationComponentOptions}
                progressPending={pending}
                progressComponent={<TableLoader />}
                // noDataComponent={<TableWithNoData />}
                noDataComponent={
                  <TableWithNoData hasData={_rowData.length > 0} />
                }
              />
            ) : (
              <SimpleTable
                columns={_tblColumns}
                rows={_rowData}
                isLoading={pending}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TableLayout;
