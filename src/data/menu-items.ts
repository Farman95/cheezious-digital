import type { MenuItemData } from "@/lib/cart-types";

export const menuItems: MenuItemData[] = [
  // STARTERS
  {
    id: "cheezy-sticks",
    name: "Cheezy Sticks",
    description: "Freshly Baked Bread Filled With The Yummiest Cheese Blend To Satisfy Your Cravings.",
    category: "Starters",
    priceNumber: 600,
    priceDisplay: "Rs. 600",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
  },
  {
    id: "oven-baked-wings",
    name: "Oven Baked Wings",
    description: "Fresh Oven Baked Wings Served With Dip Sauce.",
    category: "Starters",
    priceNumber: 580,
    priceDisplay: "Rs. 580",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400"
  },
  {
    id: "flaming-wings",
    name: "Flaming Wings",
    description: "Fresh Oven Baked Wings Tossed In Hot Peri Peri Sauce And Served With Dip Sauce.",
    category: "Starters",
    priceNumber: 620,
    priceDisplay: "Rs. 620",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
  },
  {
    id: "calzone-chunks",
    name: "Calzone Chunks",
    description: "4 Pcs Stuffed Calzone Chunks Served With Sauce & Fries.",
    category: "Starters",
    priceNumber: 1100,
    priceDisplay: "Rs. 1,100",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
  },
  {
    id: "arabic-rolls",
    name: "Arabic Rolls",
    description: "4 Pcs Arabic Rolls Stuffed With The Yummiest Mix Served With Sauce.",
    category: "Starters",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400"
  },
  {
    id: "behari-rolls",
    name: "Behari Rolls",
    description: "4 Pcs Behari Rolls Stuffed With The Yummiest Mix Served With Sauce.",
    category: "Starters",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400"
  },

  // SPECIAL PIZZA
  {
    id: "crown-crust",
    name: "Crown Crust",
    description: "Scrumptious Pizza With A Yummy Blend Of Grilled Chicken, Olives, Onion, Capsicum.",
    category: "Special Pizza",
    priceNumber: 1480,
    priceDisplay: "Rs. 1,480",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    mostLoved: true
  },
  {
    id: "stuff-crust-pizza",
    name: "Stuff Crust Pizza",
    description: "Special Chicken, Green Olives, Mushrooms, With The Crust Filled With Cheese.",
    category: "Special Pizza",
    priceNumber: 1530,
    priceDisplay: "Rs. 1,530",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },
  {
    id: "beef-pepperoni-thin-crust",
    name: "Beef Pepperoni Thin Crust",
    description: "A Crispy Thin Crust Topped With Beef Pepperoni, Mozzarella Cheese, And Rich Marinara.",
    category: "Special Pizza",
    priceNumber: 1480,
    priceDisplay: "Rs. 1,480",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "malai-tikka",
    name: "Malai Tikka",
    description: "A Flavorful Pizza Loaded With Fresh BBQ Malai Tikka Chunks And Topped With A Special Blend.",
    category: "Special Pizza",
    priceNumber: 1530,
    priceDisplay: "Rs. 1,530",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },

  // SOMEWHAT LOCAL
  {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    description: "Tender Chunks Of Marinated Grilled Chicken With Savory Onion.",
    category: "Somewhat Local",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "chicken-fajita",
    name: "Chicken Fajita",
    description: "An Authentic Taste Of Fajita Marinated Chicken, Onion And Bell Peppers.",
    category: "Somewhat Local",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },
  {
    id: "chicken-lover",
    name: "Chicken Lover",
    description: "Extreme Quantity Of Chicken And Onion With Rich Mozzarella Cheese.",
    category: "Somewhat Local",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "chicken-tandoori",
    name: "Chicken Tandoori",
    description: "Our Traditionally Developed Tandoori Chicken With Onion, Olives, Jalapeno And Tomatoes.",
    category: "Somewhat Local",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },
  {
    id: "hot-n-spicy",
    name: "Hot n Spicy",
    description: "Hot And Spicy Chicken Onion With Jalapeno.",
    category: "Somewhat Local",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "vegetable-pizza",
    name: "Vegetable Pizza",
    description: "Vegetables With Pizza Sauce And Cheese.",
    category: "Somewhat Local",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },

  // SOMEWHAT SOOPER
  {
    id: "euro",
    name: "Euro",
    description: "A Delightful Combination Of Specially Marinated Smoked Chicken With Bell Pepper.",
    category: "Somewhat Sooper",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "chicken-supreme",
    name: "Chicken Supreme",
    description: "A Combination Of 3 Flavors Of Chicken, Black Olives, Mushrooms, Bell Pepper.",
    category: "Somewhat Sooper",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },
  {
    id: "black-pepper-tikka",
    name: "Black Pepper Tikka",
    description: "A Blend Of Marinated Black Pepper Chicken, Onion And Bell Pepper.",
    category: "Somewhat Sooper",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "sausage-pizza",
    name: "Sausage Pizza",
    description: "Chicken Sausages, Pizza Sauce, And Cheese.",
    category: "Somewhat Sooper",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },
  {
    id: "cheese-lover-pizza",
    name: "Cheese Lover Pizza",
    description: "Yummiest Blend Of Cheese And Pizza Sauce.",
    category: "Somewhat Sooper",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "chicken-pepperoni",
    name: "Chicken Pepperoni",
    description: "Chicken Pepperoni, Pizza Sauce And Cheese.",
    category: "Somewhat Sooper",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },
  {
    id: "chicken-mushroom",
    name: "Chicken Mushroom",
    description: "Tender Chunks Of Marinated Grilled Chicken Tikka, Lots Of Mushrooms, Onion.",
    category: "Somewhat Sooper",
    priceNumber: 660,
    priceDisplay: "Rs. 660",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },

  // CHEEZY TREATS
  {
    id: "cheezious-special",
    name: "Cheezious Special",
    description: "Delicious Special Chicken With Black Olives, Sausages And Bell Pepper.",
    category: "Cheezy Treats",
    priceNumber: 1480,
    priceDisplay: "Rs. 1,480",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400",
    mostLoved: true
  },
  {
    id: "behari-kabab",
    name: "Behari Kabab",
    description: "Enjoy Special Chicken Behari Kabab, Grilled Chicken With Onion Jalapenos And Ginger.",
    category: "Cheezy Treats",
    priceNumber: 1480,
    priceDisplay: "Rs. 1,480",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },
  {
    id: "chicken-extreme",
    name: "Chicken Extreme",
    description: "Combination Of 3 Flavors Of Chicken With Onion Bell Pepper, Green Olives, Mushroom.",
    category: "Cheezy Treats",
    priceNumber: 1480,
    priceDisplay: "Rs. 1,480",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
  },

  // PIZZA DEALS
  {
    id: "small-pizza-deal",
    name: "Small Pizza Deal",
    description: "Any Flavor From Local Love Or Over The Sea Flavor Category & 1 Soft Drink.",
    category: "Pizza Deals",
    priceNumber: 720,
    priceDisplay: "Rs. 720",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  },
  {
    id: "regular-pizza-deal",
    name: "Regular Pizza Deal",
    description: "1 Regular Pizza And 2 Regular Drinks.",
    category: "Pizza Deals",
    priceNumber: 1390,
    priceDisplay: "Rs. 1,390",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  },
  {
    id: "large-pizza-deal",
    name: "Large Pizza Deal",
    description: "Any Flavor From Local Love Or Over The Sea Flavor Category & 1 Liter Drink.",
    category: "Pizza Deals",
    priceNumber: 1900,
    priceDisplay: "Rs. 1,900",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  },

  // SANDWICHES & PLATTERS
  {
    id: "special-roasted-platter",
    name: "Special Roasted Platter",
    description: "4 Pcs Behari Rolls, 6 Pcs Wings Served With Fries & Sauce.",
    category: "Sandwiches & Platters",
    priceNumber: 1150,
    priceDisplay: "Rs. 1,150",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    mostLoved: true
  },
  {
    id: "mexican-sandwich",
    name: "Mexican Sandwich",
    description: "Mozzarella Dipped Chicken Topped With Garlic Sauce And Tomatoes Served In Baked Bread.",
    category: "Sandwiches & Platters",
    priceNumber: 880,
    priceDisplay: "Rs. 880",
    image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400"
  },
  {
    id: "pizza-stacker",
    name: "Pizza Stacker",
    description: "A Unique Blend Of Delicious Sauce, Crispy Chicken And Pizza Crust.",
    category: "Sandwiches & Platters",
    priceNumber: 880,
    priceDisplay: "Rs. 880",
    image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400"
  },
  {
    id: "euro-sandwich",
    name: "Euro Sandwich",
    description: "Mozzarella Dipped Black Pepper Chicken Topped With Garlic Sauce, Pineapples.",
    category: "Sandwiches & Platters",
    priceNumber: 880,
    priceDisplay: "Rs. 880",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400"
  },
  {
    id: "classic-roll-platter",
    name: "Classic Roll Platter",
    description: "4 Pcs Behari Rolls, 4 Pcs Arabic Rolls Served With Fries & Sauce.",
    category: "Sandwiches & Platters",
    priceNumber: 1150,
    priceDisplay: "Rs. 1,150",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  },

  // PASTAS
  {
    id: "fettuccine-alfredo",
    name: "Fettuccine Alfredo Pasta",
    description: "Pasta Made In The Yummiest White Sauce With Chicken Chunks Topped With Cheese.",
    category: "Pastas",
    priceNumber: 1000,
    priceDisplay: "Rs. 1,000",
    image: "https://images.unsplash.com/photo-1563243577-4e0556c4ca73?w=400"
  },
  {
    id: "crunchy-chicken-pasta",
    name: "Crunchy Chicken Pasta",
    description: "Yummiest Macaroni Pasta In White Sauce Topped With Crispy Chicken And Cheese.",
    category: "Pastas",
    priceNumber: 910,
    priceDisplay: "Rs. 910",
    image: "https://images.unsplash.com/photo-1563243577-4e0556c4ca73?w=400",
    mostLoved: true
  },

  // BURGERZ
  {
    id: "reggy-burger",
    name: "Reggy Burger",
    description: "Perfectly Fried Chicken Patty With Fresh Lettuce And Sauce In A Sesame Seed Bun.",
    category: "Burgerz",
    priceNumber: 380,
    priceDisplay: "Rs. 380",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
  },
  {
    id: "bazinga-burger",
    name: "Bazinga Burger",
    description: "Crispy Fried To Perfection Boneless Thigh With Signature Sauce And Lettuce.",
    category: "Burgerz",
    priceNumber: 540,
    priceDisplay: "Rs. 540",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    mostLoved: true
  },

  // SIDE ORDERS
  {
    id: "fries",
    name: "Fries",
    description: "Golden crispy fries.",
    category: "Side Orders",
    priceNumber: 210,
    priceDisplay: "Rs. 210",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  },
  {
    id: "nuggets",
    name: "Nuggets",
    description: "5 Pcs crispy chicken nuggets.",
    category: "Side Orders",
    priceNumber: 430,
    priceDisplay: "Rs. 430",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400"
  },
  {
    id: "chicken-piece",
    name: "Chicken Piece",
    description: "Crispy Chicken piece.",
    category: "Side Orders",
    priceNumber: 290,
    priceDisplay: "Rs. 290",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400"
  },

  // ADDONS
  {
    id: "juice",
    name: "Juice",
    description: "Fresh juice.",
    category: "Addons",
    priceNumber: 60,
    priceDisplay: "Rs. 60",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  },
  {
    id: "mayo-dip",
    name: "Mayo Dip",
    description: "Mayo dip sauce.",
    category: "Addons",
    priceNumber: 80,
    priceDisplay: "Rs. 80",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  },
  {
    id: "water-small",
    name: "Water Small",
    description: "Bottled water.",
    category: "Addons",
    priceNumber: 60,
    priceDisplay: "Rs. 60",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  },

  // SOFT DRINKS
  {
    id: "soft-drink",
    name: "Soft Drink",
    description: "Cold soft drink.",
    category: "Soft Drinks",
    priceNumber: 95,
    priceDisplay: "Rs. 95",
    image: "https://images.unsplash.com/photo-1554866585-acbb2d39a6c2?w=400"
  }
];
