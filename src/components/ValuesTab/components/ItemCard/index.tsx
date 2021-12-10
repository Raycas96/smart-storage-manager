import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { StorageValueType } from '../../../../types/Storage.type';
import CopyIcon from '../CopyIcon';
import DeleteIcon from '../DeleteIcon';
import styles from './ItemCard.module.css';

const itemCard: React.FC<StorageValueType> = ({
  storeKey: key,
  value,
  tabId,
  storage,
}) => (
  <Card className={styles.itemCard}>
    <CardContent className={styles.itemCard}>
      <Grid container>
        <Grid
          item
          xs={1}
          xl={1}
          lg={1}
          sm={1}
          md={1}
          className={styles.iconsContainer}
        >
          <Box sx={{ mb: 1 }}>
            <CopyIcon text={value} />
          </Box>
          <DeleteIcon tabId={tabId} keyValue={key} />
        </Grid>
        <Grid item xs={11} xl={11} lg={11} sm={11} md={11}>
          <Grid container>
            <Grid item xs={2} xl={2} lg={2} sm={2} md={2}>
              <span>Key:</span>
            </Grid>
            <Grid
              item
              xs={10}
              xl={10}
              lg={10}
              sm={10}
              md={10}
              sx={{ fontSize: 'small', wordWrap: 'break-word' }}
            >
              {key}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} xl={6} lg={6} sm={6} md={6}>
              <hr className="pinkColor" />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} xl={2} lg={2} sm={2} md={2}>
              <span>Value:</span>
            </Grid>
            <Grid
              item
              xs={10}
              xl={10}
              lg={10}
              sm={10}
              md={10}
              className={`${styles.itemValue}`}
            >
              <Typography noWrap sx={{ fontSize: 'small' }}>
                {value}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} xl={6} lg={6} sm={6} md={6}>
              <hr className="pinkColor" />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} xl={2} lg={2} sm={2} md={2}>
              <span>Source:</span>
            </Grid>
            <Grid
              item
              xs={10}
              xl={10}
              lg={10}
              sm={10}
              md={10}
              className={`${styles.itemValue}`}
            >
              <Typography noWrap sx={{ fontSize: 'small' }}>
                {storage}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default itemCard;
