import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';


const Practics: React.FC = () => {
    const [country, setcountry] = useState('');
    const [acceptTnc, setacceptTnc] = useState(false)
    console.log(acceptTnc)
    console.log(country);
    const handleTnc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setacceptTnc(event.target.checked)
    }
    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setcountry(event.target.value as string);
    }


    return (
        <div className='App'>
            <Typography variant='h1'> h1 heading</Typography>
            <Typography variant='subtitle1'>Subtitle 1</Typography>
            <Typography variant='body1'>body 1 fjksfdhfsafnda sjsfh fnadsjifao sofdsofjo sfndsof</Typography>
            <Stack spacing={2} direction='column' >
                <Stack spacing={2} direction='row'>
                    <Button variant='contained' size='large' color='primary' startIcon={<SendIcon />}>Contained</Button>
                    <Button variant='text' size='medium' color='info'>Text</Button>
                    <Button variant='outlined' size='small' color='success'>Outlined</Button>



                </Stack>
                <Box width='250px'>
                    <TextField label='Select country' variant='outlined' size='small'
                        select fullWidth value={country} onChange={handleCountryChange}
                    >
                        <MenuItem value='In'>India</MenuItem>
                        <MenuItem value='Ch'>China</MenuItem>
                        <MenuItem value='Au'>America</MenuItem>
                    </TextField>
                </Box>

                <Box>
                    <FormControl>
                        <FormLabel id='select-age-group'>
                            Select your agr group?
                        </FormLabel>
                        <RadioGroup name='age-group' aria-labelledby='select-age-group' row>
                            <FormControlLabel control={<Radio />} label='10-15' value='10-15' />
                            <FormControlLabel control={<Radio />} label='15-20' value='15-20' />
                            <FormControlLabel control={<Radio />} label='20-25' value='20-25' />


                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <FormControlLabel label="Accept terms and conditions" control={<Checkbox value={acceptTnc} onChange={handleTnc} />}
                    />
                </Box>
                <Box sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    height: '100px',
                    width: '100px',
                    padding: '16px',
                    '&:hover': {
                        backgroundColor: 'primary.light'
                    }


                }}>
                    Code evaluation
                </Box>
            </Stack>




        </div>
    )
}

export default Practics