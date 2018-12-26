import React, {Component} from 'react'

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Remove</th>
        </tr>
        </thead>
    );
}

const TableBody = props => {
    const rows = props.tableBodyCharacterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.account}</td>
                <td>{row.value}</td>
                <td><button onClick={()=> props.tableBodyRemoveCharacter(index)}>Delete</button></td>
            </tr>
        );
    });
    return (
        <tbody>{rows}</tbody>
    );
}

class Table extends Component {
    render() {
        const {characterData, removeCharacter} = this.props;
        return (
            <table>
                <TableHeader/>
                <TableBody
                    tableBodyCharacterData={characterData} // this.props.characterData
                    tableBodyRemoveCharacter={removeCharacter} // this.props.removeCharacter
                />
            </table>
        );
    }
}

export default Table;