type LocPoint = {
  latitude: number;
  longitude: number;
};

export type AddressPt = {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  pointIdx: LocPoint;
};
