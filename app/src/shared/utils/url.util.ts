export const getUrlMapByCoords = (longitude: number, latitude: number, zoom = 17) => {
  return `https://yandex.ru/maps/?pt=${longitude},${latitude}&z=${zoom}`;
};
