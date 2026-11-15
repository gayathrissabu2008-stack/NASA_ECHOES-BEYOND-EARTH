
export const artifacts = [

    // --------------------------------------------------
    // 01 — APOLLO 11 DESCENT STAGE
    // --------------------------------------------------

    {
        id: "apollo11-stage",
        number: "01",
        name: "Apollo 11 Descent Stage",
        shortName: "Lunar Module Eagle",
        mission: "APOLLO 11",
        location: "Tranquility Base",
        latitude: 0.67408,
        longitude: 23.47297,
        type: "Landing hardware",
        status: "Inactive",
        date: "20 JULY 1969",

        image: "https://images-assets.nasa.gov/image/as11-40-5878/as11-40-5878~orig.jpg",

        description:
            "I carried Neil Armstrong and Buzz Aldrin from lunar orbit down to the surface of the Moon. My upper stage returned them to orbit. I remained behind at Tranquility Base.",

        science:
            "The descent stage was essential to humanity's first crewed lunar landing. It supported the landing and served as the platform from which the astronauts began their exploration.",

        legacy:
            "I remain at Tranquility Base as physical evidence of Apollo 11's historic landing.",

        storyTitle: "The final footprint of Apollo 11",

        story:
            "I carried the crew down to the lunar surface. When the astronauts lifted off in the ascent stage, my work was over. I stayed at Tranquility Base, a silent remnant of the first crewed Moon landing.",

        whyLeft:
            "The descent stage was not designed to return to lunar orbit. It served as the landing platform and was left on the surface when the ascent stage departed.",

        timeline: [
            {
                date: "20 JUL 1969",
                title: "Touchdown",
                detail: "Eagle lands at Tranquility Base."
            },
            {
                date: "21 JUL 1969",
                title: "Crew departs",
                detail: "Armstrong and Aldrin leave the surface in the ascent stage."
            },
            {
                date: "AFTER DEPARTURE",
                title: "Descent stage remains",
                detail: "The landing stage stays at the Apollo 11 site."
            }
        ],

        source: "https://www.nasa.gov/mission/apollo-11/"
    },


    // --------------------------------------------------
    // 02 — APOLLO 11 LASER RETROREFLECTOR
    // --------------------------------------------------

    {
        id: "apollo11-retro",
        number: "02",
        name: "Laser Ranging Retroreflector",
        shortName: "Apollo 11 LRRR",
        mission: "APOLLO 11",
        location: "Tranquility Base",
        latitude: 0.6734,
        longitude: 23.4730,
        type: "Scientific instrument",
        status: "Passive / Usable",
        date: "21 JULY 1969",

        image: "https://images-assets.nasa.gov/image/s69-38855/s69-38855~orig.jpg",

        description:
            "I am a collection of corner-cube reflectors placed on the lunar surface by Apollo 11 astronauts. I have no batteries or active electronics. I simply reflect laser light sent from Earth.",

        science:
            "Scientists measure the time taken for laser pulses to travel to the Moon and return. These measurements help determine the Earth-Moon distance with extraordinary precision.",

        legacy:
            "Lunar laser ranging experiments continue to use the Apollo retroreflector arrays to study lunar motion and fundamental physics.",

        storyTitle: "A mirror that still answers",

        story:
            "I have no batteries, radio or moving parts. A laser pulse sent from Earth reaches my corner-cube reflectors and returns toward its source. My quiet role is to help scientists measure the Earth–Moon distance.",

        whyLeft:
            "I was deliberately deployed as a passive scientific target. Because I need no electrical power, I can remain on the lunar surface and continue to support laser-ranging experiments.",

        timeline: [
            {
                date: "21 JUL 1969",
                title: "Deployment",
                detail: "Apollo 11 astronauts place the reflector array on the lunar surface."
            },
            {
                date: "AUG 1969",
                title: "Ranging begins",
                detail: "Earth-based observatories begin successful laser-ranging measurements."
            },
            {
                date: "TODAY",
                title: "Passive target",
                detail: "The array remains a target for lunar laser-ranging research."
            }
        ],

        source: "https://science.nasa.gov/moon/"
    },


    // --------------------------------------------------
    // 03 — APOLLO 15 ALSEP
    // --------------------------------------------------

    {
        id: "apollo15-alsep",
        number: "03",
        name: "Apollo 15 ALSEP",
        shortName: "Lunar Experiment Package",
        mission: "APOLLO 15",
        location: "Hadley–Apennine",
        latitude: 26.1322,
        longitude: 3.6339,
        type: "Scientific equipment",
        status: "Inactive",
        date: "31 JULY 1971",

        image: "https://images-assets.nasa.gov/image/as15-88-11866/as15-88-11866~orig.jpg",

        description:
            "I was a collection of scientific experiments deployed by Apollo 15 astronauts near Hadley Rille. I was designed to study the Moon long after the astronauts returned home.",

        science:
            "My instruments investigated lunar seismic activity, the Moon's magnetic environment, solar wind and heat flow. The measurements helped scientists understand the Moon's interior and environment.",

        legacy:
            "NASA ended the Apollo lunar surface experiments in September 1977, but their collected measurements transformed lunar science.",

        storyTitle: "A laboratory left behind",

        story:
            "I was not one instrument, but a collection of experiments spread across the lunar surface. After the astronauts returned to Earth, I continued collecting measurements that helped scientists investigate the Moon's interior and environment.",

        whyLeft:
            "The experiment package was designed to operate remotely after the crew departed. Its instruments were eventually switched off in September 1977, while the hardware remained at the site.",

        timeline: [
            {
                date: "31 JUL 1971",
                title: "Deployment",
                detail: "Apollo 15 astronauts set up the lunar surface experiment package."
            },
            {
                date: "1971–1977",
                title: "Remote science",
                detail: "The instruments send scientific measurements back to Earth."
            },
            {
                date: "SEPT 1977",
                title: "Operations end",
                detail: "NASA terminates the Apollo lunar surface experiment network."
            }
        ],

        source: "https://science.nasa.gov/moon/"
    },


    // --------------------------------------------------
    // 04 — APOLLO 17 DESCENT STAGE
    // --------------------------------------------------

    {
        id: "apollo17-stage",
        number: "04",
        name: "Apollo 17 Descent Stage",
        shortName: "Lunar Module Challenger",
        mission: "APOLLO 17",
        location: "Taurus–Littrow",
        latitude: 20.1908,
        longitude: 30.7717,
        type: "Landing hardware",
        status: "Inactive",
        date: "11 DECEMBER 1972",

        image: "https://images-assets.nasa.gov/image/as17-147-22470/as17-147-22470~orig.jpg",

        description:
            "I delivered astronauts Eugene Cernan and Harrison Schmitt to the Taurus–Littrow valley. After the crew returned to lunar orbit, I was left on the Moon.",

        science:
            "The Apollo 17 mission explored an unusual geological region, collecting lunar samples that provided important clues about the Moon's volcanic and geological history.",

        legacy:
            "I remain on the lunar surface, a reminder of the last crewed Apollo lunar landing.",

        storyTitle: "The last Apollo landing stage",

        story:
            "I brought the Apollo 17 crew down into the Taurus–Littrow valley. After three days of exploration, the astronauts left in the ascent stage. I remained where the final crewed Apollo lunar landing took place.",

        whyLeft:
            "Like the other Apollo descent stages, I was the landing platform and was not designed to return to orbit. The crew departed in the ascent stage, leaving the descent stage behind.",

        timeline: [
            {
                date: "11 DEC 1972",
                title: "Touchdown",
                detail: "Challenger lands in the Taurus–Littrow valley."
            },
            {
                date: "14 DEC 1972",
                title: "Final departure",
                detail: "Cernan and Schmitt leave the surface in the ascent stage."
            },
            {
                date: "AFTER DEPARTURE",
                title: "Hardware remains",
                detail: "The descent stage stays at the Apollo 17 landing site."
            }
        ],

        source: "https://www.nasa.gov/mission/apollo-17/"
    },


    // --------------------------------------------------
    // 05 — APOLLO 15 LUNAR ROVING VEHICLE
    // --------------------------------------------------

    {
        id: "apollo15-rover",
        number: "05",
        name: "Apollo Lunar Roving Vehicle",
        shortName: "Apollo 15 Lunar Rover",
        mission: "APOLLO 15",
        location: "Hadley–Apennine",
        latitude: 26.1322,
        longitude: 3.6339,
        type: "Crewed exploration vehicle",
        model: "lunar-rover",
        status: "Inactive",
        date: "30 JULY 1971",

        image: "https://images-assets.nasa.gov/image/as15-86-11603/as15-86-11603~orig.jpg",

        description:
            "I was the first vehicle driven by humans on another world. I carried astronauts David Scott and James Irwin across the lunar surface, allowing them to explore terrain much farther from their landing module.",

        science:
            "I expanded the range of lunar geological exploration. The astronauts used me to visit geological formations, collect samples and document the Hadley–Apennine region.",

        legacy:
            "My success demonstrated that astronauts could use mobile vehicles to explore distant planetary surfaces.",

        storyTitle: "The first car on another world",

        story:
            "I carried astronauts across the Moon for the first time. My wheels crossed lunar soil while my crew explored places that would have been difficult to reach on foot.",

        whyLeft:
            "I was designed for lunar surface operations and was not intended to return to Earth. I remained at the Apollo 15 landing site after the astronauts departed.",

        timeline: [
            {
                date: "30 JUL 1971",
                title: "First lunar drive",
                detail: "Apollo 15 astronauts begin using the Lunar Roving Vehicle."
            },
            {
                date: "JUL–AUG 1971",
                title: "Surface exploration",
                detail: "The rover supports geological exploration around Hadley–Apennine."
            },
            {
                date: "02 AUG 1971",
                title: "Final departure",
                detail: "The astronauts complete their lunar surface activities."
            }
        ],

        source: "https://www.nasa.gov/missions/apollo/apollo-15-mission-details/"
    },


    // --------------------------------------------------
    // 06 — SURVEYOR 3 LANDER
    // --------------------------------------------------

    {
        id: "surveyor3-lander",
        number: "06",
        name: "Surveyor 3 Lander",
        shortName: "Surveyor III",
        mission: "SURVEYOR 3",
        location: "Oceanus Procellarum",
        latitude: -2.99,
        longitude: -23.34,
        type: "Robotic lunar lander",
        model: "surveyor",
        status: "Inactive",
        date: "20 APRIL 1967",

        image: "https://images-assets.nasa.gov/image/67-H-446/67-H-446~orig.jpg",

        description:
            "I was a robotic spacecraft sent to investigate the lunar surface before astronauts arrived. I carried a television camera and a remotely operated surface sampler.",

        science:
            "My surface sampler dug trenches and performed soil tests. My observations helped scientists understand the mechanical properties of lunar soil and assess whether crewed spacecraft could safely land.",

        legacy:
            "Apollo 12 astronauts later visited my landing site and retrieved components from my structure, allowing scientists to study how prolonged exposure to the lunar environment affected spacecraft materials.",

        storyTitle: "The robotic visitor Apollo came to meet",

        story:
            "I landed on the Moon and began examining the soil beneath me. More than two years later, Apollo 12 astronauts landed nearby and walked over to inspect me.",

        whyLeft:
            "My solar-powered operations ended after lunar night began and communication was lost. I remained on the surface as a historical record of early robotic lunar exploration.",

        timeline: [
            {
                date: "20 APR 1967",
                title: "Lunar landing",
                detail: "Surveyor 3 lands in Oceanus Procellarum."
            },
            {
                date: "MAY 1967",
                title: "Last contact",
                detail: "The spacecraft stops communicating with Earth."
            },
            {
                date: "19 NOV 1969",
                title: "Apollo 12 visit",
                detail: "Astronauts visit Surveyor 3 and retrieve selected components."
            }
        ],

        source: "https://science.nasa.gov/mission/surveyor-3/"
    }

];


