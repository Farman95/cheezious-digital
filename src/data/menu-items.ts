import type { MenuItemData } from "@/lib/cart-types";

export const menuItems: MenuItemData[] = [
  // STARTERS
  {
    id: "calzone-chunks",
    name: "Calzone Chunks",
    description: "Crispy calzone bites stuffed with molten cheese and sauce",
    category: "Starters",
    priceNumber: 399,
    priceDisplay: "Rs. 399",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
  },
  {
    id: "hot-wings-6pcs",
    name: "Hot Wings 6pcs",
    description: "Crispy oven-baked wings with signature dipping sauce",
    category: "Starters",
    priceNumber: 599,
    priceDisplay: "Rs. 599",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400"
  },
  {
    id: "hot-wings-12pcs",
    name: "Hot Wings 12pcs",
    description: "Double the crispy oven-baked wings with sauce",
    category: "Starters",
    priceNumber: 1099,
    priceDisplay: "Rs. 1,099",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400"
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    description: "Crispy outside, juicy inside, served with sauce",
    category: "Starters",
    priceNumber: 349,
    priceDisplay: "Rs. 349",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400"
  },
  {
    id: "cheesy-fries-starters",
    name: "Cheesy Fries",
    description: "Golden fries smothered in signature cheese sauce",
    category: "Starters",
    priceNumber: 349,
    priceDisplay: "Rs. 349",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  },
  {
    id: "spring-rolls",
    name: "Spring Rolls",
    description: "Crispy rolls stuffed with spiced chicken filling",
    category: "Starters",
    priceNumber: 299,
    priceDisplay: "Rs. 299",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
  },
  {
    id: "chicken-piece",
    name: "Chicken Piece",
    description: "Crispy fried chicken piece, golden and juicy",
    category: "Starters",
    priceNumber: 299,
    priceDisplay: "Rs. 299",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400"
  },

  // PIZZA
  {
    id: "crown-crust",
    name: "Crown Crust Pizza",
    description: "Iconic stuffed crust loaded with molten cheese",
    category: "Pizza",
    priceNumber: 1550,
    priceDisplay: "Rs. 1,550",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    mostLoved: true
  },
  {
    id: "smokey-thrill",
    name: "Smokey Thrill Pizza",
    description: "Smoky BBQ chicken with jalapeños and extra cheese",
    category: "Pizza",
    priceNumber: 1450,
    priceDisplay: "Rs. 1,450",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },
  {
    id: "chicken-fajita",
    name: "Chicken Fajita Pizza",
    description: "Grilled chicken, bell peppers, onions, fajita sauce",
    category: "Pizza",
    priceNumber: 1350,
    priceDisplay: "Rs. 1,350",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "cheezious-special",
    name: "Cheezious Special Pizza",
    description: "Special chicken, black olives, sausages, bell pepper",
    category: "Pizza",
    priceNumber: 1499,
    priceDisplay: "Rs. 1,499",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },
  {
    id: "chicken-pepperoni",
    name: "Chicken Pepperoni",
    description: "Chicken pepperoni, pizza sauce, melted cheese",
    category: "Pizza",
    priceNumber: 1350,
    priceDisplay: "Rs. 1,350",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "behari-kabab-pizza",
    name: "Behari Kabab Pizza",
    description: "Tender grilled chicken, onion, jalapeño, ginger",
    category: "Pizza",
    priceNumber: 1399,
    priceDisplay: "Rs. 1,399",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },
  {
    id: "malai-tikka-pizza",
    name: "Malai Tikka Pizza",
    description: "Creamy malai tikka chicken with special spices",
    category: "Pizza",
    priceNumber: 1450,
    priceDisplay: "Rs. 1,450",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "peri-peri-pizza",
    name: "Peri Peri Pizza",
    description: "Spicy peri peri chicken with fresh veggies",
    category: "Pizza",
    priceNumber: 1399,
    priceDisplay: "Rs. 1,399",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },
  {
    id: "zalmi-pizza",
    name: "Zalmi Pizza",
    description: "Loaded with special toppings and extra cheese",
    category: "Pizza",
    priceNumber: 1499,
    priceDisplay: "Rs. 1,499",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },

  // BURGER
  {
    id: "bazinga-burger",
    name: "Bazinga Burger",
    description: "Crispy chicken, cheese, signature sauce in corn-dusted bun",
    category: "Burger",
    priceNumber: 699,
    priceDisplay: "Rs. 699",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    mostLoved: true
  },
  {
    id: "bazinga-supreme",
    name: "Bazinga Supreme",
    description: "Extra crispy chicken, double cheese, special sauce",
    category: "Burger",
    priceNumber: 849,
    priceDisplay: "Rs. 849",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400"
  },
  {
    id: "double-bazinga",
    name: "Double Bazinga",
    description: "Double crispy chicken, double cheese, special sauce",
    category: "Burger",
    priceNumber: 949,
    priceDisplay: "Rs. 949",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
  },
  {
    id: "cheesy-delight-burger",
    name: "Cheesy Delight Burger",
    description: "Overflows with creamy cheese and juicy chicken",
    category: "Burger",
    priceNumber: 649,
    priceDisplay: "Rs. 649",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400"
  },
  {
    id: "smash-burger-double",
    name: "Smash Burger Double",
    description: "Two smashed patties, American cheese, pickles",
    category: "Burger",
    priceNumber: 849,
    priceDisplay: "Rs. 849",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400"
  },
  {
    id: "reggy-burger",
    name: "Reggy Burger",
    description: "Crispy chicken patty, fresh lettuce, sauce, sesame bun",
    category: "Burger",
    priceNumber: 399,
    priceDisplay: "Rs. 399",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
  },

  // ROLL
  {
    id: "bihari-roll",
    name: "Bihari Roll",
    description: "Tender Bihari kabab wrapped in paratha with cheez and chutney",
    category: "Roll",
    priceNumber: 449,
    priceDisplay: "Rs. 449",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400",
    mostLoved: true
  },
  {
    id: "arabic-roll",
    name: "Arabic Roll",
    description: "Grilled chicken, garlic sauce, fresh vegetables in Arabic bread",
    category: "Roll",
    priceNumber: 399,
    priceDisplay: "Rs. 399",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
  },
  {
    id: "bazooka-wrap",
    name: "Bazooka Wrap",
    description: "Crispy chicken, cheese, veggies in a flour tortilla",
    category: "Roll",
    priceNumber: 690,
    priceDisplay: "Rs. 690",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400"
  },
  {
    id: "shawarma",
    name: "Shawarma",
    description: "Marinated chicken, garlic sauce, pickles, wrapped in bread",
    category: "Roll",
    priceNumber: 449,
    priceDisplay: "Rs. 449",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
  },

  // SANDWICH
  {
    id: "mexican-sandwich",
    name: "Mexican Sandwich",
    description: "Mozzarella-dipped chicken, garlic sauce, fresh tomatoes",
    category: "Sandwich",
    priceNumber: 699,
    priceDisplay: "Rs. 699",
    image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400"
  },
  {
    id: "euro-sandwich",
    name: "Euro Sandwich",
    description: "Black pepper chicken, garlic sauce, pineapple, tomatoes",
    category: "Sandwich",
    priceNumber: 699,
    priceDisplay: "Rs. 699",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400"
  },
  {
    id: "pizza-stacker",
    name: "Pizza Stacker",
    description: "Crispy chicken, savory sauce, crunchy pizza crust",
    category: "Sandwich",
    priceNumber: 749,
    priceDisplay: "Rs. 749",
    image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400"
  },

  // PASTA
  {
    id: "crunchy-chicken-pasta",
    name: "Crunchy Chicken Pasta",
    description: "Pasta topped with crunchy chicken and cheese sauce",
    category: "Pasta",
    priceNumber: 599,
    priceDisplay: "Rs. 599",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400",
    mostLoved: true
  },
  {
    id: "fettuccine-alfredo",
    name: "Fettuccine Alfredo",
    description: "Creamy Alfredo sauce with tender chicken pieces",
    category: "Pasta",
    priceNumber: 649,
    priceDisplay: "Rs. 649",
    image: "https://images.unsplash.com/photo-1563243577-4e0556c4ca73?w=400"
  },
  {
    id: "peri-peri-pasta",
    name: "Peri Peri Pasta",
    description: "Spicy peri peri chicken on bed of pasta with cheese",
    category: "Pasta",
    priceNumber: 649,
    priceDisplay: "Rs. 649",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e2?w=400"
  },

  // PLATTER
  {
    id: "special-roasted-platter",
    name: "Special Roasted Platter",
    description: "4 Bihari Rolls + 6 Wings + Fries + Sauce",
    category: "Platter",
    priceNumber: 1299,
    priceDisplay: "Rs. 1,299",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    mostLoved: true
  },
  {
    id: "classic-roll-platter",
    name: "Classic Roll Platter",
    description: "4 Bihari Rolls + 4 Arabic Rolls + Fries + Sauce",
    category: "Platter",
    priceNumber: 1199,
    priceDisplay: "Rs. 1,199",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "loaded-platter",
    name: "Loaded Platter",
    description: "Wings, tenders, cheesy fries, and dips for sharing",
    category: "Platter",
    priceNumber: 1299,
    priceDisplay: "Rs. 1,299",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "family-deal-platter",
    name: "Family Deal Platter",
    description: "1 Large Pizza + 4 Burgers + 2 Fries + 2 Drinks",
    category: "Platter",
    priceNumber: 2499,
    priceDisplay: "Rs. 2,499",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },

  // DEALS
  {
    id: "small-pizza-deal",
    name: "Small Pizza Deal",
    description: "1 Small Pizza + 1 Regular Drink",
    category: "Deals 🔥",
    priceNumber: 750,
    priceDisplay: "Rs. 750",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  },
  {
    id: "regular-pizza-deal",
    name: "Regular Pizza Deal",
    description: "1 Regular Pizza + 2 Regular Drinks",
    category: "Deals 🔥",
    priceNumber: 1450,
    priceDisplay: "Rs. 1,450",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  },
  {
    id: "large-pizza-deal",
    name: "Large Pizza Deal",
    description: "1 Large Pizza + 1 Liter Drink",
    category: "Deals 🔥",
    priceNumber: 1990,
    priceDisplay: "Rs. 1,990",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  },
  {
    id: "squad-deal",
    name: "Squad Deal",
    description: "1 Regular Crown Crust + 1 Pasta + 1 Liter Drink",
    category: "Deals 🔥",
    priceNumber: 2500,
    priceDisplay: "Rs. 2,500",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  },
  {
    id: "burger-combo",
    name: "Burger Combo",
    description: "2 Bazinga + 2 Chicken Pcs + Large Fries + 2 Drinks",
    category: "Deals 🔥",
    priceNumber: 1550,
    priceDisplay: "Rs. 1,550",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  },
  {
    id: "zalmi-meal-deal",
    name: "Zalmi Meal Deal",
    description: "Special pizza + Wings + Drink",
    category: "Deals 🔥",
    priceNumber: 1799,
    priceDisplay: "Rs. 1,799",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  },

  // SIDES
  {
    id: "cheesy-fries-sides",
    name: "Cheesy Fries Regular",
    description: "Golden fries with signature cheese sauce",
    category: "Sides",
    priceNumber: 349,
    priceDisplay: "Rs. 349",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  },
  {
    id: "nuggets-6pcs-sides",
    name: "Nuggets 6pcs",
    description: "Crispy chicken nuggets with dipping sauce",
    category: "Sides",
    priceNumber: 349,
    priceDisplay: "Rs. 349",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400"
  },
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    description: "Toasted bread with garlic butter and herbs",
    category: "Sides",
    priceNumber: 249,
    priceDisplay: "Rs. 249",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  },
  {
    id: "coleslaw",
    name: "Coleslaw",
    description: "Fresh creamy coleslaw",
    category: "Sides",
    priceNumber: 149,
    priceDisplay: "Rs. 149",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  },
  {
    id: "regular-drink",
    name: "Regular Drink",
    description: "Pepsi, 7Up, Mirinda",
    category: "Sides",
    priceNumber: 150,
    priceDisplay: "Rs. 150",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  },
  {
    id: "liter-drink",
    name: "1 Liter Drink",
    description: "Large bottle for sharing",
    category: "Sides",
    priceNumber: 250,
    priceDisplay: "Rs. 250",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  }
];
