import { AppBar, Toolbar, Typography } from "@mui/material";
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
function Header() {

    function handleClick() {


    }
    return (
        <div>
            <AppBar position="static">
          <Toolbar>
            <Typography>
            <h2>Skillfy</h2>
            </Typography>

            <form noValidate autoComplete="on">
             <FormControl sx={{ width: '25ch' }}>
               <OutlinedInput placeholder="Please enter text" />

                </FormControl>

            </form>
            <Button
             id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
            </Toolbar>  
        </AppBar>
        </div>

    );
}
export default Header;