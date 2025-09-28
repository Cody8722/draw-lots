// --- DOM 元素 ---
const itemInput = document.getElementById('item-input');
const wheel = document.querySelector('.wheel');
const spinButton = document.querySelector('.spin-button');
const resetButton = document.getElementById('reset-btn');
const soundCheckbox = document.getElementById('sound-checkbox');
const tickSound = document.getElementById('tick-sound');
const winSound = document.getElementById('win-sound');
const winnerModal = document.getElementById('winner-modal');
const winnerText = document.getElementById('winner-text');
const closeBtn = document.querySelector('.close-btn');

// --- 應用程式狀態 ---
let participants = [];
const colors = ['#8e44ad', '#3498db', '#1abc9c', '#f1c40f', '#e67e22', '#e74c3c', '#2ecc71', '#9b59b6'];
let isSpinning = false;
let currentRotation = 0;
let tickInterval;

// --- 核心函式 ---

/**
 * 根據輸入框的內容更新轉盤
 */
function updateWheel() {
    const inputText = itemInput.value.trim();
    participants = inputText.split('\n').map(item => item.trim()).filter(item => item !== '');

    wheel.innerHTML = ''; // 清空舊的標籤
    
    if (participants.length <= 1) {
        wheel.style.background = '#ccc';
        return;
    }
    
    const segmentAngle = 360 / participants.length;
    const gradientParts = [];

    participants.forEach((participant, i) => {
        const color = colors[i % colors.length];
        const startAngle = i * segmentAngle;
        const endAngle = (i + 1) * segmentAngle;

        // 產生 conic-gradient 背景
        gradientParts.push(`${color} ${startAngle}deg ${endAngle}deg`);

        // 產生並定位文字標籤
        const label = document.createElement('div');
        label.className = 'segment-label';
        label.textContent = participant;
        const labelAngle = startAngle + segmentAngle / 2;
        label.style.transform = `rotate(${labelAngle}deg)`;
        wheel.appendChild(label);
    });

    wheel.style.background = `conic-gradient(${gradientParts.join(', ')})`;
}

/**
 * 開始旋轉轉盤
 */
function spinWheel() {
    if (isSpinning || participants.length < 2) return;

    isSpinning = true;
    
    // 播放音效
    if (soundCheckbox.checked) {
        tickSound.currentTime = 0;
        tickSound.play();
        tickInterval = setInterval(() => {
            tickSound.currentTime = 0;
            tickSound.play();
        }, 200); // 每 200ms 播放一次咔嗒聲
    }
    
    // 計算隨機旋轉角度
    const randomExtraRotation = Math.random() * 360;
    const spinAmount = 360 * 5 + randomExtraRotation; // 至少轉 5 圈
    currentRotation += spinAmount;

    wheel.style.transform = `rotate(${currentRotation}deg)`;
}

/**
 * 當轉盤旋轉動畫結束時觸發
 */
function onSpinEnd() {
    // 停止音效
    clearInterval(tickInterval);
    if (soundCheckbox.checked) {
        winSound.play();
    }
    
    // 計算中獎結果
    const segmentAngle = 360 / participants.length;
    // 指針在頂部，即 270 度的位置
    const finalAngle = (currentRotation % 360);
    const winningAngle = (360 - finalAngle + 270) % 360;
    const winnerIndex = Math.floor(winningAngle / segmentAngle);
    const winner = participants[winnerIndex];

    // 顯示中獎視窗
    winnerText.textContent = winner;
    winnerModal.classList.add('show');
    
    isSpinning = false;
}


// --- 事件監聽 ---

// 只要輸入框內容改變，就更新轉盤
itemInput.addEventListener('input', updateWheel);

// 點擊 SPIN 按鈕或轉盤本身
spinButton.addEventListener('click', spinWheel);
wheel.addEventListener('click', spinWheel);

// 監聽轉盤動畫結束事件
wheel.addEventListener('transitionend', onSpinEnd);

// 清空重設
resetButton.addEventListener('click', () => {
    itemInput.value = '';
    updateWheel();
});

// 關閉中獎視窗
closeBtn.addEventListener('click', () => winnerModal.classList.remove('show'));
winnerModal.addEventListener('click', (e) => {
    if (e.target === winnerModal) {
        winnerModal.classList.remove('show');
    }
});


// --- 初始設定 ---
updateWheel(); // 頁面載入時先根據預設內容畫一次轉盤

