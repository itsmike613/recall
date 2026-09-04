const game = "RECALL";
const name = (en, es, ru) => ({ en, es, ru });

const broad = ["nw", "ne", "c", "sw", "se"];
const stand = ["nw", "ne", "w", "c", "e", "sw", "s", "se"];
const edge = ["nw", "n", "ne", "w", "e", "sw", "s", "se"];
const wall = ["n", "w", "e", "s"];
const low = ["nw", "ne", "c", "sw", "s", "se"];

const cats = [
    { id: "furniture", dir: "Furniture", name: name("Furniture", "Muebles", "Мебель") },
    { id: "food", dir: "Food", name: name("Food", "Comida", "Еда") },
    { id: "clothing", dir: "Clothing", name: name("Clothing", "Ropa", "Одежда") },
    { id: "tools", dir: "Tools", name: name("Tools", "Herramientas", "Инструменты") },
    { id: "electronics", dir: "Electronics", name: name("Electronics", "Electrónica", "Электроника") },
    { id: "decor", dir: "Decor", name: name("Decor", "Decoración", "Декор") },
    { id: "office", dir: "Office", name: name("Office", "Oficina", "Канцелярия") },
    { id: "household", dir: "Household", name: name("Household", "Hogar", "Бытовые вещи") }
];

const catalog = [
    { id:"chair", cat:"furniture", pos:stand, name:name("Chair","Silla","Стул"), img:"chair", detail:[{id:"wood",name:name("Wooden Chair","Silla de madera","Деревянный стул"),img:"wooden-chair"},{id:"black",name:name("Black Chair","Silla negra","Чёрный стул"),img:"black-chair"}] },
    { id:"couch", cat:"furniture", pos:edge, name:name("Couch","Sofá","Диван"), img:"couch", detail:[{id:"blue",name:name("Blue Couch","Sofá azul","Синий диван"),img:"blue-couch"},{id:"gray",name:name("Gray Couch","Sofá gris","Серый диван"),img:"gray-couch"}] },
    { id:"table", cat:"furniture", pos:low, name:name("Table","Mesa","Стол"), img:"table", detail:[{id:"round",name:name("Round Table","Mesa redonda","Круглый стол"),img:"round-table"},{id:"square",name:name("Square Table","Mesa cuadrada","Квадратный стол"),img:"square-table"}] },
    { id:"bookshelf", cat:"furniture", pos:edge, name:name("Bookshelf","Estantería","Книжный шкаф"), img:"bookshelf", detail:[{id:"light",name:name("Light Bookshelf","Estantería clara","Светлый книжный шкаф"),img:"light-bookshelf"},{id:"dark",name:name("Dark Bookshelf","Estantería oscura","Тёмный книжный шкаф"),img:"dark-bookshelf"}] },
    { id:"stool", cat:"furniture", pos:stand, name:name("Stool","Taburete","Табурет"), img:"stool", detail:[{id:"red",name:name("Red Stool","Taburete rojo","Красный табурет"),img:"red-stool"},{id:"green",name:name("Green Stool","Taburete verde","Зелёный табурет"),img:"green-stool"}] },
    { id:"cabinet", cat:"furniture", pos:edge, name:name("Cabinet","Armario","Шкафчик"), img:"cabinet", detail:[{id:"white",name:name("White Cabinet","Armario blanco","Белый шкафчик"),img:"white-cabinet"},{id:"brown",name:name("Brown Cabinet","Armario marrón","Коричневый шкафчик"),img:"brown-cabinet"}] },

    { id:"apple", cat:"food", pos:broad, name:name("Apple","Manzana","Яблоко"), img:"apple", detail:[{id:"red",name:name("Red Apple","Manzana roja","Красное яблоко"),img:"red-apple"},{id:"green",name:name("Green Apple","Manzana verde","Зелёное яблоко"),img:"green-apple"}] },
    { id:"banana", cat:"food", pos:broad, name:name("Banana","Plátano","Банан"), img:"banana", detail:[{id:"yellow",name:name("Yellow Banana","Plátano amarillo","Жёлтый банан"),img:"yellow-banana"},{id:"green",name:name("Green Banana","Plátano verde","Зелёный банан"),img:"green-banana"}] },
    { id:"bread", cat:"food", pos:broad, name:name("Bread","Pan","Хлеб"), img:"bread", detail:[{id:"white",name:name("White Bread","Pan blanco","Белый хлеб"),img:"white-bread"},{id:"brown",name:name("Brown Bread","Pan integral","Тёмный хлеб"),img:"brown-bread"}] },
    { id:"orange", cat:"food", pos:broad, name:name("Orange","Naranja","Апельсин"), img:"orange", detail:[{id:"whole",name:name("Whole Orange","Naranja entera","Целый апельсин"),img:"whole-orange"},{id:"half",name:name("Half Orange","Media naranja","Половина апельсина"),img:"half-orange"}] },
    { id:"sandwich", cat:"food", pos:broad, name:name("Sandwich","Sándwich","Сэндвич"), img:"sandwich", detail:[{id:"triangle",name:name("Triangle Sandwich","Sándwich triangular","Треугольный сэндвич"),img:"triangle-sandwich"},{id:"square",name:name("Square Sandwich","Sándwich cuadrado","Квадратный сэндвич"),img:"square-sandwich"}] },
    { id:"bottle", cat:"food", pos:broad, name:name("Bottle","Botella","Бутылка"), img:"bottle", detail:[{id:"blue",name:name("Blue Bottle","Botella azul","Синяя бутылка"),img:"blue-bottle"},{id:"clear",name:name("Clear Bottle","Botella transparente","Прозрачная бутылка"),img:"clear-bottle"}] },

    { id:"hat", cat:"clothing", pos:broad, name:name("Hat","Sombrero","Шляпа"), img:"hat", detail:[{id:"black",name:name("Black Hat","Sombrero negro","Чёрная шляпа"),img:"black-hat"},{id:"tan",name:name("Tan Hat","Sombrero beige","Бежевая шляпа"),img:"tan-hat"}] },
    { id:"shoe", cat:"clothing", pos:broad, name:name("Shoe","Zapato","Ботинок"), img:"shoe", detail:[{id:"red",name:name("Red Shoe","Zapato rojo","Красный ботинок"),img:"red-shoe"},{id:"white",name:name("White Shoe","Zapato blanco","Белый ботинок"),img:"white-shoe"}] },
    { id:"scarf", cat:"clothing", pos:broad, name:name("Scarf","Bufanda","Шарф"), img:"scarf", detail:[{id:"striped",name:name("Striped Scarf","Bufanda a rayas","Полосатый шарф"),img:"striped-scarf"},{id:"plain",name:name("Plain Scarf","Bufanda lisa","Однотонный шарф"),img:"plain-scarf"}] },
    { id:"jacket", cat:"clothing", pos:edge, name:name("Jacket","Chaqueta","Куртка"), img:"jacket", detail:[{id:"denim",name:name("Denim Jacket","Chaqueta vaquera","Джинсовая куртка"),img:"denim-jacket"},{id:"green",name:name("Green Jacket","Chaqueta verde","Зелёная куртка"),img:"green-jacket"}] },
    { id:"glove", cat:"clothing", pos:broad, name:name("Glove","Guante","Перчатка"), img:"glove", detail:[{id:"blue",name:name("Blue Glove","Guante azul","Синяя перчатка"),img:"blue-glove"},{id:"gray",name:name("Gray Glove","Guante gris","Серая перчатка"),img:"gray-glove"}] },
    { id:"backpack", cat:"clothing", pos:stand, name:name("Backpack","Mochila","Рюкзак"), img:"backpack", detail:[{id:"red",name:name("Red Backpack","Mochila roja","Красный рюкзак"),img:"red-backpack"},{id:"navy",name:name("Navy Backpack","Mochila azul marino","Тёмно-синий рюкзак"),img:"navy-backpack"}] },

    { id:"hammer", cat:"tools", pos:broad, name:name("Hammer","Martillo","Молоток"), img:"hammer", detail:[{id:"wood",name:name("Wood-Handle Hammer","Martillo con mango de madera","Молоток с деревянной ручкой"),img:"wood-hammer"},{id:"black",name:name("Black-Handle Hammer","Martillo con mango negro","Молоток с чёрной ручкой"),img:"black-hammer"}] },
    { id:"wrench", cat:"tools", pos:broad, name:name("Wrench","Llave inglesa","Гаечный ключ"), img:"wrench", detail:[{id:"silver",name:name("Silver Wrench","Llave plateada","Серебристый ключ"),img:"silver-wrench"},{id:"dark",name:name("Dark Wrench","Llave oscura","Тёмный ключ"),img:"dark-wrench"}] },
    { id:"screwdriver", cat:"tools", pos:broad, name:name("Screwdriver","Destornillador","Отвёртка"), img:"screwdriver", detail:[{id:"red",name:name("Red Screwdriver","Destornillador rojo","Красная отвёртка"),img:"red-screwdriver"},{id:"yellow",name:name("Yellow Screwdriver","Destornillador amarillo","Жёлтая отвёртка"),img:"yellow-screwdriver"}] },
    { id:"measure", cat:"tools", pos:broad, name:name("Tape Measure","Cinta métrica","Рулетка"), img:"measure", detail:[{id:"yellow",name:name("Yellow Tape Measure","Cinta métrica amarilla","Жёлтая рулетка"),img:"yellow-measure"},{id:"black",name:name("Black Tape Measure","Cinta métrica negra","Чёрная рулетка"),img:"black-measure"}] },
    { id:"pliers", cat:"tools", pos:broad, name:name("Pliers","Alicates","Плоскогубцы"), img:"pliers", detail:[{id:"red",name:name("Red Pliers","Alicates rojos","Красные плоскогубцы"),img:"red-pliers"},{id:"blue",name:name("Blue Pliers","Alicates azules","Синие плоскогубцы"),img:"blue-pliers"}] },
    { id:"flashlight", cat:"tools", pos:broad, name:name("Flashlight","Linterna","Фонарик"), img:"flashlight", detail:[{id:"silver",name:name("Silver Flashlight","Linterna plateada","Серебристый фонарик"),img:"silver-flashlight"},{id:"black",name:name("Black Flashlight","Linterna negra","Чёрный фонарик"),img:"black-flashlight"}] },

    { id:"phone", cat:"electronics", pos:broad, name:name("Phone","Teléfono","Телефон"), img:"phone", detail:[{id:"black",name:name("Black Phone","Teléfono negro","Чёрный телефон"),img:"black-phone"},{id:"white",name:name("White Phone","Teléfono blanco","Белый телефон"),img:"white-phone"}] },
    { id:"laptop", cat:"electronics", pos:broad, name:name("Laptop","Portátil","Ноутбук"), img:"laptop", detail:[{id:"silver",name:name("Silver Laptop","Portátil plateado","Серебристый ноутбук"),img:"silver-laptop"},{id:"black",name:name("Black Laptop","Portátil negro","Чёрный ноутбук"),img:"black-laptop"}] },
    { id:"camera", cat:"electronics", pos:broad, name:name("Camera","Cámara","Камера"), img:"camera", detail:[{id:"black",name:name("Black Camera","Cámara negra","Чёрная камера"),img:"black-camera"},{id:"silver",name:name("Silver Camera","Cámara plateada","Серебристая камера"),img:"silver-camera"}] },
    { id:"headphones", cat:"electronics", pos:broad, name:name("Headphones","Auriculares","Наушники"), img:"headphones", detail:[{id:"red",name:name("Red Headphones","Auriculares rojos","Красные наушники"),img:"red-headphones"},{id:"black",name:name("Black Headphones","Auriculares negros","Чёрные наушники"),img:"black-headphones"}] },
    { id:"speaker", cat:"electronics", pos:broad, name:name("Speaker","Altavoz","Колонка"), img:"speaker", detail:[{id:"blue",name:name("Blue Speaker","Altavoz azul","Синяя колонка"),img:"blue-speaker"},{id:"black",name:name("Black Speaker","Altavoz negro","Чёрная колонка"),img:"black-speaker"}] },
    { id:"controller", cat:"electronics", pos:broad, name:name("Game Controller","Mando de juego","Игровой контроллер"), img:"controller", detail:[{id:"white",name:name("White Controller","Mando blanco","Белый контроллер"),img:"white-controller"},{id:"black",name:name("Black Controller","Mando negro","Чёрный контроллер"),img:"black-controller"}] },

    { id:"vase", cat:"decor", pos:broad, name:name("Vase","Jarrón","Ваза"), img:"vase", detail:[{id:"blue",name:name("Blue Vase","Jarrón azul","Синяя ваза"),img:"blue-vase"},{id:"white",name:name("White Vase","Jarrón blanco","Белая ваза"),img:"white-vase"}] },
    { id:"plant", cat:"decor", pos:stand, name:name("Plant","Planta","Растение"), img:"plant", detail:[{id:"tall",name:name("Tall Plant","Planta alta","Высокое растение"),img:"tall-plant"},{id:"small",name:name("Small Plant","Planta pequeña","Маленькое растение"),img:"small-plant"}] },
    { id:"clock", cat:"decor", pos:wall, name:name("Wall Clock","Reloj de pared","Настенные часы"), img:"clock", detail:[{id:"round",name:name("Round Wall Clock","Reloj de pared redondo","Круглые настенные часы"),img:"round-clock"},{id:"square",name:name("Square Wall Clock","Reloj de pared cuadrado","Квадратные настенные часы"),img:"square-clock"}] },
    { id:"candle", cat:"decor", pos:broad, name:name("Candle","Vela","Свеча"), img:"candle", detail:[{id:"white",name:name("White Candle","Vela blanca","Белая свеча"),img:"white-candle"},{id:"red",name:name("Red Candle","Vela roja","Красная свеча"),img:"red-candle"}] },
    { id:"frame", cat:"decor", pos:edge, name:name("Picture Frame","Marco de foto","Фоторамка"), img:"frame", detail:[{id:"black",name:name("Black Picture Frame","Marco de foto negro","Чёрная фоторамка"),img:"black-frame"},{id:"gold",name:name("Gold Picture Frame","Marco de foto dorado","Золотая фоторамка"),img:"gold-frame"}] },
    { id:"sculpture", cat:"decor", pos:stand, name:name("Sculpture","Escultura","Скульптура"), img:"sculpture", detail:[{id:"white",name:name("White Sculpture","Escultura blanca","Белая скульптура"),img:"white-sculpture"},{id:"bronze",name:name("Bronze Sculpture","Escultura de bronce","Бронзовая скульптура"),img:"bronze-sculpture"}] },

    { id:"notebook", cat:"office", pos:broad, name:name("Notebook","Cuaderno","Блокнот"), img:"notebook", detail:[{id:"blue",name:name("Blue Notebook","Cuaderno azul","Синий блокнот"),img:"blue-notebook"},{id:"red",name:name("Red Notebook","Cuaderno rojo","Красный блокнот"),img:"red-notebook"}] },
    { id:"pen", cat:"office", pos:broad, name:name("Pen","Bolígrafo","Ручка"), img:"pen", detail:[{id:"blue",name:name("Blue Pen","Bolígrafo azul","Синяя ручка"),img:"blue-pen"},{id:"black",name:name("Black Pen","Bolígrafo negro","Чёрная ручка"),img:"black-pen"}] },
    { id:"stapler", cat:"office", pos:broad, name:name("Stapler","Grapadora","Степлер"), img:"stapler", detail:[{id:"red",name:name("Red Stapler","Grapadora roja","Красный степлер"),img:"red-stapler"},{id:"black",name:name("Black Stapler","Grapadora negra","Чёрный степлер"),img:"black-stapler"}] },
    { id:"calculator", cat:"office", pos:broad, name:name("Calculator","Calculadora","Калькулятор"), img:"calculator", detail:[{id:"gray",name:name("Gray Calculator","Calculadora gris","Серый калькулятор"),img:"gray-calculator"},{id:"black",name:name("Black Calculator","Calculadora negra","Чёрный калькулятор"),img:"black-calculator"}] },
    { id:"scissors", cat:"office", pos:broad, name:name("Scissors","Tijeras","Ножницы"), img:"scissors", detail:[{id:"red",name:name("Red Scissors","Tijeras rojas","Красные ножницы"),img:"red-scissors"},{id:"blue",name:name("Blue Scissors","Tijeras azules","Синие ножницы"),img:"blue-scissors"}] },
    { id:"folder", cat:"office", pos:broad, name:name("Folder","Carpeta","Папка"), img:"folder", detail:[{id:"yellow",name:name("Yellow Folder","Carpeta amarilla","Жёлтая папка"),img:"yellow-folder"},{id:"blue",name:name("Blue Folder","Carpeta azul","Синяя папка"),img:"blue-folder"}] },

    { id:"key", cat:"household", pos:broad, name:name("Key","Llave","Ключ"), img:"key", detail:[{id:"silver",name:name("Silver Key","Llave plateada","Серебряный ключ"),img:"silver-key"},{id:"gold",name:name("Gold Key","Llave dorada","Золотой ключ"),img:"gold-key"}] },
    { id:"umbrella", cat:"household", pos:stand, name:name("Umbrella","Paraguas","Зонт"), img:"umbrella", detail:[{id:"red",name:name("Red Umbrella","Paraguas rojo","Красный зонт"),img:"red-umbrella"},{id:"black",name:name("Black Umbrella","Paraguas negro","Чёрный зонт"),img:"black-umbrella"}] },
    { id:"towel", cat:"household", pos:broad, name:name("Towel","Toalla","Полотенце"), img:"towel", detail:[{id:"blue",name:name("Blue Towel","Toalla azul","Синее полотенце"),img:"blue-towel"},{id:"white",name:name("White Towel","Toalla blanca","Белое полотенце"),img:"white-towel"}] },
    { id:"basket", cat:"household", pos:stand, name:name("Basket","Cesta","Корзина"), img:"basket", detail:[{id:"woven",name:name("Woven Basket","Cesta tejida","Плетёная корзина"),img:"woven-basket"},{id:"white",name:name("White Basket","Cesta blanca","Белая корзина"),img:"white-basket"}] },
    { id:"brush", cat:"household", pos:broad, name:name("Brush","Cepillo","Щётка"), img:"brush", detail:[{id:"wood",name:name("Wooden Brush","Cepillo de madera","Деревянная щётка"),img:"wood-brush"},{id:"blue",name:name("Blue Brush","Cepillo azul","Синяя щётка"),img:"blue-brush"}] },
    { id:"remote", cat:"household", pos:broad, name:name("Remote","Mando a distancia","Пульт"), img:"remote", detail:[{id:"black",name:name("Black Remote","Mando negro","Чёрный пульт"),img:"black-remote"},{id:"white",name:name("White Remote","Mando blanco","Белый пульт"),img:"white-remote"}] }
];

