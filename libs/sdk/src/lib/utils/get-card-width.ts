export const getNftCardWidth = (width: number) => {
  const cardWidth = 236;

  if (width > 1300) {
    return Math.floor(width / 5);
  }

  if (width > 982 && width <= 1300) {
    return Math.floor(width / 4);
  }

  if (width > 665 && width <= 982) {
    return Math.floor(width / 3);
  }

  if (width > 320 && width <= 665) {
    return Math.floor(width / 2);
  }

  if (width <= 320) {
    return width - 16;
  }

  return cardWidth;
};

export const getCollectionCardWidth = (width: number) => {
  let cardWidth = 432;

  if (width > 958) {
    cardWidth = Math.floor(width / 3);
  }

  if (width <= 958) {
    cardWidth = Math.floor(width / 2);
  }

  if (width <= 640) {
    cardWidth = Math.floor(width - 16);
  }

  //   if (width <= 540) {
  //     cardWidth = width - 16;
  //   }

  return cardWidth;
};
