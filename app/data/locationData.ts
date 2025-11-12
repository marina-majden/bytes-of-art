import type { LocationData } from "../types/city.ts";

// Ovdje definiramo sve podatke za naše interaktivne lokacije.
// Koristimo izvore iz priloženih radova o ekspresionizmu.

export const locations: Record<string, LocationData> = {
    // LOKACIJA 1: KAVANA / BAR
    kavana: {
        id: "kavana",
        name: "Kavana",
        impressionism: {
            themeName: "Impresionizam: Mjesto druženja",
            themeColor: "bg-amber-300", // Svijetla, topla tema
            text: "Promatram... bulevari, kavane. Svjetlost treperi, miješa se sa smijehom. Ljudi su mrlje u pokretu, dio ugodne, žive vibracije grada. Sve je trenutak, uhvaćen u prolazu.",
            textAuthor: "Inspirirano: A. G. Matoš (Flâneur)",
            imageSrc:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Auguste_Renoir_-_Dance_at_Le_Moulin_de_la_Galette_-_Mus%C3%A9e_d%27Orsay_RF_2739_%28derivative_work_-_AutoContrast_edit_in_LCH_space%29.jpg/1024px-Auguste_Renoir_-_Dance_at_Le_Moulin_de_la_Galette_-_Mus%C3%A9e_d%27Orsay_RF_2739_%28derivative_work_-_AutoContrast_edit_in_LCH_space%29.jpg",
            imageArtist:
                "Pierre-Auguste Renoir: Ples kod Moulin de la Galette (1876.)",
            analysisPoints: [
                {
                    x: "left-[50%]",
                    y: "top-[40%]",
                    description:
                        "Treperava svjetlost: Slikar ne slika predmete, već dojam svjetla koje se odbija o njih.",
                },
                {
                    x: "left-[65%]",
                    y: "top-[60%]",
                    description:
                        "Društvenost: Figure su u interakciji, plešu, razgovaraju. Prikazan je ugodan, kolektivni trenutak.",
                },
            ],
        },
        expressionism: {
            themeName: "Ekspresionizam: Mjesto otuđenja",
            themeColor: "bg-red-900 text-gray-200", // Tamna, teška tema
            // Gecanovi likovi su statični, ne komuniciraju, atmosfera je turobna
            text: "Figure su statične, predimenzionirane i stiješnjene u prostoru. Ne odišu toplinom doma, već 'funebralnom atmosferom tjeskobe i otuđenosti'[cite: 5046]. Iz likova izbija 'halucinantna tupost'[cite: 5055].",
            textAuthor: "Inspirirano: Analiza djela Vilka Gecana",
            imageSrc: "https://pbs.twimg.com/media/GYQk0O1X0AAzZc1.jpg",
            imageArtist: "Vilko Gecan: Kod stola (Familija) (1919.)",
            analysisPoints: [
                {
                    x: "left-[50%]",
                    y: "top-[50%]",
                    description:
                        "Deformacija prostora: Stol s 'deformiranim konvergencijama' dominira slikom i razdvaja likove[cite: 5047].",
                },
                {
                    x: "left-[65%]",
                    y: "top-[30%]",
                    description:
                        "Otuđenost: Likovi ne komuniciraju. Njihova lica pokazuju 'halucinantnu tupost'[cite: 5055], a ne obiteljsku povezanost.",
                },
            ],
        },
    },

    // LOKACIJA 2: ULICA / BULEVAR
    ulica: {
        id: "ulica",
        name: "Ulica / Bulevar",
        impressionism: {
            themeName: "Impresionizam: Geometrija šetnje",
            themeColor: "bg-blue-100", // Hladna, ali mirna tema
            text: "Grad je uređena pozornica. Šetač (flâneur) promatra geometriju bulevara, ritam prolaznika. Svjetlost se odbija od mokrog pločnika. Sve je prizor, elegantno i čisto.",
            textAuthor: "Inspirirano: Charles Baudelaire / A. G. Matoš",
            imageSrc:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Gustave_Caillebotte_-_Paris_Street%3B_Rainy_Day_-_Google_Art_Project.jpg/1024px-Gustave_Caillebotte_-_Paris_Street%3B_Rainy_Day_-_Google_Art_Project.jpg",
            imageArtist:
                "Gustave Caillebotte: Pariška ulica; kišni dan (1877.)",
            analysisPoints: [
                {
                    x: "left-[55%]",
                    y: "top-[60%]",
                    description:
                        "Linearna perspektiva: Jasna geometrija, red i čiste linije dominiraju scenom.",
                },
                {
                    x: "left-[70%]",
                    y: "top-[55%]",
                    description:
                        "Distancirani promatrač: Figure su elegantne, ali hladne, promatrane s emocionalne distance, kao dio gradskog dekora.",
                },
            ],
        },
        expressionism: {
            themeName: "Ekspresionizam: Ulica kao krik",
            themeColor: "bg-green-900 text-gray-200", // Nemirna, "otrovna" tema
            text: "Grad nije red, on je kaos. Ekspresionisti odbacuju estetiku 'lijepog' i prihvaćaju 'estetiku ružnoće'[cite: 4711]. Čuje se 'krik'[cite: 4661]. Ulica je mjesto 'tjeskobnih osjećaja nesigurnosti' [cite: 4710] i 'otuđenosti velegradskog života'[cite: 4726].",
            textAuthor: "Inspirirano: Poetika ekspresionizma",
            imageSrc:
                "https://upload.wikimedia.org/wikipedia/commons/d/d1/Kirchner_Berlin_Street_Scene_1913.jpg",
            imageArtist: "Ernst Ludwig Kirchner: Ulica, Berlin (1913.)",
            analysisPoints: [
                {
                    x: "left-[50%]",
                    y: "top-[50%]",
                    description:
                        "Deformacija: Figure su izdužene, koščate. Prostor je sužen i agresivan, poput klina.",
                },
                {
                    x: "left-[40%]",
                    y: "top-[60%]",
                    description:
                        'Nemimetička boja: Jarke, "otrovne" boje (zelena, ružičasta) ne opisuju stvarnost, već unutarnji osjećaj tjeskobe i otuđenja urbanog života.',
                },
            ],
        },
    },

    // LOKACIJA 3: DOM / INTERIJER
    dom: {
        id: "dom",
        name: "Dom / Interijer",
        impressionism: {
            themeName: "Impresionizam: Sigurnost intime",
            themeColor: "bg-purple-100", // Nježna, intimna tema
            text: "Unutar četiri zida vlada mir. Svjetlost ulazi kroz prozor, meka i topla. To je prostor intime, čitanja, sigurnosti. Vani je buka, unutra je tišina.",
            textAuthor: "Inspirirano: Poetika intimizma (Cassatt, Vuillard)",
            imageSrc:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Mary_Cassatt_-_The_Letter_-_NGC_29876.jpg/960px-Mary_Cassatt_-_The_Letter_-_NGC_29876.jpg",
            imageArtist: "Mary Cassatt: Pismo (1790-91.)",
            analysisPoints: [
                {
                    x: "left-[45%]",
                    y: "top-[40%]",
                    description:
                        "Nježna paleta: Meke, skladne boje (zelena, bijela, ružičasta) stvaraju osjećaj mira i privatnosti.",
                },
                {
                    x: "left-[60%]",
                    y: "top-[55%]",
                    description:
                        "Fokus na trenutak: Slika bilježi tih, svakodnevni, intimni ritual. Ne postoji napetost, samo koncentracija.",
                },
            ],
        },
        expressionism: {
            themeName: "Ekspresionizam: Kavez interijera",
            themeColor: "bg-gray-800 text-gray-200", // Klaustrofobična tema
            // Analiza Uzelčevog 'Ljubavnog para'
            text: "Dom nije sklonište. Čak i u privatnom prostoru, likovi su statični, odvojeni. Postoji osjećaj 'osamljenosti i odvojenosti likova'[cite: 5040], psihološka napetost koja ispunjava prostor tišinom.",
            textAuthor: "Inspirirano: Analiza Proljetnog salona (Uzelac)",
            imageSrc:
                "https://www.vecernji.hr/media/img/d8/0d/b5e0575850652772f1f1.jpeg",
            imageArtist: "Milivoj Uzelac: Ljubavni par (1919.)",
            analysisPoints: [
                {
                    x: "left-[40%]",
                    y: "top-[50%]",
                    description:
                        "Psihološki prostor: Prazan stol i svjetlosni kontrast naglašavaju 'osamljenost i odvojenost' likova[cite: 5040].",
                },
                {
                    x: "left-[70%]",
                    y: "top-[45%]",
                    description:
                        "Otuđenost: Figure ne komuniciraju pogledom. Njihova blizina samo pojačava osjećaj mentalne udaljenosti.",
                },
            ],
        },
    },

    // LOKACIJA 4: PARK / PRIRODA
    park: {
        id: "park",
        name: "Park",
        impressionism: {
            themeName: "Impresionizam: Prizor dokolice",
            themeColor: "bg-green-100", // Svježa, prirodna tema
            text: "Priroda je mjesto odmora i bijega od grada. Sunce se probija kroz krošnje, stvarajući treperave mrlje svjetla. Piknik, šetnja, uživanje... priroda je pripitomljena i služi kao ugodna kulisa za druženje.",
            textAuthor: "Inspirirano: Poetika impresionizma",
            imageSrc:
                "https://www.claude-monet.com/assets/img/paintings/luncheon-on-the-grass.jpg",
            imageArtist: "Claude Monet: Le Déjeuner sur l'herbe (1865-66.)",
            analysisPoints: [
                {
                    x: "left-[40%]",
                    y: "top-[55%]",
                    description:
                        "Svjetlost i sjena: Interes nije na ljudima, već na načinu na koji sunčeva svjetlost prolazi kroz lišće i udara u haljine i tlo.",
                },
                {
                    x: "left-[60%]",
                    y: "top-[60%]",
                    description:
                        "Dokolica (Leisure): Prikazuje građanski ideal odmora u prirodi, kao ugodan, bezbrižan trenutak.",
                },
            ],
        },
        expressionism: {
            themeName: "Ekspresionizam: Pejzaž kao ekspresija",
            themeColor: "bg-red-800 text-gray-200", // Intenzivna, nemirna tema
            // Analiza Varlajeve 'Crvene kuće'
            text: "Pejzaž nije ono što vidimo, već ono što osjećamo. Umjetnik 'deformira prostor'[cite: 6116]. 'Na rubu livada je kuća parnog mlina... to je krvlju namrljana uglasta i gruba / slikarija na nebu'[cite: 6126, 6245].",
            textAuthor: "Antun Branko Šimić (Hercegovina)",
            imageSrc:
                "https://i.pinimg.com/736x/5e/b3/14/5eb31499e20419834c1426cf318a62ec.jpg",
            imageArtist: "Vladimir Varlaj: Crvena kuća (1923.)",
            analysisPoints: [
                {
                    x: "left-[60%]",
                    y: "top-[65%]",
                    description:
                        "Nemimetička boja: Intenzivna crvena boja kuće nije stvarna; ona je 'krvlju namrljana'[cite: 6126], izražava nemir, a ne mir.",
                },
                {
                    x: "left-[30%]",
                    y: "top-[50%]",
                    description:
                        "Deformacija: 'Neprirodno zavijene linije grana' [cite: 5121] u prvom planu stvaraju prepreku i 'nelagodan ugođaj'[cite: 5123].",
                },
            ],
        },
    },

    // LOKACIJA 5: KOLODVOR / VLAK
    kolodvor: {
        id: "kolodvor",
        name: "Kolodvor",
        impressionism: {
            themeName: "Impresionizam: Katedrala modernosti",
            themeColor: "bg-blue-200", // Tema čelika i pare
            text: "Kolodvor je simbol napretka. Para lokomotive miješa se sa svjetlom koje prolazi kroz stakleni krov. To je dinamičan, pulsirajući centar modernog života, pun energije i pokreta.",
            textAuthor: "Inspirirano: Poetika impresionizma (Monet)",
            imageSrc:
                "https://upload.wikimedia.org/wikipedia/commons/9/96/La_Gare_Saint-Lazare_-_Claude_Monet.jpg",
            imageArtist: "Claude Monet: Gare Saint-Lazare (1877.)",
            analysisPoints: [
                {
                    x: "left-[50%]",
                    y: "top-[40%]",
                    description:
                        "Svjetlost i para: Para lokomotive nije prljava, već je nositelj svjetlosti i atmosfere, poput oblaka.",
                },
                {
                    x: "left-[65%]",
                    y: "top-[55%]",
                    description:
                        "Moderna arhitektura: Željezna konstrukcija krova slavi se kao čudo modernog inženjerstva.",
                },
            ],
        },
        expressionism: {
            themeName: "Ekspresionizam: Stroj koji vrišti",
            themeColor: "bg-gray-900 text-gray-300", // Mračna, industrijska tema
            // Analiza Šimićeve pjesme "Hercegovina"
            text: "Stroj nije simbol napretka, već otuđenja. 'Ispod brežuljaka crni vlak se vuče / odmjereno udara / i vrišti / svoj dolaz još dalekoj nevidljivoj stanici'.",
            textAuthor: "Antun Branko Šimić (Hercegovina)",
            imageSrc:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Kirchner_-_Rheinbr%C3%BCcke_in_K%C3%B6ln.jpg/600px-Kirchner_-_Rheinbr%C3%BCcke_in_K%C3%B6ln.jpg",
            imageArtist: "Ernst Ludwig Kirchner: Most na Rajni u Kölnu (1914.)",
            analysisPoints: [
                {
                    x: "left-[40%]",
                    y: "top-[45%]",
                    description:
                        "Vlak kao 'Krik': Vlak 'vrišti'[cite: 6100]. To je personifikacija koja industrijskoj buci daje osjećaj tjeskobe.",
                },
                {
                    x: "left-[55%]",
                    y: "top-[60%]",
                    description:
                        "Kaotična forma: Gradske strukture i most naslikani su agresivnim, izlomljenim linijama koje stvaraju osjećaj kaosa i industrijske buke.",
                },
            ],
        },
    },
};
// https://uploads1.wikiart.org/images/emil-nolde/at-the-caf.jpg!Large.jpg
// https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ernst_Ludwig_Kirchner_-_Potsdamer_Platz.jpg/630px-Ernst_Ludwig_Kirchner_-_Potsdamer_Platz.jpg
// https://uploads2.wikiart.org/images/ernst-ludwig-kirchner/station-in-davos-1.jpg!Large.jpg
// https://www.meisterdrucke.uk/kunstwerke/1260px/Ernst_Ludwig_Kirchner_-_Davos_mit_Kirche_Davos_im_Sommer_-_%28MeisterDrucke-688266%29.jpg
// https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ernst_Ludwig_Kirchner_-_View_from_the_Window.jpg/600px-Ernst_Ludwig_Kirchner_-_View_from_the_Window.jpg
// https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Ernst_Ludwig_Kirchner_Elisabethufer_1913-1.jpg/600px-Ernst_Ludwig_Kirchner_Elisabethufer_1913-1.jpg
//
// https://upload.wikimedia.org/wikipedia/commons/e/e2/Kirchner_-_Stra%C3%9Fe_am_Stadtpark_Sch%C3%B6neberg.jpg