const words = {
    en: {
        tagline:"See it. Remember it. Rebuild it.", play:"Play", settings:"Settings", help:"Help", home:"Home", back:"Back", done:"Done", skip:"Skip", quit:"Quit", again:"Play Again",
        newround:"New round", setup:"Setup", total:"Objects selected", generate:"Generate Room", generated:"Generated room", preview:"Preview", reroll:"Reroll", startstudy:"Start Study",
        phase1:"Phase 1", study:"Study", redo:"Redo", phase2:"Phase 2", wait:"Wait", waittext:"The studied room is hidden. Hold the scene in memory until recall begins.", warning:"Do not close or reload this tab or the current game will be lost.",
        phase3:"Phase 3", recognition:"Object Recognition", picklead:"Select up to {n} objects that you remember being in the room. You may continue with fewer if you are unsure.", phase4:"Phase 4", features:"Visual Feature Memory", featurelead:"Choose the exact version you remember for each selected object.",
        phase5:"Phase 5", location:"Object-Location Memory", placelead:"Select an object, then choose its remembered position. Select its occupied slot again to clear it.", complete:"Round complete", results:"Results",
        recognitionresult:"Object Recognition", locationresult:"Object-Location Memory", featureresult:"Visual Feature Memory", scene:"Scene Reconstruction", correct:"{a}/{b} correct", selected:"{a}/{b} selected", placed:"{a}/{b} placed",
        preferences:"Preferences", images:"Images", imageshelp:"Show local object artwork during the game.", detailed:"Detailed Mode", detailedhelp:"Use and test predefined visual variants.", studytime:"Study duration", waittime:"Wait duration", timerhelp:"1–600 seconds.", seconds:"sec",
        distraction:"Distraction Mode", distractionhelp:"Show a new mental task every 15 seconds while waiting.", directions:"Direction terminology", directionshelp:"Changes only how room positions are named.", cardinal:"Cardinal", relative:"Relative",
        guide:"Guide", how:"How to Play", helpintro:"{game} is a visual memory exercise. Study a generated arrangement, wait, then identify and reconstruct what you remember.", controls:"Redo restarts the current Study period with the same room. Skip advances immediately wherever it appears.",
        empty:"Choose at least one object before generating.", impossible:"That selection could not be placed validly. Adjust the category counts and try again.", asset:"Image unavailable"
    },
    es: {
        tagline:"Míralo. Recuérdalo. Reconstrúyelo.", play:"Jugar", settings:"Ajustes", help:"Ayuda", home:"Inicio", back:"Atrás", done:"Listo", skip:"Saltar", quit:"Salir", again:"Jugar de nuevo",
        newround:"Nueva ronda", setup:"Preparación", total:"Objetos seleccionados", generate:"Generar habitación", generated:"Habitación generada", preview:"Vista previa", reroll:"Regenerar", startstudy:"Iniciar estudio",
        phase1:"Fase 1", study:"Estudio", redo:"Reiniciar", phase2:"Fase 2", wait:"Espera", waittext:"La habitación estudiada está oculta. Mantén la escena en la memoria hasta que empiece el recuerdo.", warning:"No cierres ni recargues esta pestaña o se perderá la partida actual.",
        phase3:"Fase 3", recognition:"Reconocimiento de objetos", picklead:"Selecciona hasta {n} objetos que recuerdes haber visto en la habitación. Puedes continuar con menos si no estás seguro.", phase4:"Fase 4", features:"Memoria de rasgos visuales", featurelead:"Elige la versión exacta que recuerdes de cada objeto seleccionado.",
        phase5:"Fase 5", location:"Memoria objeto-ubicación", placelead:"Selecciona un objeto y luego su posición recordada. Pulsa de nuevo su casilla ocupada para quitarlo.", complete:"Ronda completa", results:"Resultados",
        recognitionresult:"Reconocimiento de objetos", locationresult:"Memoria objeto-ubicación", featureresult:"Memoria de rasgos visuales", scene:"Reconstrucción de la escena", correct:"{a}/{b} correctos", selected:"{a}/{b} seleccionados", placed:"{a}/{b} colocados",
        preferences:"Preferencias", images:"Imágenes", imageshelp:"Muestra ilustraciones locales de los objetos durante el juego.", detailed:"Modo detallado", detailedhelp:"Usa y evalúa variantes visuales predefinidas.", studytime:"Duración de estudio", waittime:"Duración de espera", timerhelp:"1–600 segundos.", seconds:"s",
        distraction:"Modo distracción", distractionhelp:"Muestra una nueva tarea mental cada 15 segundos durante la espera.", directions:"Terminología de dirección", directionshelp:"Solo cambia cómo se nombran las posiciones de la habitación.", cardinal:"Cardinal", relative:"Relativa",
        guide:"Guía", how:"Cómo jugar", helpintro:"{game} es un ejercicio de memoria visual. Estudia una disposición generada, espera y después identifica y reconstruye lo que recuerdas.", controls:"Reiniciar vuelve a empezar el periodo de Estudio actual con la misma habitación. Saltar avanza inmediatamente cuando aparece.",
        empty:"Elige al menos un objeto antes de generar.", impossible:"Esa selección no pudo colocarse de forma válida. Ajusta las cantidades e inténtalo de nuevo.", asset:"Imagen no disponible"
    },
    ru: {
        tagline:"Увидьте. Запомните. Воссоздайте.", play:"Играть", settings:"Настройки", help:"Помощь", home:"Главная", back:"Назад", done:"Готово", skip:"Пропустить", quit:"Выйти", again:"Играть снова",
        newround:"Новый раунд", setup:"Настройка", total:"Выбрано объектов", generate:"Создать комнату", generated:"Созданная комната", preview:"Предпросмотр", reroll:"Пересоздать", startstudy:"Начать изучение",
        phase1:"Этап 1", study:"Изучение", redo:"Заново", phase2:"Этап 2", wait:"Ожидание", waittext:"Изученная комната скрыта. Удерживайте сцену в памяти до начала проверки.", warning:"Не закрывайте и не перезагружайте вкладку — текущая игра будет потеряна.",
        phase3:"Этап 3", recognition:"Распознавание объектов", picklead:"Выберите до {n} объектов, которые вы помните в комнате. Если не уверены, можно продолжить с меньшим количеством.", phase4:"Этап 4", features:"Память на визуальные признаки", featurelead:"Выберите точный вариант, который вы помните, для каждого выбранного объекта.",
        phase5:"Этап 5", location:"Память на расположение", placelead:"Выберите объект, затем его запомнившееся место. Нажмите его занятую ячейку ещё раз, чтобы убрать.", complete:"Раунд завершён", results:"Результаты",
        recognitionresult:"Распознавание объектов", locationresult:"Память на расположение", featureresult:"Память на визуальные признаки", scene:"Восстановление сцены", correct:"{a}/{b} верно", selected:"{a}/{b} выбрано", placed:"{a}/{b} размещено",
        preferences:"Параметры", images:"Изображения", imageshelp:"Показывать локальные изображения объектов во время игры.", detailed:"Подробный режим", detailedhelp:"Использовать и проверять заранее заданные визуальные варианты.", studytime:"Время изучения", waittime:"Время ожидания", timerhelp:"1–600 секунд.", seconds:"с",
        distraction:"Режим отвлечения", distractionhelp:"Показывать новое умственное задание каждые 15 секунд ожидания.", directions:"Термины направлений", directionshelp:"Меняет только названия позиций в комнате.", cardinal:"Стороны света", relative:"Относительные",
        guide:"Справка", how:"Как играть", helpintro:"{game} — упражнение на зрительную память. Изучите созданную расстановку, подождите, затем определите объекты и восстановите их расположение.", controls:"«Заново» перезапускает текущий период изучения с той же комнатой. «Пропустить» сразу переводит к следующему этапу там, где эта кнопка доступна.",
        empty:"Перед созданием выберите хотя бы один объект.", impossible:"Такую выборку не удалось корректно разместить. Измените количество категорий и попробуйте снова.", asset:"Изображение недоступно"
    }
};

