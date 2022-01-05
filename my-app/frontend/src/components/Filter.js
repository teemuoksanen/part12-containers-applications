import React from 'react'

const Filter = ({nameFilter, handleFilterChange}) => {
    return (
        <div>
            <form>
                <div>
                    filter shown with <input
                    value={nameFilter}
                    onChange={handleFilterChange} />
                </div>
            </form>
        </div>
    )
}

export default Filter