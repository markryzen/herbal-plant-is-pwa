# Herbal Plant Identification & Information System (PWA)

Ito na yung "totoong app" version — pwede i-install sa laptop o phone bilang standalone
app (may sariling icon, walang browser address bar), at gumagana pa rin offline.

## Bakit kailangan pang i-run sa server (hindi lang i-double click)

Ang mga browser (Chrome, Edge, Safari) ay HINDI nagpapa-install ng PWA at hindi
pinapagana ang camera kung direktang binuksan mula sa file (`file://...`) — kailangan
itong i-serve gamit ang isang lokal na server (`http://` o `https://`). Sundin lang
yung mga steps sa baba, mabilis lang naman.

---

## OPTION A — Patakbuhin sa laptop mo (para sa depensa/presentation)

**Kailangan:** Python (karamihan ng Windows/Mac laptop may kasama na nito)

1. I-extract (unzip) itong folder.
2. Buksan ang Terminal / Command Prompt sa loob ng folder na ito (kung saan naroon
   ang `index.html`).
   - Windows: i-right-click sa loob ng folder → "Open in Terminal"
   - Mac: buksan ang Terminal, tapos i-type ang `cd ` at i-drag ang folder papunta
     sa terminal window, pindutin Enter
3. I-type ang command na ito, tapos Enter:

   ```
   python3 -m http.server 8000
   ```

   (Kung "python3" ay hindi gumana, subukan ang `python -m http.server 8000`)

4. Buksan ang Chrome, pumunta sa:

   ```
   http://localhost:8000
   ```

5. Para i-install bilang app:
   - **Chrome (Windows/laptop):** may lalabas na "Install" icon (⊕) sa dulo ng
     address bar — i-click ito. O pindutin ang "I-install ang App" button sa loob
     mismo ng app.
   - **Android phone (kung parehong WiFi ang laptop at phone):** buksan ang
     `http://<IP-address-ng-laptop>:8000` sa Chrome ng phone, tapos "Add to Home
     Screen" mula sa menu (⋮).

6. Pagkatapos i-install, may lalabas na app icon (leaf logo) sa desktop/home
   screen mo — bubuksan na siyang parang normal na app, walang browser bar.

7. Para itigil ang server, balik sa Terminal at pindutin `Ctrl + C`.

---

## OPTION B — I-deploy online (para totoong HTTPS link, pwede buksan kahit saan)

Kung gusto mong may link na pwedeng buksan ng panelist mula sa sarili nilang phone:

1. Pumunta sa **https://app.netlify.com/drop**
2. I-drag-and-drop ang buong folder na ito (yung naglalaman ng `index.html`,
   `manifest.json`, `service-worker.js`, at `icons/`).
3. Automatic kang bibigyan ng libreng HTTPS link (hal. `random-name.netlify.app`).
4. Buksan yun sa Chrome (laptop o phone) → lalabas na ang "Install" option.

(Alternative: GitHub Pages, Vercel, Firebase Hosting — parehas lang na drag-and-drop
o push ang proseso.)

---

## OPTION C — I-connect sa Firebase Firestore (totoong cloud database)

Ang app ay handa nang kumonekta sa **Firebase Firestore** (libreng cloud
database ni Google) para sa plant information. Hindi ito kailangan para
gumana ang app — gagana pa rin ito offline gamit ang built-in na local data —
pero kung gusto mo talagang may "totoong naka-connect na database" (hal. para
sa depensa o kung gusto mong ma-update ang datos nang hindi kailangang baguhin
ang code), sundin ang mga hakbang na ito:

1. Pumunta sa **https://console.firebase.google.com** at mag-sign in gamit ang
   Google account mo.
2. I-click ang **"Add project"**, bigyan ng pangalan (hal. `herbal-plant-is`),
   sundan ang mga default settings.
3. Sa loob ng project, i-click ang **web icon (`</>`)** para magdagdag ng Web
   App. Bigyan ng nickname, i-click "Register app".
4. Kokopyahin nito ang isang `firebaseConfig` object — kopyahin lahat ng laman
   nito (apiKey, authDomain, projectId, atbp.).
5. Buksan ang `index.html` gamit ang text editor (Notepad, VS Code, atbp.),
   hanapin ang `const firebaseConfig = {` (malapit sa taas ng `<script>`
   section), at palitan yung mga placeholder values ("YOUR_API_KEY", etc.) ng
   totoong values mula sa Firebase.
6. Balik sa Firebase Console → sa kaliwang menu, i-click **"Build" →
   "Firestore Database"** → **"Create database"** → piliin ang **"Start in
   test mode"** (para mabilis, walang kailangang i-configure na security
   rules muna) → piliin ang region (hal. `asia-southeast1`) → "Enable".
7. I-save ang `index.html`, i-reload ang app (`http://localhost:8000`).
8. Pumunta sa **About** tab — dapat may makita kang status na "Connecting to
   Firestore..." pagkatapos ay "Firestore connected, but empty".
9. I-click ang button na **"☁️ I-upload ang Plant Data sa Firestore"** — isang
   beses lang ito. Ito ang mag-a-upload ng 39 halamang gamot papunta sa iyong
   Firestore database.
10. Pagkatapos, dapat makita mong nagiging **"● Connected to Firestore
    (cloud)"** ang status, at makikita mo na rin ang mga plant documents sa
    Firebase Console mismo (Firestore Database → collection na `plants`).

Mula dito, pwede mo nang i-edit/dagdagan ang mga halaman diretso sa Firebase
Console — awtomatikong mag-a-update ang app sa susunod na buksan ito.

