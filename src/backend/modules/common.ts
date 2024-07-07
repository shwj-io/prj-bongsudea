const groupByCity = data => {
  let subCityId = 1; // Start the sub-city id from 1

  return data.reduce((acc, currentValue) => {
    let group = acc.find(g => g.city === currentValue.main_city);

    if (!group) {
      group = { city: currentValue.main_city, area: [] };
      acc.push(group);
    }

    // Add sub_city with an id property
    group.area.push({ id: subCityId++, city: currentValue.sub_city });

    return acc;
  }, []);
};

export { groupByCity };
