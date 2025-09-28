# 步驟 1: 使用官方 Node.js 18 Alpine 作為基礎映像檔
# Alpine 是一個輕量級的 Linux 發行版，可以讓我們的最終映像檔體積更小。
FROM node:18-alpine

# 步驟 2: 在容器內部建立一個工作目錄
WORKDIR /app

# 步驟 3: 複製 package.json 檔案並安裝依賴
# 我們只複製 package.json 來利用 Docker 的層快取機制。
# 只有當依賴變更時，這一步才會重新執行，可以加快建置速度。
COPY package.json ./
RUN npm install

# 步驟 4: 將您專案的所有檔案複製到工作目錄中
# 這會複製 index.html, style.css, script.js 等檔案。
COPY . .

# 步驟 5: 宣告容器在執行時將會監聽的網路連接埠
# 這裡我們使用 80 連接埠，這是 HTTP 的標準連接埠。
EXPOSE 80

# 步驟 6: 設定容器啟動時要執行的預設命令
# 這會使用 serve 套件來啟動一個靜態檔案伺服器。
CMD [ "npm", "start" ]
