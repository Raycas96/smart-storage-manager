import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { DispatchType } from '../../../../types/DispatchType';
import { TypeSelect } from '../../enums/TypeSelect.enum';

const SelectType: React.FC<{
  dispatch: (payload: DispatchType<string>) => void;
  initialValue: string;
}> = ({ dispatch, initialValue }) => (
  <Grid container className="mb-2 text-left">
    <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Storage Source</InputLabel>
        <Select
          size="small"
          labelId="select-label"
          value={initialValue}
          label="Storage Source"
          onChange={(e) =>
            dispatch({
              type: TypeSelect.TYPE,
              payload: e.target.value,
            })
          }
        >
          <MenuItem value="1">Both</MenuItem>
          <MenuItem value="2">Local Storage</MenuItem>
          <MenuItem value="3">Session Storage</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

export default SelectType;
