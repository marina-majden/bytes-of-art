import type { ColorData } from "../types/synesthesia";

export const synesthesiaColors: ColorData[] = [
    {
        id: "yellow",
        name: "Žuta",
        hex: "#facc15",
        tailwindClass: "bg-yellow-400",
        kandinsky: {
            meaning:
                "Zemaljsko, nametljivo, uznemirujuće. Ne može biti duboko. Poput čovjeka koji viče.",
            sound: "Visoka truba ili fanfara (prodoran zvuk)",
            shape: "trokut", // Žuta boja "bode", kao i oštri kutovi trokuta
            movement: "Ekscentrično: širi se iz središta prema promatraču.",
        },
        psychology: {
            marketing:
                "Optimizam, jasnoća, ali i upozorenje (prometni znakovi). Potiče impulzivnu kupnju.",
            effect: "Stimulira mentalne procese, ali previše žute izaziva anksioznost.",
        },
        poetryContext:
            'A.B. Šimić ("Bolesnica"): "Sve je žuto, o žuto..." - boja bolesti, tjelesnog propadanja.',
    },
    {
        id: "blue",
        name: "Plava",
        hex: "#3b82f6",
        tailwindClass: "bg-blue-500",
        kandinsky: {
            meaning:
                "Nebesko, duhovno, beskonačno. Što je tamnija, to više poziva u vječnost.",
            sound: "Violončelo (tamna), Flauta (svijetla), Orgulje (duboka)",
            shape: "krug", // Krug je zatvoren, miran, bez kutova, kao i plava boja
            movement:
                "Koncentrično: povlači se od promatrača, uvlači u sebe (kao puž).",
        },
        psychology: {
            marketing:
                "Povjerenje, sigurnost, produktivnost. Najčešća boja u korporativnom svijetu (Facebook, banke).",
            effect: "Umiruje puls i snižava tjelesnu temperaturu.",
        },
        poetryContext:
            'Šimić ("Podne i bolesnik"): "...u plavu prazninu šumi" - boja metafizike, onostranog.',
    },
    {
        id: "red",
        name: "Crvena",
        hex: "#ef4444",
        tailwindClass: "bg-red-500",
        kandinsky: {
            meaning:
                "Neograničena, topla energija. Muška zrelost. Vrenje u sebi, a ne prema van (kao žuta).",
            sound: "Jaki, uporni udarci bubnja ili zvuk tube",
            shape: "kvadrat", // Čvrst, stabilan oblik koji "sjedi" na zemlji, kao i težina crvene
            movement: "Stabilno kretanje unutar sebe.",
        },
        psychology: {
            marketing:
                'Hitnost, strast, apetit. Koristi se za "Rasprodaja" i hranu (Coca-Cola, Netflix).',
            effect: "Podiže krvni tlak, ubrzava disanje, potiče apetit.",
        },
        poetryContext:
            'Šimić ("Hercegovina"): "krvlju namrljana uglasta i gruba" - boja životne sile i krika.',
    },
    {
        id: "white",
        name: "Bijela",
        hex: "#ffffff",
        tailwindClass: "bg-white border border-gray-200",
        kandinsky: {
            meaning:
                "Velika šutnja, ali ne mrtva. Šutnja puna mogućnosti. Harmonija tišine.",
            sound: "Pauza u glazbi koja tek najavljuje početak.",
            shape: "krug", // Pra-oblik
            movement: "Neutralno, ali potencijalno.",
        },
        psychology: {
            marketing: "Čistoća, minimalizam, luksuz, novi početak (Apple).",
            effect: "Osjećaj prostora, ali previše bijele djeluje sterilno i hladno.",
        },
        poetryContext:
            'Šimić: "...bijeli svečani časovi" - boja nevinosti, ali i praznine.',
    },
    {
        id: "black",
        name: "Crna",
        hex: "#000000",
        tailwindClass: "bg-black",
        kandinsky: {
            meaning:
                "Vječna šutnja bez budućnosti. Ugašena lomača. Nepokretnost leša.",
            sound: "Konačna pauza nakon koje ništa ne slijedi.",
            shape: "kvadrat", // Apsolutna statičnost
            movement: "Potpuna nepokretnost.",
        },
        psychology: {
            marketing:
                "Elegancija, ekskluzivnost, moć, tajnovitost (Chanel, Uber).",
            effect: "Može djelovati depresivno, ali i zaštitnički (skriva).",
        },
        poetryContext:
            'Šimić: "...iz crnog života ljudi" - boja egzistencijalnog mraka.',
    },
    {
      id: "green",
      name: "Zelena",
      hex: "#10b981",
      tailwindClass: "bg-green-500",
      kandinsky: {
          meaning:
              "Ravnoteža, obnova, priroda. Mirna energija života i rasta.",
          sound: "Harpuna ili nježni zeleni šum šume",
          shape: "krug", // Simbolizira prirodu i ravnotežu
          movement: "Stabilno, ali s blagim rastom prema van.",
      },
      psychology: {
          marketing:
              "Zdravlje, svježina, ekologija. Često se koristi za proizvode povezane s prirodom.",
          effect: "Umiruje oči i stvara osjećaj ravnoteže.",
      },
      poetryContext:
          'Šimić: "zeleni valovi travki" - boja obnove i prirodnog ciklusa.',   
    },
    {
      id: "purple",
      name: "Ljubičasta",
      hex: "#8b5cf6",
      tailwindClass: "bg-purple-500",
      kandinsky: {
          meaning:
              "Duhovnost, misterija, luksuz. Kombinacija stabilnosti plave i energije crvene.",
          sound: "Duboki zvuk violine ili sintisajzera",
          shape: "trokut", // Simbolizira duhovnu težnju
          movement: "Usmjereno prema gore, simbolizirajući duhovni rast.",
      },
      psychology: {
          marketing:
              "Luksuz, kreativnost, mudrost. Često se koristi za proizvode visoke kvalitete.",
          effect: "Potiče maštu i inspirira kreativnost.",
      },
      poetryContext:
          'Šimić: "ljubičasti sumrak" - boja mistike i introspektivnosti.', 
    },
    {
      id: "orange",
      name: "Narančasta",
      hex: "#f97316",
      tailwindClass: "bg-orange-500",
      kandinsky: {
          meaning:
              "Toplina, entuzijazam, energija. Kombinacija sreće žute i strasti crvene.",
          sound: "Veseli zvuk tamburina ili ksilofona",
          shape: "trokut", // Simbolizira dinamičnost i energiju
          movement: "Širi se prema van s toplinom i entuzijazmom.",
      },
      psychology: {
          marketing:
              "Pristupačnost, prijateljstvo, avantura. Često se koristi za privlačenje pažnje.",
          effect: "Podiže raspoloženje i potiče socijalnu interakciju.",
      },
      poetryContext:
          'Šimić: "narančasti plamen večeri" - boja topline i radosti.',  
    },
    {
      id: "pink",
      name: "Roza",
      hex: "#ec4899",
      tailwindClass: "bg-pink-500",
      kandinsky: {
          meaning:
              "Nježnost, ljubav, romantika. Mekša verzija crvene, s fokusom na nježnost.",  
          sound: "Lagan zvuk harfe ili flauta",
          shape: "krug", // Simbolizira nježnost i zaokruženost
          movement: "Blago se širi prema van, simbolizirajući toplinu i ljubav.",
      },
      psychology: {
          marketing:
              "Ljubaznost, ženstvenost, briga. Često se koristi za proizvode usmjerene prema ženama i djeci.",
          effect: "Stvara osjećaj sigurnosti i nježnosti.",
      },
      poetryContext:
          'Šimić: "roza obzori jutra" - boja nježnosti i novih početaka.',
    }
];
