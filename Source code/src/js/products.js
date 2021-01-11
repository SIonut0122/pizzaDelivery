const products =  [
            {
              prodName: 'Pepperoni',
              id: 'p01',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/pepperoni.jpg',
              ingredients: [{ingr: 'Sos rosii',removable: false},{ingr: 'salam pepperoni',removable: true},{ingr: 'mozzarella',removable: false},],
              price: [
                { 
                  type: 'small',
                  size: '25cm',
                  price: '24.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '34.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '44.99'
                }
              ],
              offer: true
            },
            {
              prodName: 'Italian',
              id: 'p02',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/italian.jpg',
              ingredients: [{ingr: 'Ciuperci',removable: true},{ingr: 'sos de rosii',removable: false},{ingr: 'pepperoni',removable: true},{ingr: 'oregano',removable: true},{ingr: 'mozzarella',removable: false},{ingr: 'masline rondele',removable: true}],
              price: [
                 { 
                  type: 'small',
                  size: '25cm',
                  price: '24.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '34.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '44.99'
                }
              ]
            },
            {
              prodName: 'Carbonara',
              id: 'p03',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/carbonara.jpg',
              ingredients: [{ingr: 'Mozzarella',removable: false},{ingr: 'parmezan',removable: true},{ingr: 'sos cascaval',removable: false},{ingr: 'ceddar',removable: true},{ingr: 'ceapa rosie',removable: true},{ingr: 'usturoi granulat',removable: true},{ingr: 'bacon felii',removable: true},{ingr: 'rosii cherry',removable: true},{ingr: 'condimente italiene mix',removable: true}],
              price: [
                 { 
                  type: 'small',
                  size: '25cm',
                  price: '25.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '35.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '45.99'
                }
              ],
              offer: true
            },  
            {
              prodName: 'Margherita',
              id: 'p04',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/margherita.jpg',
              ingredients: [{ingr: 'Piept de pui',removable: false},{ingr: 'mozzarella',removable: false},{ingr: 'ceapa rosie',removable: true},{ingr: 'usturoi proaspat',removable: true},{ingr: 'ardei gras',removable: false},{ingr: 'rosii proaspete',removable: false},{ingr: 'sos chipotle',removable: true},{ingr: 'sos ranch',removable: true},{ingr: 'salam chorizo',removable: false},{ingr: 'ceapa verde',removable: true}],
              price: [
                 { 
                  type: 'small',
                  size: '25cm',
                  price: '19.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '29.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '39.99'
                }
              ]
            },  
            {
              prodName: 'Prosciutto & Funghi',
              id: 'p05',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/proscfunghi.jpg',
              ingredients: [{ingr: 'Suncaa',removable: true},{ingr: 'mozzarella',removable: false},{ingr: 'sos de rosii',removable: false},{ingr: 'ciuperci',removable: true}],
              price: [
                 { 
                  type: 'small',
                  size: '25cm',
                  price: '24.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '34.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '44.99'
                }
              ]
            },
            {
              prodName: 'Rustica',
              id: 'p06',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/rustica.jpg',
              ingredients: [{ingr: 'Piept de pui',removable: false},{ingr: 'mozzarella',removable: false},{ingr: 'ceapa rosie',removable: true},{ingr: 'usturoi proaspat',removable: true},{ingr: 'ardei gras',removable: false},{ingr: 'rosii proaspete',removable: false},{ingr: 'sos ranch',removable: true},{ingr: 'salam chorizo',removable: false},{ingr: 'ceapa verde',removable: true}],
              price: [
                { 
                  type: 'small',
                  size: '25cm',
                  price: '24.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '34.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '44.99'
                }
              ]
            },
            {
              prodName: 'Quattro Stagioni',
              id: 'p07',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/quattrostag.jpg',
              ingredients: [{ingr: 'Sunca',removable: true},{ingr: 'mozzarella',removable: false},{ingr: 'oregano',removable: true},{ingr: 'salam pepperoni',removable: true},{ingr: 'sos de rosii',removable: false},{ingr: 'rosii proaspete',removable: true},{ingr: 'feta',removable: true},{ingr: 'ciuperci',removable: true}],
              price: [
                 { 
                  type: 'small',
                  size: '25cm',
                  price: '24.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '34.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '44.99'
                }
              ]
            },
            {
              prodName: 'Vegetariana',
              id: 'p08',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/veget.jpg',
              ingredients: [{ingr: 'Busuioc',removable: true},{ingr: 'ceapa rosie',removable: true},{ingr: 'masline rondele',removable: true},{ingr: 'mozzarella',removable: false},{ingr: 'ardei gras',removable: true},{ingr: 'sos de rosii',removable: false},{ingr: 'rosii proaspete',removable: true},{ingr: 'feta',removable: true},{ingr: 'ciuperci',removable: true}],
              price: [
                { 
                  type: 'small',
                  size: '25cm',
                  price: '24.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '34.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '44.99'
                }
              ],
              offer: true
            },
            {
              prodName: 'Quattro Formagi',
              id: 'p09',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/quattroform.jpg',
              ingredients: [{ingr: 'Mozzarella',removable: false},{ingr: 'sos de cascaval',removable: false},{ingr: 'ceddar',removable: true},{ingr: 'bluecheese',removable: true},{ingr: 'parmezan',removable: true}],
              price: [
                 { 
                  type: 'small',
                  size: '25cm',
                  price: '25.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '35.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '45.99'
                }
              ],
              offer: false
            },
            {
              prodName: 'Hawai',
              id: 'p10',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/hawai.jpg',
              ingredients: [{ingr: 'Ananas',removable: true},{ingr: 'sunca',removable: true},{ingr: 'mozzarella',removable: false},{ingr: 'sos de rosii',removable: false}],
              price: [
                { 
                  type: 'small',
                  size: '25cm',
                  price: '19.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '29.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '39.99'
                }
              ],
              offer: true
            },
            {
              prodName: 'Cheesy',
              id: 'p11',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/cheesy.jpg',
              ingredients: [{ingr: 'Mozzarella',removable: false},{ingr: 'sos de rosii',removable: false}],
              price: [
                { 
                  type: 'small',
                  size: '25cm',
                  price: '19.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '29.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '39.99'
                }
              ]
            },
            {
              prodName: 'Cheeseburger',
              id: 'p12',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/cheeseburger.jpg',
              ingredients: [{ingr: 'Sos de cascaval',removable: true},{ingr: 'sos bolognese',removable: false},{ingr: 'ceapa rosie',removable: true},{ingr: 'mozzarella',removable: false},{ingr: 'castraveti murati',removable: true},{ingr: 'rosii proaspete',removable: true}],
              price: [
                { 
                  type: 'small',
                  size: '25cm',
                  price: '25.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '35.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '45.99'
                }
              ]
            },
            {
              prodName: 'Pesto',
              id: 'p13',
              type: 'pizza',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/pesto.jpg',
              ingredients: [{ingr: 'Sos de cascaval',removable: false},{ingr: 'piept de pui',removable: true},{ingr: 'mozzarella',removable: false},{ingr: 'rosii cherry',removable: true},{ingr: 'feta',removable: true},{ingr: 'sos pesto',removable: false}],
              price: [
                 { 
                  type: 'small',
                  size: '25cm',
                  price: '25.99'
                },
                {
                  type: 'medium',
                  size: '20cm',
                  price: '35.99'
                },
                {
                  type: 'big',
                  size: '35cm',
                  price: '45.99'
                }
              ]
            },
            {
              prodName: 'Cartofi prajiti - portie mica',
              id: 'o01',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/normalpot.jpg',
              type: 'other',
              descr: 'Alege cei mai sănătoși cartofi pai, copți la cuptor! Asezonați cu oregano aromat și fără nici un gram de ulei.',
              gr: '150',
              price: '4.99',
              offer: true
            },
            {
              prodName: 'Cartofi prajiti - portie mare',
              id: 'o02',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/bigpot.jpg',
              type: 'other',
              descr: 'Alege cei mai sănătoși cartofi pai, copți la cuptor! Asezonați cu oregano aromat și fără nici un gram de ulei.',
              gr: '250',
              price: '8.99'
            },
            {
              prodName: 'Salata Greceasa',
              id: 'o03',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/greeksalad.jpg',
              type: 'other',
              descr: 'Gustul mediteranei și a insulelor de vacanță - cu salată eisberg, roșii cherry, castraveți proaspeți, măsline, ardei, brânză Feta și ulei de măsline!',
              gr: '420',
              price: '18.99'
            },
            {
              prodName: 'Aripioare, 7 buc',
              id: 'o04',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/chickenwings.jpg',
              type: 'other',
              descr: 'Aripioare de pui fine, bine rumenite la cuptor! 100% fără ulei. Încearcă-le!',
              gr: '450',
              price: '21.99'
            },
            {
              prodName: 'Nuggets',
              id: 'o05',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/nuggets.jpg',
              type: 'other',
              descr: 'Bucatele delicate de file de pui pane, coapte la cuptor. Crusta crocanta',
              gr: '330',
              price: '16.99'
            },
            {
              prodName: 'Cheesecake',
              id: 'd01',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/cheesecake.jpg',
              type: 'dessert',
              descr: 'Desert delicat de frișcă și brânză, cu un gust dulce, catifelat si un blat crocant delicios. ',
              gr: '230',
              price: '13.99'
            },
            {
              prodName: 'Gogoașa cu ciocolata',
              id: 'd02',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/chocdonut.jpg',
              type: 'dessert',
              descr: 'Aluat pufos umplut cu cremă de cacao și decorat cu un strat de ciocolată neagră și fulgi de zahăr.',
              gr: '150',
              price: '4.99',
              offer: true
            },
            {
              prodName: 'Brioșa cu ciocolata',
              id: 'd03',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/chocmuff.jpg',
              type: 'dessert',
              descr: 'Muffin proaspăt și delicios cu umplutură de ciocolată rafinată la interior și topping generos cu bucăți de ciocolată la exterior. ',
              gr: '150',
              price: '5.99'
            },
            {
              prodName: 'Brownie',
              id: 'd04',
              img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/brownie.jpg',
              type: 'dessert',
              descr: 'Brownie proaspăt și delicios cu ciocolata delicioasa. ',
              gr: '200',
              price: '5.99'
            },
            {
                prodName: 'Pepsi',
                id: 'd01',
                img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/pepsi.jpg',
                type: 'drink',
                l: '0.5',
                price: '5.99'
            },
            {
                prodName: '7UP',
                id: 'd02',
                img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/7up.jpg',
                type: 'drink',
                l: '0.5',
                price: '5.99'
            },
            {
                prodName: 'Lipton piersica',
                id: 'd03',
                img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/liptonpeach.jpg',
                type: 'drink',
                l: '0.5',
                price: '4.99'
            },
            {
                prodName: 'Lipton lamaie',
                id: 'd04',
                img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/liptonlemon.jpg',
                type: 'drink',
                l: '0.5',
                price: '4.99'
            },
            {
                prodName: 'Apa plata',
                id: 'd05',
                img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/naturalwater.jpg',
                type: 'drink',
                l: '0.5',
                price: '4.90'
            },
            {
                prodName: 'Apa minerala',
                id: 'd06',
                img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/carbowater.jpg',
                type: 'drink',
                l: '0.5',
                price: '4.99'
            },
            {
                prodName: 'Pepsi',
                id: 'd07',
                img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/pepsibig.jpg',
                type: 'drink',
                l: '1.25',
                price: '7.99'
            },
            {
                prodName: 'Pepsi twist',
                id: 'd08',
                img: 'https://www.ionutdev.net/projimages/pizzadel/pizzaimg/pepsitwist.jpg',
                type: 'drink',
                l: '0.5',
                price: '4.99'
            }
        ]


export default products;