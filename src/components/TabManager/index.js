import React from 'react';
import {
    Box,
    Paper,
    Tab,
    Tabs,
    Typography,
    Grid,
    Card,
    CardContent,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    SnackbarContent,
    Snackbar,
    FormControlLabel,
    Checkbox,
    Input
} from '@material-ui/core';
import {
    StyledInput,
    StyledGrid,
    StyledButton,
    StyledPaper
} from '../App/styled';

export default class TabManager extends React.Component {
    state = {
        manager: {
            name: 'Marian',
            surname: 'Kowalski'
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    onShowAdd = () => {
        const newShow = {
            name: this.state.showName,
            category: this.state.showCategory,
            seats: this.state.showSeats,
            price: this.state.showPrice
        };
        if (Object.values(newShow).some(value => !value)) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Uzupełnij cały formularz.`,
                    color: 'red'
                }
            });
        } else {
            this.props.onShowAdd(newShow);
            //     snackbar: {
            //         ...this.state.snackbar,
            //         open: true,
            //         message: `Udało dodać się seans ${newShow.name}.`,
            //         color: 'green'
            //     }
            // });
        }
    };

    onRemoveShow = () => {
        if (!this.state.showToRemoveName) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Podaj nazwę seansu, który chcesz usunąć.`,
                    color: 'red'
                }
            });
        }

        const showToRemove = this.state.cinema.shows.find(
            show => show.name === this.state.showToRemoveName
        );

        if (!showToRemove) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Seans o nazwie ${this.state.showToRemoveName} nie istnieje.`,
                    color: 'red'
                }
            });
        } else {
            const filteredShows = this.state.cinema.shows.filter(
                show => show.name !== this.state.showToRemoveName
            );
            this.setState({
                cinema: {
                    ...this.state.cinema,
                    shows: filteredShows
                },
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Udało usunąć się seans ${this.state.showToRemoveName}.`,
                    color: 'green'
                }
            });
        }
    };

    render() {
        console.log(this.state);
        return (
            <>
                <Typography variant="h6">Dane:</Typography>
                <Typography variant="body1">
                    Imię: {this.state.manager.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Nazwisko: {this.state.manager.surname}
                </Typography>
                <Grid direction="row" container justify="space-evenly">
                    <Card variant="outlined">
                        <CardContent>
                            <StyledGrid
                                direction="column"
                                justify="space-between"
                                alignItems="flex-start"
                            >
                                <StyledInput
                                    placeholder="Nazwa seansu"
                                    required
                                    name="showName"
                                    onChange={this.handleInputChange}
                                />
                                <StyledInput
                                    placeholder="Kategoria filmu"
                                    required
                                    name="showCategory"
                                    onChange={this.handleInputChange}
                                />
                                <StyledInput
                                    placeholder="Ilość miejsc"
                                    required
                                    name="showSeats"
                                    onChange={this.handleInputChange}
                                    type="number"
                                />
                                <StyledInput
                                    placeholder="Cena biletu"
                                    required
                                    name="showPrice"
                                    onChange={this.handleInputChange}
                                    type="number"
                                />
                                <StyledButton
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onShowAdd}
                                    disabled={
                                        !this.state.showName ||
                                        !this.state.showCategory ||
                                        !this.state.showSeats ||
                                        !this.state.showPrice
                                    }
                                >
                                    Dodaj seans
                                </StyledButton>
                            </StyledGrid>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <StyledGrid>
                                <StyledInput
                                    placeholder="Nazwa seansu"
                                    required
                                    name="showToRemoveName"
                                    onChange={this.handleInputChange}
                                />
                                <StyledButton
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.onRemoveShow}
                                    disabled={!this.state.showToRemoveName}
                                >
                                    Usuń seans
                                </StyledButton>
                            </StyledGrid>
                        </CardContent>
                    </Card>
                </Grid>
            </>
        );
    }
}