// ==================================================
// MARS ARTIFACTS
// Coordinates are approximate landing-site coordinates.
// Longitudes use -180° to +180°.
// ==================================================

export const marsArtifacts = [

    // --------------------------------------------------
    // 01 — SOJOURNER
    // --------------------------------------------------

    {
        id: "pathfinder-sojourner",
        number: "01",
        name: "Sojourner Rover",
        shortName: "Mars Pathfinder",
        mission: "MARS PATHFINDER",
        location: "Ares Vallis",
        latitude: 19.13,
        longitude: -33.22,
        type: "Mars rover",
        model: "sojourner",
        status: "Inactive",
        date: "04 JULY 1997",

        image: "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",

        description:
            "I was the first successful wheeled rover to operate on another planet. I explored the terrain around the Pathfinder lander, examining rocks and soil while sending images and measurements back to Earth.",

        science:
            "My Alpha Proton X-ray Spectrometer helped determine the elemental composition of rocks and soil. My observations demonstrated that small, mobile robots could perform useful planetary field science.",

        legacy:
            "I operated for 83 sols, far beyond my original seven-sol design lifetime. Pathfinder and I helped shape the design of later Mars rover missions.",

        whyLeft:
            "The mission ended after communication with the lander was lost. The rover and Pathfinder lander remain on Mars.",

        storyTitle: "A small rover, a giant first",

        story:
            "I was small enough to fit on a microwave oven, but I carried a big responsibility: prove that a rover could explore another world. Every short drive was a new experiment in navigating Mars.",

        timeline: [
            {
                date: "04 JUL 1997",
                title: "Touchdown",
                detail: "The Pathfinder spacecraft lands in Ares Vallis."
            },
            {
                date: "05 JUL 1997",
                title: "First drive",
                detail: "Sojourner rolls down the lander ramp and begins exploring."
            },
            {
                date: "SEPT 1997",
                title: "Mission ends",
                detail: "Communication is lost after 83 sols of surface operations."
            }
        ],

        source: "https://science.nasa.gov/mission/mars-pathfinder/"
    },


    // --------------------------------------------------
    // 02 — SPIRIT
    // --------------------------------------------------

    {
        id: "spirit-rover",
        number: "02",
        name: "Spirit Rover",
        shortName: "Mars Exploration Rover A",
        mission: "MARS EXPLORATION ROVER",
        location: "Gusev Crater",
        latitude: -14.5684,
        longitude: 175.4726,
        type: "Mars rover",
        model: "rover",
        status: "Inactive",
        date: "04 JANUARY 2004",

        image: "https://images-assets.nasa.gov/image/PIA05283/PIA05283~orig.jpg",

        description:
            "I landed in Gusev Crater to investigate rocks and soils for evidence of past water. I explored hills, plains and ancient terrain for more than six years.",

        science:
            "My instruments found geological evidence that water had altered rocks at multiple locations. My observations revealed a more complex and wetter history for parts of Mars.",

        legacy:
            "Designed for a 90-sol mission, I continued operating for more than six years. My work helped establish that ancient Mars had environments very different from the cold, dry surface seen today.",

        whyLeft:
            "I became stuck in soft soil in 2009 and could no longer position my solar panels favourably for the Martian winter. NASA's final communication attempt was on 22 March 2010.",

        storyTitle: "The rover that kept going",

        story:
            "I was designed for 90 sols. I kept exploring for years. I climbed hills, crossed dusty plains and studied rocks that recorded a wetter past. Eventually the soil held my wheels fast, but the discoveries continued long after my planned lifetime.",

        timeline: [
            {
                date: "04 JAN 2004",
                title: "Landing",
                detail: "Spirit touches down in Gusev Crater."
            },
            {
                date: "2005",
                title: "Husband Hill",
                detail: "Spirit climbs and studies the Columbia Hills."
            },
            {
                date: "2009",
                title: "Stuck in soil",
                detail: "The rover becomes embedded in soft soil and cannot escape."
            },
            {
                date: "22 MAR 2010",
                title: "Last contact",
                detail: "The final communication is received from Spirit."
            }
        ],

        source: "https://science.nasa.gov/mission/mer-spirit/"
    },


    // --------------------------------------------------
    // 03 — OPPORTUNITY
    // --------------------------------------------------

    {
        id: "opportunity-rover",
        number: "03",
        name: "Opportunity Rover",
        shortName: "Mars Exploration Rover B",
        mission: "MARS EXPLORATION ROVER",
        location: "Meridiani Planum",
        latitude: -1.9462,
        longitude: -5.5266,
        type: "Mars rover",
        model: "rover",
        status: "Inactive",
        date: "25 JANUARY 2004",

        image: "https://images-assets.nasa.gov/image/PIA05578/PIA05578~orig.jpg",

        description:
            "I landed on Meridiani Planum and spent years examining rocks, craters and outcrops. My instruments found strong evidence that liquid water once altered the rocks at my landing site.",

        science:
            "I identified minerals and geological features associated with water, including evidence of ancient watery environments. I also explored the rim of Endeavour Crater.",

        legacy:
            "Designed to operate for 90 sols, I worked for nearly 15 years and travelled farther than any other rover at the time. My discoveries reshaped our understanding of ancient Martian environments.",

        whyLeft:
            "A planet-wide dust storm in 2018 blocked sunlight from reaching my solar panels. After repeated attempts to re-establish contact, NASA ended the mission on 13 February 2019.",

        storyTitle: "A journey measured in years",

        story:
            "I was built for a short mission, but I kept moving. I crossed plains, examined meteorites and climbed toward the rim of a vast crater. A global dust storm eventually darkened my sky and ended my journey.",

        timeline: [
            {
                date: "25 JAN 2004",
                title: "Landing",
                detail: "Opportunity arrives at Meridiani Planum."
            },
            {
                date: "2004",
                title: "Water evidence",
                detail: "The rover studies rocks showing signs of past water."
            },
            {
                date: "2011",
                title: "Endeavour Crater",
                detail: "Opportunity reaches the rim of the large crater."
            },
            {
                date: "JUN 2018",
                title: "Dust storm",
                detail: "A planet-encircling dust storm blocks sunlight."
            },
            {
                date: "13 FEB 2019",
                title: "Mission complete",
                detail: "NASA ends the mission after contact cannot be restored."
            }
        ],

        source: "https://science.nasa.gov/mission/mer-opportunity/"
    },


    // --------------------------------------------------
    // 04 — VIKING 1 LANDER
    // --------------------------------------------------

    {
        id: "viking1-lander",
        number: "04",
        name: "Viking 1 Lander",
        shortName: "Viking Lander 1",
        mission: "VIKING 1",
        location: "Chryse Planitia",
        latitude: 22.483,
        longitude: -47.94,
        type: "Robotic lander",
        model: "lander",
        status: "Inactive",
        date: "20 JULY 1976",

        image: "https://images-assets.nasa.gov/image/PIA00381/PIA00381~orig.jpg",

        description:
            "I was one of the first spacecraft to successfully operate on the surface of Mars. I photographed my surroundings and conducted experiments to investigate the Martian environment.",

        science:
            "My instruments studied Martian soil, atmospheric conditions and possible signs of biological activity. My observations provided important information about the planet's surface and environment.",

        legacy:
            "I operated on Mars for more than six years, providing an extensive record of the planet before later generations of robotic explorers arrived.",

        storyTitle: "The first long-lived Martian observer",

        story:
            "I arrived on Mars in 1976 and began sending photographs and scientific measurements back to Earth. My observations helped establish what the Martian surface was really like.",

        whyLeft:
            "After years of successful operations, communication with my spacecraft ended in November 1982. My hardware remains at Chryse Planitia.",

        timeline: [
            {
                date: "20 JUL 1976",
                title: "Touchdown",
                detail: "Viking 1 lands at Chryse Planitia."
            },
            {
                date: "1976",
                title: "Surface science",
                detail: "The lander begins imaging and analysing the Martian environment."
            },
            {
                date: "13 NOV 1982",
                title: "Last communication",
                detail: "The final successful communication from Viking 1 is received."
            }
        ],

        source: "https://science.nasa.gov/mission/viking-1/"
    },


    // --------------------------------------------------
    // 05 — CURIOSITY ROVER
    // --------------------------------------------------

    {
        id: "curiosity-rover",
        number: "05",
        name: "Curiosity Rover",
        shortName: "Mars Science Laboratory",
        mission: "MARS SCIENCE LABORATORY",
        location: "Gale Crater",
        latitude: -4.5895,
        longitude: 137.4417,
        type: "Mars rover",
        model: "curiosity",
        status: "Active",
        date: "06 AUGUST 2012",

        image: "https://images-assets.nasa.gov/image/PIA16239/PIA16239~orig.jpg",

        description:
            "I am a mobile science laboratory exploring Gale Crater. I investigate Martian rocks, soil and atmosphere to understand whether ancient Mars could have supported microbial life.",

        science:
            "My instruments analyse rock chemistry, mineral composition, radiation and environmental conditions. My discoveries have revealed evidence of ancient habitable environments.",

        legacy:
            "I transformed our understanding of Mars by demonstrating that ancient environments on the planet could have supported conditions suitable for microbial life.",

        storyTitle: "A laboratory exploring an ancient world",

        story:
            "I landed inside Gale Crater and began climbing the geological layers of Mount Sharp. Every rock I examine offers clues about the ancient environments of Mars.",

        whyLeft:
            "I am a long-running robotic science mission. Unlike landers designed for a single location, I continue to travel across the Martian surface.",

        timeline: [
            {
                date: "06 AUG 2012",
                title: "Touchdown",
                detail: "Curiosity lands inside Gale Crater."
            },
            {
                date: "2013",
                title: "Ancient habitable environment",
                detail: "Investigations at Yellowknife Bay reveal evidence of a past habitable environment."
            },
            {
                date: "2014",
                title: "Mount Sharp",
                detail: "Curiosity reaches the base of Mount Sharp."
            }
        ],

        source: "https://science.nasa.gov/mission/msl-curiosity/"
    },


    // --------------------------------------------------
    // 06 — INGENUITY MARS HELICOPTER
    // --------------------------------------------------

    {
        id: "ingenuity-helicopter",
        number: "06",
        name: "Ingenuity Mars Helicopter",
        shortName: "Mars Helicopter Technology Demonstrator",
        mission: "MARS 2020",
        location: "Jezero Crater",
        latitude: 18.444,
        longitude: 77.451,
        type: "Experimental aircraft",
        model: "helicopter",
        status: "Mission completed",
        date: "19 APRIL 2021",

        image: "https://images-assets.nasa.gov/image/PIA24642/PIA24642~orig.jpg",

        description:
            "I was a small robotic helicopter carried to Mars beneath the Perseverance rover. I demonstrated that powered, controlled flight was possible in the extremely thin Martian atmosphere.",

        science:
            "Although I carried no scientific instruments, my aerial observations helped rover planners understand terrain and evaluate routes for exploration.",

        legacy:
            "I became the first aircraft to achieve powered, controlled flight on another planet. Originally designed for five flights, I completed 72 before my mission ended.",

        storyTitle: "The first aircraft on another world",

        story:
            "I was designed to fly for just a few experimental flights. Instead, I completed 72 flights across Mars, proving that aerial exploration could become part of future planetary missions.",

        whyLeft:
            "After my 72nd flight on 18 January 2024, rotor blade damage prevented further flight. NASA announced the end of my mission on 25 January 2024.",

        timeline: [
            {
                date: "18 FEB 2021",
                title: "Arrival on Mars",
                detail: "Ingenuity arrives attached beneath the Perseverance rover."
            },
            {
                date: "19 APR 2021",
                title: "First powered flight",
                detail: "Ingenuity completes the first powered, controlled flight on another planet."
            },
            {
                date: "18 JAN 2024",
                title: "Final flight",
                detail: "Ingenuity completes its 72nd flight."
            },
            {
                date: "25 JAN 2024",
                title: "Mission ends",
                detail: "NASA announces the end of the helicopter mission."
            }
        ],

        source: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
    }

];
console.log("MOON ARTIFACTS:", artifacts.length);
console.log("MARS ARTIFACTS:", marsArtifacts.length);