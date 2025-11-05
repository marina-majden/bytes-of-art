/* It's estimated that at least 70% of pre-modern literature contains symbolic representations, and these symbols often reflect core cultural values. The symbolscan belong to specific time period or place, they can be connected to a specific religion or ruler, they can be in use today or not. What is important is that every symbol you think of is used in some piece of literature (referenced in books or present in a poem, it doesn't have to be explicitly explained) andrepresent a concept that could be found across different cultures and times. For example, the snake is a common symbol of temptation, rebirth, or wisdom across multiple cultures.

Given the prevalence of symbolic representation, identifying these symbols is crucial for understanding the deeper layers of meaning in literary works. Considering that symbol interpretation can be subjective and vary, using search to confirm the symbol's meaning in different contexts is vital.
Okay, I will generate a list of 16 symbols common in human literature and art with relatively consistent meanings. I will use my existing knowledge and try to choose ones with meanings that resonate across cultures and time periods, keeping in mind that interpretations can vary.

The Snake/Serpent: Represents temptation, knowledge, healing, or chaos.

The Tree: Represents life, growth, connection to nature, family, or knowledge.

The Sun: Represents life, energy, power, truth, or enlightenment.

The Moon: Represents cycles, change, mystery, emotions, or the feminine.

Water: Represents purification, cleansing, life, emotions, or the unconscious.

Fire: Represents passion, destruction, purification, transformation, or energy.

The Heart: Represents love, compassion, emotion, or courage.

The Rose: Represents love, beauty, passion, secrecy, or perfection.

The Lion: Represents courage, strength, royalty, or leadership.

The Eagle: Represents freedom, power, vision, or spirituality.

The Owl: Represents wisdom, knowledge, mystery, or prophecy.

The Color Red: Represents passion, anger, love, danger, or sacrifice.

The Color White: Represents purity, innocence, peace, or spirituality.

The Circle: Represents wholeness, eternity, unity, or perfection.

The Crossroads: Represents choices, decisions, turning points, or fate.

The Shadow/Darkness: Represents the unknown, fear, the unconscious, or hidden aspects of the self.
These symbols are found repeatedly throughout literature, mythology, and art across various cultures and historical periods, representing concepts that are fundamental to the human experience. */

import type { Symbol as SymbolType } from "~/types/symbols";