**Tandaan:** Ang "test mode" ng Firestore ay bukas sa lahat (walang
authentication) — okay ito para sa thesis demo, pero kung gusto mong
i-deploy nang totoo (hal. publikong website), dapat mong i-configure ang
[Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
para protektahan ang datos.

---

## Bagong Features — Admin Panel at Bookmark/Saved Plants

**Bookmark/Saved Plants** — sa Detail page ng bawat halaman, may bookmark icon
(♡) sa kanang-itaas. Kapag pinindot, na-save ang halaman sa "Naka-save Mo"
section sa Home screen, at makikita rin sa Library gamit ang "❤ Naka-save"
filter chip. Naka-store ito nang lokal sa browser (localStorage) — personal
na preference ng bawat user/device.

**Admin Panel** — nasa About tab, "🔑 Buksan ang Admin Panel" button. Default
password: `herbal2026` (hanapin ang `ADMIN_PASSWORD` sa `index.html` kung
gusto mong palitan). Dito pwedeng magdagdag, mag-edit, o magbura ng plant
records nang direkta sa loob ng app — naka-sync agad sa Firestore kapag
naka-connect. **Mahalagang paalala:** ito ay simpleng client-side password
check lamang, hindi totoong authentication system — sapat para sa thesis
demo/prototype, pero hindi dapat gamitin nang ganito kung ilalabas ang system
sa publiko. Para sa totoong deployment, dapat palitan ito ng Firebase
Authentication kasabay ng properly-configured Firestore Security Rules.

## Mga tandaan

- **Camera & Voice Search** — gagana lang kapag naka-serve sa `http://localhost`
  o sa isang tunay na HTTPS site. Hindi ito gagana kung direktang binuksan ang
  `index.html` file mula sa file explorer.
- **AI Plant Scanner — TOTOONG AI na ito.** Gumagamit ang app ng **MobileNet**
  (isang pre-trained deep learning/CNN model) na tumatakbo mismo sa loob ng
  browser gamit ang TensorFlow.js — walang external server o API key na
  kailangan. Ang bawat larawang naka-scan ay ikinukumpara (cosine similarity /
  k-Nearest Neighbors) sa mga sample photo na na-train mo sa **"Train AI"** tab.
  Ito ang tinatawag na **transfer learning** — legitimate at karaniwang paraan
  ng image classification kapag wala kang malaking labeled dataset o GPU para
  mag-train mula sa simula.
  - **Kailangan mo munang magdagdag ng 3-5 sample photo bawat halaman** sa
    "Train AI" tab bago maging tumpak ang recognition (kunin gamit ang camera
    o mag-upload ng larawan). Habang wala pang training data, gagamit ang app
    ng demo-mode matching para makita pa rin ang buong daloy ng sistema —
    malinaw itong lalabas sa result screen ("Demo Mode" tag vs "AI Match" tag).
  - Ang mga training sample ay naka-save sa **IndexedDB** (browser database),
    kaya nananatili ito sa parehong device/browser kahit i-refresh o isara mo
    ang app.
- Lahat ng datos (39 halamang gamot) ay naka-hardcode bilang default sa loob ng
  `index.html` — buksan mo lang ito sa text editor kung gusto mong magdagdag o
  mag-edit ng plant entries (hanapin ang `const DEFAULT_PLANTS = [...]`). Kapag
  naka-connect ka na sa Firestore, doon mo na rin puwedeng i-edit ang datos.
- **Mga larawan ng halaman:** Sa halip na gumamit ng mga larawan mula sa
  internet (may copyright issues ito), awtomatikong gagamitin ng app ang
  **unang sample photo na na-train mo** sa "Train AI" tab bilang opisyal na
  larawan ng halaman sa Library at Detail pages. Kaya mas maganda kung
  magda-training ka gamit ang malinaw at magandang anggulo ng larawan — dahil
  ito rin ang lalabas sa buong app. Hangga't wala pang na-train na sample,
  generic na leaf icon muna ang lalabas.

## Tungkol sa "Database" ng System

May dalawang bahagi ang datos ng app na ito:

1. **Plant Information Database — Firebase Firestore (cloud database).** Ang
   39 halamang gamot (pangalan, katangian, medisinal na gamit, benepisyo,
   atbp.) ay naka-store sa Firestore kapag na-connect mo na ito (tingnan ang
   **OPTION C** sa itaas). Ito ang "centralized at organized database" na
   tinutukoy sa Objective #2 ng thesis mo — totoong naka-host sa cloud,
   pwedeng i-edit nang hindi kailangang baguhin ang code, at makikita mo
   mismo sa Firebase Console. Kung hindi pa naka-configure, gumagamit ang app
   ng built-in na local copy ng parehong datos para tuloy-tuloy pa rin ang
   demo — walang mababalak kahit hindi pa na-set up ang Firebase.
2. **AI Training Database — IndexedDB (on-device).** Ang mga sample photo
   embeddings na idinagdag mo sa "Train AI" tab ay naka-store sa IndexedDB,
   ang built-in na database ng browser. Sinadya itong panatilihing local
   (hindi sa cloud) dahil mas mabilis, gumagana kahit walang internet, at
   walang gastos sa storage — pero kung gusto mo ring i-cloud ito sa
   susunod, pwede rin itong ilipat sa Firestore gamit ang parehong config.

Kung gusto mong palawigin pa ang system (hal. admin panel, multi-device sync,
user accounts), ang Firebase ecosystem (Firestore + Firebase Auth + Firebase
Hosting) ang pinaka-madaling susunod na hakbang dahil parehas silang gumagana
nang walang kailangang ihawak na sariling backend server.

## Mga Laman ng Folder

```
herbal-pwa/
├── index.html          → ang buong app (UI + logic)
├── manifest.json        → app name, icon, theme color para sa install
├── service-worker.js    → nagpapagana ng offline caching
├── icons/                → app icons (192px, 512px, maskable)
└── README.md             → itong file
```
