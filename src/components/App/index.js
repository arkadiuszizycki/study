import React from 'react';
import SwipeableViews from 'react-swipeable-views';
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
import { StyledInput, StyledGrid, StyledButton, StyledPaper } from './styled';
import TabManager from '../TabManager/';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <StyledPaper
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </StyledPaper>
    );
}

class App extends React.Component {
    state = {
        snackbar: {
            open: false,
            message: '',
            color: 'green'
        },
        value: 2,
        manager: {
            name: 'Marian',
            surname: 'Kowalski'
        },
        employee: {
            name: 'Wacław',
            surname: 'Nowakowski'
        },
        client: {
            name: 'Arkadiusz',
            surname: 'Iżycki',
            reservations: 0
        },
        cinema: {
            name: 'Luna',
            shows: []
        }
    };

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
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

    handleClose = () => {
        this.setState({
            snackbar: {
                ...this.state.snackbar,
                open: false
            }
        });
    };

    onShowAdd = newShow => {
        this.setState({
            cinema: {
                ...this.state.cinema,
                shows: [...this.state.cinema.shows, newShow]
            }
        });
    };

    onBookShow = () => {
        if (!this.state.showToBookName) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Podaj nazwę seansu, który chcesz zarezerwować.`,
                    color: 'red'
                }
            });
        }
        const showToBook = this.state.cinema.shows.find(
            show => show.name === this.state.showToBookName
        );

        if (!showToBook) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Seans o nazwie ${this.state.showToBookName} nie istnieje.`,
                    color: 'red'
                }
            });
        } else if (!showToBook.seats) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Brak wolnych miejsc na ${this.state.showToBookName}`,
                    color: 'red'
                }
            });
        } else {
            this.setState({
                cinema: {
                    ...this.state.cinema,
                    shows: this.state.cinema.shows.map(show =>
                        show.name === this.state.showToBookName
                            ? { ...show, seats: show.seats - 1 }
                            : show
                    )
                },
                client: {
                    ...this.state.client,
                    reservations: this.state.client.reservations + 1
                }
            });
        }
    };

    onBuyTicket = () => {
        if (!this.state.showToBuyName) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: 'Podaj nazwę seansu, który chcesz zarezerwować.',
                    color: 'red'
                }
            });
        }
        if (this.state.ticketReserved) {
            this.setState({
                client: {
                    ...this.state.client,
                    reservations: this.state.client.reservations - 1
                },
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Kupiono zarezerwowany bilet na ${this.state.showToBuyName}`,
                    color: 'green'
                }
            });
        } else {
            this.setState({
                cinema: {
                    ...this.state.cinema,
                    shows: this.state.cinema.shows.map(show =>
                        show.name === this.state.showToBookName
                            ? { ...show, seats: show.seats - 1 }
                            : show
                    )
                },
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Kupiono bilet na ${this.state.showToBuyName}`,
                    color: 'green'
                }
            });
        }
    };

    onCancelReservation = () => {
        if (!this.state.showHandledByClient) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message:
                        'Podaj nazwę seansu, którego rezerwację chcesz anulować.',
                    color: 'red'
                }
            });
        } else {
            return this.setState({
                cinema: {
                    ...this.state.cinema,
                    shows: this.state.cinema.shows.map(show =>
                        show.name === this.state.showHandledByClient
                            ? { ...show, seats: show.seats + 1 }
                            : show
                    )
                },
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Usunięto rezerwację ${this.state.showHandledByClient}`,
                    color: 'green'
                },
                client: {
                    ...this.state.client,
                    reservations: this.state.client.reservations - 1
                }
            });
        }
    };

    onBookShowByClient = () => {
        if (!this.state.showHandledByClient) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Podaj nazwę seansu, który chcesz zarezerwować.`,
                    color: 'red'
                }
            });
        }
        const showToBook = this.state.cinema.shows.find(
            show => show.name === this.state.showHandledByClient
        );

        if (!showToBook) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Seans o nazwie ${this.state.showHandledByClient} nie istnieje.`,
                    color: 'red'
                }
            });
        } else if (!showToBook.seats) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Brak wolnych miejsc na ${this.state.showHandledByClient}`,
                    color: 'red'
                }
            });
        } else {
            this.setState({
                cinema: {
                    ...this.state.cinema,
                    shows: this.state.cinema.shows.map(show =>
                        show.name === this.state.showHandledByClient
                            ? { ...show, seats: show.seats - 1 }
                            : show
                    )
                },
                client: {
                    ...this.state.client,
                    reservations: this.state.client.reservations + 1
                }
            });
        }
    };

    onBuyTicketByClient = () => {
        if (!this.state.showHandledByClient) {
            return this.setState({
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: 'Podaj nazwę seansu, który chcesz zarezerwować.',
                    color: 'red'
                }
            });
        }
        if (this.state.ticketReserved) {
            this.setState({
                client: {
                    ...this.state.client,
                    reservations: this.state.client.reservations - 1
                },
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Kupiono zarezerwowany bilet na ${this.state.showHandledByClient}`,
                    color: 'green'
                }
            });
        } else {
            this.setState({
                cinema: {
                    ...this.state.cinema,
                    shows: this.state.cinema.shows.map(show =>
                        show.name === this.state.showHandledByClient
                            ? { ...show, seats: show.seats - 1 }
                            : show
                    )
                },
                snackbar: {
                    ...this.state.snackbar,
                    open: true,
                    message: `Kupiono bilet na ${this.state.showHandledByClient}`,
                    color: 'green'
                }
            });
        }
    };

    render() {
        return (
            <div className="App">
                <Paper square>
                    <Tabs
                        value={this.state.value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Kierownik" />
                        <Tab label="Pracownik" />
                        <Tab label="Widz" />
                    </Tabs>
                </Paper>
                <SwipeableViews
                    axis={'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChange}
                >
                    <TabPanel value={this.state.value} index={0} dir={'x'}>
                        <TabManager onShowAdd={this.onShowAdd} />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1} dir={'x'}>
                        <Typography variant="h6">Dane:</Typography>
                        <Typography variant="body1">
                            Imię: {this.state.employee.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Nazwisko: {this.state.employee.surname}
                        </Typography>
                        <Grid direction="row" container justify="space-evenly">
                            <Card variant="outlined">
                                <CardContent>
                                    <StyledGrid>
                                        <StyledInput
                                            placeholder="Nazwa seansu"
                                            required
                                            name="showToBookName"
                                            onChange={this.handleInputChange}
                                        />
                                        <StyledButton
                                            variant="contained"
                                            color="primary"
                                            onClick={this.onBookShow}
                                            disabled={
                                                !this.state.showToBookName
                                            }
                                        >
                                            Rezerwuj seans
                                        </StyledButton>
                                    </StyledGrid>
                                </CardContent>
                            </Card>
                            <Card variant="outlined">
                                <CardContent>
                                    <StyledGrid>
                                        <Grid
                                            direction="row"
                                            container
                                            justify="space-between"
                                        >
                                            <Input
                                                placeholder="Nazwa seansu"
                                                required
                                                name="showToBuyName"
                                                onChange={
                                                    this.handleInputChange
                                                }
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            this.state
                                                                .ticketReserved
                                                        }
                                                        name="ticketReserved"
                                                        onChange={
                                                            this
                                                                .handleInputChange
                                                        }
                                                        value="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                label="Rezerwowany"
                                            />
                                        </Grid>
                                        <StyledButton
                                            variant="contained"
                                            color="primary"
                                            onClick={this.onBuyTicket}
                                            disabled={!this.state.showToBuyName}
                                        >
                                            Kup bilet
                                        </StyledButton>
                                    </StyledGrid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2} dir={'x'}>
                        <Typography variant="h6">Dane:</Typography>
                        <Typography variant="body1">
                            Imię: {this.state.client.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Nazwisko: {this.state.client.surname}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Rezerwacje: {this.state.client.reservations}
                        </Typography>
                        <Card variant="outlined">
                            <CardContent>
                                <StyledGrid>
                                    <StyledInput
                                        placeholder="Nazwa seansu"
                                        required
                                        name="showHandledByClient"
                                        onChange={this.handleInputChange}
                                    />
                                    <Grid
                                        direction="row"
                                        container
                                        justify="space-between"
                                    >
                                        <StyledButton
                                            variant="contained"
                                            color="primary"
                                            onClick={this.onBuyTicketByClient}
                                            disabled={
                                                !this.state.showHandledByClient
                                            }
                                        >
                                            Kup
                                        </StyledButton>
                                        <StyledButton
                                            variant="contained"
                                            color="default"
                                            onClick={this.onBookShowByClient}
                                            disabled={
                                                !this.state.showHandledByClient
                                            }
                                        >
                                            Zarezerwuj
                                        </StyledButton>
                                        <StyledButton
                                            variant="contained"
                                            color="secondary"
                                            disabled={
                                                !this.state.client.reservations
                                            }
                                            onClick={this.onCancelReservation}
                                        >
                                            Anuluj Rezerwację
                                        </StyledButton>
                                    </Grid>
                                </StyledGrid>
                            </CardContent>
                        </Card>
                    </TabPanel>
                </SwipeableViews>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tytuł</TableCell>
                                <TableCell align="right">Kategoria</TableCell>
                                <TableCell align="right">
                                    Ilość miejsc
                                </TableCell>
                                <TableCell align="right">Cena biletu</TableCell>
                                <TableCell align="right">Kino</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.cinema.shows.map(show => (
                                <TableRow key={show.name}>
                                    <TableCell component="th" scope="row">
                                        {show.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {show.category}
                                    </TableCell>
                                    <TableCell align="right">
                                        {show.seats}
                                    </TableCell>
                                    <TableCell align="right">
                                        {show.price}
                                    </TableCell>
                                    <TableCell align="right">
                                        {this.state.cinema.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    open={this.state.snackbar.open}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                >
                    <SnackbarContent
                        style={{
                            backgroundColor: `${this.state.snackbar.color}`
                        }}
                        message={
                            <span id="client-snackbar">
                                {this.state.snackbar.message}
                            </span>
                        }
                    />
                </Snackbar>
            </div>
        );
    }
}

export default App;
