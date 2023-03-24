import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TableEntry } from './TableEntry';
import { TableHeading } from './TableHeading';
import { tableBody } from '../utils/variants';
import { getKey } from '../const/tableLabels';

export const Table = ({ labels, columns, entries, name, setEntries }) => {

    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const sortEntries = (entries, column, direction) => {
        const sortedEntries = [...entries];
        sortedEntries.sort((a, b) => {
            if (getValue(a, column) > getValue(b, column)) {
                return (direction === 'asc') ? 1 : -1;
            }
            if (getValue(a, column) < getValue(b, column)) {
                return (direction === 'asc') ? -1 : 1;
            }
            return 0;
        });
        return sortedEntries;
    };

    const sortByColumn = (column) => {
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc' 
        setEntries(sortEntries(entries, column, newSortDirection))
        setSortedColumn(column)
        setSortDirection(newSortDirection);
    };

    const getValue = (entry, column) => {
        const key = getKey(column, name);
        const value = entry.data?.()[key] || 'N/A';
        return value;
    }

    return (
            <table className="w-full table-auto border-separate border-spacing-0">
                <thead>
                    <tr>
                        <TableHeading label="Actions" />
                        {labels &&
                            labels.map((label) => (columns[label]?.show) && 
                            <TableHeading 
                                key={label} 
                                label={label} 
                                active={sortedColumn === label} 
                                sortDirection={sortDirection} 
                                onClick={() => {
                                    sortByColumn(label)
                                }}
                            />)}
                    </tr>
                </thead>
                <motion.tbody
                    initial='hidden'
                    animate='visible'
                    variants={tableBody}
                >
                    {entries.map((entry, index) => (
                        <TableEntry
                            index={index}
                            key={entry.id}
                            entrySnapshot={entry}
                            shownColumns={[...labels].filter(label => columns[label]?.show)}
                            tableName={name}
                            removeEntry={() => {
                                setEntries(entries.filter(e => e !== entry));
                            }}
                        />
                    ))}
                </motion.tbody>
            </table>
    );
};