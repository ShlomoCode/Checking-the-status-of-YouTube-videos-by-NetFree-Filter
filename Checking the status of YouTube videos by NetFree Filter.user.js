// ==UserScript==
// @name         Checking the status of YouTube videos by NetFree Filter
// @namespace    https://madrichim.ovh
// @version      1.0
// @updateURL    https://github.com/ShlomoCode/Checking-the-status-of-YouTube-videos-by-NetFree-Filter/raw/main/
// @description  כלי לבדיקת כמותית של מצב סרטונים בסינון נטפרי
// @author       ShlomoCode
// @match        https://www.google.com/TestYtByNetFree
// ==/UserScript==
//הדפסה בפועל של הרשימות
//בחירת תו מפריד
if (document.URL === "https://www.google.com/TestYtByNetFree") {
  document.title = "בדיקת מצב סרטוני יוטיוב בנטפרי";
  function jsonTest(block) {
    switch (block) {
      case "deny":
        //נבדק ונחסם
        break;
      case "unknown-video":
        //לא נבדק
        break;
      case undefined:
        //פתוח
        break;
    }
  }

  let arrayYT = prompt(
    "הכנס כאן רשימת סרטוני יוטיוב מופרדים בפסיק ורווח, ואז אישור."
  );
  arrayYT = arrayYT.split(", ");

  document.write('<h3>סרטונים פתוחים</h3><ul id="listOpen"></ul><br>');
  document.write('<h3>סרטונים חסומים</h3><ul id="listBlock"></ul><br>');
  document.write('<h3>סרטונים שלא נבדקו</h3><ul id="listUnchecked"></ul>');

  arrayYT.forEach((YTurl, index) => {
    fetch(`https://www.google.com/~netfree/test-url?u=${YTurl}`, {})
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        jsonTest(json.block);
      })
      .catch((error) => {
        console.log(`שגיאה בקבלת נתונים מהכתובת: ${YTurl}. שגיאה: ${error}`);
      })
      .finally(() => {
        if (index === arrayYT.length - 1) {
          playCompleted();
        }
      });
  });
  //   arrayYT.forEach((YTurl) => {
  //   });
} //סיום תנאי בדיקת כתובת דף
function playCompleted() {
  var audioComplet = new Audio(
    "https://mitmachim.top/assets/uploads/files/1643063332859-1642978589384-status_ok.mp3"
  );
  audioComplet.play();
}
