export const dummyProductDetails = {
  id: 1,
  name: "Blue Long Sleeve Shirt",
  category: "Shirts",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  price: "120.000",
  rating: 4,
  materials: {
    fabric: "Wool",
    Transparency: 1,
    Thickness: 3,
    stretchiness: 2,
  },
  care: {
    washing: "Hand Wash Cold Water",
    bleaching: "Do Not Bleach",
    drying: "Normal Dry",
    iron: "Iron Inside Out with Low Temperature",
    dry_clean: "do not dry clean",
  },
  images: [
    {
      id: 1,
      image_url:
        "https://www.thekooples.com/dw/image/v2/BGQL_PRD/on/demandware.static/-/Sites-skp-master-catalog/default/dw82b86445/images/hi-res/HCCL26153KBLU01_A.jpg?sw=900&sh=1105",
    },
    {
      id: 2,
      image_url:
        "https://www.thekooples.com/dw/image/v2/BGQL_PRD/on/demandware.static/-/Sites-skp-master-catalog/default/dw840d9c39/images/hi-res/HCCL26153KBLU01_B.jpg?sw=900&sh=1105",
    },
    {
      id: 3,
      image_url:
        "https://www.thekooples.com/dw/image/v2/BGQL_PRD/on/demandware.static/-/Sites-skp-master-catalog/default/dwa505737e/images/hi-res/HCCL26153KBLU01_D.jpg?sw=900&sh=1105",
    },
  ],
  sizes: [
    {
      id: 1,
      size: "S",
      stock: 10,
    },
    {
      id: 2,
      size: "M",
      stock: 20,
    },
    {
      id: 3,
      size: "L",
      stock: 40,
    },
    {
      id: 4,
      size: "XL",
      stock: 50,
    },
  ],
};
