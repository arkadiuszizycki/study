import styled from 'styled-components';
import {
    Typography,
    Button,
    Box,
    Paper,
    Tab,
    Tabs,
    Input,
    Grid
} from '@material-ui/core';

export const StyledInput = styled(Input)`
    margin: 10px;
    width: 400px;
`;

export const StyledGrid = styled(Grid)`
    width: 500px;
`;

export const StyledButton = styled(Button)`
    &.MuiButtonBase-root {
        margin-top: 30px;
    }
`;

export const StyledPaper = styled(Paper)`
    margin-top: 10px;
`;