const places = {
    cardinal: {
        nw:name("Northwest Corner","Esquina noroeste","Северо-западный угол"), n:name("North Wall","Pared norte","Северная стена"), ne:name("Northeast Corner","Esquina noreste","Северо-восточный угол"),
        w:name("West Wall","Pared oeste","Западная стена"), c:name("Center","Centro","Центр"), e:name("East Wall","Pared este","Восточная стена"),
        sw:name("Southwest Corner","Esquina suroeste","Юго-западный угол"), s:name("South Wall","Pared sur","Южная стена"), se:name("Southeast Corner","Esquina sureste","Юго-восточный угол")
    },
    relative: {
        nw:name("Top Left Corner","Esquina superior izquierda","Верхний левый угол"), n:name("Top Wall","Pared superior","Верхняя стена"), ne:name("Top Right Corner","Esquina superior derecha","Верхний правый угол"),
        w:name("Left Wall","Pared izquierda","Левая стена"), c:name("Center","Centro","Центр"), e:name("Right Wall","Pared derecha","Правая стена"),
        sw:name("Bottom Left Corner","Esquina inferior izquierda","Нижний левый угол"), s:name("Bottom Wall","Pared inferior","Нижняя стена"), se:name("Bottom Right Corner","Esquina inferior derecha","Нижний правый угол")
    }
};

