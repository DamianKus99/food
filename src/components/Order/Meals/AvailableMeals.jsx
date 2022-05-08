import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from '../../../styles/Order.module/Meals.module/AvailableMeals.module.scss';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [meals2, setMeals2] = useState([]);
  const [meals3, setMeals3] = useState([]);
  const [meals4, setMeals4] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpened2, setIsOpened2] = useState(false);
  const [isOpened3, setIsOpened3] = useState(false);
  const [isOpened4, setIsOpened4] = useState('lunch');
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [type, setType] = useState('name-asc');

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://pr-2022-api.herokuapp.com/api/food?' + type + '=true'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        if (responseData[key].type === "dania-glowne" && responseData[key].avaiable) {
          loadedMeals.push({
            id: responseData[key].foodItemId,
            id2: responseData[key].foodItemId,
            name: responseData[key].name,
            description: responseData[key].description,
            type: responseData[key].type,
            price: responseData[key].price,
          });
        }
      }
      console.log(loadedMeals);
      setMeals(loadedMeals);
      setMeals2(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const pressed = (value) => {

    setIsOpened4(value);
    console.log(value);
    maping('name-asc', value);
  }




  const maping = async (value, value2) => {
    const response = await fetch(
      'https://pr-2022-api.herokuapp.com/api/food?' + value + '=true'
    );
    console.log(response);

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();

    const loadedMeals = [];

    for (const key in responseData) {
      if (responseData[key].type === value2 && responseData[key].avaiable) {
        loadedMeals.push({
          id: responseData[key].foodItemId,
          id2: responseData[key].foodItemId,
          name: responseData[key].name,
          description: responseData[key].description,
          type: responseData[key].type,
          price: responseData[key].price,
        });
      }
    }
    console.log(loadedMeals);
    setMeals(loadedMeals);
    setMeals2(loadedMeals);
    setIsLoading(false);
  };

  const maping2 = async (value) => {
    const response = await fetch(
      'https://pr-2022-api.herokuapp.com/api/food?' + value + '=true'
    );
    console.log(response);

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();

    const loadedMeals = [];

    for (const key in responseData) {
      if (responseData[key].type === "sniadanie" && responseData[key].avaiable) {
        loadedMeals.push({
          id: responseData[key].foodItemId,
          id2: responseData[key].foodItemId,
          name: responseData[key].name,
          description: responseData[key].description,
          type: responseData[key].type,
          price: responseData[key].price,
        });
      }
    }
    console.log(loadedMeals);
    setMeals2(loadedMeals);
    setIsLoading(false);
  };

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      //description={meal.description}
      type={meal.type}
      price={meal.price}
    />
  ));
  const mealsList2 = meals2.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      //description={meal.description}
      //type={meal.type}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <div className={classes.navTool}>
        <div className={classes.navToolButtons}>
          <button className={classes.btnTool} onClick={() => { pressed('dania-glowne'); }}>Dania główne</button>
          <button className={classes.btnTool} onClick={() => { pressed('sniadania'); }}>Śniadania</button>
          <button className={classes.btnTool} onClick={() => { pressed('zupy'); }}>Zupy</button>
          <button className={classes.btnTool} onClick={() => { pressed('salatki'); }}>Sałatki</button>
          <button className={classes.btnTool} onClick={() => { pressed('desery'); }}>Desery</button>
          <button className={classes.btnTool} onClick={() => { pressed('napoje'); }}>Napoje</button>
        </div>
        

        <select
          className={classes.sortBy}
          onChange={(event) => {
            maping(event.target.value, isOpened4)
          }
          }
        >
          <option value="name-asc">Sortuj według nazwy A↓Z</option>
          <option value="name-desc">Sortuj według nazwy Z↑A</option>
          <option value="price-asc">Sortuj według ceny A↓Z</option>
          <option value="price-desc">Sortuj według ceny Z↑A</option>
        </select>

      </div>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>

  );
};

export default AvailableMeals;
