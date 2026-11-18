// ============================================================================
// VRAGENLIJSTEN PER NIVEAU & SHUFFLE-LOGICA
// ============================================================================

const vragenPerNiveau = {
    makkelijk: [
        { cat: "Blok 1", q: "V1: Wat bedoelen we met 'hardware'?", a: ["Alle programma's en apps op je pc", "Alle fysieke onderdelen die je kunt aanraken", "Het draadloze wifi-signaal", "Bestanden in de cloud"], correct: 1 },
        { cat: "Blok 1", q: "V2: Uit hoeveel lagen bestaat het drielagenmodel van een informatiesysteem?", a: ["2 lagen", "3 lagen", "4 lagen", "5 lagen"], correct: 1 },
        { cat: "Blok 1", q: "V3: Welke van deze voorbeelden is een fysieke stekker/poort (hardware-interface)?", a: ["Windows 11", "Een USB-C poort", "WhatsApp", "Een tekstbestand"], correct: 1 },
        { cat: "Blok 1", q: "V4: Hoe noem je het scherm met icoontjes en knoppen waarmee jij een app bedient?", a: ["User Interface (Gebruikersinterface)", "Moederbord", "Processor", "Voedingskabel"], correct: 0 },
        { cat: "Blok 1", q: "V5: Waar staat de 'V' voor in VUI (zoals spraakassistent Siri)?", a: ["Video", "Virtual", "Voice (Stem)", "Verbinding"], correct: 2 },
        { cat: "Blok 2", q: "V6: Welk bekend programma is een voorbeeld van een besturingssysteem (OS)?", a: ["Microsoft Word", "Windows of macOS", "Google Chrome", "Minecraft"], correct: 1 },
        { cat: "Blok 2", q: "V7: Waarmee kun je op je computer mappen maken en bestanden verplaatsen?", a: ["Bestandsbeheer (zoals Verkenner)", "De rekenmachine", "De videokaart", "De screensaver"], correct: 0 },
        { cat: "Blok 2", q: "V8: Wat is een voorbeeld van randapparatuur?", a: ["Een losse printer of muis", "Een mapje op je bureaublad", "Een internetpagina", "Een wachtwoord"], correct: 0 },
        { cat: "Blok 3", q: "V9: Je speelt oude Gameboy-spellen op je moderne telefoon via een speciaal appje. Hoe heet zo'n app?", a: ["Een virusscanner", "Een tekstverwerker", "Een emulator", "Een firewall"], correct: 2 },
        { cat: "Blok 3", q: "V10: Wat doet een Virtuele Machine (VM)?", a: ["Maakt je beeldscherm schoon", "Draait een extra 'computer in je computer'", "Vervangt je toetsenbord", "Verhoogt je batterijduur"], correct: 1 },
        { cat: "Blok 4", q: "V11: Hoe noemen we software die voor een groot publiek is gemaakt, zoals Word of Spotify?", a: ["Standaardsoftware", "Maatwerksoftware", "Geheime software", "Systeemherstel"], correct: 0 },
        { cat: "Blok 4", q: "V12: Wat betekent 'Freeware'?", a: ["Software die je gratis mag gebruiken", "Software die alleen 7 dagen werkt", "Software zonder beveiliging", "Software die je zelf moet programmeren"], correct: 0 },
        { cat: "Blok 4", q: "V13: Bij welk soort software mag je een programma eerst gratis uitproberen (proefperiode) en moet je daarna betalen?", a: ["Freeware", "Shareware", "Open Source", "Hardware"], correct: 1 },
        { cat: "Blok 4", q: "V14: Wat mag je doen met Open Source software?", a: ["Alleen bekijken zonder te klikken", "De broncode bekijken en zelf aanpassen", "Verkopen als jouw eigen geheime uitvinding", "Alleen gebruiken zonder internet"], correct: 1 },
        { cat: "Blok 4", q: "V15: Waarvoor gebruik je een Creative Commons (CC) licentie?", a: ["Om een computer sneller te maken", "Om aan te geven onder welke voorwaarden anderen jouw foto of tekst mogen delen", "Om virussen te verwijderen", "Om in te loggen op school"], correct: 1 }
    ],
    gemiddeld: [
        { cat: "Blok 1", q: "V1: Wat is de onderste laag in het drielagenmodel van een informatiesysteem?", a: ["De toepassingenlaag", "De logische laag", "De fysieke laag (Hardware)", "De besturingslaag"], correct: 2 },
        { cat: "Blok 1", q: "V2: Welke laag verbindt de hardware met de toepassingen (apps) die de gebruiker ziet?", a: ["De fysieke laag", "De logische laag (Besturingssysteem/drivers)", "De internetlaag", "De gebruikerslaag"], correct: 1 },
        { cat: "Blok 1", q: "V3: Hoe noemen we de fysieke stekkers en poorten (zoals USB-C of HDMI)?", a: ["Software-interfaces", "Hardware-interfaces (Connectoren)", "User interfaces", "API's"], correct: 1 },
        { cat: "Blok 1", q: "V4: Wat is een voorbeeld van een software-interface (API)?", a: ["Een USB-C kabel", "Het touchscreen van je telefoon", "De Buienradar-app die data ophaalt van een server", "De aan/uit-knop"], correct: 2 },
        { cat: "Blok 1", q: "V5: Hoe heet een interface met gesproken tekst (zoals Siri in de auto)?", a: ["GUI", "CLI", "VUI (Voice User Interface)", "API"], correct: 2 },
        { cat: "Blok 2", q: "V6: Welke taak hoort NIET bij de drie hoofdtaken van een besturingssysteem?", a: ["Beheer van randapparatuur", "Bestandsbeheer", "Taakbeheer", "Het ontwerpen van 3D-games"], correct: 3 },
        { cat: "Blok 2", q: "V7: Wat is de officiële naam van de 'noodrem' in Windows voor vastgelopen apps?", a: ["Schijfopruiming", "Taakbeheer (Task Manager)", "Verkenner", "Configuratiescherm"], correct: 1 },
        { cat: "Blok 2", q: "V8: Hoe zorgt een besturingssysteem dat een printer feilloos samenwerkt?", a: ["Via een hardware-connector", "Via een driver (vertaal-software)", "Via een emulator", "Via open source"], correct: 1 },
        { cat: "Blok 3", q: "V9: Wat doet een emulator precies?", a: ["Maakt de pc langzaam", "Bootst een ander (vaak ouder) apparaat na", "Verdeelt de harde schijf", "Beveiligt tegen hackers"], correct: 1 },
        { cat: "Blok 3", q: "V10: Wat is het verschil tussen een emulator en een virtuele machine?", a: ["Geen verschil", "Emulator bootst ander systeem na (gameconsole); VM simuleert complete extra pc-omgeving", "VM is alleen voor oude games", "Emulator draait op server"], correct: 1 },
        { cat: "Blok 4", q: "V11: Welke software is speciaal geschreven voor één klant (bijv. Belastingdienst)?", a: ["Standaardsoftware", "Maatwerksoftware", "Freeware", "Open source"], correct: 1 },
        { cat: "Blok 4", q: "V12: Wat kenmerkt een Open Source licentie?", a: ["Je betaalt maandelijks veel geld", "Broncode is openbaar; iedereen mag het aanpassen en verbeteren", "Niet te kopiëren", "Werkt alleen offline"], correct: 1 },
        { cat: "Blok 4", q: "V13: Na 30 dagen stopt een app en moet je betalen. Welke licentie is dit?", a: ["Freeware", "Shareware", "Open Source", "Maatwerk"], correct: 1 },
        { cat: "Blok 4", q: "V14: Wat is het verschil tussen Freeware en Open Source?", a: ["Freeware is gratis te gebruiken zonder broncode; Open Source geeft ook de broncode", "Freeware is altijd illegaal", "Open Source kost geld", "Geen verschil"], correct: 0 },
        { cat: "Blok 4", q: "V15: Wat betekent een Creative Commons licentie met regels 'BY-NC'?", a: ["Niet gebruiken", "Gebruiken mits naamsvermelding en niet voor commercieel winstbejag", "Verkopen aan een krant", "Zelf aanpassen en claimen"], correct: 1 }
    ],
    moeilijk: [
        { cat: "Blok 1", q: "V1: Je klikt in Spotify (toepassingenlaag) op 'Play', waarna geluid uit je speaker (fysieke laag) komt. Wat is de juiste route in het drielagenmodel?", a: ["Toepassingenlaag ➔ Fysieke laag ➔ Logische laag", "Toepassingenlaag ➔ Logische laag ➔ Fysieke laag", "Logische laag ➔ Toepassingenlaag ➔ Fysieke laag", "Toepassingenlaag stuurt direct de speaker aan zonder tussenlaag"], correct: 1 },
        { cat: "Blok 1", q: "V2: Waarom hoeven app-ontwikkelaars niet voor elk merk geluidskaart aparte code te schrijven?", a: ["Omdat alle geluidskaarten exact dezelfde chip gebruiken", "Omdat de logische laag (OS + drivers) dit afhandelt via standaard interfaces", "Omdat de toepassingenlaag zelf drivers installeert in de BIOS", "Omdat hardware-interfaces automatisch code vertalen"], correct: 1 },
        { cat: "Blok 1", q: "V3: Een systeembeheerder bestuurt een Linux-server uitsluitend via tekstcommando's in een zwart venster. Welke interface gebruikt hij?", a: ["GUI (Graphical User Interface)", "CLI (Command Line Interface)", "API (Application Programming Interface)", "VUI (Voice User Interface)"], correct: 1 },
        { cat: "Blok 1", q: "V4: Een webwinkel gebruikt iDEAL-betalingen door via code te communiceren met de server van de bank. Hoe heet deze koppeling tussen twee programma's?", a: ["Een CLI", "Een Hardware-connector", "Een API (Software-interface)", "Een GUI"], correct: 2 },
        { cat: "Blok 1", q: "V5: Wat is het belangrijkste voordeel van het strikt scheiden van de drie lagen in het drielagenmodel?", a: ["De processor gebruikt hierdoor geen stroom", "Je kunt hardware of het OS vervangen zonder dat alle apps herschreven moeten worden", "Er zijn geen drivers meer nodig", "Bestanden nemen daardoor 50% minder opslagruimte in"], correct: 1 },
        { cat: "Blok 2", q: "V6: Hoe zorgt 'Taakbeheer' in het besturingssysteem ervoor dat je tegelijkertijd muziek kunt luisteren én kunt typen (multitasking)?", a: ["Het verdeelt razendsnel kleine stukjes rekentijd (CPU) en werkgeheugen (RAM) over de actieve processen", "Het zet het ene programma op de harde schijf stil tot je stopt met typen", "Het laat de videokaart het typen overnemen", "Het maakt voor elke app een aparte partitie aan"], correct: 0 },
        { cat: "Blok 2", q: "V7: Een programma reageert niet meer vanwege een oneindige lus. Wat doet het besturingssysteem als je via Taakbeheer kiest voor 'Taak beëindigen'?", a: ["Het verwijdert het programma definitief van de SSD", "Het breekt het proces geforceerd af en geeft het bezette RAM-geheugen weer vrij", "Het herstart de volledige fysieke laag", "Het herschrijft de broncode van de applicatie"], correct: 1 },
        { cat: "Blok 2", q: "V8: Je sluit een gloednieuwe 3D-muis aan op een oude Windows-pc, maar alleen de standaardknoppen werken; de extra schermfuncties niet. Wat is de meest waarschijnlijke oorzaak?", a: ["De USB-poort levert wisselstroom", "De specifieke driver voor deze muis ontbreekt in de logische laag", "De toepassingenlaag ondersteunt geen muizen", "De muis heeft een Open Source licentie"], correct: 1 },
        { cat: "Blok 3", q: "V9: Waarom vraagt het emuleren van een PlayStation 4 op een pc veel meer rekenkracht dan het afspelen van een gewone video?", a: ["Omdat een emulator altijd via internet draait", "Omdat de pc tijdens het spelen de vreemde processor-instructies van de console realtime moet vertalen naar pc-instructies", "Omdat emulators geen gebruik mogen maken van het werkgeheugen", "Omdat de video-interface blokkeert"], correct: 1 },
        { cat: "Blok 3", q: "V10: Een cybersecurity-onderzoeker wil een verdacht bestand veilig testen zonder zijn eigen Windows-systeem te besmetten. Wat kan hij het beste gebruiken?", a: ["Een afgeschermde Virtuele Machine (VM) zonder gedeelde netwerkmap", "Een Gameboy-emulator", "Een API-connector", "Taakbeheer in veilige modus"], correct: 0 },
        { cat: "Blok 4", q: "V11: Wat is een groot nadeel van maatwerksoftware ten opzichte van standaardsoftware voor een bedrijf?", a: ["Het sluit nooit goed aan op de wensen van het bedrijf", "De ontwikkel- en onderhoudskosten zijn hoog en je bent sterk afhankelijk van de makers", "Het mag wettelijk op maximaal één computer staan", "Het werkt alleen met een CLI"], correct: 1 },
        { cat: "Blok 4", q: "V12: Een bedrijf beweert dat Open Source software altijd onveilig is omdat hackers de broncode kunnen lezen. Waarom klopt dit argument vaak NIET?", a: ["Omdat Open Source code versleuteld is voor gebruikers", "Omdat duizenden onafhankelijke ontwikkelaars wereldwijd de code controleren en lekken razendsnel dichten", "Omdat Open Source programma's niet met het internet kunnen verbinden", "Omdat alleen de overheid Open Source mag aanpassen"], correct: 1 },
        { cat: "Blok 4", q: "V13: Welke combinatie van eigenschappen hoort bij 'Proprietary Freeware' (zoals Google Chrome of Discord)?", a: ["Wel gratis te gebruiken, maar de broncode is gesloten (niet vrij aanpasbaar)", "Gratis voor 14 dagen, daarna broncode openbaar", "Je betaalt eenmalig voor de broncode", "Volledig rechtenvrij (Publiek Domein)"], correct: 0 },
        { cat: "Blok 4", q: "V14: Een docent gebruikt een afbeelding met de licentie 'CC BY-NC-ND' in een gratis schoolproject en knipt de helft van de foto eraf. Mag dit?", a: ["Ja, want het is niet-commercieel (NC)", "Nee, want 'ND' (No Derivatives / GeenAfgeleideWerken) verbiedt het aanpassen of bijsnijden van de foto", "Ja, zolang de naam van de fotograaf (BY) erbij staat", "Nee, want CC-foto's mogen nooit op scholen gebruikt worden"], correct: 1 },
        { cat: "Blok 4", q: "V15: Wat betekent de toevoeging 'SA' (ShareAlike / GelijkDelen) in een Creative Commons licentie zoals CC BY-SA?", a: ["Je mag het werk alleen delen via sociale media", "Als je het werk aanpast, moet je jouw nieuwe versie onder exact dezelfde licentievoorwaarden verspreiden", "Je moet de winst 50/50 delen met de maker", "Het werk mag maar één keer gedeeld worden"], correct: 1 }
    ]
};

// Schudt een kopie van een array in willekeurige volgorde (Fisher-Yates shuffle)
function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Koppelt de willekeurig geschudde vragen aan de 15 vraagposities op het speelveld
function loadQuestionsForDifficulty(niveau) {
    const origineleLijst = vragenPerNiveau[niveau] || vragenPerNiveau.gemiddeld;
    const geschuddeLijst = shuffleArray(origineleLijst);

    questions = vraagPosities.map((pos, index) => {
        const vraagData = geschuddeLijst[index];
        const schoneVraagTekst = vraagData
            ? `V${index + 1}: ` + vraagData.q.replace(/^V\d+:\s*/, "")
            : "";

        return {
            index: index,
            x: pos.x,
            y: pos.y,
            w: pos.w,
            h: pos.h,
            active: Boolean(vraagData),
            hintUsed: false,
            cat: vraagData ? vraagData.cat : "",
            q: schoneVraagTekst,
            a: vraagData ? [...vraagData.a] : [],
            correct: vraagData ? vraagData.correct : 0
        };
    });
}