document.addEventListener('DOMContentLoaded', () => {
    const chapterEl = document.getElementById('chapter');
    const classEl = document.getElementById('class');
    const primaryEl = document.getElementById('primary');
    const secondaryEl = document.getElementById('secondary');
    const meleeEl = document.getElementById('melee');
    const missionEl = document.getElementById('mission');

    const rerollChapterBtn = document.getElementById('reroll-chapter');
    const rerollClassBtn = document.getElementById('reroll-class');
    const rerollPrimaryBtn = document.getElementById('reroll-primary');
    const rerollSecondaryBtn = document.getElementById('reroll-secondary');
    const rerollMeleeBtn = document.getElementById('reroll-melee');
    const rerollMissionBtn = document.getElementById('reroll-mission');
    const generateLoadoutBtn = document.getElementById('generate-loadout');

    let data = {};
    let currentClass = '';

    fetch('randomizer.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            randomizeAll();
        });

    function getRandomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    function setItem(element, item) {
        element.textContent = item;
    }

    function rollChapter() {
        const allChapters = [...data.chapters.vanilla, ...data.chapters.DLC];
        const chapter = getRandomItem(allChapters);
        setItem(chapterEl, chapter);
    }

    function rollClass() {
        const classes = Object.keys(data.classes);
        currentClass = getRandomItem(classes);
        setItem(classEl, currentClass);
        rollWeapons();
    }

    function rollWeapons() {
        const classData = data.classes[currentClass];
        const primary = getRandomItem(classData.primaries) || 'N/A';
        const secondary = getRandomItem(classData.secondaries) || 'N/A';
        const melee = getRandomItem(classData.melee) || 'N/A';

        setItem(primaryEl, primary);
        setItem(secondaryEl, secondary);
        setItem(meleeEl, melee);
    }

    function rollMission() {
        const missionTypes = Object.keys(data.missions);
        const type = getRandomItem(missionTypes);
        let details = '';

        if (type === 'Operations') {
            const difficulty = getRandomItem(data.missions.Operations.difficulties);
            const operation = getRandomItem(data.missions.Operations.operations);
            details = `${type}: ${operation} (${difficulty})`;
        } else if (type === 'Seige') {
            const difficulty = getRandomItem(data.missions.Seige.difficulties);
            details = `${type} (${difficulty})`;
        } else if (type === 'PvP') {
            const mode = getRandomItem(data.missions.PvP.modes);
            details = `${type}: ${mode}`;
        }
        setItem(missionEl, details);
    }

    function randomizeAll() {
        rollChapter();
        rollClass();
        rollMission();
    }

    rerollChapterBtn.addEventListener('click', rollChapter);
    rerollClassBtn.addEventListener('click', rollClass);
    rerollPrimaryBtn.addEventListener('click', () => {
        const primary = getRandomItem(data.classes[currentClass].primaries) || 'N/A';
        setItem(primaryEl, primary);
    });
    rerollSecondaryBtn.addEventListener('click', () => {
        const secondary = getRandomItem(data.classes[currentClass].secondaries) || 'N/A';
        setItem(secondaryEl, secondary);
    });
    rerollMeleeBtn.addEventListener('click', () => {
        const melee = getRandomItem(data.classes[currentClass].melee) || 'N/A';
        setItem(meleeEl, melee);
    });
    rerollMissionBtn.addEventListener('click', rollMission);
    generateLoadoutBtn.addEventListener('click', randomizeAll);
});