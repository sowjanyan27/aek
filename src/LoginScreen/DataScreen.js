import React, { Component } from "react";
import withRouter from "../helpers/Routers";

class DataScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchId: "",
            searchValue: "",
            filterData: [],
            nodataFound: false,
            data: [
                {
                    id: 1,
                    FName: 'Ghost',
                    LName: 'busters',
                    year: '1984/05/23',
                    gender: "Male",
                    PhNum: "87654321"
                },
                {
                    id: 2,
                    FName: 'John',
                    LName: 'Sena',
                    year: '1984/05/23',
                    gender: "Male",
                    PhNum: "76543821"
                },
                {
                    id: 3,
                    FName: 'Mia',
                    LName: 'Maya',
                    year: '1984/05/23',
                    gender: "Female",
                    PhNum: "65487321"
                },
                // Add more data as needed
            ]

        }
    }

    handleFilterId = (text) => {
        var value = text.target.value.toLowerCase();
        this.setState({ searchId: value })
        var filteredArray = data.filter(item => {
            return (
                item.id.toString().toLowerCase().includes(value)
            );
        });
        this.setState({ filterData: filteredArray, nodataFound: filteredArray.length === 0 })

    }

    handleFilter = (text) => {
        var value = text.target.value.toLowerCase();
        this.setState({ searchValue: value })

        const filteredArray = data.filter(item => {
            return (
                item.id.toString().toLowerCase().includes(value) ||
                item.FName.toLowerCase().includes(value) ||
                item.LName.toLowerCase().includes(value) ||
                item.year.toLowerCase().includes(value) ||
                item.gender.toLowerCase().includes(value) ||
                item.PhNum.toLowerCase().includes(value)
            );
        });
        this.setState({ filterData: filteredArray, nodataFound: filteredArray.length === 0 })
    };

    render() {
        return (
            <div className="container ">
                <div className="mt-4 shadow_box">
                    <TableContainer className="mt-4 mb-4" component={Paper}>
                        <div className="mt-4 mb-4" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <input
                                className="ms-4"
                                type="number"
                                value={this.state.searchId}
                                onChange={(text) => { this.handleFilterId(text) }} // Changed parameter to e.target.value
                                placeholder="Search Id"
                            />
                            <input
                                className="me-4"
                                value={this.state.searchValue}
                                onChange={(text) => { this.handleFilter(text) }} // Changed parameter to e.target.value
                                placeholder="Search..."
                            />
                        </div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>D.O.J</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.nodataFound ? (
                                    <TableRow>
                                        <TableCell colSpan={7}>No data found</TableCell>
                                    </TableRow>
                                ) : (
                                    this.state.filterData.length === 0 ? (
                                        this.state.data.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.FName}</TableCell>
                                                <TableCell>{row.LName}</TableCell>
                                                <TableCell>{row.year}</TableCell>
                                                <TableCell>{row.gender}</TableCell>
                                                <TableCell>{row.PhNum}</TableCell>
                                                <TableCell>
                                                    <Button variant="outlined">View</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        this.state.filterData.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.FName}</TableCell>
                                                <TableCell>{row.LName}</TableCell>
                                                <TableCell>{row.year}</TableCell>
                                                <TableCell>{row.gender}</TableCell>
                                                <TableCell>{row.PhNum}</TableCell>
                                                <TableCell>
                                                    <Button variant="outlined">View</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </div>
            </div>

        )
    }

}
export default withRouter(DataScreen)