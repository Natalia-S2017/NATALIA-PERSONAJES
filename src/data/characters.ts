// Datos de cada personaje con textos en español e inglés
export interface CharacterData {
  id: string
  nameEs: string
  nameEn: string
  route: string
  color: string
  bgColor: string

  originEs: string
  originEn: string

  skillsEs: string[]
  skillsEn: string[]

  creatorEs: string
  creatorEn: string

  historyEs: string
  historyEn: string

  gameTitleEs: string
  gameTitleEn: string
  gameDescEs: string
  gameDescEn: string
}

export const CHARACTERS: Record<string, CharacterData> = {
  mario: {
    id: 'mario',
    nameEs: 'Mario',
    nameEn: 'Mario',
    route: '/mario',
    color: '#E52521',
    bgColor: '#1a0a40',

    originEs: 'Nintendo, Japón — 1981',
    originEn: 'Nintendo, Japan — 1981',

    historyEs:
      'Mario debutó en Donkey Kong (1981) como "Jumpman". Fue el primer videojuego de plataformas y definió el género. Shigeru Miyamoto lo diseñó como un plomero italiano que rescata a la Princesa Peach del malvado Bowser en el Reino Champiñón.',
    historyEn:
      'Mario debuted in Donkey Kong (1981) as "Jumpman". It was the first platform video game and defined the genre. Shigeru Miyamoto designed him as an Italian plumber who rescues Princess Peach from the evil Bowser in the Mushroom Kingdom.',

    skillsEs: [
      'Salto súper alto',
      'Lanzar bolas de fuego (con flor de fuego)',
      'Romper bloques con el puño',
      'Correr muy rápido',
      'Transformaciones con power-ups',
    ],
    skillsEn: [
      'Super high jump',
      'Throw fireballs (with Fire Flower)',
      'Break blocks with fist',
      'Run very fast',
      'Transformations with power-ups',
    ],

    creatorEs: 'Creador: Shigeru Miyamoto · Empresa: Nintendo · Año: 1981',
    creatorEn: 'Creator: Shigeru Miyamoto · Company: Nintendo · Year: 1981',

    gameTitleEs: 'Super Mario Bros.',
    gameTitleEn: 'Super Mario Bros.',
    gameDescEs: 'Saga de plataformas creada en 1985. Mario debe rescatar a la Princesa Peach del malvado Bowser atravesando mundos llenos de obstáculos y enemigos. Entre sus variantes más icónicas: Super Mario Bros. (1985), Super Mario World (1990), Super Mario 64 (1996), Super Mario Galaxy (2007) y Super Mario Odyssey (2017).',
    gameDescEn: 'Platform saga created in 1985. Mario must rescue Princess Peach from the evil Bowser by crossing worlds full of obstacles and enemies. Among its most iconic variants: Super Mario Bros. (1985), Super Mario World (1990), Super Mario 64 (1996), Super Mario Galaxy (2007) and Super Mario Odyssey (2017).',
  },

  pacman: {
    id: 'pacman',
    nameEs: 'Pac-Man',
    nameEn: 'Pac-Man',
    route: '/pacman',
    color: '#FFE000',
    bgColor: '#000020',

    originEs: 'Namco, Japón — 1980',
    originEn: 'Namco, Japan — 1980',

    historyEs:
      'Pac-Man nació en los arcades japoneses en mayo de 1980. Toru Iwatani se inspiró en una pizza con un trozo quitado para diseñar el personaje. Fue el primer videojuego con un protagonista reconocible y el primero dirigido tanto a hombres como mujeres, revolucionando la industria.',
    historyEn:
      'Pac-Man was born in Japanese arcades in May 1980. Toru Iwatani was inspired by a pizza with a slice removed to design the character. It was the first video game with a recognizable protagonist and the first aimed at both men and women, revolutionizing the industry.',

    skillsEs: [
      'Comer puntos (dots) y power pellets',
      'Comer fantasmas cuando está potenciado',
      'Navegar laberintos a alta velocidad',
      'Comer frutas de bonificación',
    ],
    skillsEn: [
      'Eat dots and power pellets',
      'Eat ghosts when powered up',
      'Navigate mazes at high speed',
      'Eat bonus fruits',
    ],

    creatorEs: 'Creador: Toru Iwatani · Empresa: Namco · Año: 1980',
    creatorEn: 'Creator: Toru Iwatani · Company: Namco · Year: 1980',

    gameTitleEs: 'Pac-Man',
    gameTitleEn: 'Pac-Man',
    gameDescEs: 'Pac-Man es uno de los videojuegos más influyentes de la historia, lanzado por Namco en mayo de 1980. El jugador controla a Pac-Man, una criatura circular amarilla, guiándolo por un laberinto lleno de puntos (dots) y frutas de bonificación, mientras evita a cuatro fantasmas: Blinky (rojo), Pinky (rosa), Inky (cian) y Clyde (naranja). Al comer una Power Pellet, los fantasmas se vuelven vulnerables y pueden ser devorados. Fue el primer videojuego en tener un protagonista reconocible, el primero en incluir pantallas de bonificación y el primero dirigido a audiencias mixtas. Entre sus variantes más icónicas se encuentran: Ms. Pac-Man (1982), Super Pac-Man (1982), Pac-Land (1984), Pac-Mania (1987), Pac-Man World (1999) y Pac-Man Championship Edition (2007).',
    gameDescEn: 'Pac-Man is one of the most influential video games in history, released by Namco in May 1980. The player controls Pac-Man, a yellow circular creature, guiding him through a maze filled with dots and bonus fruits, while avoiding four ghosts: Blinky (red), Pinky (pink), Inky (cyan) and Clyde (orange). Eating a Power Pellet makes the ghosts vulnerable and they can be eaten. It was the first video game to have a recognizable protagonist, the first to include bonus cutscenes, and the first aimed at mixed audiences. Among its most iconic variants: Ms. Pac-Man (1982), Super Pac-Man (1982), Pac-Land (1984), Pac-Mania (1987), Pac-Man World (1999) and Pac-Man Championship Edition (2007).',
  },

  crash: {
    id: 'crash',
    nameEs: 'Crash Bandicoot',
    nameEn: 'Crash Bandicoot',
    route: '/crash',
    color: '#F97316',
    bgColor: '#1a0d00',

    originEs: 'Naughty Dog / Sony, EE. UU. — 1996',
    originEn: 'Naughty Dog / Sony, USA — 1996',

    historyEs:
      'Crash Bandicoot fue creado por Andy Gavin y Jason Rubin de Naughty Dog en 1996 para PlayStation. Diseñado como la respuesta de Sony a Mario y Sonic, Crash se convirtió en la mascota no oficial de PlayStation. Fue mutado por el Dr. Neo Cortex con el Evolvo-Ray, pero escapó antes de completar el proceso.',
    historyEn:
      'Crash Bandicoot was created by Andy Gavin and Jason Rubin of Naughty Dog in 1996 for PlayStation. Designed as Sony\'s answer to Mario and Sonic, Crash became the unofficial mascot of PlayStation. He was mutated by Dr. Neo Cortex with the Evolvo-Ray, but escaped before the process was completed.',

    skillsEs: [
      'Giro (Tornado Spin) para derrotar enemigos',
      'Salto doble y deslizamiento',
      'Romper cajas Wumpa con el giro',
      'Deslizarse por el suelo',
      'Resistencia sobrehumana gracias a la mutación',
    ],
    skillsEn: [
      'Tornado Spin to defeat enemies',
      'Double jump and slide',
      'Break Wumpa crates with the spin',
      'Belly slide on the ground',
      'Superhuman resilience thanks to the mutation',
    ],

    creatorEs: 'Creadores: Andy Gavin & Jason Rubin · Empresa: Naughty Dog / Sony · Año: 1996',
    creatorEn: 'Creators: Andy Gavin & Jason Rubin · Company: Naughty Dog / Sony · Year: 1996',

    gameTitleEs: 'Crash Bandicoot',
    gameTitleEn: 'Crash Bandicoot',
    gameDescEs: 'Crash Bandicoot es la saga de plataformas 3D lanzada en 1996 para PlayStation por Naughty Dog. El jugador guía a Crash a través de islas tropicales llenas de trampas, enemigos y cajas Wumpa, enfrentando a los villanos del Dr. Neo Cortex. La saga incluye títulos icónicos como Crash Bandicoot 2 (1997), Warped (1998), CTR: Crash Team Racing (1999) y el remaster N. Sane Trilogy (2017). Es considerada una de las franquicias de plataformas más importantes de los años 90.',
    gameDescEn: 'Crash Bandicoot is the 3D platform series launched in 1996 for PlayStation by Naughty Dog. The player guides Crash through tropical islands full of traps, enemies and Wumpa crates, facing the villains of Dr. Neo Cortex. The series includes iconic titles like Crash Bandicoot 2 (1997), Warped (1998), CTR: Crash Team Racing (1999) and the N. Sane Trilogy remaster (2017). It is considered one of the most important platform franchises of the 1990s.',
  },

  duckhunt: {
    id: 'duckhunt',
    nameEs: 'Perro de Duck Hunt',
    nameEn: 'Duck Hunt Dog',
    route: '/duckhunt',
    color: '#C8860A',
    bgColor: '#0a1f0a',

    originEs: 'Nintendo, Japón — 1984',
    originEn: 'Nintendo, Japan — 1984',

    historyEs:
      'El perro de Duck Hunt apareció en el juego Duck Hunt de Nintendo en 1984 para la NES, usando el periférico Zapper (pistola de luz). Su característica carcajada burlona cuando el jugador falla un disparo lo convirtió en uno de los personajes más reconocibles y adorados-odiados de la historia de los videojuegos.',
    historyEn:
      'The Duck Hunt Dog appeared in Nintendo\'s Duck Hunt in 1984 for the NES, using the Zapper peripheral (light gun). His characteristic mocking laugh when the player misses a shot made him one of the most recognizable and love-hated characters in video game history.',

    skillsEs: [
      'Levantar patos del pasto',
      'Recoger patos cazados',
      'Burlarse del jugador cuando falla',
      'Rastrear y encontrar patos',
    ],
    skillsEn: [
      'Flush ducks from the grass',
      'Retrieve hunted ducks',
      'Mock the player when they miss',
      'Track and find ducks',
    ],

    creatorEs: 'Creador: Nintendo R&D1 · Empresa: Nintendo · Año: 1984',
    creatorEn: 'Creator: Nintendo R&D1 · Company: Nintendo · Year: 1984',

    gameTitleEs: 'Duck Hunt',
    gameTitleEn: 'Duck Hunt',
    gameDescEs: 'Juego de disparos con pistola de luz lanzado en 1984 para NES. El jugador usa el periférico Zapper para cazar patos que el perro levanta del pasto. Incluye dos modos: caza de un pato, caza de dos patos, y un modo adicional de tiro al plato. Fue uno de los títulos de lanzamiento de la NES en América.',
    gameDescEn: 'Light gun shooting game launched in 1984 for NES. The player uses the Zapper peripheral to hunt ducks flushed by the dog. Includes two modes: one duck hunt, two duck hunt, and an additional clay shooting mode. It was one of the NES launch titles in America.',
  },
}
