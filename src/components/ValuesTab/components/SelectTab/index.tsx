import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { DispatchType } from '../../../../types/DispatchType';
import { PageType } from '../../../../types/PageType';
import { TypeSelect } from '../../enums/TypeSelect.enum';

const SelectTab: React.FC<{
  dispatch: (payload: DispatchType<string | number>) => void;
  value: number;
  windowPagesName: PageType[];
}> = ({ dispatch, value, windowPagesName }) => (
  <Grid container className="mb-2 text-left">
    <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
      <FormControl fullWidth>
        <InputLabel id="tab-label">Tab</InputLabel>
        <Select
          size="small"
          labelId="Tab"
          value={value}
          label="Tab"
          onChange={(e) =>
            dispatch({
              type: TypeSelect.TAB,
              payload: e.target.value as number,
            })
          }
          className="w-100"
        >
          {windowPagesName.map(({ name, id }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

export default SelectTab;
