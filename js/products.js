// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Cookie de Kinder Bueno",
        description: "Clássico cookie com gotas de chocolate belga premium. Crocante por fora, macio por dentro.",
        price: 4.50,
        category: "classicos",
        emoji: "🍪",
        ingredients: ["Farinha de trigo", "Chocolate belga", "Manteiga", "Açúcar mascavo", "Ovos", "Baunilha"],
        allergens: ["Glúten", "Ovos", "Lactose"],
        nutritional: {
            calories: 180,
            carbs: 22,
            fat: 9,
            protein: 3
        }
    },
    {
        id: 2,
        name: "Cookie de KitKat",
        description: "Cookie nutritivo com aveia integral e passas selecionadas. Uma opção mais saudável e deliciosa.",
        price: 4.00,
        category: "classicos",
        emoji: "🌾",
        ingredients: ["Aveia integral", "Passas", "Farinha de trigo", "Mel", "Óleo de coco", "Canela"],
        allergens: ["Glúten"],
        nutritional: {
            calories: 160,
            carbs: 25,
            fat: 6,
            protein: 4
        }
    },
    {
        id: 3,
        name: "Cookie Red Velvet",
        description: "Cookie especial com massa vermelha aveludada e cream cheese. Irresistível!",
        price: 6.50,
        category: "especiais",
        emoji: "❤️",
        ingredients: ["Farinha de trigo", "Cacau", "Cream cheese", "Corante natural", "Açúcar", "Manteiga"],
        allergens: ["Glúten", "Ovos", "Lactose"],
        nutritional: {
            calories: 220,
            carbs: 28,
            fat: 11,
            protein: 4
        }
    },
    {
        id: 4,
        name: "Cookie de Ninho com Nutella",
        description: "Cookie recheado com Nutella cremosa. Para os amantes de avelã e chocolate.",
        price: 7.00,
        category: "especiais",
        emoji: "🥜",
        ingredients: ["Nutella", "Farinha de trigo", "Avelãs", "Açúcar", "Manteiga", "Ovos"],
        allergens: ["Glúten", "Ovos", "Lactose", "Oleaginosas"],
        nutritional: {
            calories: 240,
            carbs: 26,
            fat: 14,
            protein: 5
        }
    },
    
    {
        id: 6,
        name: "Cookie Nutella",
        description: "Cookie vegano intenso de cacau com nibs de cacau. Rico em sabor e antioxidantes.",
        price: 6.00,
        category: "especiais",
        emoji: "🍫",
        ingredients: ["Cacau em pó", "Farinha de trigo", "Açúcar de coco", "Óleo de girassol", "Nibs de cacau"],
        allergens: ["Glúten"],
        nutritional: {
            calories: 155,
            carbs: 21,
            fat: 7,
            protein: 4
        }
    },
    {
        id: 7,
        name: "Cookie Ovomaltine",
        description: "Cookie adoçado naturalmente com tâmaras e rico em amêndoas. Perfeito para diabéticos.",
        price: 7.50,
        category: "especiais",
        emoji: "🌰",
        ingredients: ["Farinha de amêndoas", "Tâmaras", "Amêndoas laminadas", "Óleo de coco", "Baunilha"],
        allergens: ["Oleaginosas"],
        nutritional: {
            calories: 130,
            carbs: 8,
            fat: 10,
            protein: 5
        }
    },
    {
        id: 8,
        name: "Cookie Pistache",
        description: "Cookie tropical sem açúcar adicionado, com coco ralado e adoçado com stevia.",
        price: 6.50,
        category: "especiais",
        emoji: "🥥",
        ingredients: ["Coco ralado", "Farinha de coco", "Stevia", "Óleo de coco", "Essência de coco"],
        allergens: [],
        nutritional: {
            calories: 120,
            carbs: 6,
            fat: 11,
            protein: 2
        }
    },
    {
        id: 9,
        name: "Cookie M&M",
        description: "Cookie premium com pistaches importados e chocolate branco. Uma experiência única.",
        price: 8.50,
        category: "especiais",
        emoji: "💚",
        ingredients: ["Pistaches", "Chocolate branco", "Farinha de trigo", "Manteiga", "Açúcar", "Ovos"],
        allergens: ["Glúten", "Ovos", "Lactose", "Oleaginosas"],
        nutritional: {
            calories: 260,
            carbs: 24,
            fat: 16,
            protein: 6
        }
    },
    {
        id: 10,
        name: "Cookie Prestigio",
        description: "Cookie refrescante com raspas de limão siciliano e glacê de limão. Cítrico e delicioso.",
        price: 5.50,
        category: "especiais",
        emoji: "🍋",
        ingredients: ["Limão siciliano", "Farinha de trigo", "Açúcar", "Manteiga", "Ovos", "Açúcar de confeiteiro"],
        allergens: ["Glúten", "Ovos", "Lactose"],
        nutritional: {
            calories: 170,
            carbs: 24,
            fat: 7,
            protein: 3
        }
    },
    {
        id: 11,
        name: "Cookie Doce de leite",
        description: "Para os chocólatras! Massa de chocolate com gotas de chocolate meio-amargo.",
        price: 6.00,
        category: "classicos",
        emoji: "🍫",
        ingredients: ["Cacau em pó", "Chocolate meio-amargo", "Farinha de trigo", "Açúcar", "Manteiga", "Ovos"],
        allergens: ["Glúten", "Ovos", "Lactose"],
        nutritional: {
            calories: 200,
            carbs: 25,
            fat: 10,
            protein: 4
        }
    },
    {
        id: 12,
        name: "Cookie Trufa",
        description: "Cookie vegano super nutritivo com sementes de chia e mel de agave. Fonte de ômega-3.",
        price: 6.50,
        category: "especiais",
        emoji: "🌱",
        ingredients: ["Sementes de chia", "Farinha de aveia", "Mel de agave", "Óleo de girassol", "Baunilha"],
        allergens: [],
        nutritional: {
            calories: 145,
            carbs: 18,
            fat: 6,
            protein: 4
        }
    },
    {
        id: 13,
        name: "Cookie Oreo",
        description: "Cookie vegano super nutritivo com sementes de chia e mel de agave. Fonte de ômega-3.",
        price: 6.50,
        category: "especiais",
        emoji: "🌱",
        ingredients: ["Sementes de chia", "Farinha de aveia", "Mel de agave", "Óleo de girassol", "Baunilha"],
        allergens: [],
        nutritional: {
            calories: 145,
            carbs: 18,
            fat: 6,
            protein: 4
        }
    },
    {
        id: 14,
        name: "Cookie Marshmallow",
        description: "Cookie vegano super nutritivo com sementes de chia e mel de agave. Fonte de ômega-3.",
        price: 6.50,
        category: "especiais",
        emoji: "🌱",
        ingredients: ["Sementes de chia", "Farinha de aveia", "Mel de agave", "Óleo de girassol", "Baunilha"],
        allergens: [],
        nutritional: {
            calories: 145,
            carbs: 18,
            fat: 6,
            protein: 4
        }
    }
];

// Exportar produtos para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}