export const symbolsData: Record<string, SymbolType> = {
    skull: {
        name: "Skull",
        description:
            "Mortality, death, and the vanity of earthly life (Memento Mori)",
        artExamples: [
            {
                title: "Vanitas Still Life",
                artist: "Pieter Claesz",
                period: "1630s",
                image: "/images/vanitas-claesz.jpg",
                analysis:
                    "The skull serves as a direct memento mori, reminding viewers of the inevitability of death and the futility of worldly pleasures.",
            },
        ],
        literatureExamples: [
            {
                text: "Alas, poor Yorick! I knew him, Horatio: a fellow of infinite jest, of most excellent fancy... Where be your gibes now?",
                author: "William Shakespeare",
                work: "Hamlet",
                analysis:
                    "Hamlet's contemplation of Yorick's skull embodies the memento mori theme, reflecting on the equality of all in death.",
            },
        ],
        culturalContext: {
            ancient:
                "In ancient Rome, skulls appeared in banquet mosaics (memento mori) to remind diners of mortality",
            medieval:
                "Medieval Christian art placed skulls at the crucifixion site (Golgotha meaning 'place of the skull')",
            renaissance:
                "Vanitas paintings used skulls to critique wealth accumulation during Dutch Golden Age capitalism",
            modern: "Mexican Day of Dead celebrations reclaim skulls as joyful symbols of ancestral connection",
        },
    },
    dove: {
        name: "Dove",
        description:
            "Peace, purity, and the Holy Spirit in Christian tradition",
        artExamples: [
            {
                title: "The Baptism of Christ",
                artist: "Andrea del Verrocchio & Leonardo da Vinci",
                period: "1475",
                image: "/images/baptism-christ.jpg",
                analysis:
                    "The dove descending represents the Holy Spirit at Jesus' baptism, symbolizing divine approval and presence.",
            },
        ],
        literatureExamples: [
            {
                text: "And John bore witness: 'I saw the Spirit descend from heaven like a dove, and it remained on him.'",
                author: "John the Apostle",
                work: "The Gospel of John",
                analysis:
                    "The dove serves as a visible manifestation of the Holy Spirit and divine sanction.",
            },
        ],
        culturalContext: {
            mesopotamian:
                "In ancient Mesopotamia, doves represented Ishtar/Inanna - goddess of love and war",
            classical:
                "Greek and Roman cultures associated doves with Aphrodite/Venus as symbols of love",
            christian:
                "Early Christians used dove symbols in catacomb art to represent souls and the Holy Spirit",
            modern: "Picasso's peace dove and peace movement imagery secularized the Christian symbol",
        },
    },
    serpent: {
        name: "Serpent/Snake",
        description: "Evil, temptation, and deceit in Western tradition",
        artExamples: [
            {
                title: "The Fall of Man",
                artist: "Michelangelo",
                period: "1512",
                image: "/images/fall-man.jpg",
                analysis:
                    "The serpent, depicted with human-like features, embodies temptation and the cause of humanity's fall from grace.",
            },
        ],
        literatureExamples: [
            {
                text: "Now the serpent was more crafty than any other beast of the field that the Lord God had made.",
                author: "Moses",
                work: "Genesis",
                analysis:
                    "The serpent's cunning nature introduces deception and disobedience into the human narrative.",
            },
        ],
        culturalContext: {
            ancient:
                "In Canaanite religion, serpents represented chaos monsters like Lotan",
            mesoamerican:
                "Aztec and Maya cultures revered feathered serpents (Quetzalcoatl/Kukulcan) as creator gods",
            hinduism:
                "In Hinduism, snakes represent kundalini energy and are associated with Shiva",
            field: "The Rod of Asclepius with single serpent symbolizes healing in Western medicine",
        },
    },
    rose: {
        name: "Rose",
        description:
            "A complex symbol representing love, beauty, transience, and secrecy",
        artExamples: [
            {
                title: "The Roses of Heliogabalus",
                artist: "Lawrence Alma-Tadema",
                period: "1888",
                image: "/images/heliogabalus-roses.jpg",
                analysis:
                    "Roses here symbolize decadence and the fleeting nature of pleasure...",
            },
            {
                title: "The Birth of Venus",
                artist: "Sandro Botticelli",
                period: "1485",
                image: "/images/birth-venus.jpg",
                analysis:
                    "Roses floating around Venus represent divine love and beauty...",
            },
        ],
        literatureExamples: [
            {
                text: "What's in a name? That which we call a rose / By any other name would smell as sweet",
                author: "William Shakespeare",
                work: "Romeo and Juliet",
                analysis:
                    "Shakespeare uses the rose to explore the conflict between names and essence...",
            },
            {
                text: "The rose is a rose from the time it is a seed to the time it dies. Within it, at all times, it contains its whole potential.",
                author: "Murasaki Shikibu",
                work: "The Tale of Genji",
                analysis:
                    "Here the rose symbolizes the unfolding of destiny and inherent nature...",
            },
        ],
        culturalContext: {
            ancient:
                "Roman feasts used roses to counter drunkenness - 'sub rosa' conversations were confidential",
            christian:
                "Medieval Christianity developed the Rosary and asmedievalsociated red roses with martyr's blood",
            medieval:
                "The Wars of the Roses used red and white roses as political symbols for Lancaster and York",
            modern: "Different colored roses developed specific meanings in Victorian flower language",
        },
    },
    conch: {
        name: "Conch Shell",
        description: "Civilization, democracy, and order",
        artExamples: [
            {
                title: "Lord of the Flies book cover illustrations",
                artist: "Various artists",
                period: "1954-present",
                image: "/images/conch-lotf.jpg",
                analysis:
                    "Visual representations consistently show the conch as a pristine, beautiful object that deteriorates as the story progresses.",
            },
        ],
        literatureExamples: [
            {
                text: "We can use this to call the others. Have a meeting. They'll come when they hear us—",
                author: "William Golding",
                work: "Lord of the Flies",
                analysis:
                    "The conch establishes the first rules of order and civilization among the stranded boys.",
            },
        ],
        culturalContext: {
            hinduism:
                "In Hinduism, the shankha (conch) is a sacred symbol of Vishnu and announced battles in epics",
            buddhist:
                "Buddhist rituals use conch shells to announce teachings and spread the dharma",
            caribbean:
                "Caribbean and African cultures used conch shells for communication and as ceremonial trumpets",
            modern: "Post-colonial literature repurposed the conch as symbol of fragile democratic institutions",
        },
    },
    cross: {
        name: "The Cross",
        description: "Faith, sacrifice, and redemption in Christianity",
        artExamples: [
            {
                title: "The Yellow Christ",
                artist: "Paul Gauguin",
                period: "1889",
                image: "/images/yellow-christ.jpg",
                analysis:
                    "Gauguin places the crucifixion in a contemporary Breton setting, universalizing the symbol's meaning.",
            },
        ],
        literatureExamples: [
            {
                text: "And anyone who does not take his cross and follow me is not worthy of me.",
                author: "Jesus Christ",
                work: "The Gospel of Matthew",
                analysis:
                    "The cross transforms from instrument of torture to symbol of discipleship and salvation.",
            },
        ],
        culturalContext: {
            ancient:
                "Ancient Egyptian ankh and Mesopotamian symbols used cross shapes for life and cosmic order",
            roman: "The crucifixion was a specifically Roman method of execution for slaves and rebels",
            christian:
                "Emperor Constantine's vision and military standard transformed the cross into imperial symbol",
            modern: "Red Cross and medical crosses secularized the symbol for humanitarian purposes",
        },
    },
    raven: {
        name: "Raven",
        description: "Death, darkness, and ill-omen",
        artExamples: [
            {
                title: "Illustrations for 'The Raven'",
                artist: "Gustave Doré",
                period: "1884",
                image: "/images/dore-raven.jpg",
                analysis:
                    "Doré's dark, dramatic illustrations capture the raven's ominous presence and the poem's Gothic atmosphere.",
            },
        ],
        literatureExamples: [
            {
                text: "Quoth the Raven, 'Nevermore.'",
                author: "Edgar Allan Poe",
                work: "The Raven",
                analysis:
                    "The raven's repetitive cry embodies finality, loss, and the narrator's descent into madness.",
            },
        ],
        culturalContext: {
            norse: "In Norse mythology, Odin had two ravens (Huginn and Muninn) representing thought and memory",
            celtic: "Celtic mythology associated ravens with battle goddesses like Morrigan and prophecy",
            native_american:
                "Pacific Northwest tribes viewed ravens as creator tricksters and culture heroes",
            victorian:
                "Victorian Gothic literature cemented the raven's association with death and melancholy",
        },
    },
    albatross: {
        name: "Albatross",
        description: "A burdensome guilt or a weighty crime",
        artExamples: [
            {
                title: "The Rime of the Ancient Mariner illustrations",
                artist: "Gustave Doré",
                period: "1876",
                image: "/images/albatross-dore.jpg",
                analysis:
                    "Doré's engraving vividly depicts the physical and spiritual burden of the dead albatross around the Mariner's neck.",
            },
        ],
        literatureExamples: [
            {
                text: "Instead of the cross, the Albatross / About my neck was hung.",
                author: "Samuel Taylor Coleridge",
                work: "The Rime of the Ancient Mariner",
                analysis:
                    "The albatross becomes a visible symbol of the Mariner's sin and his psychological torment.",
            },
        ],
        culturalContext: {
            sailing_superstition:
                "Sailors believed albatrosses contained souls of dead sailors and killing one brought bad luck",
            romanticism:
                "Romantic poets used animal symbols to explore humanity's relationship with nature",
            christian:
                "The albatross functions as a Romantic replacement for Christian symbols of sin and redemption",
            modern: "Ecological movements reinterpret the albatross as symbol of human destruction of nature",
        },
    },
    apple: {
        name: "Apple",
        description: "Forbidden knowledge, temptation, and sin",
        artExamples: [
            {
                title: "The Fall of Man",
                artist: "Albrecht Dürer",
                period: "1504",
                image: "/images/fall-durer.jpg",
                analysis:
                    "Dürer depicts the apple at the dramatic moment of transgression, emphasizing its role in the fall from innocence.",
            },
        ],
        literatureExamples: [
            {
                text: "She took of its fruit and ate, and she also gave some to her husband who was with her, and he ate.",
                author: "Moses",
                work: "Genesis",
                analysis:
                    "The fruit represents the knowledge that brings awareness of good and evil, and the consequences of disobedience.",
            },
        ],
        culturalContext: {
            classical:
                "Greek mythology featured golden apples in the Garden of Hesperides and Eris's apple of discord",
            norse: "Norse mythology had golden apples granting immortality to the gods",
            renaissance:
                "Latin puns (malum meaning both 'apple' and 'evil') solidified the apple's Christian association",
            modern: "Snow White's poisoned apple and tech company logos show the symbol's evolving meanings",
        },
    },
    heart: {
        name: "Heart",
        description: "Love, affection, and emotion",
        artExamples: [
            {
                title: "Sacred Heart depictions",
                artist: "Various Christian artists",
                period: "Medieval to modern",
                image: "/images/sacred-heart.jpg",
                analysis:
                    "The flaming, wounded heart symbolizes Christ's divine love and suffering for humanity.",
            },
        ],
        literatureExamples: [
            {
                text: "My bounty is as boundless as the sea, / My love as deep; the more I give to thee, / The more I have, for both are infinite.",
                author: "William Shakespeare",
                work: "Romeo and Juliet",
                analysis:
                    "While not mentioning 'heart' directly, this expresses the boundless love the heart symbolizes.",
            },
        ],
        culturalContext: {
            ancient:
                "Ancient Egyptians believed the heart (ib) was the seat of intelligence and soul, weighed in afterlife",
            medieval:
                "Medieval courtly love traditions developed the heart as romantic symbol in troubadour poetry",
            christian:
                "Catholic Sacred Heart devotion made the heart central to Baroque emotional spirituality",
            modern: "Valentine's Day commercialized the heart shape while medical science separated emotional associations",
        },
    },
    light: {
        name: "Light",
        description: "Knowledge, hope, and enlightenment",
        artExamples: [
            {
                title: "The Calling of Saint Matthew",
                artist: "Caravaggio",
                period: "1600",
                image: "/images/calling-matthew.jpg",
                analysis:
                    "The divine light slicing through darkness literally illuminates Matthew's calling and spiritually represents grace.",
            },
        ],
        literatureExamples: [
            {
                text: "Hail holy Light, offspring of Heav'n first-born, / Or of th' Eternal Coeternal beam",
                author: "John Milton",
                work: "Paradise Lost",
                analysis:
                    "Milton addresses Light as a divine entity, representing God's wisdom and creative power.",
            },
        ],
        culturalContext: {
            platonic:
                "Plato's Allegory of the Cave established light as metaphor for knowledge versus ignorance",
            zoroastrian:
                "Persian Zoroastrianism centered on cosmic struggle between light (Ahura Mazda) and darkness",
            enlightenment:
                "The Age of Enlightenment used light metaphors for reason overcoming superstition",
            modern: "Electric light became modern symbol of innovation and spiritual illumination in literature",
        },
    },
    ring: {
        name: "One Ring",
        description: "Absolute power, corruption, and obsession",
        artExamples: [
            {
                title: "The Lord of the Rings film prop",
                artist: "Weta Workshop",
                period: "2001-2003",
                image: "/images/one-ring.jpg",
                analysis:
                    "The ring's simple, perfect circle with glowing inscription visually represents its seductive and absolute power.",
            },
        ],
        literatureExamples: [
            {
                text: "One Ring to rule them all, One Ring to find them, / One Ring to bring them all and in the darkness bind them.",
                author: "J.R.R. Tolkien",
                work: "The Lord of the Rings",
                analysis:
                    "The inscription encapsulates the ring's nature as an instrument of total domination and corruption.",
            },
        ],
        culturalContext: {
            norse: "Norse sagas featured magical rings like Andvaranaut that brought curses to owners",
            field: "Wagner's Ring Cycle opera fused Germanic mythology with themes of power and corruption",
            platonic:
                "Plato's Ring of Gyges explored whether people would be moral if invisible and unaccountable",
            modern: "Post-WWII interpretations read the Ring as allegory for nuclear weapons and totalitarian power",
        },
    },
    scarlet_letter: {
        name: "Scarlet Letter 'A'",
        description: "Adultery, and later, Ableness",
        artExamples: [
            {
                title: "Various book cover illustrations",
                artist: "Multiple artists",
                period: "1850-present",
                image: "/images/scarlet-letter.jpg",
                analysis:
                    "Visual representations focus on the stark, red 'A' against dark fabric, emphasizing its shame and visibility.",
            },
        ],
        literatureExamples: [
            {
                text: "On the breast of her gown, in fine red cloth, surrounded with an elaborate embroidery and fantastic flourishes of gold thread, appeared the letter A.",
                author: "Nathaniel Hawthorne",
                work: "The Scarlet Letter",
                analysis:
                    "The letter transforms from a mark of shame to a complex symbol of Hester's identity and strength.",
            },
        ],
        culturalContext: {
            puritan:
                "Puritan communities actually used letters to mark offenders (A for adultery, B for blasphemy)",
            romanticism:
                "American Romanticism used the symbol to critique religious hypocrisy and social conformity",
            feminism:
                "Feminist criticism reclaimed Hester as proto-feminist resisting patriarchal control",
            modern: "The symbol evolved to represent any public shaming or social stigma in digital age",
        },
    },
    crown: {
        name: "Crown",
        description: "Authority, royal power, and victory",
        artExamples: [
            {
                title: "Portrait of Louis XIV",
                artist: "Hyacinthe Rigaud",
                period: "1701",
                image: "/images/louis-crown.jpg",
                analysis:
                    "The crown in state portraits symbolizes the monarch's divine right to rule and the power of the state.",
            },
        ],
        literatureExamples: [
            {
                text: "To be thus is nothing, but to be safely thus. / Our fears in Banquo stick deep...",
                author: "William Shakespeare",
                work: "Macbeth",
                analysis:
                    "Macbeth's obsession with the crown drives his moral descent and destructive actions.",
            },
        ],
        culturalContext: {
            ancient:
                "Egyptian pschent, Persian tiara, and Roman laurel wreath established crown symbolism",
            christian:
                "Medieval crowns incorporated crosses and jewels representing divine sanction for rule",
            imperial:
                "Baroque era developed elaborate crowns to visualize the theory of divine right monarchy",
            modern: "Constitutional monarchy reduced crowns to ceremonial objects while retaining symbolic power",
        },
    },
    mockingjay: {
        name: "Mockingjay Pin",
        description: "Rebellion, defiance, and hope",
        artExamples: [
            {
                title: "The Hunger Games film prop",
                artist: "Lionsgate Studios",
                period: "2012",
                image: "/images/mockingjay-pin.jpg",
                analysis:
                    "The simple, elegant pin becomes an instantly recognizable symbol of resistance against oppression.",
            },
        ],
        literatureExamples: [
            {
                text: "I want to do something, right here, right now, to shame them, to make them accountable, to show the Capitol that whatever they do or force us to do there is a part of every tribute they can't own.",
                author: "Suzanne Collins",
                work: "The Hunger Games",
                analysis:
                    "The mockingjay evolves from a fashion statement to a symbol of the rebellion's spirit.",
            },
        ],
        culturalContext: {
            cold_war:
                "Cold War literature used hybrid creatures as metaphors for genetic engineering anxieties",
            roman: "Ancient slave rebellions like Spartacus used symbols to unite disparate groups",
            revolutionary:
                "American and French revolutions developed symbolic pins and cockades as identity markers",
            modern: "Digital activism adapts physical symbols like pins for social media profile pictures and avatars",
        },
    },
    water: {
        name: "Water",
        description:
            "Represents life, purification, transformation, and the unconscious",
        artExamples: [
            {
                title: "The Great Wave off Kanagawa",
                artist: "Hokusai",
                period: "1831",
                image: "/images/great-wave.jpg",
                analysis:
                    "Water symbolizes both nature's power and the transient nature of existence...",
            },
        ],
        literatureExamples: [
            {
                text: "I must go down to the seas again, to the lonely sea and the sky",
                author: "John Masefield",
                work: "Sea-Fever",
                analysis:
                    "Water represents longing, freedom, and the call of adventure...",
            },
        ],
        culturalContext: {
            creation_myths:
                "Most creation myths begin with primordial waters (Nun in Egyptian, Tehom in Hebrew)",
            classical:
                "Greek philosophy saw water as one of four classical elements with specific properties",
            christian:
                "Baptismal water represents spiritual rebirth and cleansing from sin",
            psychological:
                "Jungian psychology interprets water as symbol of the unconscious mind and emotions",
        },
    },
};
