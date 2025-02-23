const words = [
    'стол', 'стул', 'окно', 'дверь', 'книга', 'ручка', 'карандаш', 'лампа',
    'кресло', 'диван', 'кровать', 'подушка', 'одеяло', 'ванна', 'раковина',
    'зеркало', 'паста', 'мыло', 'полотенце', 'одежда',
    'обувь', 'кофта', 'шорты', 'юбка', 'платье', 'носки', 'ботинки',
    'шляпа', 'ремень', 'сумка', 'рюкзак', 'телефон', 'компьютер',
    'принтер', 'монитор', 'клавиатура', 'мышь', 'флешка', 'доска',
    'карандаш', 'линейка', 'карта', 'глобус', 'часы', 'браслет',
    'кольцо', 'серьги', 'кулон', 'ожерелье', 'камень', 'дерево',
    'цветок', 'трава', 'роза', 'лилия', 'пион', 'яблоко', 'банан',
    'апельсин', 'груша', 'виноград', 'арбуз', 'дыня', 'помидор',
    'огурец', 'картофель', 'морковь', 'лук', 'чеснок', 'капуста',
    'молоко', 'сыр', 'масло', 'хлеб', 'печенье', 'шоколад',
    'какао', 'кофе', 'чай', 'вода', 'соус', 'сахар', 'соль',
    'мясо', 'рыба', 'курица', 'говядина', 'свинина', 'колбаса',
    'ветчина', 'сыр', 'йогурт', 'кефир', 'творог', 'сметана'
]
let alphabet = document.querySelectorAll('.keyboard__key')
let newGameButton = document.querySelector('.newgame__button')
function CreateNewWord() {
    let input = document.querySelector('.input')
    let randomWord = words[Math.round(Math.random() * words.length)]
    for (let index = 0; index < randomWord.length; index++) {
        let newBlock = document.createElement('div')
        newBlock.classList.add('input__block')
        newBlock.setAttribute('data-guessed', 0)
        newBlock.innerHTML = ` `
        input.appendChild(newBlock)
        TryToOpen(randomWord)
    }
}
CreateNewWord()

function TryToOpen(word) {
    let counts = 0
    let img = document.querySelector('.hangman__img')
    console.log(word);
    for (let index = 0; index < alphabet.length; index++) {
        alphabet[index].addEventListener('click', () => {
            if (alphabet[index].getAttribute('data-clicked') === '1') {
                return;
            }
            
            alphabet[index].setAttribute('data-clicked', '1');
            let newBlocks = document.querySelectorAll('.input__block');
            let flag = false;
            let allIsGuessed = true;
        
            for (let i = 0; i < word.length; i++) {
                if (word[i].toLowerCase() === (alphabet[index].innerText).toLowerCase()) {
                    alphabet[index].style.opacity = 0.2;
                    newBlocks[i].innerHTML = `<p class="keyboard__key">${alphabet[index].innerText}</p>`;
                    newBlocks[i].setAttribute('data-guessed', 1);
                    flag = true;
                }
            }
        
            if (!flag) {
                alphabet[index].style.opacity = 0.2;
                img.setAttribute('src', `./hangman/${counts}.png`);
                counts++;
        
                if (counts == 6) {
                    let overlay = document.querySelector('.overlay');
                    let newgame = document.querySelector('.newgame');
                    let newgameText = document.querySelector('.newgame__text');
                    newgameText.innerHTML = `Вы проиграли!<br>Начать новую игру?`;
                    overlay.style.opacity = 0.2;
                    newgame.style.display = 'flex';
                }
            }
        
            for (let index = 0; index < newBlocks.length; index++) {
                if (newBlocks[index].getAttribute('data-guessed') == 0) {
                    allIsGuessed = false;
                }
            }
        
            if (allIsGuessed) {
                let overlay = document.querySelector('.overlay');
                let newgame = document.querySelector('.newgame');
                let newgameText = document.querySelector('.newgame__text');
                newgameText.innerHTML = `Вы выиграли!<br>Начать новую игру?`;
                overlay.style.opacity = 0.2;
                newgame.style.display = 'flex';
            }

        })
    }
}

newGameButton.addEventListener('click', () => {
    let img = document.querySelector('.hangman__img')
    let overlay = document.querySelector('.overlay')
    let newgame = document.querySelector('.newgame')
    let input = document.querySelector('.input')
    let keyboard = document.querySelector('.keyboard')

    overlay.style.opacity = 1
    newgame.style.display = 'none'
    input.innerHTML = ``
    keyboard.innerHTML = ``

    randomWord = words[Math.floor(Math.random() * words.length)]
    img.setAttribute('src', './hangman/none.png')

    let letters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('')
    letters.forEach(letter => {
        let key = document.createElement('p')
        key.classList.add('keyboard__key')
        key.innerText = letter
        keyboard.appendChild(key)
    })

    alphabet = document.querySelectorAll('.keyboard__key')
    CreateNewWord()
})