const tasks = [
    name("Think of 5 animals","Piensa en 5 animales","Назовите про себя 5 животных"),
    name("Think of 5 foods","Piensa en 5 comidas","Назовите про себя 5 продуктов"),
    name("Think of 3 ocean animals","Piensa en 3 animales marinos","Назовите про себя 3 морских животных"),
    name("Think of 5 things that are blue","Piensa en 5 cosas azules","Назовите про себя 5 синих предметов"),
    name("Name 4 countries","Nombra 4 países","Назовите 4 страны"),
    name("Count backward from 20","Cuenta hacia atrás desde 20","Считайте назад от 20"),
    name("Think of 4 round objects","Piensa en 4 objetos redondos","Назовите про себя 4 круглых предмета"),
    name("Name 5 first names","Nombra 5 nombres de persona","Назовите 5 имён"),
    name("Think of 4 things found outdoors","Piensa en 4 cosas que se encuentran al aire libre","Назовите 4 вещи, которые встречаются на улице"),
    name("Count by threes from 3 to 30","Cuenta de tres en tres del 3 al 30","Считайте тройками от 3 до 30")
];

const howplay = [
    name("Choose object categories and how many items you want.","Elige las categorías de objetos y cuántos elementos quieres.","Выберите категории объектов и количество предметов."),
    name("Generate a room arrangement.","Genera una disposición de habitación.","Создайте расстановку комнаты."),
    name("Look over the generated setup before the timer starts.","Observa la configuración generada antes de que empiece el temporizador.","Осмотрите созданную сцену до запуска таймера."),
    name("Start the Study phase and memorize the objects and their locations.","Inicia la fase de Estudio y memoriza los objetos y sus ubicaciones.","Запустите этап «Изучение» и запомните объекты и их расположение."),
    name("Wait through the memory delay. If Distraction Mode is enabled, simple mental tasks will appear.","Espera durante el intervalo de memoria. Si el Modo distracción está activado, aparecerán tareas mentales sencillas.","Дождитесь окончания задержки памяти. Если включён режим отвлечения, будут появляться простые умственные задания."),
    name("Choose which objects you remember seeing.","Elige los objetos que recuerdas haber visto.","Выберите объекты, которые вы помните в комнате."),
    name("If Detailed Mode is enabled, recall their visual variants or details.","Si el Modo detallado está activado, recuerda sus variantes o detalles visuales.","Если включён подробный режим, вспомните их визуальные варианты или детали."),
    name("Reconstruct where the remembered objects were located.","Reconstruye dónde estaban ubicados los objetos recordados.","Восстановите места, где находились запомнившиеся объекты."),
    name("View your memory scores and overall Scene Reconstruction result.","Consulta tus puntuaciones de memoria y el resultado general de Reconstrucción de la escena.","Посмотрите показатели памяти и общий результат «Восстановление сцены»." )
];

