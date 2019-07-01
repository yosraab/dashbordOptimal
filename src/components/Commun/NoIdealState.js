/* eslint-disable no-nested-ternary */
import React from 'react';
import { Typography } from '@material-ui/core/';
import NoMenus from '../../images/icons/no_menu.svg';
import NoProducts from '../../images/icons/no_product.svg';
import NoContents from '../../images/icons/no_folder.svg';
import NoHistory from '../../images/icons/no_orders.svg';
import NoOrders from '../../images/icons/no_history.svg';
import NoTables from '../../images/icons/no_table.svg';
import NoTicket from '../../images/icons/no_ticket.svg';
import NoBasket from '../../images/icons/no_basket.svg';
import NoUser from '../../images/icons/no_user.svg';
import NoPlan from '../../images/icons/no_plan.svg';

const NoIdealState = ({ icon, text, style }) => (
  <div
    style={{
      ...style,
      textAlign: 'center',
      marginRight: 'auto',
      marginLeft: 'auto',
    }}
  >
    <img
      src={
        icon === 'plan'
          ? NoPlan
          : icon === 'menus'
          ? NoMenus
          : icon === 'products'
          ? NoProducts
          : icon === 'categories'
          ? NoBasket
          : icon === 'orders'
          ? NoOrders
          : icon === 'history'
          ? NoHistory
          : icon === 'tables'
          ? NoTables
          : icon === 'users'
          ? NoUser
          : icon === 'ticket'
          ? NoTicket
          : NoContents
      }
      style={{ width: 120, height: 'auto', margin: 10 }}
      alt="No content"
    />
    <Typography variant="caption" style={{ color: '#c8c8c8' }}>
      {text || 'No Data...'}
    </Typography>
  </div>
);

export default NoIdealState;
