import React, { Fragment } from 'react';

import Mealssummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';

const Meals = () => {
  return (
    <Fragment>
      <Mealssummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
