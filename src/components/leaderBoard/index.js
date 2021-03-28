/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import style from './style'
import { consumer } from '../../context/consumer'
import { red} from '../../contants'

const columns = [
    { id: 'username', label: 'Username', minWidth: 170, },
    { id: 'score', label: 'Score', minWidth: 100 },
    // {
    //     id: 'salary',
    //     label: 'Salary',
    //     minWidth: 170,
    //     align: 'right',
    //     format: value => value.toLocaleString('en-US')
    // },
    // {
    //     id: 'popularity',
    //     label: 'Popularity',
    //     minWidth: 170,
    //     align: 'right',
    //     format: value => value.toLocaleString('en-US')
    // }
    
];

const { gradient, } = style;


const useStyles = makeStyles({
    root: {
        width: '100%',
        '&$hover:hover': {
            // Set hover color
            backgroundColor: 'red'
        }
    },
    container: {
        maxHeight: 440
    },

    tableRow: {
        cursor: 'pointer'
        
    }

});

const LeaderBoard = props => {
    const { careerData, dataContext} = props;
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [bgColor, setBgColor] = useState(red);

    const { orderEntries } = dataContext
    console.log("debugger--", orderEntries)
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const bgStyle = css`
            height: 100vh;
            animation: ${gradient} 9s ease infinite;
            background-size: 400% 400%;
            // background-image: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
            background-image: linear-gradient(-45deg, ${bgColor});
   
    `;

    return (
        <div css={[bgStyle]}>
        <Paper className={classes.root} style={{ width: '60%', margin: 'auto' }}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                            {orderEntries && orderEntries.map(row => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} className={classes.tableRow}>
                                {columns.map(column => {
                                    debugger
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={careerData && careerData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        </div>
    );
};

export default consumer(LeaderBoard);
