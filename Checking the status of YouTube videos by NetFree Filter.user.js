// ==UserScript==
// @name         Checking the status of YouTube videos by NetFree Filter
// @namespace    https://madrichim.ovh
// @version      2.2
// @updateURL    https://github.com/ShlomoCode/Checking-the-status-of-YouTube-videos-by-NetFree-Filter/raw/main/
// @description  כלי לבדיקת כמותית של מצב סרטונים בסינון נטפרי
// @author       ShlomoCode
// @match        https://www.google.com/TestYtByNetFree
// ==/UserScript==
if (document.URL === "https://www.google.com/TestYtByNetFree") {
    document.title = "בדיקת מצב סרטוני יוטיוב בנטפרי";
    document.open()
        // let Rest;

    function printErrors(YTurl, error) {
        var list = document.getElementById("listError");
        var parit = YTurl + " - " + error;
        var entry = document.createElement("li");
        entry.appendChild(document.createTextNode(parit));
        list.appendChild(entry);
    }

    function printStatus(YTurl, TypeList) {
        var list = document.getElementById(TypeList);
        var parit = YTurl;
        var entry = document.createElement("li");
        entry.appendChild(document.createTextNode(parit));
        list.appendChild(entry);
    }

    function jsonTest(block, YTurl) {
        switch (block) {
            case "deny":
                //נבדק ונחסם
                printStatus(YTurl, "listBlock");
                break;
            case "unknown-video":
                //לא נבדק
                printStatus(YTurl, "listUnchecked");
                break;
            case undefined:
                //פתוח
                printStatus(YTurl, "listOpen");
                break;
        }
    }

    let arrayYT = prompt("הכנס כאן רשימת סרטוני יוטיוב מופרדים בפסיק ורווח, ואז לחץ אישור.");
    arrayYT = arrayYT.split(prompt("בחר תו מפריד בין סרטון לסרטון, לדוגמה פסיק ורווח, פסיק בלבד, וכדומה. ברירת מחדל: פסיק ורווח.", ", "));

    document.write('<p id="StatusALL"></p><br>');
    document.write('<h3>סרטונים פתוחים</h3><ul id="listOpen"></ul><br>');
    document.write('<h3>סרטונים חסומים</h3><ul id="listBlock"></ul><br>');
    document.write('<h3>סרטונים שלא נבדקו</h3><ul id="listUnchecked"></ul><br>');
    document.write('<h3>שגיאות</h3><ul id="listError"></ul>');
    (() => { //תיקון RTL - יישור לימין
        let doc = document.body.style;
        if (doc.direction === "rtl") {
            doc.direction = "ltr";
            doc.textAlign = "left";
        } else {
            doc.direction = "rtl";
            doc.textAlign = "right";
        }
    })();

    arrayYT.forEach((YTurl, index) => {
        fetch(`https://www.google.com/~netfree/test-url?u=${YTurl}`, {})
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                jsonTest(json.block, YTurl);
            })
            .catch((error) => {
                printErrors(YTurl, error);
            })
            .finally(() => {
                if (index === arrayYT.length - 1) {
                    document.getElementById("StatusALL").innerText = "הושלם בהצלחה. " + index + " כתובות עובדו "
                    playCompleted();
                }
                // else {
                //     Rest = arrayYT.length - 1 - index;
                //     document.getElementById("StatusALL").innerText = "התקדמות: " + index + " מתוך " + arrayYT.length - 1 + " עובדו, נותרו עוד" + Rest
                // }
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