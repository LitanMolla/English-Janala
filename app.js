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
        <button id='lesson-btn-${item.level_no}' onclick='wordID(${item.level_no})' class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${item.level_no}</button>
        `;
        lessonContainer.appendChild(div);
    })
}

// lesson btn click function
const wordID = (id) => {
    // active btn
    const allBtn = document.querySelectorAll('.lesson-btn');
    allBtn.forEach(item => {
        item.classList.remove('btn-active');
    })
    const targetBtn = document.getElementById(`lesson-btn-${id}`)
    targetBtn.classList.add('btn-active');
    // data load
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => uiWords(data.data))
}
// word show function
const uiWords = (lists) => {
    const wordsConainer = getElement('words_conainer');
    wordsConainer.innerHTML = '';
    if (lists.length == 0) {
        wordsConainer.innerHTML = `
                <div class="space-y-5 col-span-full font-bangla text-center py-10">
                    <img src="./assets/alert-error.png" alt="alert" class="block mx-auto">
                    <p class="text-xl text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h4 class="text-4xl font-semibold">নেক্সট Lesson এ যান</h4>
                </div>
        `;
        return;
    }
    lists.map(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="bg-white p-13 rounded-xl text-center space-y-6">
                    <h4 class="font-bold text-3xl">${item.word?item.word:'শব্দ পাওয়া যায়নি'}</h4>
                    <p class="text-xl">Meaning /Pronounciation</p>
                    <h4 class="font-bold text-3xl font-bangla">"${item.meaning?item.meaning:'অর্থ পাওয়া যায়নি'} / ${item.pronunciation?item.pronunciation:'উচ্চারণ পাওয়া যায়নি'}"</h4>
                    <div class="flex justify-between mt-12">
                        <button class="w-12 h-12 bg-[#1A91FF1A] rounded-lg flex justify-center items-center cursor-pointer duration-300 hover:bg-[#1a90ff59]"><i class="fa-solid fa-circle-info "></i></button>
                        <button class="w-12 h-12 bg-[#1A91FF1A] rounded-lg flex justify-center items-center cursor-pointer duration-300 hover:bg-[#1a90ff59]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
        `;
        wordsConainer.appendChild(div);
    })
}
