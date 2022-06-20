function getConstantVowel(kor) {
    const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
               'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
               'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
               'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
               'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const t = [null, 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
               'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
               'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
               'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const ga = 44032;
    let uni = kor.charCodeAt(0);

    uni = uni - ga;

    let fn = parseInt(uni / 588);
    let sn = parseInt((uni - (fn * 588)) / 28);
    let tn = parseInt(uni % 28);

    return {
        f: f[fn],
        s: s[sn],
        t: t[tn]
    };
}

function decomposition(kor) {
    if(kor === "ㄲ") return ["ㄱ", "ㄱ"];
    if(kor === "ㄸ") return ["ㄷ", "ㄷ"];
    if(kor === "ㅃ") return ["ㅂ", "ㅂ"];
    if(kor === "ㅆ") return ["ㅅ", "ㅅ"];
    if(kor === "ㅉ") return ["ㅈ", "ㅈ"];

    if(kor === "ㄳ") return ["ㄱ", "ㅅ"];
    if(kor === "ㄵ") return ["ㄴ", "ㅈ"];
    if(kor === "ㄶ") return ["ㄴ", "ㅎ"];
    if(kor === "ㄺ") return ["ㄹ", "ㄱ"];
    if(kor === "ㄻ") return ["ㄹ", "ㅁ"];
    if(kor === "ㄼ") return ["ㄹ", "ㅂ"];
    if(kor === "ㄽ") return ["ㄹ", "ㅅ"];
    if(kor === "ㄾ") return ["ㄹ", "ㅌ"];
    if(kor === "ㄿ") return ["ㄹ", "ㅍ"];
    if(kor === "ㅀ") return ["ㄹ", "ㅎ"];
    if(kor === "ㅄ") return ["ㅂ", "ㅅ"];

    if(kor === "ㅐ") return ["ㅏ", "ㅣ"];
    if(kor === "ㅒ") return ["ㅑ", "ㅣ"];
    if(kor === "ㅔ") return ["ㅓ", "ㅣ"];
    if(kor === "ㅖ") return ["ㅕ", "ㅣ"];
    if(kor === "ㅘ") return ["ㅗ", "ㅏ"];
    if(kor === "ㅙ") return ["ㅗ", "ㅏ", "ㅣ"];
    if(kor === "ㅚ") return ["ㅗ", "ㅣ"];
    if(kor === "ㅝ") return ["ㅜ", "ㅓ"];
    if(kor === "ㅞ") return ["ㅜ", "ㅓ", "ㅣ"];
    if(kor === "ㅟ") return ["ㅜ", "ㅣ"];
    if(kor === "ㅢ") return ["ㅡ", "ㅣ"];

    return [kor];
}

const emojiId = {
    'ㄱ': "<:r:988331011974787103>",
    "ㄴ": "<:s:988331014143242270>",
    "ㄷ": "<:e:988331015770611712>",
    "ㄹ": "<:f:988331017347674112>",
    "ㅁ": "<:a:988331018421424199>",
    "ㅂ": "<:q:988331021269336084>",
    "ㅅ": "<:t:988336229839953950>",
    "ㅇ": "<:d:988336231702212648>",
    "ㅈ": "<:w:988336233396731914>",
    "ㅊ": "<:c:988336234818596894>",
    "ㅋ": "<:z:988336236307550268>",
    "ㅌ": "<:x:988336237742010369>",
    "ㅍ": "<:v:988336239512027146>",
    "ㅎ": "<:g:988336241143603250>",
    "ㅏ": "<:k:988336242582245409>",
    "ㅑ": "<:i:988336244834566144>",
    "ㅓ": "<:j:988336246457794601>",
    "ㅕ": "<:u:988336247976120340>",
    "ㅗ": "<:h:988336249611886603>",
    "ㅛ": "<:y:988336251633553438>",
    "ㅜ": "<:n:988336253202210886>",
    "ㅠ": "<:b:988336254842191882>",
    "ㅡ": "<:m:988336256461180938>",
    "ㅣ": "<:l:988336258289918053>"
}

const getEllaLanguage = (param) => {
    const decompositedText = param.split("").reduce((prev, curr) => {
        if(curr.charCodeAt(0) < 44032) return [...prev, curr];

        const constantVowel = getConstantVowel(curr);
        return [...prev, ...decomposition(constantVowel.f), ...decomposition(constantVowel.s), ...decomposition(constantVowel.t)]
    }, [])

    return decompositedText.filter(t => t !== null).map((t) => emojiId[t]).reverse().join("");
}


module.exports = {
    getEllaLanguage,
};