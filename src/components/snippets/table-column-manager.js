import React from 'react'

const TableColumnManager = ({ tblColumns, setTblColumns, omitLastColumn = true, classes="" }) => {
    const handleColumns = (index) => {
        setTblColumns(tblColumns.map((d, i) => { return (i === index) ? ({ ...d, 'omit': !d.omit }) : d }));
    }

    return (
        <div>
            <button className={`${classes} btn btn-sm btn-grey dropdown-toggle`} data-toggle="dropdown" type="button">More Columns</button>
            <div className="dropdown-menu c-dropdown-menu">
                {
                    tblColumns && tblColumns.map((el, index) => {
                        return (
                            omitLastColumn ?
                                index !== (tblColumns.length - 1) ?
                                    <label key={index} className="dropdown-item cursor-pointer form-check-label justify-content-start">
                                        <input className="form-check-input" id={el.code} name={el.code} defaultChecked={el.omit ? false : true} value={el.omit ? false : true} type="checkbox" onChange={() => handleColumns(index)} />{el.name}
                                    </label> : null
                                :
                                <label key={index} className="dropdown-item cursor-pointer form-check-label justify-content-start">
                                    <input className="form-check-input" id={el.code} name={el.code} defaultChecked={el.omit ? false : true} value={el.omit ? false : true} type="checkbox" onChange={() => handleColumns(index)} />{el.name}
                                </label>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TableColumnManager