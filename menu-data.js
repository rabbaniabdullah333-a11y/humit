/**
 * Humi's Home Kitchen - Complete Menu Catalog
 * "Homemade Taste, Made with Love."
 * 
 * CONFIRMED DATA:
 * All prices in Pakistani Rupees (Rs.)
 * Exact portions, serving descriptions, and categories.
 */

const MENU_DATA = [
  // ==========================================
  // 1. SANDWICHES (3 items)
  // ==========================================
  {
    id: "sand-1",
    category: "Sandwiches",
    name: "Club Sandwich",
    description: "Classic triple-decker toasted sandwich layered with spiced shredded chicken, fried egg, crisp lettuce, cucumber, tomatoes, and home-whipped mayo.",
    price: 300,
    serving: "1 Regular Serving (2 Cut Quarters)",
    badge: "Bestseller",
    prepTime: "15-20 mins",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Freshly toasted Club Sandwich served with homemade dip"
  },
  {
    id: "sand-2",
    category: "Sandwiches",
    name: "Egg and Chicken Sandwich",
    description: "Hearty homemade sandwich filled with seasoned shredded chicken breast, hard-boiled farm egg spread, and mild ground black pepper mayo.",
    price: 450,
    serving: "1 Generous Portion",
    badge: "Popular",
    prepTime: "15 mins",
    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Egg and Chicken Sandwich on soft white bread"
  },
  {
    id: "sand-3",
    category: "Sandwiches",
    name: "Vegetable Sandwich",
    description: "Fresh, crisp and colorful garden vegetables including crunchy cucumbers, ripe tomatoes, capsicum, and cabbage tossed in our light herb dressing.",
    price: 300,
    serving: "1 Regular Serving",
    badge: "Healthy & Fresh",
    prepTime: "15 mins",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Fresh homemade garden vegetable sandwich"
  },

  // ==========================================
  // 2. MACARONI (1 item with Half/Full)
  // ==========================================
  {
    id: "mac-1",
    category: "Macaroni",
    name: "Macaroni",
    description: "Desi home-style stir-fried chicken macaroni prepared with tender chicken chunks, crunchy seasonal veggies, soy-chilli glaze, and aromatic spices.",
    sizes: {
      half: 1400,
      full: 2400
    },
    servingDescriptions: {
      half: "Half Portion (Serves 1-2)",
      full: "Full Portion (Serves 3-4)"
    },
    badge: "Family Favorite",
    prepTime: "25-30 mins",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Desi style savory chicken macaroni with vegetables"
  },

  // ==========================================
  // 3. CHICKEN (7 items - EXACT CONFIRMED PRICES)
  // ==========================================
  {
    id: "chk-1",
    category: "Chicken",
    name: "Chicken Karahi",
    description: "Signature traditional wok-cooked chicken prepared fresh with ripe tomatoes, julienned ginger, fragrant green chillies, and freshly roasted whole spices.",
    sizes: {
      half: 1800,
      full: 2400
    },
    servingDescriptions: {
      half: "Half Handi / Karahi (Serves 1-2)",
      full: "Full Handi / Karahi (Serves 3-4)"
    },
    badge: "Chef's Signature",
    prepTime: "35-40 mins",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Traditional spicy Pakistani Chicken Karahi cooked in wok"
  },
  {
    id: "chk-2",
    category: "Chicken",
    name: "Chicken Boneless Handi",
    description: "Silky melt-in-the-mouth boneless chicken cubes simmered in a rich, mild cream and cashew-tomato gravy, cooked in a traditional clay handi.",
    sizes: {
      half: 1400,
      full: 2300
    },
    servingDescriptions: {
      half: "Half Handi (Serves 1-2)",
      full: "Full Handi (Serves 3-4)"
    },
    badge: "Customer Favorite",
    prepTime: "30-35 mins",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Rich creamy Chicken Boneless Handi in clay pot"
  },
  {
    id: "chk-3",
    category: "Chicken",
    name: "Chicken Qorma",
    description: "Royal Mughal-style slow-cooked chicken in caramelized golden onion gravy, infused with cardamom, mace, kewra water, and thick farm yogurt.",
    sizes: {
      half: 1800,
      full: 2400
    },
    servingDescriptions: {
      half: "Half Portion (Serves 1-2)",
      full: "Full Portion (Serves 3-4)"
    },
    badge: "Traditional Royal",
    prepTime: "40 mins",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Authentic Pakistani Shahi Chicken Qorma with rich gravy"
  },
  {
    id: "chk-4",
    category: "Chicken",
    name: "Chicken Nihari",
    description: "Aromatic slow-simmered chicken stew with velvety spice gravy, topped with ginger matchsticks, freshly squeezed lemon, and crisp fried onions.",
    sizes: {
      half: 1800,
      full: 2300
    },
    servingDescriptions: {
      half: "Half Bowl (Serves 1-2)",
      full: "Full Bowl (Serves 3-4)"
    },
    badge: "Slow Cooked",
    prepTime: "45 mins",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Rich and spiced Pakistani Chicken Nihari garnished with ginger"
  },
  {
    id: "chk-5",
    category: "Chicken",
    name: "Chicken Aloo Shorba Salan",
    description: "Soul-comforting homestyle chicken and soft potato curry cooked in light, fragrant tomato-onion broth. True nostalgic mother's recipe.",
    sizes: {
      half: 1800,
      full: 2300
    },
    servingDescriptions: {
      half: "Half Bowl (Serves 1-2)",
      full: "Full Bowl (Serves 3-4)"
    },
    badge: "Homestyle Comfort",
    prepTime: "30 mins",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Homestyle Chicken Aloo Shorba Salan with fresh coriander"
  },
  {
    id: "chk-6",
    category: "Chicken",
    name: "Chicken Qeema",
    description: "Finely minced fresh chicken sautéed with roasted cumin, whole spices, green peas or chillies, cooked to a smoky homestyle bhuna perfection.",
    sizes: {
      half: 1400,
      full: 2200
    },
    servingDescriptions: {
      half: "Half Portion (Serves 1-2)",
      full: "Full Portion (Serves 3-4)"
    },
    badge: "Desi Bhuna",
    prepTime: "25-30 mins",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Spiced Chicken Qeema cooked with fresh herbs and spices"
  },
  {
    id: "chk-7",
    category: "Chicken",
    name: "Chicken Shashlik",
    description: "Tender boneless chicken skewers tossed with sweet bell peppers, onions, and glazed in a zesty sweet-and-sour spiced garlic sauce.",
    sizes: {
      half: 1600,
      full: 2500
    },
    servingDescriptions: {
      half: "Half Portion (Serves 1-2)",
      full: "Full Portion (Serves 3-4)"
    },
    badge: "Popular Indo-Chinese",
    prepTime: "30 mins",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Chicken Shashlik with bell peppers and glazed sauce"
  },

  // ==========================================
  // 4. RICE (6 items with Half/Full & details)
  // ==========================================
  {
    id: "rice-1",
    category: "Rice",
    name: "Chicken Biryani",
    description: "Fragrant long-grain aged basmati rice layered with succulent spiced chicken, aromatic saffron, whole spices, and caramelized onions cooked on dum.",
    sizes: {
      half: 1600,
      full: 3300
    },
    servingDescriptions: {
      half: "Half Handi (Serves 1-2)",
      full: "Full Handi (Serves 4-5)"
    },
    badge: "Masterpiece Dum Biryani",
    prepTime: "40-45 mins",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Aromatic authentic Chicken Biryani with golden basmati rice"
  },
  {
    id: "rice-2",
    category: "Rice",
    name: "Beef Biryani",
    description: "Rich, deeply flavorful beef biryani featuring tender chunks of prime beef slow-cooked in rich masala broth and sealed with saffron-infused basmati.",
    sizes: {
      half: 2200,
      full: 4000
    },
    servingDescriptions: {
      half: "Half Handi (Serves 1-2)",
      full: "Full Handi (Serves 4-5)"
    },
    badge: "Rich & Royal",
    prepTime: "45 mins",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Spiced royal Beef Biryani with caramelized onions and saffron"
  },
  {
    id: "rice-3",
    category: "Rice",
    name: "Beef Pulao",
    description: "1 kg rice + 1 kg beef. Traditional aromatic yakhni beef pulao simmered in rich bone broth, whole garam masalas, and mild whole spices.",
    portionDetail: "1 kg rice + 1 kg beef",
    sizes: {
      half: 2000,
      full: 3700
    },
    servingDescriptions: {
      half: "Half Pot (Serves 2-3)",
      full: "Full Pot (Serves 5-6)"
    },
    badge: "Authentic Yakhni",
    prepTime: "45 mins",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Traditional Yakhni Beef Pulao with tender meat chunks"
  },
  {
    id: "rice-4",
    category: "Rice",
    name: "Chicken Pulao",
    description: "1 kg rice + 1 kg chicken. Fragrant home-style chicken pulao cooked in seasoned chicken stock with whole cloves, cinnamon, and mild green chillies.",
    portionDetail: "1 kg rice + 1 kg chicken",
    sizes: {
      half: 1500,
      full: 3000
    },
    servingDescriptions: {
      half: "Half Pot (Serves 2-3)",
      full: "Full Pot (Serves 5-6)"
    },
    badge: "Light & Fragrant",
    prepTime: "35 mins",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Homestyle Chicken Pulao cooked in rich aromatic chicken broth"
  },
  {
    id: "rice-5",
    category: "Rice",
    name: "Chana Pulao",
    description: "1 kg rice + 1 kg chana. Wholesome vegetarian delight prepared with tender white chickpeas, golden onions, cumin seeds, and aged basmati rice.",
    portionDetail: "1 kg rice + 1 kg chana",
    sizes: {
      half: 1200,
      full: 2200
    },
    servingDescriptions: {
      half: "Half Pot (Serves 2-3)",
      full: "Full Pot (Serves 5-6)"
    },
    badge: "Vegetarian Classic",
    prepTime: "30 mins",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Delicate Chana Pulao cooked with whole spices and basmati rice"
  },
  {
    id: "rice-6",
    category: "Rice",
    name: "Vegetable and Chicken Rice",
    description: "1 kg rice + 500g chicken + 500g vegetables. A balanced, colorful meal loaded with tender chicken bites, carrots, bell peppers, peas, and fragrant rice.",
    portionDetail: "1 kg rice + 500g chicken + 500g vegetables",
    sizes: {
      half: 1400,
      full: 2500
    },
    servingDescriptions: {
      half: "Half Pot (Serves 2-3)",
      full: "Full Pot (Serves 5-6)"
    },
    badge: "Balanced Meal",
    prepTime: "35 mins",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Vegetable and Chicken Fried Rice with garden fresh vegetables"
  },

  // ==========================================
  // 5. SALADS (4 items)
  // ==========================================
  {
    id: "sal-1",
    category: "Salads",
    name: "Protein Salad",
    description: "Power-packed nutritious salad with boiled chickpeas, diced grilled chicken breast, fresh cucumbers, cherry tomatoes, and lemon-olive oil vinaigrette.",
    price: 500,
    serving: "1 Generous Bowl",
    badge: "Fitness Favorite",
    prepTime: "10 mins",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Nutritious Protein Salad bowl with fresh greens and grilled chicken"
  },
  {
    id: "sal-2",
    category: "Salads",
    name: "Russian Salad",
    description: "Creamy classic salad packed with diced potatoes, tender sweet carrots, green peas, crisp apple cubes, and sweet pineapple in rich whipped dressing.",
    price: 500,
    serving: "1 Generous Bowl",
    badge: "Crowd Pleaser",
    prepTime: "15 mins",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Creamy homemade Russian Salad with vegetables and fruits"
  },
  {
    id: "sal-3",
    category: "Salads",
    name: "Turkish Salad",
    description: "Zesty Mediterranean salad featuring diced cucumbers, ripe tomatoes, red onions, fresh parsley, and sumac tossed in lemon juice and extra virgin olive oil.",
    price: 350,
    serving: "1 Fresh Bowl",
    badge: "Tangy & Crisp",
    prepTime: "10 mins",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Zesty Turkish Salad with tomatoes, cucumber, parsley and sumac"
  },
  {
    id: "sal-4",
    category: "Salads",
    name: "Plain Salad",
    description: "Traditional fresh Pakistani dinner salad of crisp onion rings, sliced cucumbers, juicy tomatoes, and lemon wedges sprinkled with chaat masala.",
    price: 300,
    serving: "1 Fresh Plate",
    badge: "Daily Essential",
    prepTime: "10 mins",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Crisp traditional Pakistani sliced onion, tomato and cucumber salad"
  },

  // ==========================================
  // 6. SPECIAL ORDER (3 items with Half/Full)
  // ==========================================
  {
    id: "spec-1",
    category: "Special Order",
    name: "Karhi Pakora",
    description: "Authentic slow-simmered besan and sour yogurt kadhi infused with fenugreek and whole spices, loaded with fluffy onion-spinach pakoras and zeera tadka.",
    isPreOrder: true,
    sizes: {
      half: 1000,
      full: 2000
    },
    servingDescriptions: {
      half: "Half Pot (Serves 2-3)",
      full: "Full Pot (Serves 4-5)"
    },
    badge: "Pre-Order Recommended",
    prepTime: "Slow Simmered (Pre-Order)",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Traditional yellow Punjabi Karhi Pakora with aromatic zeera tadka"
  },
  {
    id: "spec-2",
    category: "Special Order",
    name: "Pumpkin Karhi",
    description: "A rare heirloom delicacy featuring sweet golden pumpkin cooked gently inside tangy spiced yogurt besan kadhi, finished with red chilli and curry leaf tadka.",
    isPreOrder: true,
    sizes: {
      half: 1000,
      full: 2000
    },
    servingDescriptions: {
      half: "Half Pot (Serves 2-3)",
      full: "Full Pot (Serves 4-5)"
    },
    badge: "Pre-Order Recommended",
    prepTime: "Slow Simmered (Pre-Order)",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Golden artisanal Pumpkin Karhi prepared with traditional spices"
  },
  {
    id: "spec-3",
    category: "Special Order",
    name: "Special Kashmiri",
    description: "Lobia + Chawal. Authentic Kashmiri-style red kidney beans simmered in aromatic gravy infused with dry ginger and fennel, served with steaming fragrant basmati rice.",
    portionDetail: "Lobia + Chawal",
    isPreOrder: true,
    sizes: {
      half: 1450,
      full: 2600
    },
    servingDescriptions: {
      half: "Half Meal (Serves 1-2)",
      full: "Full Meal (Serves 3-4)"
    },
    badge: "Pre-Order Recommended",
    prepTime: "Traditional Slow Cook",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Special Kashmiri Lobia Rajma served with steaming basmati rice"
  },

  // ==========================================
  // 7. VEGETABLES & DAAL (7 items - All 1/2 Kg)
  // ==========================================
  {
    id: "veg-1",
    category: "Vegetables & Daal",
    name: "Pumpkin",
    description: "Tender sweet pumpkin (Kaddu) slow-sautéed with mustard seeds, fenugreek, and home-blended spices until caramelized and savory.",
    price: 750,
    serving: "Serving Size: ½ Kg",
    badge: "Farm Fresh",
    prepTime: "25 mins",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Homestyle spiced Pumpkin Kaddu sabzi"
  },
  {
    id: "veg-2",
    category: "Vegetables & Daal",
    name: "Bhindi",
    description: "Crispy farm-fresh okra (Ladyfinger) stir-fried with golden onions, ripe tomatoes, pomegranate seeds, and green chillies without sliminess.",
    price: 900,
    serving: "Serving Size: ½ Kg",
    badge: "House Favorite",
    prepTime: "25 mins",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Spiced homestyle Bhindi masala stir-fried with onions"
  },
  {
    id: "veg-3",
    category: "Vegetables & Daal",
    name: "Tori",
    description: "Light and digestible Ridge Gourd (Tori) cooked in mild homestyle cumin-tomato tadka. Gentle on stomach and pure comfort food.",
    price: 800,
    serving: "Serving Size: ½ Kg",
    badge: "Light & Healthy",
    prepTime: "25 mins",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Fresh homestyle cooked Tori sabzi in mild spices"
  },
  {
    id: "veg-4",
    category: "Vegetables & Daal",
    name: "Lobia",
    description: "Tender red kidney beans and black-eyed peas simmered in thick onion-tomato gravy with roasted cumin, coriander, and fresh ginger.",
    price: 1000,
    serving: "Serving Size: ½ Kg",
    badge: "Protein Rich",
    prepTime: "30 mins",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Rich and spiced homestyle Lobia curry"
  },
  {
    id: "veg-5",
    category: "Vegetables & Daal",
    name: "Mash",
    description: "Dhuli Mash ki Daal (White Urad Lentils) cooked to tender perfection with separated grains, crowned with garlic, red whole chillies, and ginger tadka.",
    price: 750,
    serving: "Serving Size: ½ Kg",
    badge: "Special Tadka",
    prepTime: "30 mins",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Daal Mash cooked dry style with golden garlic tadka"
  },
  {
    id: "veg-6",
    category: "Vegetables & Daal",
    name: "Moong + Masoor",
    description: "Classic duo of yellow and pink lentils simmered to velvety perfection, tempered with desi ghee, cumin seeds, garlic, and fresh coriander.",
    price: 700,
    serving: "Serving Size: ½ Kg",
    badge: "Daily Comfort",
    prepTime: "25 mins",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Homestyle yellow Moong and Masoor Daal with desi ghee tadka"
  },
  {
    id: "veg-7",
    category: "Vegetables & Daal",
    name: "Daal Chana",
    description: "Bengal Gram lentils cooked in savory dhaba-style bhuna masala with roasted spices, green chillies, and aromatic desi ghee tarka.",
    price: 750,
    serving: "Serving Size: ½ Kg",
    badge: "Dhaba Style",
    prepTime: "30 mins",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Spiced Daal Chana with rich aroma and green chilli garnish"
  },

  // ==========================================
  // 8. CHUTNEYS (4 items - Condiments)
  // ==========================================
  {
    id: "chut-1",
    category: "Chutneys",
    name: "Mint Chutney",
    description: "Freshly ground garden mint leaves, green chillies, roasted cumin, and lemon juice. Vibrant, refreshing, and clean.",
    price: 100,
    serving: "1 Cup Serving",
    badge: "Fresh Herbs",
    prepTime: "5 mins",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Vibrant green freshly ground Mint Chutney"
  },
  {
    id: "chut-2",
    category: "Chutneys",
    name: "Green Chilli Chutney",
    description: "Fiery green chillies crushed with garlic cloves, cumin seeds, and rock salt for lovers of authentic bold Pakistani heat.",
    price: 100,
    serving: "1 Cup Serving",
    badge: "Spicy Kick",
    prepTime: "5 mins",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Spicy homemade Green Chilli Chutney with garlic"
  },
  {
    id: "chut-3",
    category: "Chutneys",
    name: "Yogurt Mint Chutney",
    description: "Smooth thick farm yogurt blended with fresh mint paste, coriander, and black rock salt. Mild and soothing accompaniment.",
    price: 150,
    serving: "1 Cup Serving",
    badge: "Cooling & Fresh",
    prepTime: "5 mins",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Cool creamy Yogurt Mint Chutney in a ceramic bowl"
  },
  {
    id: "chut-4",
    category: "Chutneys",
    name: "Sweet and Sour Chutney",
    description: "Artisanal tamarind (Imli) and dried plum (Aloo Bukhara) reduction infused with jaggery, roasted cumin, and black salt.",
    price: 150,
    serving: "1 Cup Serving",
    badge: "Tangy Sweet",
    prepTime: "5 mins",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Deep amber sweet and sour Imli Aloo Bukhara Chutney"
  },

  // ==========================================
  // 9. RAITAS (4 items - Serving Size: 1/2 Kg)
  // ==========================================
  {
    id: "rai-1",
    category: "Raitas",
    name: "Plain Yogurt Raita",
    description: "Whisked fresh farm yogurt lightly seasoned with dry-roasted cumin powder, black salt, and a dash of ground black pepper.",
    price: 350,
    serving: "Serving Size: ½ Kg",
    badge: "Light Classic",
    prepTime: "5 mins",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Smooth Plain Yogurt Raita garnished with roasted cumin"
  },
  {
    id: "rai-2",
    category: "Raitas",
    name: "Mint and Chilli Raita",
    description: "Fresh thick yogurt whipped with freshly ground mint paste, crushed green chillies, and aromatic roasted cumin.",
    price: 500,
    serving: "Serving Size: ½ Kg",
    badge: "Aromatic Zest",
    prepTime: "5 mins",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Refreshing Mint and Chilli Raita with mint sprig"
  },
  {
    id: "rai-3",
    category: "Raitas",
    name: "Cucumber Raita",
    description: "Finely grated crisp Persian cucumbers blended into chilled farm curd, seasoned with rock salt and toasted cumin seeds.",
    price: 350,
    serving: "Serving Size: ½ Kg",
    badge: "Cooling & Crisp",
    prepTime: "5 mins",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Chilled Cucumber Raita sprinkled with roasted cumin"
  },
  {
    id: "rai-4",
    category: "Raitas",
    name: "Vegetables Raita",
    description: "Medley of finely chopped crisp onions, red tomatoes, cucumber cubes, and fresh mint folded into rich seasoned yogurt.",
    price: 500,
    serving: "Serving Size: ½ Kg",
    badge: "Garden Medley",
    prepTime: "5 mins",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Crunchy mixed vegetable raita in fresh yogurt"
  }
];

// Master list of all categories in exact prompt order
const MENU_CATEGORIES = [
  "All",
  "Sandwiches",
  "Macaroni",
  "Chicken",
  "Rice",
  "Salads",
  "Special Order",
  "Vegetables & Daal",
  "Chutneys",
  "Raitas"
];

// Make available globally
if (typeof window !== "undefined") {
  window.MENU_DATA = MENU_DATA;
  window.MENU_CATEGORIES = MENU_CATEGORIES;
}
