# Herbal Plant Identification & Information System (PWA)

Ito na yung "totoong app" version — pwede i-install sa laptop o phone bilang standalone
app (may sariling icon, walang browser address bar), at gumagana pa rin offline.

## 🌿 BAGO: Awtomatiko nang na-train ang AI (walang kailangang gawin)

Dating kailangan mong mag-upload ng 3-5 sample photo *bawat isa* sa 39 halaman gamit
ang "Train AI" tab bago gumana nang tama ang scanner (kung hindi, "Demo Mode" lang ang
ipapakita). Ngayon, may kasama nang **195 pinili at na-optimize na larawan** (5 bawat
halaman, mula sa dataset mo sa `Herbals` folder) sa loob ng `training-samples/` folder.

Sa unang pagbukas ng app (kapag naka-serve na sa `http://` o `https://` — tingnan ang
mga OPTION sa baba), awtomatiko itong mag-a-"train": makikita mo sa itaas ng "Train AI"
tab ang progress bar na "Ina-train ang AI gamit ang sample photos... (x / 39)" habang
nire-run ng AI (MobileNet) ang bawat larawan. Ilang segundo lang ito. Pagkatapos, dapat
makita mong lahat ng 39 halaman ay may "5 samples na-train", at kapag nag-scan ka na,
lalabas na ang totoong **"AI Match"** tag sa result — hindi na "Demo Mode".

- Kung gusto mong i-force ulit ang auto-train (hal. pagkatapos mag-reset), may button
  na **"⚡ I-retrain gamit ang bundled na sample photos"** sa loob ng "Train AI" tab.
- Pwede ka pa ring magdagdag ng sarili mong larawan (camera o upload) sa parehong tab
  kung gusto mong dagdagan pa ang accuracy — hindi ito mababawasan o mapapalitan ng
  auto-train, dahil sinki-check muna nito kung may laman na ang isang halaman bago ito
  awtomatikong i-train.

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

## OPTION B — I-deploy online gamit lang ang iPhone (walang laptop, walang code)

Ito yung pinaka-madali kung wala kang laptop / hirap kang mag-develop — gagawa ka lang
ng account, mag-uupload ng folder, tapos may lalabas nang link. Sundin lang:

1. Sa iPhone mo, buksan ang **Safari**, pumunta sa **https://app.netlify.com/drop**
2. I-tap ang **"Browse to upload"** (o kung mayroong drag-and-drop area, pwede mo ring
   i-drag ang buong `herbal-pwa` folder papunta doon galing sa **Files app**).
3. Sa file picker na lalabas, piliin ang **buong `herbal-pwa` folder** (kung saan naroon
   ang `index.html`, `manifest.json`, `service-worker.js`, `icons/`, at
   `training-samples/`) — huwag lang isa-isang file, buong folder.
4. Hintayin mag-upload (may ~7MB ito dahil sa mga training photo, ilang segundo lang
   depende sa internet mo).
5. Awtomatiko kang bibigyan ng libreng HTTPS link (hal. `random-name.netlify.app`).
6. I-tap yung link — mag-a-auto-train na agad ang AI (tingnan yung banner sa "Train AI"
   tab), tapos pwede mo nang subukang mag-scan.
7. Para i-install bilang app icon sa Home Screen: sa Safari, i-tap ang **Share** button
   (kahon na may arrow) → **"Add to Home Screen"**.

Kung hindi lumabas ang folder-picker (minsan iba ang behavior ng iOS depende sa
version), i-zip mo na lang muna ang `herbal-pwa` folder (sa Files app: i-tap nang
matagal ang folder → "Compress"), tapos i-upload yung `.zip` — tinatanggap din ito ng
Netlify Drop at awtomatiko nitong iek-extract.

(Kung may laptop/desktop ka naman, mas simple pa: i-drag-and-drop lang buong folder sa
parehong site. Alternative din: GitHub Pages, Vercel, Firebase Hosting.)

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
├── training-samples/    → 195 pinili at na-optimize na larawan (5 bawat halaman)
│                          na ginagamit para awtomatikong ma-train ang AI
└── README.md             → itong file
```
