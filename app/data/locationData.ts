import type { LocationData } from "../types/city.ts";

export const locations: Record<string, LocationData> = {
    // LOKACIJA 1: KAVANA / KRČMA
    kavana: {
        id: "kavana",
        name: "Kavana / Krčma",
        impressionism: {
            themeName: "Impresionizam: Mjesto druženja",
            themeColor: "bg-yellow-50", // Svijetla, topla tema
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
            // Analiza Gecanovog djela "Kod stola" (Familija) [cite: 5045]
            text: "Figure su statične, predimenzionirane i stiješnjene u prostoru[cite: 5047]. Ne odišu toplinom doma, već 'funebralnom atmosferom tjeskobe i otuđenosti'[cite: 5046]. Iz likova izbija 'halucinantna tupost'[cite: 5056].",
            textAuthor: "Inspirirano: Analiza djela Vilka Gecana",
            imageSrc: "https://pbs.twimg.com/media/GYQk0O1X0AAzZc1.jpg",
            imageArtist:
                "Vilko Gecan: Kod stola (Familija) (1919.) [cite: 5045]",
            analysisPoints: [
                {
                    x: "left-[50%]",
                    y: "top-[50%]",
                    description:
                        "Deformacija prostora: Stol s 'deformiranim konvergencijama' dominira slikom i razdvaja likove. [cite: 5047]",
                },
                {
                    x: "left-[65%]",
                    y: "top-[30%]",
                    description:
                        "Otuđenost: Likovi ne komuniciraju. Njihova lica pokazuju 'halucinantnu tupost', a ne obiteljsku povezanost. [cite: 5056]",
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
            imageSrc: "/images/caillebotte_paris.jpg",
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
            // Šimićeva poetika ulice kao buke i industrije [cite: 5957, 5960, 5961]
            text: "Grad nije red, on je kaos. Ekspresionisti odbacuju estetiku 'lijepog' i prihvaćaju 'estetiku ružnoće'. [cite: 4711] Čuje se 'krik'[cite: 4709]. 'Ispod brežuljaka crni vlak se vuče / odmjereno udara / i vrišti'[cite: 5960, 5961].",
            textAuthor: "Antun Branko Šimić (Hercegovina)",
            imageSrc: "/images/kirchner_street.jpg",
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
                        'Nemimetička boja: Jarke, "otrovne" boje (zelena, ružičasta) ne opisuju stvarnost, već unutarnji osjećaj tjeskobe i otuđenja urbanog života. [cite: 4710, 4711]',
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
            imageSrc: "/images/cassatt_letter.jpg",
            imageArtist: "Mary Cassatt: Pismo (1R790-91.)",
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
            // Analiza Uzelčevog 'Ljubavnog para' [cite: 5040]
            text: "Dom nije sklonište. Čak i u privatnom prostoru, likovi su statični, odvojeni. Postoji osjećaj 'osamljenosti i odvojenosti likova'[cite: 5040], psihološka napetost koja ispunjava prostor tišinom.",
            textAuthor: "Inspirirano: Analiza Proljetnog salona (Uzelac)",
            imageSrc: "/images/uzelac_ljubavni.jpg",
            imageArtist:
                "Milivoj Uzelac: Ljubavni par (1919.) [cite: 5040, 5042]",
            analysisPoints: [
                {
                    x: "left-[40%]",
                    y: "top-[50%]",
                    description:
                        "Psihološki prostor: Prazan stol i svjetlosni kontrast naglašavaju 'osamljenost i odvojenost' likova. [cite: 5040]",
                },
                {
                    x: "left-[70%]",
                    y: "top-[45%]",
                    description:
                        "Otuđenost: Figure ne komuniciraju pogledom. Njihova blizina samo pojačava osjećaj mentalne udaljenosti. [cite: 5040]",
                },
            ],
        },
    },
};
