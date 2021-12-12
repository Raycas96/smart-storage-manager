import { Grid } from '@mui/material';
import React from 'react';
import { StorageEnum } from '../../enums/storage.enum';
import StorageCounter from '../StorageItemCounter';
import TabCounter from '../TabCounter';

const Header: React.FC = () => (
  <Grid container spacing={1}>
    <Grid item xs={4} xl={4} lg={4} sm={4} md={4}>
      <TabCounter />
    </Grid>
    <Grid item xs={4} xl={4} lg={4} sm={4} md={4}>
      <StorageCounter type={StorageEnum.LOCAL} />
    </Grid>
    <Grid item xs={4} xl={4} lg={4} sm={4} md={4}>
      <StorageCounter type={StorageEnum.SESSION} />
    </Grid>
  </Grid>
);

export default Header;
