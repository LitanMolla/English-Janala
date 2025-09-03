// reuseble function
const getElement = (id) => {
    const element = document.getElementById(id);
    return element;
}
// mobile menu toogle btn
getElement('mobile_btn').addEventListener('click', () => {
    getElement('mobile_menu').classList.toggle('hidden');
});

// all level function
const allLevel = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then(res => res.json())
        .then(data => uiLevel(data.data))
}
allLevel();
// show all lesson_btn on ui
const uiLevel = (lists) => {
    const lessonContainer = getElement('lesson_container');
    lists.map(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick='wordID(${item.level_no})' class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${item.level_no}</button>
        `;
        lessonContainer.appendChild(div);
    })
}

// lesson btn click function
const wordID = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => uiWords(data.data))
}
// word show function
const uiWords = (lists) => {
    const wordsConainer = getElement('words_conainer');
    wordsConainer.innerHTML = '';
    lists.map(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="bg-white p-13 rounded-xl text-center space-y-6">
                    <h4 class="font-bold text-3xl">${item.word}</h4>
                    <p class="text-xl">Meaning /Pronounciation</p>
                    <h4 class="font-bold text-3xl font-bangla">${item.meaning} / ${item.pronunciation}</h4>
                    <div class="flex justify-between mt-12">
                        <button class="w-12 h-12 bg-[#1A91FF1A] rounded-lg flex justify-center items-center cursor-pointer duration-300 hover:bg-[#1a90ff59]"><i class="fa-solid fa-circle-info "></i></button>
                        <button class="w-12 h-12 bg-[#1A91FF1A] rounded-lg flex justify-center items-center cursor-pointer duration-300 hover:bg-[#1a90ff59]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
        `;
        wordsConainer.appendChild(div);
    })
}
