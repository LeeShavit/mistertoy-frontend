import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { toyService } from '../services/toy.service.js';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const labels = toyService.getLabels()

function getStyles(label, selectedLabels, theme) {
    return {
        fontWeight: selectedLabels.includes(label)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export function MultiSelect({parentLabels, handleChangeLabels}) {
    const theme = useTheme();
    const [selectedLabels, setSelectedLabels] = useState(parentLabels);

    useEffect(()=>{
        handleChangeLabels(selectedLabels)
    },[selectedLabels])


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedLabels(
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: 305 }}>
                <InputLabel id="demo-multiple-chip-label">Labels</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedLabels}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {labels.map((label) => (
                        <MenuItem
                            key={label}
                            value={label}
                            style={getStyles(label, selectedLabels, theme)}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
