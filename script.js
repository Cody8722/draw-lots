// 1. 取得所有需要的 HTML 元素
const itemInput = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const participantList = document.getElementById('participant-list');
const drawBtn = document.getElementById('draw-btn');
const resetBtn = document.getElementById('reset-btn');
const resultSection = document.getElementById('result-section');
const winnerName = document.getElementById('winner-name');

// 2. 建立一個陣列來儲存所有抽獎項目
let participants = [];

// 3. 更新畫面上的參與者列表
function updateParticipantList() {
    // 先清空目前的列表
    participantList.innerHTML = '';
    
    // 遍歷 participants 陣列，為每個項目建立一個 <li> 元素並加入畫面
    participants.forEach(participant => {
        const li = document.createElement('li');
        li.textContent = participant;
        participantList.appendChild(li);
    });
}

// 4. 監聽「加入列表」按鈕的點擊事件
addBtn.addEventListener('click', () => {
    const inputText = itemInput.value.trim();

    if (inputText) {
        // 使用 split('\n') 將輸入的文字按行分割成陣列
        const newItems = inputText.split('\n')
                                 .map(item => item.trim()) // 去除每個項目的頭尾空白
                                 .filter(item => item !== ''); // 過濾掉空行

        // 將新項目加入到 participants 陣列中
        participants = participants.concat(newItems);

        // 清空輸入框
        itemInput.value = '';

        // 更新畫面
        updateParticipantList();
    }
});

// 5. 監聽「抽出幸運兒」按鈕的點擊事件
drawBtn.addEventListener('click', () => {
    if (participants.length === 0) {
        alert('抽獎池是空的！請先加入項目。');
        return;
    }

    // 隱藏上一次的結果
    resultSection.style.display = 'none';

    // 產生一個隨機索引值
    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];

    // 顯示中獎者
    winnerName.textContent = `🎉 ${winner} 🎉`;
    resultSection.style.display = 'block';
});

// 6. 監聽「全部重設」按鈕的點擊事件
resetBtn.addEventListener('click', () => {
    // 清空陣列和畫面
    participants = [];
    itemInput.value = '';
    resultSection.style.display = 'none';
    updateParticipantList();
});
