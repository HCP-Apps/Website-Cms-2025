self.onmessage = (event) => {
  const pressData = event.data;

  const maxPressIdItem = pressData.reduce((max:any, item:any) => {
    return (item.press_id > max.press_id) ? item : max;
  }, pressData[0]);


  const remainingItems = pressData.filter((item:any) => item.press_id !== maxPressIdItem.press_id);

  const processedData = [maxPressIdItem, ...remainingItems];

  self.postMessage(processedData);
};
