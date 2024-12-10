import classNames from 'classnames';
import { SortAscIcon, SortDescIcon } from '../assets/icons';
import '../styles/Table.css';
import React from 'react';

export const TableHeading = ({ label, active, sortDirection, onClick }) => {

    const getSortIcon = () => {
        if (active && sortDirection) {
            return sortDirection === 'asc' ? <SortAscIcon /> : <SortDescIcon />;
        }
    };

    const thClasses = classNames(
        'sticky top-0 bg-white z-10 border-b border-neutral-800 dark:bg-neutral-950 p-1 font-semibold cursor-pointer',
        { 'text-asu-maroon dark:text-asu-gold': active }
    );

    return (
        <th className={thClasses} onClick={onClick}>
            <div className="flex items-center justify-start pl-2">
                <span className="flex-1 mr-1 whitespace-nowrap">{label}</span>
                <span className="flex-4 text-xl ml-1">{getSortIcon()}</span>
            </div>
        </th>
    );
};