const topics = [
    { title:name("Visuospatial Memory","Memoria visuoespacial","Зрительно-пространственная память"), text:name("The ability to temporarily retain and work with visual information and spatial relationships.","La capacidad de retener temporalmente y trabajar con información visual y relaciones espaciales.","Способность временно удерживать и обрабатывать зрительную информацию и пространственные отношения.") },
    { title:name("Object Recognition Memory","Memoria de reconocimiento de objetos","Память на распознавание объектов"), text:name("Recognizing which objects were previously present.","Reconocer qué objetos estaban presentes anteriormente.","Распознавание того, какие объекты присутствовали ранее.") },
    { title:name("Object-Location Memory","Memoria objeto-ubicación","Память на расположение объектов"), text:name("Remembering which objects appeared in which locations.","Recordar qué objetos aparecieron en qué lugares.","Запоминание того, какие объекты находились в каких местах.") },
    { title:name("Visual Feature Memory","Memoria de rasgos visuales","Память на визуальные признаки"), text:name("Remembering visual properties of an object, such as color or appearance.","Recordar propiedades visuales de un objeto, como su color o apariencia.","Запоминание визуальных свойств объекта, например цвета или внешнего вида.") },
    { title:name("Scene Reconstruction","Reconstrucción de la escena","Восстановление сцены"), text:name("Rebuilding the overall arrangement of a previously viewed environment.","Reconstruir la disposición general de un entorno visto anteriormente.","Воссоздание общей расстановки ранее увиденной среды.") }
];